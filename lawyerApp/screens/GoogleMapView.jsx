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
import { FIREBASE_DB } from '../firebaseConfig';
import axios from "axios";

const GoogleMapView = ({ navigation }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showRoute, setShowRoute] = useState(false);
  const [lawyers, setLawyers] = useState([]);
  const [selectedLawyer, setSelectedLawyer] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const mapRef = useRef(null);


  const config = "172.20.10.3";




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

  const handleMapLongPress = (event) => {
    setShowRoute(false);
    setSelectedLocation(event.nativeEvent.coordinate);
  };

  const startRoute = () => {
    setShowRoute(true);
  };
  
  const openLawyerProfile = (lawyer) => {
    if (lawyer && lawyer.imageUrl) {
      setSelectedLawyer(lawyer);
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
          transparent={false}
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            {selectedLawyer.imageUrl && (
              <Image
                source={{ uri: selectedLawyer.imageUrl }}
                style={{ width: 200, height: 200, borderRadius: 100, marginBottom: 20 }}
              />
            )}
            <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10 }}>{selectedLawyer.fullName}</Text>
            <Text style={{ fontSize: 18, marginBottom: 10 }}>Number: {selectedLawyer.phoneNumber}</Text>
            <TouchableOpacity
              style={{
                backgroundColor: "gold",
                padding: 10,
                borderRadius: 5,
                marginBottom: 20,
              }}
              onPress={() => {
                navigation.navigate("Lawyer Details", { lawyer: selectedLawyer });
              }}
            >
              <Text style={{ color: "black", textAlign: "center", fontSize: 16 }}>Go to Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "gold",
                padding: 10,
                borderRadius: 5,
                marginBottom: 20,
              }}
              onPress={() => {
                navigation.navigate("Chat", { lawyer: selectedLawyer });
              }}
            >
              <Text style={{ color: "black", textAlign: "center", fontSize: 16 }}>Message</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                position: "absolute",
                top: 20,
                right: 20,
              }}
              onPress={closeModal}
            >
              <Text style={{ fontSize: 20, color: "red" }}>X</Text>
            </TouchableOpacity>
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
});

export default GoogleMapView;
