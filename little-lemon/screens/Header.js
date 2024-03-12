import React, { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function Header({ firstName, lastName, image }) {
  
    return (
        <View style={styles.container}>
            <Image
                style={styles.logo}
                source={require('../img/LittleLemonLogo.png')}
            />
            <View style={styles.profileImageContainer}>
                {image ? (
                    <Image source={{ uri: image }} style={styles.profileImage} />
                ) : (
                    <View style={styles.avatarPlaceholder}>
                        <Text style={styles.avatarPlaceholderText}>
                            {firstName[0]}{lastName[0]}
                        </Text>
                    </View>
                )}
            </View>
        </View>
    );
}

// ... your styles here ...

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', // to align items horizontally
        justifyContent: 'space-between', // to create space between the logo and the profile image
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
    },
    profileImageContainer: {
        height: 50,
        width: 50,
        borderRadius: 25,
        overflow: 'hidden',
        backgroundColor: '#ccc',
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileImage: {
        height: '100%',
        width: '100%',
    },
    avatarPlaceholder: {
        width: 100,
        height: 100,
        backgroundColor: 'aqua',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        marginLeft: 10,
        marginRight:10,
    },
    avatarPlaceholderText: {
        fontSize: 20,
        color: '#333333',
        justifyContent: 'center',
    },
});