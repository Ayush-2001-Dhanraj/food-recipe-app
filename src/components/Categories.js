import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { categoryData } from "../helpers";
import Animated, { FadeInDown } from "react-native-reanimated";
import React from "react";

export default function Categories({ activeCategory, setActiveCategory }) {
  return (
    <Animated.View entering={FadeInDown.duration(500).springify()}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="space-x-4"
      >
        {categoryData.map((category, index) => {
          let isActive = activeCategory === category.name;
          let activeButtonClass = isActive ? " bg-amber-400" : " bg-black/10";
          return (
            <TouchableOpacity
              key={index}
              onPress={() => setActiveCategory(category.name)}
              className="flex items-center space-y-1"
            >
              <View className={"rounded-full p-[6px]" + activeButtonClass}>
                <Image
                  source={{ uri: category.image }}
                  style={{ width: hp(6), height: hp(6) }}
                  className="rounded-full"
                />
              </View>
              <Text>{category.name}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </Animated.View>
  );
}
