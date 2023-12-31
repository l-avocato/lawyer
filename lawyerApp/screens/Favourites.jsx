import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import config from "./ipv";
import { FIREBASE_AUTH } from "../firebaseConfig";
import OneItem from "./OneItem";
import haversine from "haversine";

const Favourites = () => {
  const [userFavourites, setUserFavourites] = useState([]);
  useFocusEffect(
    useCallback(() => {
      const fetchAllFavourites = async () => {
        try {
          const res = await axios.get(
            `http://${config}:1128/api/fave/getFave/${FIREBASE_AUTH.currentUser?.email}`,
          );
          console.log(res.data);
          setUserFavourites(res.data);
        } catch (error) {
          console.log("Failed to get", error);
        }
      };
      fetchAllFavourites();
    }, []),
  );

  return (
    <SafeAreaView>
      <ScrollView>
        {userFavourites.map((item, index) => {
          let distance = 0;
          const lengthRating = item.ratings?.length || 1;
          let rating = item.ratings?.reduce((acc, rat) => {
            return acc + rat.stars;
          }, 0);
          rating = (rating / lengthRating).toFixed(1);
          distance = haversine(
            {
              latitude: item.latitude,
              longitude: item.langitude,
            },
            {
              latitude: 36.87185,
              longitude: 10.133079,
            },
          ).toFixed(1);

          return (
            <OneItem
              key={index}
              item={item}
              distance={distance}
              rating={(Math.random() * 4 + 1).toFixed(1)}
              canClikLike={false}
            />
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Favourites;

const styles = StyleSheet.create({});
