import { React, useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from './Header';

function HomeScreen({ navigation }) {
    const [userData, setUserData] = useState({ firstName: '', lastName: '', image: '' });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const value = await AsyncStorage.getItem('userData');
                if(value !== null) {
                    setUserData(JSON.parse(value));
                }
            } catch(e) {
                console.error(e);
            }
        }

        fetchUserData();
    }, []);

    return (
        <>
        <Header />
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Page</Text>
        </View>
        </>
    );
}

export default HomeScreen;