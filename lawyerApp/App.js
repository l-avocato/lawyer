// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {ProfilDetails} from './screens';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//screens
import ProfilDetails from './components/ProfilDetails';
import Login from './screens/Login';
import Signup from './screens/SignUp';
import Welcome from './screens/Welcome';

const Stack = createNativeStackNavigator();


export default function App() {
  return (
     

    <NavigationContainer>
      <Stack.Navigator initialRouteName='ProfilDetails'> 
      
      

        <Stack.Screen name="ProfilDetails" component={ProfilDetails} options={{
            headerShown: false
          }} />
        
          
        <Welcome />



      </Stack.Navigator>
    </NavigationContainer>

 
  )
}


    
 











