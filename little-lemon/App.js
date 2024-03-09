// App.js
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './screens/SplashScreen';
import OnboardingScreen from './screens/Onboarding';
import HomeScreen from './screens/Home'; // import your Home screen
import Header from './screens/Header';
import ProfileScreen from './screens/Profile';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isOnboardingCompleted, setIsOnboardingCompleted] = useState(false);

  useEffect(() => {
    const loadOnboardingStatus = async () => {
      try {
        const onboardingStatus = await AsyncStorage.getItem('onboardingCompleted');
        setIsOnboardingCompleted(onboardingStatus === 'true');
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
          <Stack.Navigator initialRouteName={isOnboardingCompleted ? "Home" : "Onboarding"}>
            <Stack.Screen name="Onboarding" component={OnboardingScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
          </Stack.Navigator>
        </NavigationContainer>
        </>
      );
}