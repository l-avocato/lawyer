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
import { FIREBASE_AUTH, FIREBASE_DB } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import axios from "axios";
import config from "./ipv";



const { width, height } = Dimensions.get("window");

const HomePage = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState("Home");

  // Function to handle photo click
  const handlePhotoClick = (item) => {
    navigation.navigate("ProfilDetails", { item });

    console.log("Photo clicked:", item.id);
  };
  const handleFilterClick = (item) => {
    navigation.navigate("ManageFilters");
    // console.log("Photo clicked:", item.id);
  };

  // const photoData2 = [
  //   {
  //     id: 1,
  //     source: require("../Photos/avocat1.jpg"),
  //   },
  //   {
  //     id: 2,
  //     source: require("../Photos/avocat2.jpeg"),
  //   },
  //   {
  //     id: 3,
  //     source: require("../Photos/avocat3.jpeg"),
  //   },
  //   {
  //     id: 4,
  //     source: require("../Photos/avocat4.jpeg"),
  //   },
  //   {
  //     id: 5,
  //     source: require("../Photos/avocat5.jpeg"),
  //   },
  // ];

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
    const [lawyers, setLawyers] = useState([]);
    const [categories, setCategories] = useState([]);

    const userCollectionRef = collection(FIREBASE_DB, "user");
    const lawyersCollectionRef = collection(FIREBASE_DB, "lawyers");
    const categoryCollectionRef = collection(FIREBASE_DB, "category");


    console.log(lawyers,"this is lawyers");



    const loggedInUser = FIREBASE_AUTH.currentUser.email;

    const getUser = () => {
       axios.get(`http://${config}:1128/api/user/getUserByEmail/${loggedInUser}`)
      .then((res) => {
          console.log("this is user",res.data);
          setUser(res.data);
          /*
          user is set correctly, inside an array because in the back you're using findAll instead of findone, it doesn't matter, u can set the
          user from res.data[0] because the response.data will be an array that contains one object which is the active user's object's (the user that just logged in),
           you have to work on a new redux slice that will hold the active user, so you can fetch it in any component, for example, for the reviews, when i'm creating
           a new review i have to post the UserId: activeUser.id inside the body, so the review can have an owner in the data base, for now when you create
           a new review, it will have UserId: null, till you create that slice and fetch the active user in ProfileDetails.jsx, and go there you'll find
           another comment to explain more
          
          */
        }).catch(err=>{
          console.log(err);
        })
      };

    const getLawyers = async () => {
      try{
         const response = await axios.get(
        `http://${config}:1128/api/lawyer/allLawyers`
      );
      setLawyers(response.data);
      console.log("this is lawyers", response.data);
      return response.data;
      }
     catch(err) {
console.log(err);
     }
    };
    const getCategories = async () => {
      console.log("this is the config", config);
      const response = await axios.get(
        `http://${config}:1128/api/category/allCategories`
      );
      setCategories(response.data);
      console.log("this is lawyers", categories);
      return response.data;
    };
    useEffect(() => {
      getUser();
      getLawyers();
      getCategories();
    }, []);

    if (selectedTab === "Home") {
      return (
        <View style={styles.container}>
          <View style={styles.header}>
            <Text
              style={{
                fontSize: 0.026 * height,
                color: "white",
                fontWeight: "700",
                top: 80,
                marginBottom: 7,
                left: -5,
                color: "#D5B278",
              }}
            >
              {" "}
              Hi,{user[0]?.fullName}
            </Text>
            <Text style={styles.pageText}>
              browse a number of lawyers to get your issues{"\n"}
              resolved. Start consulting now!
            </Text>
            <View style={styles.notificationContainer}>
              <TouchableOpacity
                onPress={() => navigation.navigate("notifications")}
                style={styles.notificationButton}
              >
                <MaterialIcons name="notifications" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleFilterClick()}
                style={styles.filterButton}
              >
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
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.buttonContainer1}
              >
                <FlatList
                  data={categories}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={[styles.button2, styles.buttonWithSpace]}
                      onPress={() => handleButtonClick(2)}
                    >
                      <Text style={styles.buttonText}>{item.name}</Text>
                    </TouchableOpacity>
                  )}
                  keyExtractor={(item) => item.id.toString()}
                />
              </ScrollView>
              <TouchableOpacity
                style={styles.topRightButton}
                onPress={() => handleTopRightButtonClick()}
              >
                <Text style={styles.topRightButtonText}>See All</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.bodyView2}>
              <Text style={styles.bodyText}>Nearby Lawyers</Text>
              <FlatList
                data={lawyers}
                style={{ marginLeft: 10, top: -10 }}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => handlePhotoClick(item)}>
                    <View style={styles.photoItem}>
                      <Image
                        source={{ uri: item.ImageUrl }}
                        style={styles.photoImage}
                      />
                    </View>
                    <Text
                      style={{
                        left: -15,
                        top: 3,
                        fontSize: 15,
                        fontWeight: "500",
                        alignSelf: "center",
                      }}
                    >
                      {item.fullName}
                    </Text>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id.toString()}
              />
              <TouchableOpacity
                style={styles.topRightButton}
                onPress={() => handleTopRightButtonClick()}
              >
                <Text style={styles.topRightButtonText}>See All</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.singleButton}
                  onPress={() => handleButtonClick(7)}
                >
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
                      onPress={() => handleArrowClick()}
                    >
                      <FontAwesome name="angle-right" size={24} color="white" />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.bodyView4}>
              <Text style={styles.bodyText}>Top Rated</Text>
              <FlatList
                data={lawyers}
                horizontal
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => handlePhotoClick(item)}>
                    <View style={styles.photoItem}>
                      <Image source={{uri: item.ImageUrl}} style={styles.photoImage} />
                    </View>
                    <Text
                      style={{
                        left: -15,
                        top: 3,
                        fontSize: 15,
                        fontWeight: "500",
                        alignSelf: "center",
                      }}
                    >
                      {item.fullName}
                    </Text>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id.toString()}
              />
              <TouchableOpacity
                style={styles.topRightButton}
                onPress={() => handleTopRightButtonClick()}
              >
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
    top: 180,
    left: 4,
    width: "109%",
    height: 0.08 * height,
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
    marginTop: 15,
  },
  button: {
    backgroundColor: "black", // Example background color
    padding: 10,
    marginHorizontal: 5,
    width: "15%", // Adjust the space between buttons
    borderRadius: 10,
  },
  button2: {
    backgroundColor: "#D5B278", // Example background color
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 10,
    height: 50,
    width: 150,
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
    color: "black",
    textAlign: "center",
    fontWeight: "600",
    top: 7,
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
    top: 5,
  },
  singleButton: {
    backgroundColor: "black",
    padding: 15,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center", 
    top: 10,
    marginBottom: 20,
    marginRight: 10,
    marginLeft: 10,
  },
  textContainer: {
    flex: 1,
    
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
    marginLeft: 10,
  },
  arrowButton: {
    padding: 10,
    color: "#D5B278",
    borderRadius: 10,
  },
  buttonBackground: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomePage;
