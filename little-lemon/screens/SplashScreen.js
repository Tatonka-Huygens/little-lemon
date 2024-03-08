import * as React from 'react';
import { View, Image, StyleSheet, Animated, Easing, Text } from 'react-native';

function SplashScreen() {
    const spinValue = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        Animated.loop(
            Animated.timing(
                spinValue,
                {
                    toValue: 1,
                    duration: 4000,
                    easing: Easing.linear,
                    useNativeDriver: true
                }
            )
        ).start();
    }, []);

    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    });

    return (
        <View style={styles.container}>
            <Animated.Image
                source={require('../img/logo.png')}
                style={{ ...styles.logo, transform: [{ rotate: spin }] }}
            />
        </View>
        
    );
}

export default SplashScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        height: 250,
        width: 250,
        resizeMode: 'contain',
    },
});