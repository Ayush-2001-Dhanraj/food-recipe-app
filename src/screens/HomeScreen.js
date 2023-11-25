import { View, Text, StatusBar, ScrollView, Image } from "react-native";
import React from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import { BellIcon } from "react-native-heroicons/outline";

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
        className="space-y-6 mx-4 my-2"
      >
        {/* avatar & bell icon */}
        <View className="flex-row justify-between items-center mb-2">
          <Image
            source={require("../../assets/images/avatar.png")}
            style={{ height: hp(5), width: hp(5) }}
          />
          <BellIcon size={hp(4)} color="grey" />
        </View>

        {/* greetings and punchline */}
      </ScrollView>
    </SafeAreaView>
  );
}
