import React, { useEffect, useState } from 'react';
import { View, Text, Image, TextInput, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Font from 'expo-font';

const HeroBanner = ({ title, subtitle, description, imageUrl }) => {
    const [fontLoaded, setFontLoaded] = useState(false);

    const loadFonts = async () => {
        await Font.loadAsync({
            'Karla-Regular': require('./fonts/Karla-Regular.ttf'),
            'MarkaziText-Regular': require('./fonts/MarkaziText-Regular.ttf'),
        });
        setFontLoaded(true);
    };

    useEffect(() => {
        loadFonts();
    }, []);

    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;

    if (!fontLoaded) {
        return null; // or a loading spinner
    }

    return (
        <View style={{ width: screenWidth, height: screenHeight * 0.3, flexDirection: 'row', padding: 10, position: 'relative', backgroundColor: '#495E57' }}>
            <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 30, color:'#F4CE14', fontWeight: 'bold', fontFamily: 'MarkaziText-Regular' }}>{title}</Text>
                <Text style={{ fontSize: 18, color: '#fff', fontFamily: 'Karla-Regular' }}>{subtitle}</Text>
                <Text style={{ fontSize: 16, fontFamily: 'Karla-Regular' }}>{description}</Text>
            </View>
            <Image source={imageUrl} style={{ width: 150, height: 150, alignSelf: 'center', borderRadius: 10, bottom:15 }} />
            <View style={{ flexDirection: 'row', height: 40, borderColor: 'gray', borderWidth: 1, position: 'absolute', bottom: 10, left: 10, right: 10, alignItems: 'center', borderRadius: 5, backgroundColor: '#fff', }}>
                <Icon name="search" size={20} color="gray" style={{ marginLeft: 10 }} />
                <TextInput style={{ flex: 1, marginLeft: 10, fontFamily: 'Karla-Regular' }} placeholder="Search..." />
            </View>
        </View>
    );
};

export default HeroBanner;