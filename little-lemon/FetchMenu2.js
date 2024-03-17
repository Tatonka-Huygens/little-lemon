import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Dimensions, StyleSheet } from 'react-native';

const FetchMenu2 = () => {
    const [data, setData] = useState([]);

    const getDataFromApiAsync = async () => {
        try {
            const response = await fetch('https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json');
            const json = await response.json();
            setData(json.menu);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const windowWidth = Dimensions.get('window').width;
        const windowHeight = Dimensions.get('window').height;

        console.log('Window Width:', windowWidth);
        console.log('Window Height:', windowHeight);
        getDataFromApiAsync();
    }, []);

    return (
        <FlatList
            data={data}
            renderItem={({ item }) => (
                <View style={styles.itemContainer}>
                    <Text style={styles.headerText}>{item.name}</Text>
                    <Text style={styles.descriptionText} numberOfLines={2}>{item.description}</Text>
                    <Text style={styles.priceText}>${parseFloat(item.price).toFixed(2)}</Text>
                </View>
            )}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={() => <View style={styles.separator} />} // Add a line delimiter between records
        />
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        flex: 1,
        flexDirection: 'column',
        margin: 10,
        padding: 10,
        backgroundColor: '#495E57',
        borderRadius: 5,
    },
    headerText: {
        fontSize: 20,
        color: '#000',
        fontWeight: 'bold',
        marginBottom: 5,
    },
    descriptionText: {
        fontSize: 18,
        color: '#000',
        marginBottom: 5,
    },
    priceText: {
        fontSize: 20,
        color: '#000',
        fontWeight: '500'
    },
    separator: {
        height: 1,
        width: '100%',
        backgroundColor: '#EE9972', // Change the color to match your design
        marginLeft: 20, // Add some space to the left of the line
    },
});

export default FetchMenu2;