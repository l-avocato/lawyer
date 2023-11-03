import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';

const EditProfile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

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
    </View>
  );
};

export default EditProfile;