import React, { useEffect, useState, useRef } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  StyleSheet,
  Image,
  Modal,
  Linking,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  Polyline,
  Circle,
} from "react-native-maps";
import * as Location from "expo-location";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import ProfilDetails from "./ProfilDetails";

const GoogleMapView = ({ navigation }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showRoute, setShowRoute] = useState(false);
  const [lawyers, setLawyers] = useState([]);
  const [selectedLawyer, setSelectedLawyer] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const mapRef = useRef(null);

  useEffect(() => {
    const fetchLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        let location = await Location.getCurrentPositionAsync({});
        setUserLocation(location.coords);
      }
      getCategories();
    };

    const getCategories = async () => {
      try {
        const response = await axios.get(
          `http://${config}:1128/api/category/allCategories`
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const getLawyers = async () => {
      try {
        const response = await axios.get(
          `http://${config}:1128/api/lawyer/allLawyers`
        );
        const parsedLawyers = response.data.map((lawyer) => ({
          ...lawyer,
          latitude: lawyer.latitude || 0,
          longitude: lawyer.langitude || 0,
        }));

        setLawyers(parsedLawyers);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    setLoading(true);

    Promise.all([fetchLocation(), getLawyers()])
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      // Implement logic to filter lawyers based on the selected category
      const filteredLawyers = lawyers.filter(
        (lawyer) => lawyer.field === selectedCategory
      );
      setLawyers(filteredLawyers);
    }
  }, [selectedCategory]);

  const centerMapToUserLocation = () => {
    if (userLocation && mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  };

  const handleCall = () => {
    if (selectedLawyer.phoneNumber) {
      const phoneNumber = selectedLawyer.phoneNumber;
      Linking.openURL(`tel:${phoneNumber}`);
    }
  };

  const handleMapLongPress = (event) => {
    setShowRoute(false);
    setSelectedLocation(event.nativeEvent.coordinate);
  };

  const startRoute = () => {
    setShowRoute(true);
  };

  const openLawyerProfile = (lawyer) => {
    if (lawyer && lawyer.ImageUrl && lawyer.fullName && lawyer.field) {
      setSelectedLawyer({
        ImageUrl: lawyer.ImageUrl,
        fullName: lawyer.fullName,
        field: lawyer.field,
      });
      setModalVisible(true);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const toggleCategoryModal = () => {
    setCategoryModalVisible(!categoryModalVisible);
  };

  const handleCategoryPress = (categoryName) => {
    setSelectedCategory(categoryName);
    setCategoryModalVisible(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.searchBarContainer}>
        <TextInput placeholder="Search..." style={styles.searchInput} />
      </View>
      
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.categoryButtonsContainer}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryButton,
                selectedCategory === category.name && {
                  backgroundColor: "gray",
                },
              ]}
              onPress={() => handleCategoryPress(category.name)}
            >
              <Text style={styles.categoryButtonText}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {loading ? (
        <ActivityIndicator size="large" style={{ flex: 1 }} />
      ) : (
        <>
          {/* Map and other components */}
          {userLocation && (
            <MapView
              style={{ flex: 1 }}
              provider={PROVIDER_GOOGLE}
              customMapStyle={[
                {
                  elementType: "geometry",
                  stylers: [
                    {
                      color: "skyblue",
                    },
                  ],
                },
                {
                  elementType: "labels.text.stroke",
                  stylers: [
                    {
                      color: "skyblue",
                    },
                  ],
                },
                {
                  featureType: "road",
                  elementType: "geometry",
                  stylers: [
                    {
                      color: "#D4AA43",
                    },
                  ],
                },
                {
                  featureType: "water",
                  elementType: "geometry",
                  stylers: [
                    {
                      color: "skyblue",
                    },
                  ],
                },
              ]}
              initialRegion={{
                latitude: userLocation.latitude,
                longitude: userLocation.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              ref={mapRef}
              onLongPress={handleMapLongPress}
            >
              {userLocation && (
                <Circle
                  center={{
                    latitude: userLocation.latitude,
                    longitude: userLocation.longitude,
                  }}
                  radius={20}
                  fillColor="rgba(0, 122, 255, 0.3)"
                  strokeColor="rgba(0, 122, 255, 0.7)"
                />
              )}
              {lawyers.map((lawyer) => (
                <Marker
                  key={lawyer.id}
                  coordinate={{
                    latitude: parseFloat(lawyer.latitude) || 0,
                    longitude: parseFloat(lawyer.longitude) || 0,
                  }}
                  title={lawyer.fullName}
                  description={lawyer.adress}
                  onPress={() => openLawyerProfile(lawyer)}
                >
                  {lawyer.ImageUrl && (
                    <Image
                      source={{ uri: lawyer.ImageUrl }}
                      style={styles.markerImage}
                    />
                  )}
                </Marker>
              ))}
              {selectedLocation && (
                <Marker
                  coordinate={selectedLocation}
                  title="Selected Location"
                  description="This is the selected location"
                  pinColor="black"
                />
              )}
              {showRoute && userLocation && selectedLocation && (
                <Polyline
                  coordinates={[
                    {
                      latitude: userLocation.latitude,
                      longitude: userLocation.longitude,
                    },
                    selectedLocation,
                  ]}
                  strokeColor="#D4AA43"
                  strokeWidth={3}
                />
              )}
            </MapView>
          )}

          {/* Lawyer profile modal */}
          {selectedLawyer && (
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={closeModal}
            >
              <View style={styles.popupContainer}>
                <View style={styles.popupContent}>
                  {selectedLawyer.ImageUrl && (
                    <Image
                      source={{ uri: selectedLawyer.ImageUrl }}
                      style={styles.image}
                    />
                  )}
                  <Text style={styles.name}>{selectedLawyer.fullName}</Text>
                  <Text style={styles.phoneNumber}>{selectedLawyer.field}</Text>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                      navigation.navigate("ProfilDetails", {
                        item: selectedLawyer,
                      });
                    }}
                  >
                    <Text style={styles.buttonText}>Go to Profile</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button} onPress={handleCall}>
                    <Text style={styles.buttonText}>Call</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={closeModal}
                  >
                    <Text style={styles.closeButtonText}>X</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          )}

          {/* Selected location and route */}
          {selectedLocation && !showRoute && (
            <View
              style={{
                position: "absolute",
                bottom: 0,
                width: "100%",
                padding: 16,
                backgroundColor: "black",
              }}
            >
              <Text style={{ color: "gold", fontSize: 18 }}>Start</Text>
              <TouchableOpacity
                style={{
                  marginTop: 8,
                  backgroundColor: "gold",
                  padding: 10,
                  borderRadius: 5,
                }}
                onPress={startRoute}
              >
                <Text
                  style={{
                    color: "black",
                    textAlign: "center",
                    fontSize: 16,
                  }}
                >
                  Start Navigation
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Center map button */}
          {userLocation && (
            <TouchableOpacity
              style={{
                position: "absolute",
                bottom: 16,
                right: 16,
                backgroundColor: "black",
                borderRadius: 50,
                padding: 10,
              }}
              onPress={centerMapToUserLocation}
            >
              <Text>
                <MaterialIcons name="my-location" size={36} color="blue" />{" "}
              </Text>
            </TouchableOpacity>
          )}

          {/* Category modal */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={categoryModalVisible}
            onRequestClose={toggleCategoryModal}
          >
            <View style={styles.popupContainer}>
              <View style={styles.popupContent}>
                <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
                  All Categories
                </Text>
                {categories.map((category) => (
                  <TouchableOpacity
                    key={category.id}
                    style={{
                      backgroundColor: "lightgray",
                      padding: 10,
                      borderRadius: 5,
                      marginBottom: 10,
                      width: "80%",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    onPress={() => handleCategoryPress(category.name)}
                  >
                    <Text style={{ color: "black", fontSize: 14 }}>{category.name}</Text>
                  </TouchableOpacity>
                ))}
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={toggleCategoryModal}
                >
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  searchBarContainer: {
    position: "absolute",
    top: 70,
    left: 10,
    right: 10,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    elevation: 5,
    zIndex: 1,
  },
  searchInput: {
    fontSize: 16,
  },
  categoryButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  categoryButton: {
    backgroundColor: "lightgray",
    paddingVertical: 10, // Adjusted padding
    paddingHorizontal: 20,
    borderRadius: 5,
    marginRight: 10, // Added margin to separate buttons
    minHeight: -10, // Added minimum height
    justifyContent: "center",
    alignItems: "center",
  },
  categoryButtonText: {
    color: "black",
    fontSize: 14,
  },

  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  phoneNumber: {
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "gold",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: 150,
  },
  buttonText: {
    color: "black",
    textAlign: "center",
    fontSize: 14,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  closeButtonText: {
    fontSize: 18,
    color: "red",
  },
  markerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});

export default GoogleMapView;
