import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, Platform, TextInput } from 'react-native';
//import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
//import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { ClockIcon, HeartIcon, MapPinIcon, SunIcon } from 'react-native-heroicons/solid';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { theme } from '../theme'; // 自定义的主题样式
const ios = Platform.OS === 'ios';
const topMargin = ios ? 'mt-3' : 'mt-10';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = () => {
    // 登录逻辑，可以根据需求添加表单验证和后台请求等
    console.log('Login pressed with email:', email, 'and password:', password);
    // 跳转到主页或其他页面
    navigation.navigate('Home');
  };

  const handleRegister = () => {
    // 注册逻辑，可以根据需求添加表单验证和后台请求等
    console.log('Register pressed');
    // 跳转到注册页面或处理注册逻辑
    navigation.navigate('RegisterPage');
  };

  return (
    <View className="bg-white flex-1">

        {/* back button */}
        <SafeAreaView className={"flex-row justify-between items-center w-full absolute " + topMargin}>
            <TouchableOpacity
                onPress={()=> navigation.goBack()}
                className="p-2 rounded-full ml-4"
                style={{backgroundColor: 'rgba(255,255,255,0.5)', zIndex: 10}}
            >
                <ChevronLeftIcon size={wp(7)} strokeWidth={4} color="black" />
            </TouchableOpacity>
        </SafeAreaView>

      {/* 背景图片 */}
      <Image source={{ uri: 'https://example.com/login-background.jpg' }} style={{ width: wp(100), height: hp(20) }} />
      <StatusBar style={'light'} />

      {/* 标题 */}
      <View className="px-5 pt-10">
        <Text style={{ fontSize: wp(10), color: theme.text }} className="font-bold text-center">
          Welcome Back!
        </Text>
        <Text style={{ fontSize: wp(5), color: 'gray' }} className="text-center mt-2">
          Please login to continue
        </Text>
      </View>

      {/* 登录表单 */}
      <View style={{ borderTopLeftRadius: 40, borderTopRightRadius: 40 }} className="px-5 flex flex-1 justify-center bg-white pt-8 -mt-14">
        <SafeAreaView className="space-y-5">
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={{ fontSize: wp(4.5), borderColor: 'gray', borderWidth: 1, borderRadius: 10, padding: 10 }}
            keyboardType="email-address"
            autoCapitalize="none"
            className="text-neutral-700"
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={{ fontSize: wp(4.5), borderColor: 'gray', borderWidth: 1, borderRadius: 10, padding: 10 }}
            className="text-neutral-700"
          />

          {/* 登录按钮 */}
          <TouchableOpacity
            onPress={handleLogin}
            style={{ backgroundColor: theme.bg(0.8), height: wp(13), borderRadius: 30 }}
            className="flex justify-center items-center mt-6"
          >
            <Text className="text-white font-bold" style={{ fontSize: wp(5) }}>Login</Text>
          </TouchableOpacity>

          {/* 注册按钮 */}
          <TouchableOpacity
            onPress={handleRegister}
            style={{ backgroundColor: 'gray', height: wp(13), borderRadius: 30 }}
            className="flex justify-center items-center"
          >
            <Text className="text-white font-bold" style={{ fontSize: wp(5) }}>Register</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    </View>
  );
}
