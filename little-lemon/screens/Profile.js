import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  Pressable,
  Button,
} from 'react-native';
import { CheckBox } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';





export default function ProfileScreen({ route, navigation}) {
    const { email: initialEmail, firstName: initialFirstName } = route.params || {};
    const [email, onChangeEmail] = useState(initialEmail || '');
    const [firstName, onChangeFirstName] = useState(initialFirstName || '');
    const [lastName, onChangeLastName] = useState('');
    const [phoneNumber, onChangePhoneNumber] = useState('');
    const [isSelectedOrderStatuses, setSelectionOrderStatuses] = useState(false);
    const [isSelectedPasswordChanges, setSelectionPasswordChanges] = useState(false);
    const [isSelectedSpecialOffers, setSelectionSpecialOffers] = useState(false);
    const [isSelectedNewsletter, setSelectionNewsletter] = useState(false);
    const [image, setImage] = useState(null);


    const handlePress = async () => {
        try {
            const userData = {
                image,
                firstName,
                lastName,
                email,
                phoneNumber,
                isSelectedOrderStatuses,
                isSelectedPasswordChanges,
                isSelectedSpecialOffers,
                isSelectedNewsletter,
            };
    
            await AsyncStorage.setItem('userData', JSON.stringify(userData));
            navigation.navigate('Home');
        } catch (error) {
            console.error(error);
        }
    };
    

    const handleLogout = async () => {
        try {
            await AsyncStorage.clear();
            navigation.navigate('Onboarding');
        } catch (error) {
            console.error(error);
        }
    };





    const pickImage = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      console.log(result);
  
      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    };
  

    const validateFirstName = (name) => {
        if (!name || !/^[a-zA-Z]+$/.test(name)) {
            return false;
        }
        return true;
    };

    const validateLastName = (name) => {
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

    const validatePhoneNumber = (phoneNumber) => {
        const regex = /^\+?1?[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
        return regex.test(phoneNumber);
    };


    const [formattedPhoneNumber, setFormattedPhoneNumber] = useState('');


    React.useEffect(() => {
        const loadUserData = async () => {
            try {
                const userDataJson = await AsyncStorage.getItem('userData');
                if (userDataJson != null) {
                    const userData = JSON.parse(userDataJson);
                    setImage(userData.image);
                    onChangeFirstName(userData.firstName);
                    onChangeLastName(userData.lastName);
                    onChangeEmail(userData.email);
                    onChangePhoneNumber(userData.phoneNumber);
                    setSelectionOrderStatuses(userData.isSelectedOrderStatuses);
                    setSelectionPasswordChanges(userData.isSelectedPasswordChanges);
                    setSelectionSpecialOffers(userData.isSelectedSpecialOffers);
                    setSelectionNewsletter(userData.isSelectedNewsletter);
                }
            } catch (error) {
                console.error(error);
            }
        };

        loadUserData();
    }, []);

    return (
        <ScrollView style={styles.container} keyboardDismissMode='on-drag'>
          <Text style={styles.headerText}>Personal information</Text>
          <Text style={styles.regularText}>Avatar</Text>
        <View style={styles.avatar}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {image ? (
                    <Image source={{ uri: image }} style={{ width: 100, height: 100, borderRadius: 50 , marginLeft: 10,marginRight:20}} />
                ) : (
                    <View style={styles.avatarPlaceholder}>
                        <Text style={styles.avatarPlaceholderText}>
                            {firstName[0]}
                        </Text>
                    </View>
                )}
                <Pressable onPress={pickImage} style={[styles.changeButton, { marginLeft: 10 , padding:10}]}>
                    <Text style={styles.buttonText2}>Change</Text>
                </Pressable>
            </View>
            <Text style={styles.regularText}> </Text>
            <Pressable onPress={() => setImage(null)} style={[styles.removeButton, { padding: 10 }]}>
                <Text style={styles.buttonText}>Remove</Text>
            </Pressable>
        </View>
          <Text style={styles.regularText}>First Name</Text>
          <TextInput
            style={styles.inputBox}
            value={firstName}
            onChangeText={onChangeFirstName}
            placeholder={'First Name'}
            keyboardType={'default'}
          />
          <Text style={styles.regularText}>Last Name</Text>
          <TextInput
            style={styles.inputBox}
            value={lastName}
            onChangeText={onChangeLastName}
            placeholder={'Last Name'}
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
            <Text style={styles.regularText}>Phone Number</Text>
            <TextInput
            style={styles.inputBox}
            value={formattedPhoneNumber}
            onChangeText={onChangePhoneNumber}
            placeholder={'Phone Number'}
            keyboardType={'phone-pad'}
            />
          <Text style={styles.headerText}>Email notifications</Text>
        <View style={styles.checkboxContainer}>
        <CheckBox
            title='Order Statuses'
            checkedIcon='dot-circle-o'
            uncheckedIcon='circle-o'
            checked={isSelectedOrderStatuses}
            onPress={() => setSelectionOrderStatuses(!isSelectedOrderStatuses)}
            containerStyle={{backgroundColor: '#333333', borderWidth: 0}} // dark background
            textStyle={{color: '#FFFFFF'}} // light text
            checkedColor='#FFFFFF' // light check
        />
        <CheckBox
            title='Password changes'
            checkedIcon='dot-circle-o'
            uncheckedIcon='circle-o'
            checked={isSelectedPasswordChanges}
            onPress={() => setSelectionPasswordChanges(!isSelectedPasswordChanges)}
            containerStyle={{backgroundColor: '#333333', borderWidth: 0}} // dark background
            textStyle={{color: '#FFFFFF'}} // light text
            checkedColor='#FFFFFF' // light check
        />
        <CheckBox
            title='Special offers'
            checkedIcon='dot-circle-o'
            uncheckedIcon='circle-o'
            checked={isSelectedSpecialOffers}
            onPress={() => setSelectionSpecialOffers(!isSelectedSpecialOffers)}
            containerStyle={{backgroundColor: '#333333', borderWidth: 0}} // dark background
            textStyle={{color: '#FFFFFF'}} // light text
            checkedColor='#FFFFFF' // light check
        />
        <CheckBox
            title='Newsletter'
            checkedIcon='dot-circle-o'
            uncheckedIcon='circle-o'
            checked={isSelectedNewsletter}
            onPress={() => setSelectionNewsletter(!isSelectedNewsletter)}
            containerStyle={{backgroundColor: '#333333', borderWidth: 0}} // dark background
            textStyle={{color: '#FFFFFF'}} // light text
            checkedColor='#FFFFFF' // light check
        />
        </View>
        <Pressable style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Log out</Text>
    </Pressable>
          <View style={styles.buttonContainer}>
            <View>
            <Pressable style={[styles.button, styles.discardChangesButton]} onPress={() => {}}>
            <Text style={styles.buttonText}>Discard changes</Text>
            </Pressable>
        </View>
        <View>
        <Pressable style={[styles.button, styles.saveChangesButton]} onPress={handlePress}>
            <Text style={styles.buttonText2}>Save changes</Text>
        </Pressable>
        </View>
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
    padding: 15,
    fontSize: 25,
    color: '#EDEFEE', // light text
    textAlign: 'left', // Align text to the left
  },
  regularText: {
    fontSize: 15,
    padding: 3,
    color: '#EDEFEE', // light text
    textAlign: 'left', // Align text to the left
    marginLeft: 20,
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
  avatar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'left',
    padding: 5,
    backgroundColor: '#333333',
    marginTop: 5,
    marginBottom: 20,
  },
  avatarImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    borderRadius: 50,
  },
  avatarButtons: {
    marginLeft: 10,

  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20,
    marginBottom: 20,
  },
    checkboxContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        margin: 10,
        padding: 10,
        backgroundColor: '#333333',
    },
    button: {
        padding: 10,
        margin: 10,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#F4CE14'
      },
      changeButton: {
        backgroundColor: '#495E57',
        borderRadius: 5,
        alignContent: 'center',
      },
      saveChangesButton: {
        backgroundColor: '#495E57',
      },
      buttonText: {
        color: '#333333',
        fontSize: 16,
      },
        buttonText2: {
            color: '#EDEFEE',
            fontSize: 16,
        },
      removeButton: {
        backgroundColor: '#EDEFEE',
        borderRadius: 5,
        alignContent: 'center',
      },
      discardChangesButton: {
        backgroundColor: '#EDEFEE',
      },
    avatarPlaceholder: {
        width: 100,
        height: 100,
        backgroundColor: 'aqua',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        marginLeft: 10,
        marginRight:20,
    },
    avatarPlaceholderText: {
        fontSize: 40,
        color: '#333333',
    },
});

