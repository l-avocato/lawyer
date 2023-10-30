import React from 'react'
import { View, Text, Button,StyleSheet, Image,ImageBackground } from 'react-native';



const ProfilDetails = ({navigation}) => {
  return (
    <View>
 <View style={styles.container}>
 <Image source={require('../Photos/lawyer-or-judge-in-simple-flat-personal-profile-icon-or-symbol-people-concept-illustration-vector.jpg')} style={styles.profileImage} />

      <Text style={styles.name}>the Name of the lawyer</Text>
      <Text style={styles.specialization}>Speciality of lawyer </Text>
      <Text style={styles.description}>Experienced attorney with a focus on criminal defense cases.</Text>
      {/* <Image source={require('../Photos/lawyer-or-judge-in-simple-flat-personal-profile-icon-or-symbol-people-concept-illustration-vector.jpg')}  style={styles.image  }/> */}
      <Text style={styles.name}>email</Text>
      <Text style={styles.name}>Adress</Text>
      <Text style={styles.name}>Phone Number</Text>






      {/* Add more profile details here */}
    </View>
     
  </View>

  
  )
}
const styles = StyleSheet.create({
  container: {
    marginTop: 90,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    // flex: 1,
    justifyContent: 'center',
    width:320,
    height:480,

  },
  profileImage: {
    
    width: 350,
    height: 350,
    borderRadius: 75,
    marginBottom: 10,
  },
  name: {
    
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  specialization: {
    fontSize: 18,
    color: 'gray',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});

export default ProfilDetails
