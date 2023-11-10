import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import GoogleMapView from "./GoogleMapView";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const NavTab = () => {
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState("Home");

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={
            selectedTab === "Home" ? styles.tabBarItemActive : styles.tabBarItem
          }
          onPress={() => navigation.navigate("Home")}
        >
          <Ionicons name="home" size={24} color="black" />
        </TouchableOpacity>

        <TouchableOpacity
          style={
            selectedTab === "Map" ? styles.tabBarItemActive : styles.tabBarItem
          }
          onPress={() => navigation.navigate("Map")}
        >
          <Ionicons name="map" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={
            selectedTab === "ChatRooms" ? styles.tabBarItemActive : styles.tabBarItem
          }
          onPress={() => navigation.navigate("ChatRooms")}
        >
          <Ionicons name="chatbubbles" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={
            selectedTab === "Profile"
              ? styles.tabBarItemActive
              : styles.tabBarItem
          }
          onPress={() => navigation.navigate("settings")}
        >
          <Ionicons name="person" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  //
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
    paddingHorizontal: 20,
    height: 80, // You can adjust the height as needed.
    borderTopWidth: 1,
    borderTopColor: "black",
  },
  tabBarItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  tabBarItemActive: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "white",
  },
});

export default NavTab;
