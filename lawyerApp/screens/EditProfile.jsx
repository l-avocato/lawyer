import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity,
  StyleSheet, Pressable,Platform, Image
  } from 'react-native';
  import DateTimePicker from '@react-native-community/datetimepicker';
  import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
  import { useNavigation } from '@react-navigation/native';
const EditProfile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  

  const toggleDatePicker = () => {
    setShowPicker(!showPicker);
  };
  const onChange = ({ type }, selectedDate) => {
    let currentDate = date;
    if (type === 'set') {
      currentDate = selectedDate || date;
      setDate(currentDate);
    }
    if (Platform.OS === 'android') {
      toggleDatePicker();
      setDateOfBirth(selectedDate.toDateString());
    }
    if (Platform.OS === 'ios') {
      setDateOfBirth(selectedDate.toDateString());
    }
    console.log(dateOfBirth);
    console.log(date);
    console.log(selectedDate);
    console.log(currentDate);
    
  };

  return (
    <View style={styles.container}>
  {/* <Image source={require("../assets/logo.png")} style={{alignSelf:"center"}} /> */}
  {/* <FontAwesome5 name="pen-square" size={32} color="#C28C08" style={{top:70}} /> */}
  {/* <Image source={require("../assets/logo.png")} style={{}}/> */}
  <Image source={require("../assets/logo.png")} style={{ width: 70, height: 40 }} />


      <Text style={styles.title}>Edit Profile Screen</Text>
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter your name"
      />
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
      />
      <Text style={styles.label}>Phone Number</Text>
      <TextInput
        style={styles.input}
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        placeholder="Enter your phone number"
      />
      <Text style={styles.label}>Address</Text>
      <TextInput
        style={styles.input}
        value={address}
        onChangeText={setAddress}
        placeholder="Enter your address"
      />
      <Text style={styles.label}>Date Of Birth</Text>
      {showPicker && (
        <DateTimePicker
          mode='date'
          display='spinner'
          value={date}
          onChange={onChange}
          style={styles.datePicker}
        />
      )}
      {!showPicker && (
        <Pressable onPress={toggleDatePicker}>
          <TextInput
            style={styles.dateInput}
            placeholder='Sat, 20 Mar 1991'
            value={dateOfBirth}
            onChangeText={setDateOfBirth}
            placeholderTextColor='#11182744'
            editable={false}
            onPressIn={toggleDatePicker}
          />
        </Pressable>
      )}
      <TouchableOpacity style={styles.submitButton} >
  <Text style={styles.submitButtonText}>Submit</Text>
</TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: '#fff',
  
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 20,
    marginLeft: 40,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 4,
    height: 50,
    marginBottom: 15,
  },
  datePicker: {
    height: 150,
    marginBottom: 15,
  },
  dateInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 4,
    marginBottom: 15,
  },
  submitButton: {
    backgroundColor: '#000000',
    padding: 13,
    borderRadius: 4,
    alignItems: 'center',
    height: 50,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default EditProfile;