import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Text,
  TextInput,
  Modal,
} from "react-native";
import { FontAwesome } from "react-native-vector-icons";
import axios from "axios";

import checkImage from "../assets/check.png";

const ProfilDetails = ({ navigation, route }) => {
  const { item } = route.params;
  const { lawyer } = route.params;

  const law = item ? item : lawyer;

  const [stars, setStars] = useState(0);
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState([]);

  const [showReviewsModal, setShowReviewsModal] = useState(false);
  const [showOtherModal, setShowOtherModal] = useState(false);

  const addRating = async () => {
    try {
      const response = await axios.post(
        `http://${config}:1128/api/rating/addRating`,
        {
          lawyerId: law.id,
          stars,
          review,
        }
      );

      setReview("");
      setStars("");

      // Set the modal state to true after submitting the rating
      setShowReviewsModal(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleStarPress = (value) => {
    setStars(value);
  };

  const getLawyerRating = async () => {
    try {
      const response = await axios.get(
        `http://${config}:1128/api/rating/getRatingByLawyer/${law?.id}`
      );
      setReview(response.data);
      setRating(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLawyerRating();
  }, []);

  const toggleReviewsModal = () => {
    setShowReviewsModal(!showReviewsModal);
  };

  const toggleOtherModal = () => {
    setShowOtherModal(!showOtherModal);
  };

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
                        rating.reduce((acc, curr) => acc + curr.stars, 0) /
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

          <Modal
            animationType="slide"
            transparent={true}
            visible={showReviewsModal}
            onRequestClose={() => setShowReviewsModal(!showReviewsModal)}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Image
                  source={require("../../lawyerApp/assets/check.png")}
                  style={styles.modalImage}
                />
                <Text style={styles.modalTitle}>Successful!</Text>
                <Text style={styles.modalText}>
                  You have successfully added a review.
                </Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <FontAwesome name="comment-o" size={30} color="#fff" />
                  <Text style={{ color: "#fff", marginLeft: 10 }}>
                    Message Worker
                  </Text>
                </View>
              </View>
            </View>
          </Modal>
        </View>
        <TouchableOpacity
          style={styles.viewAllButton}
          onPress={toggleOtherModal} // Updated to trigger the second modal
        >
          <Text style={styles.viewAllButtonText}>View All Reviews</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.bookButton}
        onPress={() => navigation.navigate("Appintment", { lawyer: law, item })}
      >
        <Text style={styles.bookButtonText}>Book Appointment</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={showOtherModal}
        onRequestClose={() => setShowOtherModal(!showOtherModal)}
      >
        <ScrollView style={styles.scrollView}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              {/* Updated to include ScrollView */}
              <ScrollView
                contentContainerStyle={styles.scrollContent}
              ></ScrollView>
              {reviews.map((e, index) => (
                <Text key={index}>{e.review}nnnnn</Text>
              ))}
              {/* Add your scrollable content here */}
              {/* For example: */}
              {/* <Text>Scrollable content goes here...</Text> */}
              <TouchableOpacity
                style={styles.modalButton}
                onPress={toggleOtherModal}
              >
                <Text style={{ color: "#fff" }}>Close Second Modal</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: "#E5E4E2",
    height: 800,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
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
    justifyContent: "space-between",
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
  viewAllButton: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  viewAllButtonText: {
    color: "white",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0,
    position: "relative",
    top: -160,
  },
  modalView: {
    top: 170,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#C69D3F",
    marginBottom: 10,
    textAlign: "center",
  },
  modalText: {
    fontSize: 18,
    color: "black",
    marginBottom: 20,
    textAlign: "center",
  },
  modalButton: {
    paddingHorizontal: 100,
    paddingVertical: 11,
    alignItems: "center",
  },
});

export default ProfilDetails;
