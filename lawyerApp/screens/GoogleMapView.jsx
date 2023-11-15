import React, { useEffect, useState, useRef } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  StyleSheet,
  Image,
  Modal,
} from "react-native";
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  Polyline,
  Circle,
} from "react-native-maps";
import * as Location from "expo-location";
import { MaterialIcons } from "@expo/vector-icons";
import { collection, getDocs } from "firebase/firestore";
import { FIREBASE_DB } from "../firebaseConfig";
import { Linking } from "react-native";
import ProfilDetails from "./ProfilDetails";
import { Portal, PaperProvider } from "react-native-paper";

const GoogleMapView = ({ navigation }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showRoute, setShowRoute] = useState(false);
  const [lawyers, setLawyers] = useState([]);
  const [selectedLawyer, setSelectedLawyer] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [visible, setVisible] = React.useState(false);

  const mapRef = useRef(null);


  useEffect(() => {
    const fetchLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        let location = await Location.getCurrentPositionAsync({});
        setUserLocation(location.coords);
      }
    };

    const lawyersCollectionRef = collection(FIREBASE_DB, "lawyers");

    const getLawyers = async () => {
      try {
        const result = await getDocs(lawyersCollectionRef);
        const lawyersData = result.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setLawyers(lawyersData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchLocation();
    getLawyers();
  }, []);

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
    if (lawyer && lawyer.imageUrl) {
      setSelectedLawyer({ ...lawyer });
      setModalVisible(true);
    } else {
      console.error("Invalid lawyer data");
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.searchBarContainer}>
        <TextInput placeholder="Search..." style={styles.searchInput} />
      </View>
      {userLocation && (
        <MapView
          style={{ flex: 1 }}
          provider={PROVIDER_GOOGLE}
          customMapStyle={[
            {
              elementType: "geometry",
              stylers: [
                {
                  color: "#E7E4E0",
                },
              ],
            },
            {
              elementType: "labels.text.stroke",
              stylers: [
                {
                  color: "#E7E4E0",
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
                  color: "#007AFF",
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
                latitude: lawyer.localisation.latitude,
                longitude: lawyer.localisation.longitude,
              }}
              title={lawyer.fullName}
              description={lawyer.address}
              onPress={() => openLawyerProfile(lawyer)}
            >
              {lawyer.imageUrl && (
                <Image
                  source={{ uri: lawyer.imageUrl }}
                  
                  style={{ width: 40, height: 40, borderRadius: 20 }}
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

      {selectedLawyer && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          <View style={styles.popupContainer}>
            <View style={styles.popupContent}>
              {selectedLawyer.imageUrl && (
                <Image
                  source={{ uri: selectedLawyer.imageUrl }}
                  style={styles.image}
                />
              )}
              <Text style={styles.name}>{selectedLawyer.fullName}</Text>
              <Text style={styles.phoneNumber}>
               {selectedLawyer.category}
              </Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  navigation.navigate("ProfilDetails", {
                    lawyer: selectedLawyer,
                  
                  });
                }}
              >
                <Text style={styles.buttonText}>Go to Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={handleCall}
              >
                <Text style={styles.buttonText}>Call</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                <Text style={styles.closeButtonText}>X</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}

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
            <Text style={{ color: "black", textAlign: "center", fontSize: 16 }}>
              Start Navigation
            </Text>
          </TouchableOpacity>
        </View>
      )}
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
          <MaterialIcons name="my-location" size={36} color="#007AFF" />
        </TouchableOpacity>
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
  popupContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  popupContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
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
});

export default GoogleMapView;
