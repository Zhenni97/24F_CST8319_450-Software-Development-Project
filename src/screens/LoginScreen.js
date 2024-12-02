import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, Platform, TextInput, Alert } from 'react-native';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { ClockIcon, HeartIcon, MapPinIcon, SunIcon } from 'react-native-heroicons/solid';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { theme } from '../theme'; // Custom theme styles
import { loginUser, registerUser } from '../services/database';

// Determine if the platform is iOS for styling
const ios = Platform.OS === 'ios';
const topMargin = ios ? 'mt-3' : 'mt-10';

export default function LoginScreen() {
  // States for user email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  // Function to handle login logic
const handleLogin = async () => {
  if (!email || !password) {
    Alert.alert('Error', 'Please fill in all fields');
    return;
  }

  try {
    await loginUser(email, password);
    navigation.navigate('Home');
  } catch (error) {
    Alert.alert('Login Failed', 'Invalid credentials');
  }
};

  // Function to handle register button logic
const handleRegister = async () => {
  if (!email || !password) {
    Alert.alert('Error', 'Please fill in all fields');
    return;
  }

  try {
    await registerUser(email, password);
    Alert.alert(
      'Registration Successful',
      'Account created successfully! Please login.',
      [{ text: 'OK', onPress: handleLogin }]
    );
  } catch (error) {
    Alert.alert('Registration Failed', 'Email might already be registered');
  }
};

  return (
    <View className="bg-white flex-1">
      {/* Back button */}
      <SafeAreaView className={"flex-row justify-between items-center w-full absolute " + topMargin}>
        <TouchableOpacity
          onPress={() => navigation.goBack()} // Go back to the previous screen
          className="p-2 rounded-full ml-4"
          style={{ backgroundColor: 'rgba(255,255,255,0.5)', zIndex: 10 }}
        >
          <ChevronLeftIcon size={wp(7)} strokeWidth={4} color="black" />
        </TouchableOpacity>
      </SafeAreaView>

      {/* Background image */}
      <Image source={{ uri: 'https://example.com/login-background.jpg' }} style={{ width: wp(100), height: hp(20) }} />
      <StatusBar style={'light'} />

      {/* Title */}
      <View className="px-5 pt-10">
        <Text style={{ fontSize: wp(10), color: theme.text }} className="font-bold text-center">
          Welcome Back!
        </Text>
        <Text style={{ fontSize: wp(5), color: 'gray' }} className="text-center mt-2">
          Please login to continue
        </Text>
      </View>

      {/* Login form */}
      <View
        style={{ borderTopLeftRadius: 40, borderTopRightRadius: 40 }}
        className="px-5 flex flex-1 justify-center bg-white pt-8 -mt-14"
      >
        <SafeAreaView className="space-y-5">
          {/* Email input field */}
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail} // Update email state
            style={{ fontSize: wp(4.5), borderColor: 'gray', borderWidth: 1, borderRadius: 10, padding: 10 }}
            keyboardType="email-address"
            autoCapitalize="none"
            className="text-neutral-700"
          />

          {/* Password input field */}
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword} // Update password state
            secureTextEntry // Hide password text
            style={{ fontSize: wp(4.5), borderColor: 'gray', borderWidth: 1, borderRadius: 10, padding: 10 }}
            className="text-neutral-700"
          />

          {/* Login button */}
          <TouchableOpacity
            onPress={handleLogin} // Trigger login logic
            style={{ backgroundColor: theme.bg(0.8), height: wp(13), borderRadius: 30 }}
            className="flex justify-center items-center mt-6"
          >
            <Text className="text-white font-bold" style={{ fontSize: wp(5) }}>
              Login
            </Text>
          </TouchableOpacity>

          {/* Register button */}
          <TouchableOpacity
            onPress={handleRegister} // Trigger registration navigation
            style={{ backgroundColor: 'gray', height: wp(13), borderRadius: 30 }}
            className="flex justify-center items-center"
          >
            <Text className="text-white font-bold" style={{ fontSize: wp(5) }}>
              Register
            </Text>
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    </View>
  );
}
