import React from 'react'
import { View, Text, Button } from 'react-native';


const ProfilDetails = ({navigation}) => {
  return (
    <View>
    <Text>Welcome to the Home Screen!</Text>
    <Button
      title="Go to Another Screen"
      onPress={() => navigation.navigate('AnotherScreen')}
    />
  </View>
  )
}

export default ProfilDetails
