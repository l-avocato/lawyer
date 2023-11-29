import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import NavTab from "./NavTab";
import axios from "axios";
import config from "./ipv";
import { FIREBASE_AUTH, FIREBASE_DB } from "../firebaseConfig";

const MyCases = ({ navigation }) => {
  const [cases, serCases] = useState([]);
  const [user, setUser] = useState([]);

  const loggedInUser = FIREBASE_AUTH.currentUser.email;

  const getUser = () => {
    axios
      .get(`http://${config}:1128/api/user/getUserByEmail/${loggedInUser}`)
      .then((res) => {
        console.log("this is user", res.data[0]);
        setUser(res.data[0]);
        getCases(res.data[0].id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getCases = async (userId) => {
    try {
      const response = await axios.get(
        `http://${config}:1128/api/case/case/user/${userId}`
      );
      console.log("this is response", response.data);
      serCases(response.data);
    } catch (error) {
      console.log("error fetching cases", error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container}>
        <View>
          <Image
            source={require("../assets/logo.png")}
            style={{ width: 70, height: 40, top: 62, left: -20 }}
          />
          <Text style={styles.title}>My Cases</Text>

          {cases.map((caseItem) => (
            <TouchableOpacity
              key={caseItem.id}
              style={styles.card}
              onPress={() =>
                navigation.navigate("caseDetails", { case: caseItem })
              }
            >
              <View style={styles.cardHeader}>
                <Ionicons
                  name="briefcase"
                  size={24}
                  color="black"
                  style={{ right: 120, top: 15 }}
                />
                <Text style={styles.caseName}>{caseItem.title}</Text>
                <View style={styles.caseNumberContainer}>
                  {/* <MaterialIcons name="confirmation-number" style={{left:-10}} size={18} color="black" /> */}
                  <Text style={styles.caseNumber}>{caseItem.number}</Text>
                </View>
              </View>
              <View style={styles.cardBody}>
                <Text style={styles.caseDetails}>{caseItem.details}</Text>
              </View>
            </TouchableOpacity>
          ))}

          {cases.length === 0 && (
            <Text style={styles.noCasesMessage}>No cases found.</Text>
          )}
        </View>
      </ScrollView>

      {/* <View style={styles.navTabContainer}><NavTab/></View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  navTabContainer: {
    flex: 1,
    top: 365,
    height: 0,
    width: 450,
    left: -25,
  },
  navTab: {
    position: "absolute",
    width: "100%",
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F0F0F0",
  },
  title: {
    fontSize: 27,
    color: "gray",
    fontWeight: "700",
    marginLeft: 50,
    marginTop: 20,
    marginBottom: 40,
  },
  card: {
    backgroundColor: "#292929",
    padding: 15,
    height: 330,
    marginBottom: 20,
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 5,
  },
  cardHeader: {
    backgroundColor: "#D5B278",
    borderBottomColor: "#555",
    borderBottomWidth: 1,
    paddingBottom: 10,
    marginBottom: 10,
    borderRadius: 15,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  cardBody: {
    backgroundColor: "white", 
    flex: 1,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  caseName: {
    fontSize: 24,
    bottom: 12,
    fontWeight: "600",
    color: "black", 
  },
  caseNumberContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  caseNumber: {
    fontSize: 18,
    marginLeft: -5,
    marginRight: 11,
    color: "black",
  },
  caseDetails: {
    fontSize: 18,
    color: "black", 
    textAlign: "center",
  },
  noCasesMessage: {
    fontSize: 18,
    color: "#888",
    textAlign: "center",
    marginTop: 20,
  },
});

export default MyCases;
