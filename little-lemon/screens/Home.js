import { React, useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from './Header';
import CategoryList from '../CategoryList';
import FetchMenu from '../FetchMenu';
import HeroBanner from '../HeroBanner';
import HeroImage from '../img/HeroImage.png'; // Import the image
import * as Font from 'expo-font';


function HomeScreen({navigation, route, setMenuData, menu}) {
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
        <HeroBanner 
        title="Little Lemon" 
        subtitle="Chicago" 
        description="We are a family owned Meditarranean restaurant, focused on traditional recipes served with a modern twist." 
        imageUrl={HeroImage} // Use the imported image
        />
        <CategoryList categories={categories} />
        <FetchMenu />
        </>
    );
}

export default HomeScreen;