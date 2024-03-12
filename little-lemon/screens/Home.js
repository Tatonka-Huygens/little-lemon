import * as React from 'react';
import { View, Text } from 'react-native';
import Header from './Header';

function HomeScreen({ route, navigation }) {
    const { firstName, lastName, image } = route.params;
    return (
        <>
        <Header firstName={firstName} lastName={lastName} image={image} />
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Page</Text>
        </View>
        </>
    );
}

export default HomeScreen;