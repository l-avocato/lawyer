import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
} from "react-native";
import Completed from "./Completed";
import Canceled from "./Canceled";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import axios from "axios";
import config from "./ipv";
import { FIREBASE_AUTH, FIREBASE_DB } from "../firebaseConfig";

const LawyerProfile = ({ navigation }) => {
  const [profiles, setProfiles] = useState([]);
  const [appointments, setAppointments] = useState({
    completed: [],
    upcoming: [],
  });
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "first", title: "Upcoming" },
    { key: "second", title: "Completed" },
    // { key: "third", title: "Canceled" },
  ]);
  const [user, setUser] = useState({});

  const loggedInUser = FIREBASE_AUTH.currentUser.email;

  const getUser = () => {
    axios
      .get(`http://${config}:1128/api/user/getUserByEmail/${loggedInUser}`)
      .then((res) => {
        console.log("this is user", res.data);
        setUser(res.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(
        `http://${config}:1128/api/appointment/appointment/user/${user.id}`
      );
      const completed = response.data.filter(
        (appointment) => new Date(appointment.date) < new Date()
      );
      const upcoming = response.data.filter(
        (appointment) => new Date(appointment.date) >= new Date()
      );
      setAppointments({ completed, upcoming });
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const fetchProfiles = async () => {
    try {
      const response = await axios.get(
        `http://${config}:1128/api/lawyer/allLawyers`
      );
      console.log("thisis data", response.data);
      setProfiles(response.data);
    } catch (error) {
      console.error("Error fetching profiles:", error);
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  useEffect(() => {
    fetchAppointments();
  }, [user]);

  const renderTabBar = (props) => (
    <TabBar
      style={{ backgroundColor: "black" }}
      {...props}
      indicatorStyle={{ backgroundColor: "gold" }}
      labelStyle={{ color: "white" }}
    />
  );

  const handleProfilePress = (item) => {
    navigation.navigate("ProfilDetails", { item: item.lawyer });
  };

  const renderScene = SceneMap({
    first: () => (
      <ScrollView>
        {appointments.upcoming.map((appointment, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleProfilePress(appointment)}
          >
            <View
              style={{
                margin: 10,
                padding: 15,
                borderRadius: 15,
                backgroundColor: "#ffffff",
                elevation: 3, // Add elevation for a shadow effect
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  source={{ uri: appointment.lawyer.ImageUrl }}
                  style={{
                    width: 70,
                    height: 70,
                    borderRadius: 35,
                    marginRight: 15,
                  }}
                />
                <View>
                  <Text
                    style={{ fontSize: 18, fontWeight: "600", color: "#333" }}
                  >
                    {appointment.lawyer.fullName}
                  </Text>
                  <Text style={{ fontSize: 16, color: "#555" }}>
                    Date: {appointment.date.slice(0, 10)}
                  </Text>
                  <Text style={{ fontSize: 16, color: "#555" }}>
                    Time: {appointment.time.slice(0, 5)}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: "#ddd",
                  marginVertical: 15,
                }}
              />
              <TouchableOpacity
                style={{
                  backgroundColor: "gray",
                  borderRadius: 8,
                  padding: 12,
                  alignItems: "center",
                }}
                onPress={() => handleProfilePress(appointment)}
              >
                <Text style={{ color: "#fff", fontSize: 16 }}>
                  See Lawyer Details
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    ),
    second: () => (
      <ScrollView>
        {appointments.completed.map((appointment, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleProfilePress(appointment)}
          >
            <View
              style={{
                margin: 10,
                padding: 15,
                borderRadius: 15,
                backgroundColor: "#ffffff",
                elevation: 3, // Add elevation for a shadow effect
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  source={{ uri: appointment.lawyer.ImageUrl }}
                  style={{
                    width: 70,
                    height: 70,
                    borderRadius: 35,
                    marginRight: 15,
                  }}
                />
                <View>
                  <Text
                    style={{ fontSize: 18, fontWeight: "600", color: "#333" }}
                  >
                    {appointment.lawyer.fullName}
                  </Text>
                  <Text style={{ fontSize: 16, color: "#555" }}>
                    Date: {appointment.date.slice(0, 10)}
                  </Text>
                  <Text style={{ fontSize: 16, color: "#555" }}>
                    Time: {appointment.time.slice(0, 5)}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: "#ddd",
                  marginVertical: 15,
                }}
              />
              <TouchableOpacity
                style={{
                  backgroundColor: "gray",
                  borderRadius: 8,
                  padding: 12,
                  alignItems: "center",
                }}
                onPress={() => handleProfilePress(appointment)}
              >
                <Text style={{ color: "#fff", fontSize: 16 }}>
                  See Lawyer Details
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    ),
  });

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      renderTabBar={renderTabBar}
    />
  );
};

const styles = StyleSheet.create({
  icon: {
    alignSelf: "center",
    // marginTop: 20,
    left: 0.5,
    top: 6,
  },
});

export default LawyerProfile;
