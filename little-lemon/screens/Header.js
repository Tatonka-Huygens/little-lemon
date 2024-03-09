import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

export default function LittleLemonHeader() {
  const bounceValue = useRef(new Animated.Value(500)).current;
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.spring(bounceValue, {
        toValue: 0,
        speed: 3,
        bounciness: 15,
        useNativeDriver: true,
      }),
      Animated.spring(bounceValue, {
        toValue: 0,
        speed: 1,
        bounciness: 20,
        useNativeDriver: true,
      }),
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
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
          { transform: [{ translateX: bounceValue }, { rotate: spin }] },
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