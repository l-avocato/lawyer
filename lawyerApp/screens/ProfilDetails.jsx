import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, ScrollView, Text } from 'react-native';
import { FontAwesome } from 'react-native-vector-icons';
import { Colors } from '../components/styles';
import LinearGradient from 'react-native-linear-gradient';

const { primary, tertinary } = Colors;

const ProfilDetails = ({ navigation }) => {
  const galleryImages = [
    require('../Photos/lawyer-or-judge-in-simple-flat-personal-profile-icon-or-symbol-people-concept-illustration-vector.jpg'),
    require('../Photos/lawyer-or-judge-in-simple-flat-personal-profile-icon-or-symbol-people-concept-illustration-vector.jpg'),
    require('../Photos/lawyer-or-judge-in-simple-flat-personal-profile-icon-or-symbol-people-concept-illustration-vector.jpg'),
    require('../Photos/lawyer-or-judge-in-simple-flat-personal-profile-icon-or-symbol-people-concept-illustration-vector.jpg')


  ];

  return (
    <View>
      <View style={styles.block1}>
        <Text style={styles.lawyersDetails}> Lawyer's Details</Text>
      </View>
      <View style={styles.block2}>
        <View style={styles.photoLowyer}>
          <View style={styles.blockPhoto}>
            <Image source={require('../Photos/lawyer-or-judge-in-simple-flat-personal-profile-icon-or-symbol-people-concept-illustration-vector.jpg')} style={styles.photoo} />
            <Text style={styles.nameText}>Lawyer's Name</Text>
            <Text style={styles.specialtyText}>Specialty: Immigration Law</Text>
          </View>
        </View>
        <View style={styles.blockBlueGhamak}>
          <View style={styles.icons}>
            <FontAwesome name="star" style={styles.icon} />
            <Text style={styles.infoText}> 4.5</Text>
            <FontAwesome name="dollar" style={styles.icon} />
            <Text style={styles.infoText}>Price/H: $100</Text>
            <FontAwesome name="envelope" style={styles.icon} />
            <Text style={styles.infoText}></Text>
          </View>
        </View>
      </View>
      <View>
        <Text style={styles.infoTitle}>Lawyer Information</Text>
        <View style={styles.infoContainer}>
          <View style={styles.infoBlock}>
            <FontAwesome name="briefcase" style={styles.icon} />
            <Text style={styles.infoText}>Number of Cases: 100</Text>
          </View>
          <View style={styles.infoBlock}>
            <FontAwesome name="check-circle" style={styles.icon} />
            <Text style={styles.infoText}>Success Rate: 85%</Text>
          </View>
        </View>
        <Text style={styles.infoText}>Additional information about the lawyer goes here...</Text>
      </View>
      <View>
        <Text style={styles.galleryTitle}>Lawyer's Photo Gallery</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {galleryImages.map((image, index) => (
            <Image key={index} source={image} style={styles.galleryImage} />
          ))}
        </ScrollView>
      </View>
      <TouchableOpacity style={styles.bookButton}>
        <Text style={styles.bookButtonText}>Book Appointment</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  nameLawyer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 20,
    marginRight: 10,
    color: 'black',
    marginLeft: 10,
  },
  
 
  icons: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: 'space-between',
    marginTop: 35,
  },
  block1: {
    backgroundColor: '#DAA520',
    height: 100,
    width: 500,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lawyersDetails: {
    fontSize: 25,
    marginTop: 40,
    marginRight: 80,
  },
  block2: {
    backgroundColor: 'grey',
    height: 250,
    width: 370,
    marginTop: 90,
    marginLeft: 20,
    borderRadius: 30,
  },
  blockBlueGhamak: {
    backgroundColor: '#DAA520',
    height: 90,
    width: 370,
    marginTop: 160,
    borderRadius: 20,
  },
  photoo: {
    width: 130,
    height: 130,
    borderRadius: 100,
  },
  blockPhoto: {
    borderRadius: 100,
    width: 130,
    height: 130,
    // backgroundColor: 'red',
    position: 'absolute',
    bottom: -65,
  },
  galleryTitle: {
    fontSize: 20,
    marginTop: 10,
    color: '#DAA520',
    fontFamily: 'serif'
  },
  galleryImage: {
    width: 120,
    height: 170,
    margin: 10,
  },
  photoLowyer: {
    alignItems: 'center',
    display: 'flex',
  },
  infoTitle: {
    fontSize: 20,
    marginTop: 20,
    color : '#DAA520',
    fontFamily: 'serif'
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  infoBlock: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    fontSize: 16,
  },
  nameText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  specialtyText: {
    fontSize: 16,
  },
  bookButton: {
    backgroundColor: '#DAA520', 
    width: 200,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 10,
    
  },
  bookButtonText: {
    fontSize: 20,
    color: 'black',
  },
});

export default ProfilDetails;