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
import { useRoute } from "@react-navigation/native";
import haversine from "haversine";
const SearchListings = ({ navigation }) => {
  const route = useRoute();

  const filteredLawyers = route.params.filteredLawyers || [];

  const [isHeartPressed, setIsHeartPressed] = useState(false);
  const lawyersCollectionRef = collection(FIREBASE_DB, "lawyers");
  const [lawyers, setLawyers] = useState([]);

  const renderItem = () => {
    // filteredLawyers.map((item) => console.log("itemmmmmmmmmmmmmmmm", item));

    return filteredLawyers.map((item) => {
      let distance = 0;
      const lengthRating = item.ratings.length || 1;
      let rating = item.ratings.reduce((acc, rat) => {
        return acc + rat.stars;
      }, 0);
      rating = (rating / lengthRating).toFixed(1);
      distance = haversine(
        {
          latitude: item.latitude,
          longitude: item.langitude,
        },
        {
          latitude: 36.87185,
          longitude: 10.133079,
        },
      ).toFixed(1);
      console.log("distance", distance);
      return (
        <View style={styles.lawyerView1}>
          <TouchableOpacity
            onPress={navigation.navigate("ProfilDetails", { item })}

            // onPress={navigation.navigate("ProfilDetails", { item })}
          >
            <Image source={{ uri: item.ImageUrl }} style={styles.lawyerImage} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>{item.fullName}</Text>
          </TouchableOpacity>
          <Text style={styles.additionalText}>{item.category.name}</Text>
          <View style={styles.starIcon}>
            <Icon name="star" size={18} color="#D5B278" />
            <Text style={styles.textt}>{rating}</Text>
          </View>
          <View style={styles.locationIcon}>
            <Icon name="map-marker" size={20} color="blue" />
            <Text style={styles.textt}>{distance} Km</Text>
          </View>
          <View style={styles.priceIcon}>
            <Icon name="dollar" size={18} color="green" />
            <Text style={styles.textt}>{item.Price}</Text>
          </View>
          {/* <TouchableOpacity
            onPress={() => setIsHeartPressed(!isHeartPressed)}
            style={styles.heartIcon}>
            {isHeartPressed ? (
              <Icon name="heart" size={20} color="red" />
            ) : (
              <Icon name="heart-o" size={20} color="red" />
            )}
          </TouchableOpacity> */}
        </View>
      );
    });
  };

  return (
    <View>
      <View style={styles.header}>
        <TouchableOpacity style={styles.arrowIcon}>
          <Icon name="arrow-left" size={20} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Search Listings</Text>
      </View>

      {renderItem()}
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
