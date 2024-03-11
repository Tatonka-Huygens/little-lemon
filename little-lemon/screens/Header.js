import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function Header() {
    return (
        <View style={styles.container}>
            <Image
                style={styles.logo}
                source={require('../img/LittleLemonLogo.png')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#EE9972',
        alignItems: 'center', // to center the items horizontally
        justifyContent: 'center', // to center the items vertically
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
});