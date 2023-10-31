import React from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Text,
} from "react-native";
import { FontAwesome } from "react-native-vector-icons";
import { Colors } from "../components/styles";
import LinearGradient from "react-native-linear-gradient";

const { primary, tertinary } = Colors;

const ProfilDetails = ({ navigation }) => {
  const galleryImages = [
    require("../Photos/lawyer-or-judge-in-simple-flat-personal-profile-icon-or-symbol-people-concept-illustration-vector.jpg"),
    require("../Photos/lawyer-or-judge-in-simple-flat-personal-profile-icon-or-symbol-people-concept-illustration-vector.jpg"),
    require("../Photos/lawyer-or-judge-in-simple-flat-personal-profile-icon-or-symbol-people-concept-illustration-vector.jpg"),
    require("../Photos/lawyer-or-judge-in-simple-flat-personal-profile-icon-or-symbol-people-concept-illustration-vector.jpg"),
  ];

  return (
    <View>
      <View style={styles.block2}>
        <View style={styles.photoLowyer}>
          <View style={styles.blockPhoto}>
            <Image
              source={require("../Photos/lawyer-or-judge-in-simple-flat-personal-profile-icon-or-symbol-people-concept-illustration-vector.jpg")}
              style={styles.photoo}
            />
            <View style={{ position: "relative", top: 110 }}>
              <Text style={styles.nameText}>Lawyer's Name</Text>
              <Text style={styles.specialtyText}> Immigration Law</Text>
            </View>
          </View>
        </View>

        <View style={styles.blockBlueGhamak}>
          <View style={styles.icons}>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <View style={{ display: "flex", flexDirection: "row" }}>
                <FontAwesome name="star" style={styles.icon} />
                <Text style={styles.infoText}> 4.5</Text>
              </View>

              <View style={{ display: "flex", flexDirection: "row" }}>
                <FontAwesome name="dollar" style={styles.icon} />
                <Text style={styles.infoText}>$100/H</Text>
              </View>
            </View>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <FontAwesome name="comment" style={styles.icon} />
              <Text style={styles.infoText}></Text>
            </View>
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
            <FontAwesome name="briefcase" style={styles.icon} />
            <Text style={styles.infoText}>Number of Cases: 100</Text>
          </View>
          <View style={styles.infoBlock}>
            <FontAwesome name="check-circle" style={styles.icon} />
            <Text style={styles.infoText}>Success Rate: 85%</Text>
          </View>
        </View>

        <Text style={styles.infoText}>
          Additional information about the lawyer goes here...
        </Text>
      </View>

      <View style={{ padding: 10 }}>
        <Text style={styles.galleryTitle}>Lawyer's Photo Gallery</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {galleryImages.map((image, index) => (
            <Image key={index} source={image} style={styles.galleryImage} />
          ))}
        </ScrollView>
      </View>
      <TouchableOpacity style={styles.bookButton}>
        <Text style={styles.bookButtonText}>Book Appointment</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
    backgroundColor: "#DAA520",
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
    backgroundColor: "grey",
    height: 250,
    width: 370,
    marginTop: 90,
    marginLeft: 20,
    borderRadius: 30,
  },
  blockBlueGhamak: {
    backgroundColor: "#DAA520",
    height: 90,
    width: 370,
    marginTop: 160,
    borderRadius: 20,
  },
  photoo: {
    width: 150,
    height: 150,
    borderRadius: 100,
    position: "absolute",
    left: 20,
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
    color: "#DAA520",
    fontFamily: "Roboto",
  },
  galleryImage: {
    width: 130,
    height: 130,
    margin: 10,
    borderRadius: 30,
  },
  photoLowyer: {
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
  },
  infoTitle: {
    fontSize: 20,
    marginTop: 20,
    color: "#DAA520",
    fontFamily: "Roboto",
  },
  infoContainer: {
    display: "flex",
    flex3Direction: "row",
    gap: 5,

    marginTop: 10,
  },
  infoBlock: {
    // flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    fontFamily: "normal"

  },
  nameText: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
  },
  specialtyText: {
    fontSize: 15,
    fontWeight: "500",
    textAlign: "center",
  },
  bookButton: {
    backgroundColor: "#DAA520",
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
    color: "black",
  },
});

export default ProfilDetails;
