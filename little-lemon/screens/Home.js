import { React, useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from './Header';
import FetchMenu from '../FetchMenu';

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
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:'#495E57' }}>
            <View>
            <Text><FetchMenu/></Text>
            </View>
        </View>
        </>
    );
}

export default HomeScreen;