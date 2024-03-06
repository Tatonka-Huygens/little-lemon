import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Alert,
} from 'react-native';
import OBheader from './OBheader';

export default function LoginScreen({ navigation }) {
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

    const handlePress = () => {
        if (!validateFirstName(firstName)) {
            Alert.alert('Invalid first name. Please enter a valid first name.');
            return;
        }
        if (!validateEmail(email)) {
            Alert.alert('Invalid email. Please enter a valid email.');
            return;
        }
        navigation.navigate('Welcome');
    };

    return (
        <ScrollView style={styles.container} keyboardDismissMode='on-drag'>
          <OBheader />
          <Text style={styles.headerText}>Let us get to know you</Text>
          <Text style={styles.regularText}>First Namne</Text>
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
            placeholder={'email'}
            keyboardType={'email-address'}
          />

          <View style={{ flex: 1, justifyContent: 'flex-end' }}>
            <Pressable
              onPress={handlePress}
              style={styles.button}
              disabled={!validateFirstName(firstName) || !validateEmail(email)}>
              <Text style={styles.buttonText}>NEXT</Text>
            </Pressable>
          </View>
        </ScrollView>
      );
    }
    

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333333', // dark background
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
  button: {
    fontSize: 22,
    padding: 10,
    marginVertical: 100,
    margin: 100,
    backgroundColor: '#EE9972',
    borderColor: '#EE9972',
    borderWidth: 2,
    borderRadius: 15,
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 25,
  },
});