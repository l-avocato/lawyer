
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
import Appointment from "./screens/Appointment";
import ReviewSummary from "./screens/ReviewSummary";
import Settings from "./screens/Settings";
import EditProfile from "./screens/EditProfile";
import Notifications from "./screens/Notifications";
import ResetPassword from "./screens/ResetPassword";
import HelpCenter from "./screens/HelpCenter";
import PrivacyPolicy from "./screens/PrivacyPolicy";
import NavTab from "./screens/NavTab";
import LawyerProfile from "./screens/LawyerProfile";

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName = "Onboarding1" 
                 component={Onboarding1}
                 options={{headerShown: false}}
      >
                  <Stack.Screen
            name="NavTab"
            component={NavTab}
            options={{
              headerShown: true,
            }}
          />
                <Stack.Screen
          name="Onboarding1"
          component={Onboarding1}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="LawyerProfile"
          component={LawyerProfile}
          options={{
            headerShown: true,
          }}
        />

        <Stack.Screen
          name="Appintment"
          component={Appointment}
          options={{
            headerShown: true,
          }}
        />
        

        <Stack.Screen
          name="Home"
          component={HomePage}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Lawyer Details"
          component={ProfilDetails}
          options={{
            headerShown: true,
          }}
        /> 
        
         <Stack.Screen
          name="HomePage"
          component={HomePage}
          options={{
            headerShown: false,
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
          name="settings"
          component={Settings}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="editProfile"
          component={EditProfile}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="notifications"
          component={Notifications}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="resetPassword"
          component={ResetPassword}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="helpCenter"
          component={HelpCenter}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="privacyPolicy"
          component={PrivacyPolicy}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="signup"
          component={Signup}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Onboarding2"
          component={Onboarding2}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Onboarding3"
          component={Onboarding3}
          options={{
            headerShown: false,
          }}
        />
           <Stack.Screen
          name="reviewSummary"
          component={ReviewSummary}
          options={{
            headerShown: true,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
