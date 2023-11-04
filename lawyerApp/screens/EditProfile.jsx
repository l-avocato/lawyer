import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity,
  StyleSheet, Pressable,Platform
  } from 'react-native';
  import DateTimePicker from '@react-native-community/datetimepicker';

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
    let currentDate = date; // initialize with the current state
    if (type === 'set') {
      currentDate = selectedDate || date;
      setDate(currentDate);
    }
    if (Platform.OS === 'android') {
      toggleDatePicker();
      setDateOfBirth(currentDate.toDateString());
    }
  };

  return (
    <View style={{marginTop:200}}>
      <Text>Edit Profile Screen</Text>
      <Text>Name</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Enter your name"
      />
      <Text>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
      />
      <Text>Phone Number</Text>
      <TextInput
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        placeholder="Enter your phone number"
      />
      <Text>Address</Text>
      <TextInput
        value={address}
        onChangeText={setAddress}
        placeholder="Enter your address"
      />
      <Text>Date Of Birth</Text>
      {showPicker && (
              <DateTimePicker
              mode='date'
              display='spinner'
              value={date}
              onChange={onChange}
              style={{height:150,marginTop:-10}}
              />
      )}     
      {showPicker && Platform.OS === 'ios' }
      <View style={{ flexDirection:'row', justifyContent:'space-around'}}>

      </View>
      {!showPicker&& (
              <Pressable
              onPress={toggleDatePicker}
              >
                <TextInput
                style={{borderWidth:1, borderColor:'#ccc', padding:10, borderRadius:4, marginBottom:10}}
                placeholder='Sat, 20 Mar 1991'
                value={dateOfBirth}
                onChangeText={setDateOfBirth}
                placeholderTextColor='#11182744'
                editable={false}
                onPressIn={toggleDatePicker}
                />
              </Pressable>
      )}
    </View>
  );
};


export default EditProfile;