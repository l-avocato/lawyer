import React from "react";
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
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.pageText}>Hi, User</Text>
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
    height: 250,
    backgroundColor: "black",
    padding: 20,
    top: 5,
  },
  pageText: {
    fontSize: 0.03 * height,
    color: "gold",
  },
  notificationContainer: {
    position: "absolute",
    top: 0.02 * height,
    right: 0.02 * width,
    flexDirection: "row", // Added to align the icons horizontally
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
    bottom: 0.02 * height,
    left: 0,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 0.05 * width,
  },
  searchInput: {
    flex: 1,
    padding: 0.02 * width,
    borderWidth: 1,
    borderRadius: 0.04 * width,
    backgroundColor: "white",
    marginRight: 0.02 * width,
  },
});

export default HomePage;
