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
import { color } from "react-native-elements/dist/helpers";

import LinearGradient from "react-native-linear-gradient";


const { primary, tertinary } = Colors;

const ProfilDetails = ({ navigation , route}) => {
const {item} = route.params;
const {lawyer} = route.params
console.log("this is item ",item);

const law = item?item:lawyer
  const galleryImages = [
    require("../Photos/lawyer-or-judge-in-simple-flat-personal-profile-icon-or-symbol-people-concept-illustration-vector.jpg"),
    require("../Photos/lawyer-or-judge-in-simple-flat-personal-profile-icon-or-symbol-people-concept-illustration-vector.jpg"),
    require("../Photos/lawyer-or-judge-in-simple-flat-personal-profile-icon-or-symbol-people-concept-illustration-vector.jpg"),
    require("../Photos/lawyer-or-judge-in-simple-flat-personal-profile-icon-or-symbol-people-concept-illustration-vector.jpg"),
  ];
console.log("this item",lawyer);
  return (
    <View style={styles.body}>
      <View style={styles.block2}>
        <View style={styles.photoLowyer}>
          <View style={styles.blockPhoto}>
            <Image
              source={{uri: item.ImageUrl}}
              // source={{uri: law.imageUrl}}
              style={styles.photoo}
            />
            <View style={{ position: "relative", top: 110 }}>
              <Text style={styles.nameText}>{item.fullName}</Text>
              <Text style={styles.specialtyText}>{item.field}</Text>
              <Text style={styles.nameText}>{law.fullName}</Text>
              <Text style={styles.specialtyText}>{law.category} Law</Text>
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
{/* <<<<<<< HEAD
                <Text style={styles.infoText}>${law.Price}/H</Text>
======= */}
                <Text style={styles.infoText}>{item.price}/H</Text>
{/* >>>>>>> 3e3aa7e74b98fb159a6a5156acf1d95fccc1edbb */}
              </View>
            </View>
            <TouchableOpacity style={{ display: "flex", flexDirection: "row" }} onPress={()=>{
              navigation.navigate("Chat", {item})
            }}>
              <FontAwesome name="comment" style={{fontSize: 20, marginRight: 30,color: "black",marginLeft: 10}} />
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
            <FontAwesome name="briefcase" style={{  fontSize: 20,marginRight: 10,color: "black",marginLeft: 10}} />
            <Text style={{fontSize: 16,fontFamily: "normal" ,marginLeft:20}}>Number of Cases: 100</Text>
          </View>
          <View style={styles.infoBlock}>
            <FontAwesome name="check-circle" style={{  fontSize: 20,marginRight: 40,color: "black",marginLeft: 10}} />
            <Text style={{   fontSize: 16,fontFamily: "normal" ,marginRight:20}}>Success Rate: 85%</Text>
          </View>
        </View>

        {/* <Text style={styles.infoText}>
          Additional information about the lawyer goes here...
        </Text> */}
      </View>

      <View style={{ padding: 10 }}>
        <Text style={styles.galleryTitle}>Lawyer's Photo Gallery</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {galleryImages.map((image, index) => (
            <Image key={index} source={image} style={styles.galleryImage} />
          ))}
        </ScrollView>
      </View>
      <TouchableOpacity 
  style={styles.bookButton}
  onPress={() => navigation.navigate("Appintment", {law})}
>
  <Text style={styles.bookButtonText}>Book Appointment</Text>
</TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  body : {
  backgroundColor : "#E5E4E2",
  height : 800
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
    backgroundColor: '#292929',
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
  photoo: {
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
    marginLeft: 20
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
    color: "#cca01d",
    fontFamily: "Roboto",
    fontWeight: "700",
    marginLeft: 20
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
});

export default ProfilDetails;