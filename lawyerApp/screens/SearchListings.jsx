import React from "react";
import { View, Text, StyleSheet, TouchableOpacity ,ScrollView} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const SearchListings = () => {
  const handleArrowClick = () => {
    // Handle arrow icon click here
  };

  return (
    <View>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleArrowClick} style={styles.arrowIcon}>
          <Icon name="arrow-left" size={20} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Search Listings</Text>
      </View>

      {/* Body View */}
      <ScrollView contentContainerStyle={styles.body1}>
      <View style={styles.greyView}>
        {/* View with grey background and 200 height */}
      </View>
    </ScrollView>
    </View>
  );
};

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
    flexGrow: 1,
  },
  greyView: {
    backgroundColor: 'grey',
    height: 200,
  },

});

export default SearchListings;
