import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../theme';

export default function WelcomeScreen() {
    // Initialize the navigation hook for screen navigation
    const navigation = useNavigation();

    return (
        <View className="flex-1 flex justify-end">
            {/* Background image */}
            <Image
                source={require('../../assets/images/welcomes.jpg')} // Reference to the welcome image asset
                className="h-full w-full absolute" // Fullscreen image with absolute positioning
            />

            {/* Content container with gradient */}
            <View className="p-5 pb-10 space-y-8">
                {/* Linear gradient overlay at the bottom of the screen */}
                <LinearGradient
                    colors={['transparent', 'rgba(3,105,161,0.8)']} // Gradient transition
                    style={{ width: wp(100), height: hp(60) }} // Dynamic sizing using percentages
                    start={{ x: 0.5, y: 0 }} // Gradient starts at the center top
                    end={{ x: 0.5, y: 1 }} // Gradient ends at the center bottom
                    className="absolute bottom-0" // Positioned at the bottom
                />

                {/* Text content */}
                <View className="space-y-3">
                    {/* Title text */}
                    <Text className="text-white font-bold text-5xl" style={{ fontSize: wp(10) }}>
                        Cooking Made Delightful
                    </Text>
                    {/* Subtitle text */}
                    <Text className="text-neutral-200 font-medium" style={{ fontSize: wp(4) }}>
                        Discover the joy of cooking delicious recipes from around the world with us!
                    </Text>
                </View>

                {/* Button to navigate to the Home screen */}
                <TouchableOpacity
                    onPress={() => navigation.navigate("Home")} // Navigate to the "Home" screen
                    style={{ backgroundColor: theme.bg(1) }} // Background color from theme
                    className="mx-auto p-3 px-12 rounded-full" // Centered, padded button with rounded edges
                >
                    <Text className="text-white font-bold" style={{ fontSize: wp(5.5) }}>
                        Let's go!
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
