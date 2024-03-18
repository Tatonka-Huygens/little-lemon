import { React, useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from './Header';
import FetchMenu from '../FetchMenu';
import FetchMenu2 from '../FetchMenu2';
import CategoryList from '../CategoryList';


function HomeScreen({ navigation }) {
    const categories = ['Starters', 'Mains', 'Desserts', 'Drinks', 'Specials'];
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
        <CategoryList categories={categories} />
        <FetchMenu/>
        </>
    );
}

export default HomeScreen;