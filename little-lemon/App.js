// App.js
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './screens/SplashScreen';
import OnboardingScreen from './screens/Onboarding';
import Profile from './screens/Profile';
import HomeScreen from './screens/HomeScreen'; // import your Home screen
import Header from './screens/Header';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);

  useEffect(() => {
    const loadOnboardingStatus = async () => {
      try {
        const onboardingStatus = await AsyncStorage.getItem('onboardingComplete');
        setIsOnboardingComplete(onboardingStatus === 'true');
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    loadOnboardingStatus();
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <>
      <Header />
      <NavigationContainer>
        <Stack.Navigator initialRouteName={isOnboardingComplete ? "HomeScreen" : "Onboarding"}>
          <Stack.Screen 
            name="Onboarding" 
            component={OnboardingScreen} 
          />
          <Stack.Screen 
            name="Profile" 
            component={Profile} 
          />
          <Stack.Screen 
            name="HomeScreen" 
            component={HomeScreen} 
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}