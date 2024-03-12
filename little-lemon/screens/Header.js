import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Header({ firstName, lastName, image }) {
    const navigation = useNavigation();
  
    return (
        <View style={styles.container}>
            <Image
                style={styles.logo}
                source={require('../img/LittleLemonLogo.png')}
            />
            <View style={styles.profileImageContainer}>
                <Pressable onPress={() => navigation.navigate('Profile')} style={styles.profileImage}>
                    {image ? (
                        <Image source={{ uri: image }} style={styles.profileImage} />
                    ) : (
                        <View style={styles.avatarPlaceholder}>
                            <Text style={styles.avatarPlaceholderText}>
                                {firstName[0]}{lastName[0]}
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
        marginTop: 40,
        marginBottom: 20,
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
        marginLeft: 10,
        marginRight:0,
    },
    avatarPlaceholderText: {
        fontSize: 20,
        color: '#495E57',
        justifyContent: 'center',
    },
});