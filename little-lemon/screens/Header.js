import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const Header = () => {
    return (
        <View style={styles.header}>
            <Image source={require('../img/LittleLemonLogo.png')} style={styles.logo} resizeMode="contain" />
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        alignItems: 'center',
        justifyContent: 'center', // center the logo vertically
        padding: 10,
        backgroundColor: '#f8f8f8',
        marginTop: 20,
    },
    logo: {
        height: 50,
        width: 350,
        marginTop: 10,
        marginBottom: 10,
    },
});

export default Header;