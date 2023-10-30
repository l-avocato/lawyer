import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { FontAwesome } from 'react-native-vector-icons';

const ProfilDetails = ({ navigation }) => {
  const handleBookAppointment = () => {
    // Add logic to navigate to the appointment booking screen
  };

  const handleContact = () => {
    // Add logic to initiate contact with the lawyer
  };

  return (
    <View style={styles.container}>
      {/* Back Arrow Icon */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <FontAwesome name="arrow-left" style={styles.backIcon} />
      </TouchableOpacity>

      <View style={styles.backgroundTop} />
      <View style={styles.backgroundBottom} />
      <View style={styles.content}>
        <Image
          source={require('../Photos/lawyer-or-judge-in-simple-flat-personal-profile-icon-or-symbol-people-concept-illustration-vector.jpg')}
          style={styles.lawyerPhoto}
        />
        <Text style={styles.lawyerName}>Lawyer's Name</Text>
        <Text style={styles.specialty}>Specialty: Family Law</Text>
        <View style={styles.infoRow}>
          <FontAwesome name="star" style={styles.icon} />
          <Text style={styles.infoText}>Average Rating: 4.5</Text>
        </View>
        <View style={styles.infoRow}>
          <FontAwesome name="dollar" style={styles.icon} />
          <Text style={styles.infoText}>Price per Hour: $100</Text>
        </View>
        <View style={styles.infoRow}>
          <FontAwesome name="map-marker" style={styles.icon} />
          <Text style={styles.infoText}>123 Main Street, City, Country</Text>
        </View>
        <View style={styles.infoRow}>
          <FontAwesome name="envelope" style={styles.icon} />
          <Text style={styles.infoText}>Email: lawyer@example.com</Text>
        </View>
        <Text style={styles.about}>About the Lawyer: Lorem ipsum dolor sit amet, consectetur adipiscing elit...</Text>
        
        <TouchableOpacity style={styles.button} onPress={handleBookAppointment}>
          <Text style={styles.buttonText}>Book Appointment</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button} onPress={handleContact}>
          <Text style={styles.buttonText}>Contact</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
  },
  backIcon: {
    fontSize: 24,
    color: 'white', 
  },
  backgroundTop: {
    flex: 1,
    backgroundColor: 'black',
  },
  backgroundBottom: {
    flex: 3,
    backgroundColor: '#ffcc00',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  lawyerPhoto: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
  },
  lawyerName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
  },
  specialty: {
    fontSize: 18,
    marginBottom: 10,
    color: 'white',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    fontSize: 20,
    marginRight: 10,
    color: 'blue',
  },
  infoText: {
    fontSize: 16,
  },
  about: {
    fontSize: 16,
    textAlign: 'center',
  },
  button: {
    backgroundColor: 'blue', 
    padding: 10,
    borderRadius: 5,
    margin: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default ProfilDetails;
