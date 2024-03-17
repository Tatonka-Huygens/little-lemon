import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    Text,
    View,
    StyleSheet,
    SafeAreaView,
    Image, // Import Image from react-native
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
            <View style={menuStyles.textContainer}>
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
        <View style={menuStyles.itemContainer}>
            <View style={menuStyles.textContainer}>
                <Text style={menuStyles.headerText}>{item.name}</Text>
                <Text style={menuStyles.itemText}>{item.description}</Text>
                <Text style={menuStyles.headerText}>${parseFloat(item.price).toFixed(2)}</Text>
            </View>
            <Image
                style={menuStyles.imageStyle}
                source={{ uri: `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${item.image}?raw=true` }}
            />
        </View>
    );


    return (
        <SafeAreaView style={menuStyles.container}>
            {isLoading ? (
                <ActivityIndicator />
            ) : (
                <View style={menuStyles.textContainer}> 
                <FlatList
                    data={data}
                    keyExtractor={(item, index) => index.toString()} // Use index as the key
                    renderItem={renderItem}
                    ItemSeparatorComponent={() => <View style={menuStyles.separator} />} // Add a line delimiter between records
                />
                </View>
            )}
        </SafeAreaView>
    );


};

const menuStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#495E57',
  },
innerContainer: {
    paddingHorizontal: 40,
    paddingVertical: 20,
    backgroundColor: '#495E57',
    flexDirection: 'row', // Change flexDirection to 'row'
    justifyContent: 'space-evenly', // Add justifyContent property
},
  itemText: {
    color: '#F4CE14',
    fontSize: 20,
    textAlign: 'left',
    marginBottom: 10,
  },
  headerText: {
    color: '#F4CE14',
    fontSize: 20,
    textAlign: 'left',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  imageStyle: {
    width: 100, // or whatever size you want
    height: 100, // or whatever size you want
    justifyContent: 'center',

},
textContainer: {
    flexDirection: 'row', // Change flexDirection to 'column'
    flexWrap: 'wrap', // Wrap the text
    alignItems: 'flex-start', // Align the text to the left
    justifyContent: 'left', // Center the text horizontally
    marginRight: 20, // Add some space to the right of the text
    marginLeft: 10, // Add some space to the left of the text
},
separator: {
    height: 1,
    width: '100%',
    backgroundColor: '#EE9972', // Change the color to match your design
    marginLeft: 10, // Add some space to the left of the line
},
itemContainer: {
    flexDirection: 'row', // Arrange children (text and image) in a row
    justifyContent: 'space-between', // Put space between the text and image
    alignItems: 'center', // Vertically center the text and image
    padding: 10,
    marginRight: 100, // Add some space to the right of the text
},

});





