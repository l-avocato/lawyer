import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProfilDetails from './components/ProfilDetails';

const Stack = createStackNavigator();


export default function App() {
  return (


    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="ProfilDetails" component={ProfilDetails} />
      </Stack.Navigator>
    </NavigationContainer>

 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'yellow',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
