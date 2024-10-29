import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import React, { useState } from 'react';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { theme } from '../theme';
import { categoriesData } from '../constants';

export default function Categories() {
    const [showAll, setShowAll] = useState(false); // 状态来控制是否显示所有类别

    // 切换显示状态
    const toggleShowAll = () => {
        setShowAll(!showAll);
    };

    return (
        <View className="space-y-5">
            <View className="mx-5 flex-row justify-between items-center">
                <Text style={{ fontSize: wp(4) }} className="font-semibold text-neutral-700">Categories</Text>
                <TouchableOpacity onPress={toggleShowAll}>
                    <Text style={{ fontSize: wp(4), color: theme.text }}>{showAll ? "Show Less" : "Show all"}</Text>
                </TouchableOpacity>
            </View>
            <ScrollView
                horizontal={!showAll} // 当 showAll 为 false 时，设置为水平滚动
                contentContainerStyle={{ paddingHorizontal: 15 }}
                showsHorizontalScrollIndicator={false}
            >
                <View style={{ flexDirection: showAll ? 'row' : 'row', flexWrap: showAll ? 'wrap' : 'nowrap', justifyContent: 'space-between' }}>
                    {categoriesData.map((cat, index) => (
                        <TouchableOpacity
                            key={index}
                            className="flex items-center space-y-2"
                            style={{
                                width: showAll ? '23%' : 'auto', // 显示所有时，每个元素宽度为 23%
                                marginRight: showAll ? 0 : wp(4), // 增加横向布局时的间隔
                                marginBottom: showAll ? wp(4) : 0, // 在显示所有时增加底部间隔
                            }}
                        >
                            <Image
                                source={cat.image}
                                className="rounded-3xl"
                                style={{ width: wp(20), height: wp(19) }}
                            />
                            <Text className="text-neutral-700 font-medium" style={{ fontSize: wp(3) }}>{cat.title}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}
