import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'; // For storing the sort preference persistently
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { theme } from '../theme';
import { categoriesData } from '../constants';

export default function Categories({ onCateChange }) {
    const [showAll, setShowAll] = useState(false); // State to control whether to show all categories or not
    const [activeCate, setActiveCate] = useState('breakfast');

    useEffect(() => {
        // Load the stored sorting preference when the component mounts
        const loadCatePreference = async () => {
            const savedCate = await AsyncStorage.getItem('activeCate'); // Get the saved sort from AsyncStorage
            console.log(">>>>>>>c>>>>" + savedCate)
            if (savedCate) {
                setActiveCate(savedCate); // Set the active sort to the saved value
            }
        };
        loadCatePreference(); // Run the function to load the preference
    }, []); // Empty dependency array ensures this runs only once when the component mounts

    // Function to toggle between showing all categories or just a few
    const toggleShowAll = () => {
        setShowAll(!showAll); // Toggle the state
    };

    // Function to handle category change and update AsyncStorage
    const handleCateChange = async (cate) => {
        setActiveCate(cate); // Update the active cate in the state
        await AsyncStorage.setItem('activeCate', cate); // Save the new cate preference to AsyncStorage
        onCateChange(cate); // Call the parent component's onCateChange method to get new data based on the sort        
    };    

    return (
        <View className="space-y-5">
            {/* Header with title and toggle button */}
            <View className="mx-5 flex-row justify-between items-center">
                <Text style={{ fontSize: wp(4) }} className="font-semibold text-neutral-700">
                    Categories
                </Text>
                <TouchableOpacity onPress={toggleShowAll}> {/* Button to toggle the view */}
                    <Text style={{ fontSize: wp(4), color: theme.text }}>
                        {showAll ? "Show Less" : "Show all"} {/* Change button text based on state */}
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Scrollable category list */}
            <ScrollView
                horizontal={!showAll} // Make it horizontally scrollable when not showing all categories
                contentContainerStyle={{ paddingHorizontal: 15 }}
                showsHorizontalScrollIndicator={false}
            >
                <View
                    style={{
                        flexDirection: showAll ? 'row' : 'row', // Always in row direction
                        flexWrap: showAll ? 'wrap' : 'nowrap', // Wrap items if showing all
                        justifyContent: 'space-between'
                    }}
                >
                    {categoriesData.map((cat, index) => (
                        <TouchableOpacity
                            key={index}
                            className="flex items-center space-y-2"
                            // onPress={()=>{console.log(cat.title);}}
                            onPress={() => handleCateChange(cat.title)}
                            style={{
                                width: showAll ? '23%' : 'auto', // Set width to 23% when showing all
                                marginRight: showAll ? 0 : wp(4), // Add margin between items when not showing all
                                marginBottom: showAll ? wp(4) : 0, // Add margin at the bottom when showing all
                            }}                           
                        >
                            {/* Category image */}
                            <Image
                                source={cat.image}
                                className="rounded-3xl"
                                style={{ width: wp(20), height: wp(19) }}
                            />
                            {/* Category title */}
                            <Text className="text-neutral-700 font-medium" style={{ fontSize: wp(3) }}>
                                {cat.title}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}
