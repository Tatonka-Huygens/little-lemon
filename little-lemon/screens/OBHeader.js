import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

export default function OBHeader() {
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 5000, // Increase duration for slower spin
        useNativeDriver: true,
      })
    ).start();
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
        resizeMode="contain"
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EE9972',
    alignItems: 'center', // to center the items horizontally
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