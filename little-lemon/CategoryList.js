import React, { useState } from 'react';
import { ScrollView, Button, View, Text, StyleSheet, Pressable } from 'react-native';




const CategoryList = ({ categories }) => {
    const [selectedCategories, setSelectedCategories] = useState([]);

    const toggleCategory = (category) => {
        if (selectedCategories.includes(category)) {
            setSelectedCategories(selectedCategories.filter((cat) => cat !== category));
        } else {
            setSelectedCategories([...selectedCategories, category]);
        }
    };

    return (
        <View style={{ flexDirection: 'row' }}>
            <ScrollView horizontal={true}>
            {categories.map((category, index) => (
                <Pressable
                    key={category} // use category as key if it's unique
                    style={({ pressed }) => ({
                        backgroundColor: pressed || selectedCategories.includes(category) ? '#333333' : '#EDEFEE',
                        padding: 10,
                        margin: 10,
                        borderRadius: 15,
                    })}
                    onPress={() => toggleCategory(category)}
                >
                    <Text style={{ color: selectedCategories.includes(category) ? 'white' : 'black' }}>
                        {category}
                    </Text>
                </Pressable>
            ))}
            </ScrollView>
        </View>
    );

const styles = StyleSheet.create({
    checked: {
        backgroundColor: 'blue',
        borderColor: 'blue',
    },
    unchecked: {
        backgroundColor: 'white',
        borderColor: 'black',
    },  
    });
}

export default CategoryList;