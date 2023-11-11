import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { FIREBASE_DB } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const SearchListings = ({ route }) => {
  const { filteredLawyers } = route.params;

  const handleArrowClick = () => {
    // Handle arrow icon click here
  };
  const handleButtonPress = () => {
    // Handle button press here
    console.log("Button pressed");
    // You can add your custom logic here
  };
  const [isHeartPressed, setIsHeartPressed] = useState(false);
  const lawyersCollectionRef = collection(FIREBASE_DB, "lawyers");
  const [lawyers, setLawyers] = useState([]);
  const getLawyers = async () => {
    try {
      const result = await getDocs(lawyersCollectionRef);
      const lawyers = result.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setLawyers(lawyers);
      console.log("this is lawyers", lawyers);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    getLawyers();
  }, []);
  const renderItem = ({ item }) => (
    <View style={styles.lawyerView1}>
      <Image source={{ uri: item.imageUrl }} style={styles.lawyerImage} />
      <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
        <Text style={styles.buttonText}>{item.fullName}</Text>
      </TouchableOpacity>
      <Text style={styles.additionalText}>{item.category}</Text>
      <View style={styles.starIcon}>
        <Icon name="star" size={18} color="#D5B278" />
        <Text style={styles.textt}>{4.5}</Text>
      </View>
      <View style={styles.locationIcon}>
        <Icon name="map-marker" size={20} color="blue" />
        <Text style={styles.textt}>1.5km</Text>
      </View>
      <View style={styles.priceIcon}>
        <Icon name="dollar" size={18} color="green" />
        <Text style={styles.textt}>{item.Price}</Text>
      </View>
      <TouchableOpacity
        onPress={() => setIsHeartPressed(!isHeartPressed)}
        style={styles.heartIcon}>
        {isHeartPressed ? (
          <Icon name="heart" size={20} color="red" />
        ) : (
          <Icon name="heart-o" size={20} color="red" />
        )}
      </TouchableOpacity>
    </View>
  );
  return (
    <View>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleArrowClick} style={styles.arrowIcon}>
          <Icon name="arrow-left" size={20} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Search Listings</Text>
      </View>

      {/* Body View */}
      <ScrollView contentContainerStyle={styles.body1}>
        <FlatList
          data={filteredLawyers ? filteredLawyers : lawyers}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.body1}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "black",
    height: 150,
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 10,
  },
  arrowIcon: {
    alignSelf: "flex-start",
    transform: [{ rotate: "360deg" }],
  },
  headerText: {
    color: "white",
    fontSize: 20,
  },
  body1: {
    // flexGrow: 1,
    height: 1800,
  },
  lawyerView1: {
    backgroundColor: "white",
    height: 150,
    padding: 10,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  lawyerImage: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 20,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
    marginBottom: 60,
    marginLeft: 0,
  },
  buttonText: {
    color: "#D5B278",
    textAlign: "center",
    fontSize: 20,
  },
  additionalText: {
    position: "absolute",
    color: "grey",
    fontSize: 16,
    marginBottom: 1,
    right: 200,
  },
  starIcon: {
    position: "absolute",
    top: 85,
    right: 275,
  },
  locationIcon: {
    position: "absolute",
    top: 85,
    right: 205,
  },
  priceIcon: {
    position: "absolute",
    top: 86,
    right: 160,
  },
  heartIcon: {
    position: "absolute",
    top: 30, // Adjust the top position as needed
    right: 20, // Adjust the right position as needed
  },
  textt: {
    // position: "absolute",
    top: -15, // Adjust the top position as needed
    right: -20, // Adjust the right position as needed
  },
});

export default SearchListings;
