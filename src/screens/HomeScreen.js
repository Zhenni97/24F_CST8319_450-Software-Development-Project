import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, Platform, TextInput, Alert } from 'react-native';
import React, { useEffect, useState} from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import Categories from '../components/categories';
import SortCategories from '../components/sortCategories';
import Destinations from '../components/destinations';
import { useNavigation } from '@react-navigation/native';
import { API_KEY } from '../constants'; // Importing the API key for Spoonacular API
import { fetchFavorites } from '../database/database';

// Check if the platform is iOS to adjust styles
const ios = Platform.OS === 'ios';
const topMargin = ios ? 'mt-3' : 'mt-10';

export default function HomeScreen() {
    const [destinationData, setDestinationData] = useState([]); // State to store fetched destination data
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSort, setSelectedSort] = useState(null);
    const navigation = useNavigation();

    // Function to fetch destination data based on the selected sort category
    const fetchDestinations = async (sort = 'All', search = '') => {
        let apiUrl = '';

        // Adjust API URL based on the selected sorting option
        if (sort === 'Most Popular' && search) {
            apiUrl = `https:\\api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&includeNutrition=true&addRecipeInformation=true&sort=popularity&titleMatch=${encodeURIComponent(search)}`;
        } else if (sort === 'All' && search) {
            apiUrl = `https:\\api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&includeNutrition=true&addRecipeInformation=true&sort=random&titleMatch=${encodeURIComponent(search)}`;
        } else if (sort === 'All') {
            apiUrl = `https:\\api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&includeNutrition=true&addRecipeInformation=true&sort=random`;
        } else if (sort === 'Most Popular') {
            apiUrl = `https:\\api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&includeNutrition=true&addRecipeInformation=true&sort=popularity`;
        } else if (sort === 'Saved List') {
            fetchFavorites((rows) => {
                const formattedFavorites = rows.map(favorite => ({
                    id: favorite.id,  //  ID
                    title: favorite.title,  // title
                    duration: favorite.duration,  // Duration
                    image: favorite.image,  // Image URL
                    shortDescription: favorite.longDescription, // Long description
                    longDescription: favorite.longDescription, // Same as short description
                    price: favorite.price || 0,  // Price per serving
                }));
                setDestinationData(formattedFavorites);
            });
            return;
        }

        try {
            // Fetch data from the API
            const response = await fetch(apiUrl);
            const data = await response.json();

            // Format the fetched data to fit the required structure
            const formattedData = data.results.map(recipe => ({
                id: recipe.id,  // Recipe ID
                title: recipe.title,  // Recipe title
                duration: `${recipe.readyInMinutes} Minutes`,  // Preparation time
                image: { uri: recipe.image },  // Recipe image
                shortDescription: recipe.summary.replace(/<[^>]+>/g, ''), // Remove HTML tags from summary
                longDescription: recipe.summary, // Full summary with HTML tags
                price: recipe.pricePerServing || 0,  // Price per serving, default to 0 if missing
            }));

            // Update state with the formatted data
            setDestinationData(formattedData);
        } catch (error) {
            console.error(error); // Log any errors during data fetching
        }
    };

    // Function to fetch destination data based on the selected category
    const fetchDestinations2 = async (cate) => {
        let apiUrl = '';

        // Adjust API URL based on the selected category option
        apiUrl = `https:\\api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&includeNutrition=true&addRecipeInformation=true&sort=random&type=${cate}`;
        try {
            // Fetch data from the API
            const response = await fetch(apiUrl);
            const data = await response.json();

            // Format the fetched data to fit the required structure
            const formattedData = data.results.map(recipe => ({
                id: recipe.id,  // Recipe ID
                title: recipe.title,  // Recipe title
                duration: `${recipe.readyInMinutes} Minutes`,  // Preparation time
                image: { uri: recipe.image },  // Recipe image
                shortDescription: recipe.summary.replace(/<[^>]+>/g, ''), // Remove HTML tags from summary
                longDescription: recipe.summary, // Full summary with HTML tags
                price: recipe.pricePerServing || 0,  // Price per serving, default to 0 if missing
            }));

            // Update state with the formatted data
            setDestinationData(formattedData);
        } catch (error) {
            console.error(error); // Log any errors during data fetching
        }
    };

    // Fetch all destinations on component mount
    useEffect(() => {
        if (selectedSort !== null) {
            fetchDestinations(selectedSort, searchTerm);
        }
    }, [selectedSort]); // Empty dependency array ensures this runs only once

    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView showsVerticalScrollIndicator={false} className={"space-y-6 " + topMargin}>

                {/* Header with title and avatar */}
                <View className="mx-5 flex-row justify-between items-center mb-10">
                    <Text style={{ fontSize: wp(7) }} className="font-bold text-neutral-700">
                        Let's Discover
                    </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Image source={require('../../assets/images/avatar.png')} style={{ height: wp(12), width: wp(12) }} />
                    </TouchableOpacity>
                </View>

                {/* Search bar */}
                <View className="mx-5 mb-4">
                    <View className="flex-row items-center bg-neutral-100 rounded-full p-4 space-x-2 pl-6">
                        <MagnifyingGlassIcon size={20} strokeWidth={3} color="gray" />
                        <TextInput
                            placeholder="Search recipes"
                            placeholderTextColor={'gray'}
                            className="flex-1 text-base mb-1 pl-1 tracking-wider"
                            value={searchTerm}
                            onChangeText={(text) => setSearchTerm(text)}
                            onSubmitEditing={() => {
                                if (selectedSort === 'Saved List') {
                                    Alert.alert('Search Disabled', 'Search is not available for the Saved List.');
                                    setSearchTerm('');
                                } else {
                                    fetchDestinations(selectedSort, searchTerm); // Pass current sort and search term
                                }
                            }}
                        />
                    </View>
                </View>

                {/* Sort categories section */}
                <View className="mb-4">
                    <SortCategories
                        onSortChange={(sort) => {
                            if (sort === 'Saved List') {
                                setSearchTerm('');
                            }
                            setSelectedSort(sort);
                            fetchDestinations(sort, searchTerm);
                        }}
                        onInitialSortLoad={(initialSort) => setSelectedSort(initialSort)}
                    />
                </View>

                {/* Categories section */}
                <View className="mb-4">
                    <Categories onCateChange={fetchDestinations2}/>
                </View>

                {/* Destinations section displaying fetched data */}
                <View>
                    <Destinations destinationData={destinationData} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
