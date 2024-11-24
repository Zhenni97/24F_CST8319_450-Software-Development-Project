import { View, Text, TouchableOpacity, Image, Animated, Easing } from 'react-native';
import React, { useState } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { LinearGradient } from 'expo-linear-gradient';
import { HeartIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';

export default function Destinations({ destinationData }) {
    const navigation = useNavigation(); // Hook for navigation between screens

    return (
        <View className="mx-4 flex-row justify-between flex-wrap">
            {
                // Iterate over the destinationData array to create a list of cards
                destinationData.map((item, index) => {
                    return (
                        <DestinationCard navigation={navigation} item={item} key={index} />
                    );
                })
            }
        </View>
    );
}

// Individual destination card component
const DestinationCard = ({ item, navigation }) => {
    const [isFavourite, toggleFavourite] = useState(false); // State to track if the item is a favorite

    return (
        <TouchableOpacity
            onPress={() => navigation.navigate('Destination', { ...item })} // Navigate to the destination details screen
            style={{ width: wp(44), height: wp(65) }} // Styling the card's width and height based on screen width
            className="flex justify-end relative p-4 py-6 space-y-2 mb-5">

            {/* Display the destination image */}
            <Image
                source={item.image}
                style={{ width: wp(44), height: wp(65), borderRadius: 35 }} // Rounded image
                className="absolute"
            />

            {/* Gradient overlay at the bottom of the image for text readability */}
            <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.8)']} // Transparent to dark gradient
                style={{ width: wp(44), height: hp(15), borderBottomLeftRadius: 35, borderBottomRightRadius: 35 }}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                className="absolute bottom-0"
            />

            {/* Heart button for favoriting the destination */}
            <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)} style={{ backgroundColor: 'rgba(255,255,255,0.4)' }} className="absolute top-1 right-3 rounded-full p-3">
                <HeartIcon size={wp(5)} color={isFavourite ? "red" : "white"} />
            </TouchableOpacity>

            {/* Title of the destination */}
            <Text style={{ fontSize: wp(4) }}
                numberOfLines={3} // Limit the number of lines to 3
                className="text-white font-semibold">
                {item.title}
            </Text>

            {/* Short description */}
            <Text
                style={{ fontSize: wp(2.2) }}
                className="text-white"
                numberOfLines={2} // Limit the number of lines to 2
            >
                {item.shortDescription}
            </Text>
        </TouchableOpacity>
    );
};
