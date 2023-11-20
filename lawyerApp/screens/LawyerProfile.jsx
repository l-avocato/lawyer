import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, StyleSheet } from 'react-native';
import Completed from './Completed';
import Canceled from './Canceled';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';

const LawyerProfile = ({ navigation }) => {
  const [profiles, setProfiles] = useState([]);
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: 'Upcoming' },
    { key: 'second', title: 'Completed' },
    { key: 'third', title: 'Canceled' },
  ]);


  const fetchProfiles = async () => {
    try {
      const response = await axios.get('http://192.168.103.27:1128/api/lawyer/allLawyers');
     console.log("thisis data",response.data);
      setProfiles(response.data);
    } catch (error) {
      console.error('Error fetching profiles:', error);
    }
  };
  useEffect(() => {
    

    fetchProfiles();
  }, []);

  const renderTabBar = (props) => (
    <TabBar style={{ backgroundColor: 'black' }} {...props} indicatorStyle={{ backgroundColor: 'gold' }} labelStyle={{ color: 'white' }} />
  );

  const handleProfilePress = (profile) => {
    navigation.navigate('ProfileDetails', { profile });
  };

  const renderScene = SceneMap({
    first: () => (
      <ScrollView>
        {profiles.map((e, index) => (
          <TouchableOpacity key={index} onPress={() => handleProfilePress(e)}>
            <View style={{ margin: 10, padding: 10, borderWidth: 1, marginTop: 10, borderRadius: 10 }}>
              <View>
                <Icon name="message" size={30} color="black" style={styles.icon} />
              </View>
              <View style={{ marginTop: -35 }}>
                <Text style={{ marginLeft: 110 }}>{e.fullName}</Text>
                {/* <Text style={{ marginLeft: 110 }}>{e.}</Text> */}
                <Image source={{ uri: e.imageUrl }} style={{ width: 100, height: 100, borderRadius: 17, marginTop: -60 }} />
              </View>
              <View style={{ borderBottomWidth: 1, borderBottomColor: 'black', marginVertical: 10 }} />
              <TouchableOpacity style={{ backgroundColor: 'black', borderRadius: 40, width: 120, marginLeft: 40, marginTop: -1, padding: 10 }}>
                <Text style={{ color: 'white', textAlign: 'center' }}>See Details</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ backgroundColor: 'black', borderRadius: 40, width: 120, marginLeft: 180, marginTop: -39.9, padding: 10 }}>
                <Text style={{ color: 'white', textAlign: 'center' }}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    ),
    second: Completed,
    third: Canceled,
  });

  return (
    <TabView navigationState={{ index, routes }} renderScene={renderScene} onIndexChange={setIndex} renderTabBar={renderTabBar} />
  );
};

const styles = StyleSheet.create({
  icon: {
    marginLeft: 310,
    marginTop: 20,
  },
});

export default LawyerProfile;
