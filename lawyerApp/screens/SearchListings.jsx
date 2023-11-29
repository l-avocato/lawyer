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
import OneItem from "./OneItem";
const SearchListings = ({ navigation }) => {
  const route = useRoute();

  const filteredLawyers = route.params.filteredLawyers || [];

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
        <OneItem
          item={item}
          distance={distance}
          rating={rating}
          canClikLike={true}
        />
      );
    });
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View>
        <View style={styles.header}>
          <TouchableOpacity style={styles.arrowIcon}>
            <Icon name="arrow-left" size={20} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Search Listings</Text>
        </View>

        {renderItem()}
      </View>
    </ScrollView>
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
    // height: 1800,
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
    display: "flex",
    flexDirection: "column",
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
    top: -15, // Adjust the top position as needed
    right: -20, // Adjust the right position as needed
  },
  scrollView: {
    flex: 1,
  },
});

export default SearchListings;
