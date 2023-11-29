import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { FIREBASE_AUTH, FIREBASE_DB } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import axios from "axios";
import config from "./ipv";

const OneItem = ({ item, distance, rating, canClikLike }) => {
  const [isHeartPressed, setIsHeartPressed] = useState(false);
  console.log("this item", config);

  useEffect(() => {
    const checkHeart = async () => {
      try {
        const res = await axios.get(
          `http://${config}:1128/api/fave/checkHeart/${FIREBASE_AUTH.currentUser.email}/${item.id}`,
        );
        console.log(res.data);
        setIsHeartPressed(res.data);
      } catch (error) {
        console.log("error", error);
      }
    };
    checkHeart();
  }, []);
  const handleLikeClick = async () => {
    try {
      const email = FIREBASE_AUTH.currentUser.email;
      if (!isHeartPressed) {
        const res = await axios.post(
          `http://${config}:1128/api/fave/add/${email}`,
          {
            lawyerId: item?.id,
          },
        );
      } else {
        console.log("i m here ");
        const res = await axios.delete(
          `http://${config}:1128/api/fave/remove/${email}/${item?.id}`,
        );
      }
      //   console.log("this he result ", res);
      setIsHeartPressed(!isHeartPressed);
    } catch (error) {
      console.log("form like errr");
      console.log(error);
    }
  };

  return (
    <View style={styles.lawyerView1}>
      <TouchableOpacity
      // onPress={navigation.navigate("ProfilDetails", { item })}

      // onPress={navigation.navigate("ProfilDetails", { item })}
      >
        <Image source={{ uri: item.ImageUrl }} style={styles.lawyerImage} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>{item?.fullName}</Text>
      </TouchableOpacity>
      <Text style={styles.additionalText}>{item.category?.name}</Text>
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
        <Text style={styles.textt}>{item?.Price}</Text>
      </View>
      {canClikLike && (
        <TouchableOpacity
          onPress={() => handleLikeClick()}
          style={styles.heartIcon}>
          {isHeartPressed ? (
            <Icon name="heart" size={30} color="red" />
          ) : (
            <Icon name="heart-o" size={30} color="red" />
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default OneItem;

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
