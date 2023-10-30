// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {ProfilDetails} from './screens';

const Stack = createNativeStackNavigator();


export default function App() {
  return (
     

    <NavigationContainer>
      <Stack.Navigator initialRouteName='ProfilDetails'> 
      
      

        <Stack.Screen name="ProfilDetails" component={ProfilDetails} options={{
            headerShown: false
          }} />
        
          



      </Stack.Navigator>
    </NavigationContainer>

 
  )
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'yellow',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
