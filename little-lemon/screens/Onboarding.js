import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function OnboardingScreen({ navigation }) {
    const [email, onChangeEmail] = useState('');
    const [firstName, onChangeFirstName] = useState('');

    const validateFirstName = (name) => {
        if (!name || !/^[a-zA-Z]+$/.test(name)) {
            return false;
        }
        return true;
    };

    const validateEmail = (email) => {
        if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
            return false;
        }
        return true;
    };

    const handlePress = async () => {
      try {
        await AsyncStorage.setItem('onboardingCompleted', 'true');
        navigation.navigate('Profile', { email: email, firstName: firstName });
      } catch (error) {
        // Error saving data
        console.log(error);
      }
    };

    const checkOnboarding = async () => {
      try {
        const value = await AsyncStorage.getItem('onboardingCompleted');
        if (value !== null) {
          // value previously stored
          console.log(value);
        }
      } catch (error) {
        // Error retrieving data
        console.log(error);
      }
    };



    return (
        <View style={styles.container}>
          <ScrollView keyboardDismissMode='on-drag'>
            <Text style={styles.headerText}>Let us get to know you</Text>
            <Text style={styles.regularText}>First Name</Text>
            <TextInput
              style={styles.inputBox}
              value={firstName}
              onChangeText={onChangeFirstName}
              placeholder={'First Name'}
              keyboardType={'default'}
            />
            <Text style={styles.regularText}>Email</Text>
            <TextInput
              style={styles.inputBox}
              value={email}
              onChangeText={onChangeEmail}
              placeholder={'Email'}
              keyboardType={'email-address'}
            />
          </ScrollView>
          <View style={styles.buttonContainer}>
            <Button
              onPress={handlePress}
              title="NEXT"
              color={validateFirstName(firstName) && validateEmail(email) ? 'green' : 'grey'}
              disabled={!validateFirstName(firstName) || !validateEmail(email)}
            />
          </View>
        </View>
      );
    }
    

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333333', // dark background
  },
  buttonContainer: {
    justifyContent: 'flex-end',
    marginBottom: 36,
  },
  headerText: {
    padding: 40,
    fontSize: 30,
    color: '#EDEFEE', // light text
    textAlign: 'center',
  },
  regularText: {
    fontSize: 24,
    padding: 5,
    marginVertical: 8,
    color: '#EDEFEE', // light text
    textAlign: 'center',
  },
  inputBox: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    fontSize: 16,
    backgroundColor: 'grey', // darker input background
    color: '#CCCCCC', // darker text
    borderRadius: 10,
  },
});