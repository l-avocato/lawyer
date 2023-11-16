import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Text,
  TextInput,
  Alert,
} from "react-native";
import { FontAwesome } from "react-native-vector-icons";
import { Colors } from "../components/styles";
import axios from "axios";

import checkImage from "../assets/check.png";


const { primary, tertiary } = Colors;

const ProfilDetails = ({ navigation, route }) => {
  const { item } = route.params;
  const { lawyer } = route.params;


  const law = item ? item : lawyer;

  const [stars, setStars] = useState(0);
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState([]  );

  // useEffect(() => {
  // }, []);

  const addRating = async () => {
    try {
      console.log("this is the body for the rating", {
        lawyerId: law.id,
        stars,
        review,
      });
      const response = await axios.post(
        `http://${config}:1128/api/rating/addRating`,
        {
          lawyerId: law.id,
          stars,
          review,
        }
      );
      console.log("this is the res of rating", response);

      Alert.alert(
        "Thank You!",
        "Your review has been submitted.",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { customImage: checkImage }
      );

      setReview("");
      setStars("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleStarPress = (value) => {
    setStars(value);
  };

  const getLawyerRating = async () => {
    console.log("this is the lawyer id ",law.id);
    try {
      const response = await axios.get(`http://${config}:1128/api/rating/getRatingByLawyer/${law?.id}`)
      console.log("this is the response of the rating",response.data)
      setRating(response.data)

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    getLawyerRating()
  },[])

  return (
    <View style={styles.body}>
      <View style={styles.block2}>
        <View style={styles.photoLawyer}>
          <View style={styles.blockPhoto}>
            <Image source={{ uri: item.ImageUrl }} style={styles.photo} />
            <View style={{ position: "relative", top: 110 }}>
              <Text style={styles.nameText}>{item.fullName}</Text>
              <Text style={styles.specialtyText}>{item.field}</Text>
            </View>
          </View>
        </View>

        <View style={styles.blockBlueGhamak}>
          <View style={styles.icons}>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <View style={{ display: "flex", flexDirection: "row" }}>
                <FontAwesome name="star" style={styles.icon} />
                <Text style={styles.infoText}>
                  {rating.length > 0
                    ? `Average Rating: ${(
                        rating.reduce((acc,curr) => acc + curr.stars, 0) /
                        rating.length
                      ).toFixed(1)}/5`
                    : "No Ratings Yet"}
                </Text>
              </View>

              <View style={{ display: "flex", flexDirection: "row" }}>
                <FontAwesome name="dollar" style={styles.icon} />

                <Text style={styles.infoText}>${law.Price}/H</Text>

                <Text style={styles.infoText}>{item.price}/H</Text>
              </View>
            </View>
            <TouchableOpacity
              style={{ display: "flex", flexDirection: "row" }}
              onPress={() => {
                navigation.navigate("Chat", { item });
              }}
            >
              <FontAwesome
                name="comment"
                style={{
                  fontSize: 20,
                  marginRight: 30,
                  color: "black",
                  marginLeft: 10,
                }}
              />
              <Text style={styles.infoText}></Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={{ padding: 10 }}>
        <Text style={styles.infoTitle}>Lawyer Information</Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            top: 5,
          }}
        >
          <View style={styles.infoBlock}>
            <FontAwesome
              name="briefcase"
              style={{
                fontSize: 20,
                marginRight: 10,
                color: "black",
                marginLeft: 10,
              }}
            />
            <Text
              style={{ fontSize: 16, fontFamily: "normal", marginLeft: 20 }}
            >
              Number of Cases: 100
            </Text>
          </View>
          <View style={styles.infoBlock}>
            <FontAwesome
              name="check-circle"
              style={{
                fontSize: 20,
                marginRight: 40,
                color: "black",
                marginLeft: 10,
              }}
            />
            <Text
              style={{ fontSize: 16, fontFamily: "normal", marginRight: 20 }}
            >
              Success Rate: 85%
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.reviewContainer}>
        <Text style={styles.reviewTitle}>Client Reviews</Text>

        {reviews.map((review, index) => (
          <View key={index} style={styles.singleReview}>
            {[1, 2, 3, 4, 5].map((star) => (
              <FontAwesome
                key={star}
                name={star <= review.stars ? "star" : "star-o"}
                style={styles.starIcon}
              />
            ))}
            <Text style={{ marginLeft: 10, fontSize: 16 }}>
              {review.review}
            </Text>
          </View>
        ))}

        <View style={styles.starsContainer}>
          {[1, 2, 3, 4, 5].map((index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleStarPress(index)}
            >
              <FontAwesome
                name={index <= stars ? "star" : "star-o"}
                style={styles.starIcon}
              />
            </TouchableOpacity>
          ))}
          <Text style={styles.starsText}>{stars}/5</Text>
        </View>

        <View style={styles.newReviewContainer}>
          <TextInput
            style={styles.commentInput}
            placeholder="Write your review here"
            value={review}
            onChangeText={(text) => setReview(text)}
          />
          <TouchableOpacity style={styles.submitButton} onPress={addRating}>
            <Text style={{ color: "white" }}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        style={styles.bookButton}
        onPress={() => navigation.navigate("Appintment", { lawyer: law, item })}
      >
        <Text style={styles.bookButtonText}>Book Appointment</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: "#E5E4E2",
    height: 800,
  },
  nameLawyer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    fontSize: 20,
    marginRight: 10,
    color: "black",
    marginLeft: 10,
  },

  icons: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    justifyContent: "space-between",
    marginTop: 35,
  },

  block1: {
    backgroundColor: "#D5B278",
    height: 100,
    width: 500,
    alignItems: "center",
    justifyContent: "center",
  },

  lawyersDetails: {
    fontSize: 25,
    marginTop: 40,
    marginRight: 80,
  },

  block2: {
    backgroundColor: "#292929",
    height: 250,
    width: 370,
    marginTop: 90,
    marginLeft: 30,
    borderRadius: 20,
  },

  blockBlueGhamak: {
    backgroundColor: "#D5B278",
    height: 80,
    width: 370,
    marginTop: 170,
    borderRadius: 10,
  },

  photo: {
    width: 150,
    height: 150,
    borderRadius: 100,
    position: "absolute",
    alignSelf: "center",
  },
  blockPhoto: {
    borderRadius: 100,
    height: 130,
    position: "absolute",
    bottom: -65,
    display: "flex",
    justifyContent: "center",
  },
  galleryTitle: {
    fontSize: 20,
    marginTop: -15,
    color: "#cca01d",
    fontFamily: "Roboto",
    fontWeight: "700",
    marginLeft: 20,
  },
  galleryImage: {
    width: 130,
    height: 130,
    margin: 10,
    borderRadius: 30,
  },
  photoLawyer: {
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
  },
  infoTitle: {
    fontSize: 20,
    marginTop: 20,
    color: "#cca01d",
    fontFamily: "Roboto",
    fontWeight: "700",
    marginLeft: 20,
  },
  infoContainer: {
    display: "flex",
    flex3Direction: "row",
    gap: 5,

    marginTop: 10,
  },
  infoBlock: {
    alignItems: "center",
    marginBottom: 10,
  },
  infoText: {
    fontSize: 17,
    color: "black",
    fontFamily: "normal",
    fontWeight: "500",
  },

  nameText: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
  },
  specialtyText: {
    color: "white",
    fontSize: 15,
    fontWeight: "500",
    textAlign: "center",
  },
  bookButton: {
    backgroundColor: "black",
    width: 390,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 10,
    borderRadius: 10,
  },
  bookButtonText: {
    fontSize: 20,
    color: "white",
  },
  reviewContainer: {
    backgroundColor: "white",
    padding: 20,
    marginVertical: 25,
    marginHorizontal: 20.032,
    borderRadius: 10,
  },
  reviewTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  starsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  starIcon: {
    fontSize: 24,
    color: "#FFD700",
    marginRight: 5,
  },
  ratingText: {
    fontSize: 18,
    marginLeft: 5,
  },
  singleReview: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  newReviewContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  commentInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
  },
  submitButton: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ProfilDetails;
