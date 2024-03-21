// App.js
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './screens/SplashScreen';
import OnboardingScreen from './screens/Onboarding';
import HomeScreen from './screens/Home'; // import your Home screen
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
        <NavigationContainer>
          <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
          >
          <Stack.Navigator initialRouteName={isOnboardingCompleted ? "Home" : "Onboarding"}>
            <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{headerBackTitleVisible:'false', headerStyle: { backgroundColor:'#333333'},  headerTintColor: '#fff',}}/>
            <Stack.Screen name="Home" component={HomeScreen} options={{headerBackTitleVisible:'false', headerStyle: { backgroundColor: '#495E57'},  headerTintColor: '#fff',}}/>
            <Stack.Screen name="Profile" component={ProfileScreen} options={{headerBackTitleVisible:'false', headerStyle: { backgroundColor:'#333333'},  headerTintColor: '#fff',}}/>
          </Stack.Navigator>
          </KeyboardAvoidingView>
        </NavigationContainer>
        </>
      );
}