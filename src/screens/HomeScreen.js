import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, Platform, TextInput } from 'react-native';
import React, {useEffect, useState } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import Categories from '../components/categories';
import SortCategories from '../components/sortCategories';
import Destinations from '../components/destinations';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const ios = Platform.OS === 'ios';
const topMargin = ios ? 'mt-3' : 'mt-10';
import { API_KEY } from '../constants'; // 导入 API 密钥

export default function HomeScreen() {
    const [destinationData, setDestinationData] = useState([]); // 新增状态保存获取的目的地数据
    const navigation = useNavigation();

    const fetchDestinations = async (sort) => {
            //Alert.alert("Sort Value", `The selected sort is: ${sort}`);
            let apiUrl = '';

            if (sort === 'All') {
                    apiUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&includeNutrition=true&addRecipeInformation=true&sort=random`;
                } else if (sort === 'Most Popular') {
                    apiUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&includeNutrition=true&addRecipeInformation=true&sort=popularity`;
                } else if (sort === 'Saved List') {
                    apiUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&includeNutrition=true&addRecipeInformation=true&sort=time`;
            }

            try {
                const response = await fetch(apiUrl);
                const data = await response.json();

                // 将数据格式化成你需要的格式
                const formattedData = data.results.map(recipe => ({
                    id: recipe.id,  // 提取 id
                    title: recipe.title,  // 提取 title
                    duration: `${recipe.readyInMinutes} Minutes`,  // 提取准备时间
                    image: { uri: recipe.image },  // 提取图片
                    shortDescription: recipe.summary.replace(/<[^>]+>/g, ''), // 清除 HTML 标签
                    longDescription: recipe.summary, // 或者设置为其他详细描述
                    price: recipe.pricePerServing || 0,  // 提取价格，如果没有则设置为 0
                }));

                setDestinationData(formattedData); // 更新状态以保存新的数据
            } catch (error) {
                console.error(error);
            }
        };

    // 在组件挂载时默认调用 fetchDestinations，选中 'All'
    useEffect(() => {
        fetchDestinations('All'); // 触发 API 请求
    }, []); // 空数组表示只在组件挂载时调用一次

    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView showsVerticalScrollIndicator={false} className={"space-y-6 " + topMargin}>
                {/* avatar */}
                <View className="mx-5 flex-row justify-between items-center mb-10">
                    <Text style={{ fontSize: wp(7) }} className="font-bold text-neutral-700">Let's Discover</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Image source={require('../../assets/images/avatar.png')} style={{ height: wp(12), width: wp(12) }} />
                    </TouchableOpacity>
                </View>

                {/* search bar */}
                <View className="mx-5 mb-4">
                    <View className="flex-row items-center bg-neutral-100 rounded-full p-4 space-x-2 pl-6">
                        <MagnifyingGlassIcon size={20} strokeWidth={3} color="gray" />
                        <TextInput
                            placeholder='Search receipt'
                            placeholderTextColor={'gray'}
                            className="flex-1 text-base mb-1 pl-1 tracking-wider"
                        />
                    </View>
                </View>

                {/* categories */}
                <View className="mb-4">
                    <Categories />
                </View>

                {/* sort categories */}
                <View className="mb-4">
                    <SortCategories onSortChange={fetchDestinations} />
                </View>

                {/* destinations */}
                <View>
                    <Destinations destinationData={destinationData} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
