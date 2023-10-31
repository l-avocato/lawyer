// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfilDetails from "./screens/ProfilDetails";
import { StatusBar } from "expo-status-bar";
import HomePage from "./screens/HomePage";
import Onboarding2 from "./screens/Onboarding2";
//screens
import Login from "./screens/Login";
import Signup from "./screens/SignUp";
import Welcome from "./screens/Welcome";
import Onboarding1 from "./screens/Onboarding1";
import Onboarding3 from "./screens/Onboarding3";

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
    <Stack.Navigator
        initialRouteName='ProfilDetails'
      >
        <Stack.Screen
          name="Lawyer Details"
          component={ProfilDetails}
          options={{
            headerShown: true,
          }}
        /> 

        <Stack.Screen
          name="welcome"
          component={Welcome}
          options={{
            headerShown: false,
          }}
        />
 <Stack.Screen
          name="Onboarding1"
          component={Onboarding1}
          options={{
            headerShown: false
          }}
        />
          <Stack.Screen
          name="Onboarding2"
          component={Onboarding2}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="Onboarding3"
          component={Onboarding3}
          options={{
            headerShown: false
          }}
        />
       
        <Stack.Screen
          name="HomePage"
          component={HomePage}
          options={{
            headerShown: true,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
