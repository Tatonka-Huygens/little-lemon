import React from 'react';
import { View, Text, Image, TextInput, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const HeroBanner = ({ title, subtitle, description, imageUrl }) => {
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;

    return (
        <View style={{ width: screenWidth, height: screenHeight * 0.3, flexDirection: 'row', padding: 10, position: 'relative' }}>
            <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{title}</Text>
                <Text style={{ fontSize: 18, color: 'gray' }}>{subtitle}</Text>
                <Text style={{ fontSize: 16 }}>{description}</Text>
            </View>
            <Image source={imageUrl} style={{ borderRadius:15, width: 150, height: 150, alignSelf: 'center' }} />
            <View style={{ flexDirection: 'row', height: 40, borderColor: 'gray', borderWidth: 1, position: 'absolute',bottom: 10, left: 10, right: 10, alignItems: 'center', borderRadius: 5 }}>
                <Icon name="search" size={20} color="gray" style={{ marginLeft: 10 }} />
                <TextInput style={{ flex: 1, marginLeft: 10 }} placeholder="Search..." />
            </View>
        </View>
    );
};

export default HeroBanner;