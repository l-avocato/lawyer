import React, { useEffect, useState, useRef } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  StyleSheet,
} from "react-native";
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  Polyline,
  Circle,
} from "react-native-maps";
import * as Location from "expo-location";
import { MaterialIcons } from "@expo/vector-icons";
import {FIREBASE_DB } from '../firebaseConfig'
import { collection, doc, getDocs, deleteDoc ,query, where } from "firebase/firestore";

const GoogleMapView = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showRoute, setShowRoute] = useState(false);
  const [lawyers,setLawyers] = useState([]) 
  const mapRef = useRef(null);


  useEffect(() => {
    const fetchLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        let location = await Location.getCurrentPositionAsync({});
        setUserLocation(location.coords);
      } else {
      }
    };

    fetchLocation();
    getLawyers()
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
  const lawyersCollectionRef = collection(FIREBASE_DB, "lawyers");
  const getLawyers = async () => {
    try {
      const result = await getDocs(lawyersCollectionRef);
      const lawyers = result.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        
      })
      );
      setLawyers(lawyers);
      console.log("this is law" ,lawyers);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
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
    top: 30,
    left: 10,
    right: 10,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    elevation: 5,
    zIndex: 1,
  },
  searchInput: {
    Bottom: 30,
    fontSize: 16,
  },
});

export default GoogleMapView;
