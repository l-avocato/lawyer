import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { FontAwesome } from "react-native-vector-icons";
import Icon from "react-native-vector-icons/FontAwesome";
import Slider from "@react-native-community/slider";
import { FIREBASE_DB } from "../firebaseConfig";
import { MaterialIcons } from "@expo/vector-icons";
import { QuerySnapshot, collection, getDocs } from "firebase/firestore";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import config from "./ipv";

const ManageFilters = () => {
  const navigation = useNavigation();
  const [categories, setCategories] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [priceRange, setPriceRange] = useState(40);
  const [price, setPrice] = useState(0);
  const [starRating, setStarRating] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const ratings = [1, 2, 3, 4, 5];
  const [lawyers, setLawyers] = useState([]);
  console.log(price, "price");
  const handleArrowIconClick = () => {};
  const handleRefreshIconClick = () => {};
  const handleGetCategories = async () => {
    try {
      const response = await axios.get(
        `http://${config}:1128/api/category/allCategories`,
      );
      setCategories(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleGetCategories();
  }, []);
  const filtredLawyer = async () => {
    
    const response = await axios.get(
      
      `http://${config}:1128/api/lawyer/getByFilter/${selectedCategory}/${starRating}`,
      );
      try {
        // navigation.navigate("SearchListings", {
          // filteredLawyers: response.data,
          // });:
          console.log(response.data, "data");
          
          // return response.data;
        } catch (error) {
          throw error;
        }
      };
      const handleButtonPress = () => {
        console.log("Button pressed");
      };
      const handleInputChange = (text) => {
        setInputValue(text);
      };
      const handlePriceRangeChange = (value) => {
        setPrice(Math.floor(value));
      };
      const handleRatingButtonPress = (rating) => {
        setSelectedRating(rating);
        console.log(rating);
      };
      const handleCategoryPress = (category) => {
    
    setSelectedCategory(category);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerIcon}
          onPress={handleArrowIconClick}>
          <FontAwesome name="arrow-left" size={14} color="white" />
        </TouchableOpacity>
        <View style={styles.headerMiddle}>
          <Text style={styles.headerText}>Manage Filters</Text>
        </View>
        <TouchableOpacity
          style={styles.headerIcon}
          onPress={handleRefreshIconClick}>
          <FontAwesome name="refresh" size={14} color="white" />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.bodyMN}>
        <View style={[styles.bodyView1, { backgroundColor: "white" }]}>
          <TouchableOpacity style={styles.button1} onPress={handleButtonPress}>
            <Text style={styles.button1Text}>See All</Text>
          </TouchableOpacity>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.buttonContainer}>
            {categories.map((category, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.button,
                  selectedCategory === category.name && {
                    backgroundColor: "blue",
                  }, // Change the style based on selection
                ]}
                onPress={() => handleCategoryPress(category.name)}>
                <Text style={styles.buttonText}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <Text style={styles.bodyView1Text}>Select Categories</Text>
        </View>
        <View style={[styles.bodyView2, { backgroundColor: "white" }]}>
          <Text style={styles.bodyView2Text}>Choose Location</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Your Current Location"
              value={inputValue}
              onChangeText={handleInputChange}
            />
            <Icon
              name="map-marker"
              size={24}
              color="black"
              style={styles.icon}
            />
          </View>
        </View>
        <View style={[styles.bodyView3, { backgroundColor: "white" }]}>
          <Text style={styles.bodyView3Text}>Price Range</Text>
          <Slider
            style={styles.priceRangeSlider}
            value={price}
            minimumValue={40}
            maximumValue={200}
            onValueChange={handlePriceRangeChange}
          />
          <Text style={styles.priceRangeText}>
            $ {price.toFixed(0)}-200 / h
          </Text>
          <TouchableOpacity style={styles.buttonPR} onPress={handleButtonPress}>
            <Text style={styles.buttonPRText}>$ 40-200 / h</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.bodyView4, { backgroundColor: "white" }]}>
          <TouchableOpacity style={styles.button1} onPress={handleButtonPress}>
            <Text style={styles.button1Text}>See All</Text>
          </TouchableOpacity>
          <Text style={styles.bodyView4Text}>By User Rating</Text>
          <View style={styles.stars}>
            <TouchableOpacity onPress={() => setStarRating(1)}>
              <MaterialIcons
                name={starRating >= 1 ? "star" : "star-border"}
                size={40}
                style={
                  starRating >= 1 ? styles.starSelected : styles.starUnselected
                }
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setStarRating(2)}>
              <MaterialIcons
                name={starRating >= 2 ? "star" : "star-border"}
                size={40}
                style={
                  starRating >= 2 ? styles.starSelected : styles.starUnselected
                }
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setStarRating(3)}>
              <MaterialIcons
                name={starRating >= 3 ? "star" : "star-border"}
                size={40}
                style={
                  starRating >= 3 ? styles.starSelected : styles.starUnselected
                }
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setStarRating(4)}>
              <MaterialIcons
                name={starRating >= 4 ? "star" : "star-border"}
                size={40}
                style={
                  starRating >= 4 ? styles.starSelected : styles.starUnselected
                }
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setStarRating(5)}>
              <MaterialIcons
                name={starRating >= 5 ? "star" : "star-border"}
                size={40}
                style={
                  starRating >= 5 ? styles.starSelected : styles.starUnselected
                }
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.bodyView5, { backgroundColor: "white" }]}>
          <Text style={styles.bodyView5Text}>Customize with Details</Text>
          <View style={styles.inputContainer1}>
            <TextInput
              style={styles.input2}
              placeholder="Write your Message ..."
              value={inputValue}
              onChangeText={handleInputChange}
            />
            <TextInput
              style={styles.input3}
              placeholder="Upload Doc!"
              value={inputValue}
              onChangeText={handleInputChange}
            />
            <TouchableOpacity
              style={styles.button5}
              onPress={() => filtredLawyer()}>
              <Text style={styles.buttonText5}>Apply Filters!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: "black",
    height: 150,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 10,
  },
  headerIcon: {
    padding: 10,
  },
  headerMiddle: {
    flex: 1,
    alignItems: "center",
  },
  headerText: {
    color: "white",
    fontSize: 18,
  },
  bodyMN: {
    backgroundColor: "white",
    flex: 1,
    padding: 10,
  },
  bodyView1: {
    padding: 40,
    margin: 4,
    alignItems: "center",
    justifyContent: "center",
    height: 150,
    position: "relative",
  },
  bodyView2: {
    padding: 40,
    margin: 4,
    alignItems: "center",
    justifyContent: "center",
    height: 150,
    position: "relative",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 15,
    width: "100%",
  },
  inputContainer1: {
    alignItems: "center",
    width: "100%",
    marginTop: 10,
  },
  input2: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 15,
    width: "100%",
    marginBottom: 25,
  },
  input3: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 15,
    width: "100%",
  },
  icon: {
    marginLeft: -25,
  },
  bodyView3: {
    padding: 40,
    margin: 4,
    alignItems: "center",
    justifyContent: "center",
    height: 150,
    position: "relative",
  },
  priceRangeSlider: {
    width: "100%",
  },
  priceRangeText: {
    fontSize: 20,
    color: "black",
  },
  bodyView4: {
    padding: 40,
    margin: 4,
    alignItems: "center",
    justifyContent: "center",
    height: 150,
  },
  stars: {
    display: "flex",
    flexDirection: "row",
  },
  starUnselected: {
    color: "#aaa",
  },
  starSelected: {
    color: "#D5B278",
  },
  bodyView5: {
    padding: 40,
    margin: 4,
    alignItems: "center",
    justifyContent: "center",
    height: 350,
  },
  bodyView1Text: {
    color: "black",
    bottom: 80,
    right: 125,
    fontSize: 20,
  },
  bodyView2Text: {
    color: "black",
    bottom: 40,
    right: 125,
    fontSize: 21,
  },
  bodyView3Text: {
    color: "black",
    bottom: 25,
    right: 145,
    fontSize: 21,
  },
  bodyView4Text: {
    color: "black",
    bottom: 35,
    right: 130,
    fontSize: 21,
  },
  bodyView5Text: {
    color: "black",
    bottom: 55,
    right: 90,
    fontSize: 21,
  },
  button1: {
    position: "absolute",
    top: -5,
    right: 10,
    padding: 10,
  },
  button1Text: {
    color: "#D5B278",
    fontSize: 20,
  },
  buttonPR: {
    position: "absolute",
    top: 1,
    right: 8,
    padding: 10,
  },
  buttonPRText: {
    color: "#D5B278",
    fontSize: 18,
  },
  buttonContainer: {
    alignItems: "center",
  },
  button: {
    padding: 10,
    marginHorizontal: 10,
    backgroundColor: "grey",
    borderRadius: 10,
    width: 130,
  },
  buttonText: {
    color: "#D5B278",
  },
  button5: {
    backgroundColor: "grey",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    width: "100%",
    marginTop: 20,
  },

  buttonText5: {
    color: "#D5B278",
    fontSize: 16,
  },
});

export default ManageFilters;
