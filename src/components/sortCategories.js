import { View, Text, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'; // For storing the sort preference persistently
import { sortCategoryData } from '../constants'; // Import available sorting categories
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'; // To make the UI responsive
import { theme } from '../theme'; // To apply the custom theme for styling

export default function SortCategories({ onSortChange }) {
    // State to store the currently active sorting option
    const [activeSort, setActiveSort] = useState('All');

    useEffect(() => {
        // Load the stored sorting preference when the component mounts
        const loadSortPreference = async () => {
            const savedSort = await AsyncStorage.getItem('activeSort'); // Get the saved sort from AsyncStorage
            if (savedSort) {
                setActiveSort(savedSort); // Set the active sort to the saved value
            }
        };
        loadSortPreference(); // Run the function to load the preference
    }, []); // Empty dependency array ensures this runs only once when the component mounts

    // Function to handle sort change and update AsyncStorage
    const handleSortChange = async (sort) => {
        setActiveSort(sort); // Update the active sort in the state
        await AsyncStorage.setItem('activeSort', sort); // Save the new sort preference to AsyncStorage
        onSortChange(sort); // Call the parent component's onSortChange method to get new data based on the sort
    };

    return (
        <View className="flex-row justify-around items-center mx-4 bg-neutral-100 rounded-full p-2 px-4 space-x-2">
            {/* Map over the available sort categories and render a button for each */}
            {
                sortCategoryData.map((sort, index) => {
                    let isActive = sort === activeSort; // Check if the current sort is active
                    let activeButtonClass = isActive ? 'bg-white shadow' : ''; // Apply styling if the button is active

                    return (
                        <TouchableOpacity
                            onPress={() => handleSortChange(sort)} // Handle sort change on press
                            key={index}
                            className={`p-3 px-4 rounded-full flex ${activeButtonClass}`}
                        >
                            <Text
                                className="font-semibold"
                                style={{ fontSize: wp(4), color: isActive ? theme.text : 'rgba(0,0,0,0.6)' }} // Style the text based on the active state
                            >
                                {sort} {/* Display the sorting category */}
                            </Text>
                        </TouchableOpacity>
                    );
                })
            }
        </View>
    );
}
