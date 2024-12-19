import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import LandingScreen from './src/screens/LandingScreen';
import HomeScreen from './src/screens/HomeScreen';
import MapScreen from './src/screens/MapScreen';
import ChallengesScreen from './src/screens/ChallengesScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import EditProfileScreen from './src/screens/EditProfileScreen';
import LeaderboardScreen from './src/screens/LeaderboardScreen';

import Level1Screen from './src/screens/Level1Screen';
import Level2Screen from './src/screens/Level2Screen';
import Level3Screen from './src/screens/Level3Screen';
import Level4Screen from './src/screens/Level4Screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from './src/screens/Auth/LoginScreen';
import SignupScreen from './src/screens/Auth/SignupScreen';

import MapComponent from './src/screens/MapComponent';
import MyTrips from './src/screens/MyTrips';
import SearchPlace from './src/screens/SearchPlace'; 
import SelectTraveler from './src/screens/SelectTraveler'; 
import SelectDates from './src/screens/SelectDates';  
import { CreateTripProvider } from './context/CreateTripContext';
import MainLocalTabs from './src/screens/MainLocalTabs';
import RegistrationScreen from './src/screens/RegistrationScreen'; 
import { UserProvider } from './context/UserContext';
import CulturalTaskScreen from './src/screens/challenges/CulturalTaskScreen';
import ExplorerScreen from './src/screens/challenges/ExplorerScreen';
import CulinaryAdventureScreen from './src/screens/challenges/CulinaryAdventureScreen';
import LocalLifeScreen from './src/screens/challenges/LocalLifeScreen';
import LearnSlangScreen from './src/screens/challenges/LearnSlangScreen';
import SustainabilityScreen from './src/screens/challenges/SustainabilityScreen';
import SelfieUploadScreen from './src/screens/challenges/SelfieUploadScreen';

// Stack and Tab navigators
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Main Tabs
function MainTabs() {
  return (

    <Tab.Navigator
      screenOptions={({ route, navigation }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName;
          if (route.name === 'HomeScreen') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Map') {
            iconName = focused ? 'map' : 'map-outline';
          } else if (route.name === 'Challenges') {
            iconName = focused ? 'trophy' : 'trophy-outline';
          } else if (route.name === 'Leaderboard') {
            iconName = focused ? 'podium' : 'podium-outline';
          }
          return <Ionicons name={iconName} size={30} color={color} />;
        },
        headerRight: () => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Profile')}  // Use navigation from the screenOptions function
            accessibilityLabel="Go to Profile"
            accessibilityHint="Navigate to your profile screen"
          >
            <Ionicons name="person-outline" size={30} color="white" style={{ marginRight: 15 }} />
          </TouchableOpacity>
        ),
        headerStyle: {
          backgroundColor: 'black',
        },
        headerTintColor: 'white',
        tabBarShowLabel: true,
        tabBarStyle: {
          backgroundColor: 'white',
        },
      })}
    >

      <Tab.Screen name="HomeScreen" component={HomeScreen} />
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Challenges" component={ChallengesScreen} />
      <Tab.Screen name="Leaderboard" component={LeaderboardScreen} />
    </Tab.Navigator>
  );
}


// Profile stack
function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          headerShown: false, // Hide the header for the Profile screen
        }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{ title: 'Edit Profile', headerStyle: { backgroundColor: 'black' }, headerTintColor: 'white' }}
      />
    </Stack.Navigator>
  );
}


// Main App Component
export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // Check if the user is authenticated when the app starts
  useEffect(() => {
      const checkAuthStatus = async () => {
          const token = await AsyncStorage.getItem('token');
          if (token) {
              setIsAuthenticated(true);
          }
      };
      checkAuthStatus();
  }, []);

  return (
    <UserProvider>
    <CreateTripProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isAuthenticated ? 'LandingScreen' : 'Login'}>
        {/* Authentication Screens */}
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Signup" component={SignupScreen} />

        {/* Protected Screens */}
        <Stack.Screen name="LandingScreen" component={LandingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="MyTrip" component={MyTrips} options={{ title: 'My Trips' }} />

        <Stack.Screen name="SearchPlace" component={SearchPlace} options={{ title: 'Search Place' }} />
        <Stack.Screen name="SelectTraveler" component={SelectTraveler} />
        <Stack.Screen name="SelectDates" component={SelectDates}  options={{ title: 'Select Dates' }} />
        <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
        <Stack.Screen name="MainLocalTabs"  component={MainLocalTabs}  options={{ title: 'Local Entry' }} />
        <Stack.Screen name="Registration" component={RegistrationScreen} options={{ title: 'Register' }} />
        <Stack.Screen name="MapComponent" component={MapComponent} />


        <Stack.Screen name="Profile" component={ProfileStack} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ title: 'Edit Profile' }} />
        <Stack.Screen name="SelfieUploadScreen" component={SelfieUploadScreen} options={{ title: 'Upload Selfie' }} />
        <Stack.Screen name="SustainabilityScreen" component={SustainabilityScreen} options={{ title: 'SustainabilityScreen' }} />
        <Stack.Screen name="Level1Screen" component={Level1Screen} options={{ title: 'Level 1' }} />
        <Stack.Screen name="Level2Screen" component={Level2Screen} options={{ title: 'Level 2' }} />
        <Stack.Screen name="Level3Screen" component={Level3Screen} options={{ title: 'Level 3' }} />
        <Stack.Screen name="Level4Screen" component={Level4Screen} options={{ title: 'Level 4' }} />

        <Stack.Screen name="CulturalTaskScreen" component={CulturalTaskScreen} />
        <Stack.Screen name="ExplorerScreen" component={ExplorerScreen} />
        <Stack.Screen name="CulinaryAdventureScreen" component={CulinaryAdventureScreen} />
        <Stack.Screen name="LocalLifeScreen" component={LocalLifeScreen} />
        <Stack.Screen name="LearnSlangScreen" component={LearnSlangScreen} />
        
      </Stack.Navigator>
    </NavigationContainer>
    </CreateTripProvider>
    </UserProvider>
  );
}
