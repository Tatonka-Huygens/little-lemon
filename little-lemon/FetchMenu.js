import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    Text,
    View,
    StyleSheet,
    SafeAreaView,
    Image // Import Image from react-native
} from 'react-native';

export default FetchMenu = () => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const getMenu = async () => {
        try { 
            const response = await fetch(
                'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json' 
            );
            const json = await response.json();
            setData(json.menu);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getMenu();
    }, []);

    const Item = ({ name, description, price, image }) => (
        <View style={menuStyles.innerContainer}>
            <View>
                <Text style={menuStyles.itemText}>{name}</Text>
                <Text style={menuStyles.itemText}>{description}</Text>
                <Text style={menuStyles.itemText}>${price}</Text>
            </View>
            <Image
                style={menuStyles.imageStyle}
                source={{ uri: `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${image}?raw=true` }} // Use image prop from Item 
            />
        </View>
    );

    const renderItem = ({ item }) => (
        <Item
            name={item.name}
            description={item.description}
            price={item.price}
            image={item.image} // Pass image prop to Item
        />
    );


    return (
        <SafeAreaView style={menuStyles.container}>
            {isLoading ? (
                <ActivityIndicator />
            ) : (
                <View>
                <FlatList
                    data={data}
                    keyExtractor={(item, index) => index.toString()} // Use index as the key
                    renderItem={renderItem}
                />
                </View>
            )}
        </SafeAreaView>
    );
};

const menuStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
    innerContainer: {
    paddingHorizontal: 40,
    paddingVertical: 20,
    backgroundColor: '#495E57',
    flexDirection: 'column', // Change flexDirection to 'row'
    justifyContent: 'space-between', // Add space between the text and the image
},
  itemText: {
    color: '#F4CE14',
    fontSize: 22,
    textAlign: 'left',
  },
  headerText: {
    color: '#495E57',
    fontSize: 30,
    textAlign: 'center',
  },
  imageStyle: {
    width: 100, // or whatever size you want
    height: 100, // or whatever size you want
},
});





