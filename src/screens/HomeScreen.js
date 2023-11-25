import {
  View,
  Text,
  StatusBar,
  ScrollView,
  Image,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import { BellIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import Categories from "../components/Categories";

export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState("Beef");

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
        className="mx-4 my-2"
      >
        {/* avatar & bell icon */}
        <View className="flex-row justify-between items-center mb-4">
          <Image
            source={require("../../assets/images/avatar.png")}
            style={{ height: hp(5), width: hp(5) }}
          />
          <BellIcon size={hp(4)} color="grey" />
        </View>

        {/* greetings and punchline */}
        <View className="mb-4">
          <Text style={{ fontSize: hp(1.7) }} className="text-neutral-600">
            Hello, Ayush!
          </Text>
          <View>
            <Text
              style={{ fontSize: hp(3.8) }}
              className="font-semibold text-neutral-600"
            >
              Make your own food,
            </Text>
          </View>
          <Text
            style={{ fontSize: hp(3.8) }}
            className="font-semibold text-neutral-600"
          >
            stay at <Text className="text-amber-400">home</Text>
          </Text>
        </View>

        {/* search bar */}
        <View className="flex-row items-center rounded-full bg-black/5 p-[6px] mb-4">
          <TextInput
            placeholder="Search for recipe"
            placeholderTextColor="grey"
            style={{ fontSize: hp(1.7) }}
            className="flex-1 pl-3 mb-1 tracking-wider text-base"
          />
          <View className="bg-white p-3 rounded-full">
            <MagnifyingGlassIcon size={hp(2.5)} strokeWidth={3} color="grey" />
          </View>
        </View>

        {/* categories */}
        <View>
          <Categories
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
