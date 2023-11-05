import React, { useEffect, useState } from "react";
import NavTab from "./NavTab";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  FlatList,
  Image,
  ImageBackground,
} from "react-native";
import { Ionicons, MaterialIcons, FontAwesome } from "@expo/vector-icons";
import yourBackgroundImage from "../Photos/avocat6.jpeg";
import {FIREBASE_AUTH,FIREBASE_DB } from '../firebaseConfig'
import { collection, doc, getDocs, deleteDoc ,query, where } from "firebase/firestore";

const { width, height } = Dimensions.get("window");

const HomePage = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState("Home");


  // Function to handle photo click
  const handlePhotoClick = (item) => {
    // Replace this with your desired behavior when a photo is clicked
    console.log("Photo clicked:", item.id);
  };

  const photoData2 = [
    {
      id: 1,
      source: require("../Photos/avocat1.jpg"),
    },
    {
      id: 2,
      source: require("../Photos/avocat2.jpeg"),
    },
    {
      id: 3,
      source: require("../Photos/avocat3.jpeg"),
    },
    {
      id: 4,
      source: require("../Photos/avocat4.jpeg"),
    },
    {
      id: 5,
      source: require("../Photos/avocat5.jpeg"),
    },
  ];

  const photoData4 = [
    {
      id: 1,
      source: require("../Photos/avocat6.jpeg"),
    },
    {
      id: 2,
      source: require("../Photos/avocat7.jpeg"),
    },
    {
      id: 3,
      source: require("../Photos/avocat8.jpeg"),
    },
    {
      id: 4,
      source: require("../Photos/avocat9.jpeg"),
    },
    {
      id: 5,
      source: require("../Photos/avocat10.jpeg"),
    },
  ];

  const renderTabContent = () => {

    const [user, setUser] = useState([]);

    const userCollectionRef = collection(FIREBASE_DB, "user");
    const getUser = async () => {
      try {
        const result = await getDocs(userCollectionRef);
        const users = result.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        })).filter((e)=>e.email === FIREBASE_AUTH.currentUser.email)[0]
        console.log("this is user",users);
        setUser(users);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    useEffect(()=>{
      getUser()
    },[])

    if (selectedTab === "Home") {
      return (
        <View style={styles.container}>
          <View style={styles.header}>
          <Text style={{ fontSize: 0.026 * height,color: "white",fontWeight: "700",top: 80,marginBottom:7,left:-5}}> Hi,{user?.fullName}</Text>
            <Text style={styles.pageText}>
             browse a number of lawyers to get your issues{"\n"}
              resolved. Start consulting now!
            </Text>
            <View style={styles.notificationContainer}>
              <TouchableOpacity
                onPress={() => navigation.navigate("Notifications")}
                style={styles.notificationButton}>
                <MaterialIcons name="notifications" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("Filter")}
                style={styles.filterButton}>
                <Ionicons name="options" size={24} color="white" />
              </TouchableOpacity>
            </View>
            <View style={styles.searchContainer}>
              <TextInput
                placeholder="Category,Type,Domain,Etc"
                style={styles.searchInput}
              />
              <Ionicons
                name="search"
                size={24}
                color="white"
                style={styles.searchIcon}
              />
            </View>
          </View>
          <ScrollView style={styles.body}>
            <View style={styles.bodyView1}>
              <Text style={styles.bodyText}>By Category</Text>
              <ScrollView
                horizontal
                contentContainerStyle={styles.buttonContainer1}>
                <TouchableOpacity
                  style={[styles.button, styles.buttonWithSpace]}
                  onPress={() => handleButtonClick(1)}>
                  <Text style={styles.buttonText}>Bankruptcy Lawyer</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button2, styles.buttonWithSpace]}
                  onPress={() => handleButtonClick(2)}>
                  <Text style={styles.buttonText}>Business Lawyer</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button3, styles.buttonWithSpace]}
                  onPress={() => handleButtonClick(3)}>
                  <Text style={styles.buttonText}>Constitutional Lawyer</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button4, styles.buttonWithSpace]}
                  onPress={() => handleButtonClick(4)}>
                  <Text style={styles.buttonText}>Family Lawyer</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button5, styles.buttonWithSpace]}
                  onPress={() => handleButtonClick(5)}>
                  <Text style={styles.buttonText}>Entertainment Lawyer</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button6, styles.buttonWithSpace]}
                  onPress={() => handleButtonClick(6)}>
                  <Text style={styles.buttonText}>
                    Employment and Labor Lawyer
                  </Text>
                </TouchableOpacity>
              </ScrollView>
              <TouchableOpacity
                style={styles.topRightButton}
                onPress={() => handleTopRightButtonClick()}>
                <Text style={styles.topRightButtonText}>See All</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.bodyView2}>
              <Text style={styles.bodyText}>Nearby Lawyers</Text>
              <FlatList
                data={photoData2}
                horizontal
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => handlePhotoClick(item)}>
                    <View style={styles.photoItem}>
                      <Image source={item.source} style={styles.photoImage} />
                    </View>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id.toString()}
              />
              <TouchableOpacity
                style={styles.topRightButton}
                onPress={() => handleTopRightButtonClick()}>
                <Text style={styles.topRightButtonText}>See All</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.singleButton}
                  onPress={() => handleButtonClick(7)}>
                  <View style={styles.textContainer}>
                    <Text style={styles.buttonText1}>
                      Can't find need help?
                    </Text>
                    <Text style={styles.buttonText2}>
                      Share issues, Doc, Write to us, Start consulting now!
                    </Text>
                  </View>
                  <View style={styles.arrowContainer}>
                    <TouchableOpacity
                      style={styles.arrowButton}
                      onPress={() => handleArrowClick()}>
                      <FontAwesome name="angle-right" size={24} color="white" />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.bodyView4}>
              <Text style={styles.bodyText}>Top Rated</Text>
              <FlatList
                data={photoData4}
                horizontal
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => handlePhotoClick(item)}>
                    <View style={styles.photoItem}>
                      <Image source={item.source} style={styles.photoImage} />
                    </View>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id.toString()}
              />
              <TouchableOpacity
                style={styles.topRightButton}
                onPress={() => handleTopRightButtonClick()}>
                <Text style={styles.topRightButtonText}>See All</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      );
    } else if (selectedTab === "EmptyTab") {
      return (
        <View style={styles.container}>
          <View style={styles.header}></View>
          <View style={styles.emptyTabContainer}>
            <Text>Empty Tab Content</Text>
          </View>
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      {renderTabContent()}
      <View style={styles.navTabContainer}>
        <NavTab />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  header: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    height: 280,
    backgroundColor: "black",
    padding: 17,
    top: 1,
    borderBottomWidth: 2,
    borderBottomColor: "black",
  },
  body: {
    flex: 1,
    backgroundColor: "#E5E4E2",
    padding: 1,
  },
  pageText: {
    fontSize: 0.02 * height,
    color: "white",
    fontWeight: "500",
    top: 80,
  },
  emptyTabContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  notificationContainer: {
    position: "absolute",
    top: 0.07 * height,
    right: 0.03 * width,
    flexDirection: "row",
  },
  notificationButton: {
    borderRadius: 0.1 * width,
    padding: 0.03 * width,
    marginRight: 0.02 * width,
  },
  filterButton: {
    borderRadius: 0.1 * width,
    padding: 0.03 * width,
  },
  searchContainer: {
    position: "absolute",
    bottom: 0.03 * height,
    left: 20,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 0.03 * width,
  },
  searchInput: {
    flex: 1,
    padding: 0.02 * width,
    borderWidth: 1,
    borderRadius: 0.04 * width,
    backgroundColor: "white",
    marginRight: 0.02 * width,
  },
  searchIcon: {
    alignSelf: "center",
  },
  bodyView1: {
    flex: 1,
    backgroundColor: "#E5E4E2",
  },
  bodyView2: {
    flex: 1,
    backgroundColor: "#E5E4E2",
  },
  bodyView4: {
    flex: 1,
    backgroundColor: "#E5E4E2",
  },
  bodyText: {
    fontSize: 20,
    color: "black",
    textAlign: "left",
    marginTop: 20,
    marginLeft: 10,
    fontWeight: "bold",  
  },
  photoItem: {
    width: 120,
    height: 120,
    marginRight: 30,
    marginTop: 25,
    backgroundColor: "white", // Change background color to white
    borderRadius: 20,
  },
  photoImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "cover",
    borderRadius: 20,
  },
  navTabContainer: {
    flex: 0.1, // Use flex to push the NavTab to the bottom
    top: 0, // Align the NavTab to the bottom of the container
    height: 0,
  },
  navTab: {
    position: "absolute",
    width: "100%",
  },
  buttonContainer1: {
    flexDirection: "row",
    marginTop: 40,
  },
  button: {
    backgroundColor: "black", // Example background color
    padding: 10,
    marginHorizontal: 5,
    width: "15%", // Adjust the space between buttons
    borderRadius: 10,
  },
  button2: {
    backgroundColor: "black", // Example background color
    padding: 10,
    marginHorizontal: 5,
    width: "15%",
    borderRadius: 10,
  },
  button3: {
    backgroundColor: "black", // Example background color
    padding: 10,
    marginHorizontal: 5,
    width: "15%",
    borderRadius: 10,
  },
  button4: {
    backgroundColor: "black", // Example background color
    padding: 10,
    marginHorizontal: 5,
    width: "15%",
    borderRadius: 10,
  },
  button5: {
    backgroundColor: "black", // Example background color
    padding: 10,
    marginHorizontal: 5,
    width: "15%",
    borderRadius: 10,
  },
  button6: {
    backgroundColor: "black", // Example background color
    padding: 10,
    marginHorizontal: 5,
    width: "15%",
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
  },
  buttonWithSpace: {
    marginHorizontal: 10,
  },
  topRightButton: {
    position: "absolute",
    top: 10,
    right: -30,
    borderRadius: 10,
    padding: 10,
    width: 150,
    alignItems: "center",
  },
  topRightButtonText: {
    fontSize: 20,
    color: "#D5B278",
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  singleButton: {
    backgroundColor: "black",
    padding: 15,
    borderRadius: 30,
    flexDirection: "row", // Allow items to be in a row
    alignItems: "center", // Align items vertically in the center
    top: 10,
    marginBottom: 20,
    marginRight: 10,
    marginLeft: 10,
  },
  textContainer: {
    flex: 1, // Use flex to make it expand to take available space
  },
  buttonText1: {
    color: "#D5B278",
    fontSize: 30,
  },
  buttonText2: {
    color: "white",
    fontSize: 15,
  },
  arrowContainer: {
    marginLeft: 10, // Add some space between the text and the arrow
  },
  arrowButton: {
    // backgroundColor: 'white',
    padding: 10,
    color: "#D5B278",
    borderRadius: 10,
  },
  buttonBackground: {
    flex: 1,
    resizeMode: "cover", // or 'stretch' to stretch the image
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomePage;
