import React, { useEffect, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, StyleSheet, Image, Pressable, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Header() {
    const navigation = useNavigation();
    const [userData, setUserData] = useState({ firstName: '', lastName: '', image: '' });
    const spinValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const value = await AsyncStorage.getItem('userData');
                if(value !== null) {
                    setUserData(JSON.parse(value));
                }
            } catch(e) {
                console.error(e);
            }
        }

        fetchUserData();

        Animated.timing(spinValue, {
            toValue: 1,
            duration: 10000, // Increase duration for slower spin
            useNativeDriver: true,
        }).start(); // Remove Animated.loop and Animated.sequence
    }, []);

    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <View style={styles.container}>
            <Animated.Image
                style={[
                    styles.logo,
                    { transform: [{ rotateY: spin }] },
                ]}
                source={require('../img/LittleLemonLogo.png')}
            />
            <View style={styles.profileImageContainer}>
                <Pressable onPress={() => navigation.navigate('Profile')} style={styles.profileImage}>
                    {userData.image ? (
                        <Image source={{ uri: userData.image }} style={styles.profileImage} />
                    ) : (
                        <View style={styles.avatarPlaceholder}>
                            <Text style={styles.avatarPlaceholderText}>
                                {userData.firstName[0]}{userData.lastName[0]}
                            </Text>
                        </View>
                    )}
                </Pressable>
            </View>
        </View>
    );
}

// ... your styles here ...

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', // to align items horizontally
        justifyContent: 'space-between', // to center the items horizontally
        backgroundColor: '#EE9972',
        alignItems: 'center', // to center the items vertically
        paddingHorizontal: 10, // to give some space on the sides
    },
    headerText: {
        padding: 20,
        fontSize: 20,
        color: 'black',
        textAlign: 'center',
    },
    logo: {
        height: 50,
        width: 150,
        resizeMode: 'contain',
        marginTop: 30,
        marginBottom: 10,
        marginLeft: 120,
    },
    profileImageContainer: {
        height: 50,
        width: 50,
        borderRadius: 25,
        overflow: 'hidden',
        backgroundColor: '#ccc',
        alignItems: 'flex-end',
    },
    profileImage: {
        height: '100%',
        width: '100%',
    },
    avatarPlaceholder: {
        width: 50,
        height: 50,
        backgroundColor: 'aqua',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        marginLeft: 0,
        marginRight:0,
    },
    avatarPlaceholderText: {
        fontSize: 20,
        color: '#495E57',
        justifyContent: 'center',
    },
});