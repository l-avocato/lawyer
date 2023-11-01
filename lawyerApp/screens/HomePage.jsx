import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const HomePage = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState("Home");

  const renderTabContent = () => {
    if (selectedTab === "Home") {
      return (
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.pageText}>
              Hi, User{"\n"}browse number of lawyers{"\n"}to get your issues
              resolved
            </Text>
            <View style={styles.notificationContainer}>
              <TouchableOpacity
                onPress={() => navigation.navigate("Notifications")}
                style={styles.notificationButton}>
                <MaterialIcons
                  name="notifications"
                  size={0.05 * width}
                  color="white"
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("Filter")}
                style={styles.filterButton}>
                <MaterialIcons
                  name="filter-list"
                  size={0.05 * width}
                  color="white"
                />
              </TouchableOpacity>
            </View>
            <View style={styles.searchContainer}>
              <TextInput
                placeholder="Search for lawyers"
                style={styles.searchInput}
              />
            </View>
          </View>
        </View>
      );
    } else if (selectedTab === "EmptyTab") {
      return (
        <View style={styles.emptyTabContainer}>
          <Text>Empty Tab Content</Text>
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      {renderTabContent()}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={
            selectedTab === "Home" ? styles.tabBarItemActive : styles.tabBarItem
          }
          onPress={() => setSelectedTab("Home")}>
          <Text style={styles.tabBarText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            selectedTab === "EmptyTab"
              ? styles.tabBarItemActive
              : styles.tabBarItem
          }
          onPress={() => setSelectedTab("EmptyTab")}>
          <Text style={styles.tabBarText}>profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            selectedTab === "EmptyTab"
              ? styles.tabBarItemActive
              : styles.tabBarItem
          }
          onPress={() => setSelectedTab("EmptyTab")}>
          <Text style={styles.tabBarText}>favorites</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            selectedTab === "EmptyTab"
              ? styles.tabBarItemActive
              : styles.tabBarItem
          }
          onPress={() => setSelectedTab("EmptyTab")}>
          <Text style={styles.tabBarText}>chat</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    height: 220,
    backgroundColor: "grey",
    padding: 20,
    top: 1,
  },
  pageText: {
    fontSize: 0.02 * height,
    color: "gold",
  },
  emptyTabContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  notificationContainer: {
    position: "absolute",
    top: 0.02 * height,
    right: 0.02 * width,
    flexDirection: "row",
  },
  notificationButton: {
    backgroundColor: "gold",
    borderRadius: 0.1 * width,
    padding: 0.03 * width,
    marginRight: 0.02 * width,
  },
  filterButton: {
    backgroundColor: "gold",
    borderRadius: 0.1 * width,
    padding: 0.03 * width,
  },
  searchContainer: {
    position: "absolute",
    bottom: 0.03 * height,
    left: 20,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 0.03 * width,
  },
  searchInput: {
    flex: 1,
    padding: 0.02 * width,
    borderWidth: 1,
    borderRadius: 0.04 * width,
    backgroundColor: "white",
    marginRight: 0.02 * width,
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "grey",
    paddingHorizontal: 20,
    // cd 
    height: "10%",
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
    backgroundColor: "grey",
  },
  tabBarText: {
    color: "gold",
  },
});

export default HomePage;
