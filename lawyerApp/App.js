import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfilDetails from "./screens/ProfilDetails";
import { StatusBar } from "expo-status-bar";
import HomePage from "./screens/HomePage";
import Onboarding2 from "./screens/Onboarding2";
import ManageFilters from "./screens/ManageFilters";

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
import GoogleMapView from "./screens/GoogleMapView";
import Chat from "./screens/Chat";
import SearchListings from "./screens/SearchListings";
import { Provider } from "react-redux";
import { store } from "./store/index";
import ChatRooms from "./screens/ChatRooms";
import MyCases from "./screens/MyCases";
import CaseDetails from "./screens/CaseDetails";
import PhaseDetails from "./screens/PhaseDetails";
import Favourites from "./screens/Favourites";

import { LogBox } from "react-native";
LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs();
export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Onboarding1"
          component={Onboarding1}
          options={{ headerShown: false }}>
          <Stack.Screen
            name="NavTab"
            component={NavTab}
            options={{
              headerShown: false,
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
            name="ChatRooms"
            component={ChatRooms}
            options={{
              headerShown: false,
            }}
          />

         <Stack.Screen 
        name="Map" 
        component={GoogleMapView}
        options={{
          headerShown : true,  
        }}
        />

          <Stack.Screen
            name="Chat"
            component={Chat}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Favourites"
            component={Favourites}
            options={{
              headerShown: true,
              headerTitleAlign: "center",
              title: "My Favourites",
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
            name="ProfilDetails"
            component={ProfilDetails}
            options={{
              headerShown: true,
            }}
          />
          <Stack.Screen
            name="searchResults"
            component={ProfilDetails}
            options={{
              headerShown: true,
            }}
          />
          <Stack.Screen
            name="SearchListings"
            component={SearchListings}
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
            name="ManageFilters"
            component={ManageFilters}
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
          <Stack.Screen
            name="cases"
            component={MyCases}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="caseDetails"
            component={CaseDetails}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="phaseDetails"
            component={PhaseDetails}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
