import { View, Text, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { sortCategoryData } from '../constants';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { theme } from '../theme';

export default function SortCategories({ onSortChange }) {
    const [activeSort, setActiveSort] = useState('All');

    useEffect(() => {
        // 加载存储的排序值
        const loadSortPreference = async () => {
            const savedSort = await AsyncStorage.getItem('activeSort');
            if (savedSort) {
                setActiveSort(savedSort);
            }
        };
        loadSortPreference();
    }, []);

    const handleSortChange = async (sort) => {
        setActiveSort(sort);
        await AsyncStorage.setItem('activeSort', sort);
        onSortChange(sort); // 调用父组件的方法来获取新数据
    };

    return (
        <View className="flex-row justify-around items-center mx-4 bg-neutral-100 rounded-full p-2 px-4 space-x-2">
            {
                sortCategoryData.map((sort, index) => {
                    let isActive = sort === activeSort;
                    let activeButtonClass = isActive ? 'bg-white shadow' : '';

                    return (
                        <TouchableOpacity
                            onPress={() => handleSortChange(sort)} // 点击时更新状态并获取新数据
                            key={index}
                            className={`p-3 px-4 rounded-full flex ${activeButtonClass}`}
                        >
                            <Text className="font-semibold" style={{ fontSize: wp(4), color: isActive ? theme.text : 'rgba(0,0,0,0.6)' }}>
                                {sort}
                            </Text>
                        </TouchableOpacity>
                    );
                })
            }
        </View>
    );
}
