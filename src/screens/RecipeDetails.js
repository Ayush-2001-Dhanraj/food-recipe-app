import {
  View,
  Text,
  ScrollView,
  StatusBar,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import Animated, { FadeInDown, FadeIn } from "react-native-reanimated";
import axios from "axios";
import Loading from "../components/Loading";

export default function RecipeDetails(props) {
  const [isFav, setIsFav] = useState(false);
  const [meal, setMeal] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [ingredientIndexes, setIngredientIndexes] = useState([]);
  const [instructions, setInstructions] = useState([]);

  const navigation = useNavigation();

  const item = props.route.params;

  const getMeal = async (id) => {
    try {
      const response = await axios.get(
        `https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      const temp = response.data.meals[0];

      const indexes = [];
      for (let index = 0; index < 20; index++) {
        if (temp["strIngredient" + index]) indexes.push(index);
      }

      setIngredientIndexes(indexes);

      setInstructions(
        temp.strInstructions
          .split(".")
          .filter((line) => line.trim() !== "")
          .map((line) => line.trim())
          .filter((line) => !/^\d+$/.test(line)) // Exclude lines that only contain numbers
          .map((line) => line.split(/\s+/).join(" "))
      );

      setMeal(temp);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMeal(item.idMeal);
  }, []);

  return (
    <ScrollView
      className="bg-white flex-1"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 30 }}
    >
      <StatusBar style={"light"} />

      {/* recipe image */}

      <View className="flex-row justify-center">
        <Animated.Image
          source={{ uri: item.strMealThumb }}
          style={{ width: wp(100), height: hp(50) }}
          className="bg-black/5"
          sharedTransitionTag={item.strMeal}
        />
      </View>

      {/* top buttons - back & fav */}
      <Animated.View
        entering={FadeIn.delay(200).duration(1000)}
        className="absolute p-4 w-full flex-row justify-between items-center"
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="rounded-full bg-white p-2"
        >
          <ChevronLeftIcon color="#fbbf24" strokeWidth={4.5} size={hp(3.5)} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setIsFav(!isFav)}
          className="rounded-full bg-white p-2"
        >
          <HeartIcon
            color={isFav ? "#fbbf24" : "grey"}
            strokeWidth={4.5}
            size={hp(3.5)}
          />
        </TouchableOpacity>
      </Animated.View>

      {/* loading & meal details */}

      {isLoading ? (
        <Loading size="large" className="mt-4" />
      ) : (
        <View className="p-4 bg-white rounded-full" style={{ marginTop: 0 }}>
          {/* name and area */}
          <Animated.View
            entering={FadeInDown.delay(100)
              .duration(700)
              .springify()
              .damping(12)}
          >
            <Text
              className="text-center font-bold flex-1 text-neutral-700"
              style={{ fontSize: hp(3) }}
            >
              {meal?.strMeal}
            </Text>
            <Text
              className="text-center font-medium flex-1 text-neutral-600"
              style={{ fontSize: hp(2) }}
            >
              {meal?.strArea}
            </Text>
          </Animated.View>

          {/* Ingredients */}

          <Animated.View
            entering={FadeInDown.delay(200)
              .duration(700)
              .springify()
              .damping(12)}
            className="space-y-2"
          >
            <Text
              style={{ fontSize: hp(2.5) }}
              className="font-bold flex-1 text-neutral-700"
            >
              Ingredients
            </Text>
            <View>
              {ingredientIndexes.map((i) => {
                return (
                  <View className="flex-row space-x-4 items-center" key={i}>
                    <View
                      style={{ height: hp(1.5), width: hp(1.5) }}
                      className="bg-amber-300 rounded-full"
                    />
                    <View className="flex-row space-x-2">
                      <Text
                        style={{ fontSize: hp(1.7) }}
                        className="font-extrabold text-neutral-700"
                      >
                        {meal["strMeasure" + i]}
                      </Text>
                      <Text
                        style={{ fontSize: hp(1.7) }}
                        className="font-medium text-neutral-600"
                      >
                        {meal["strIngredient" + i]}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </Animated.View>

          {/* Ingredients */}

          <Animated.View
            entering={FadeInDown.delay(300)
              .duration(700)
              .springify()
              .damping(12)}
            className="space-y-2 my-4"
          >
            <Text
              style={{ fontSize: hp(2.5) }}
              className="font-bold flex-1 text-neutral-700 text-right"
            >
              Instructions
            </Text>

            {instructions.map((i, index) => {
              return (
                <View
                  className="flex-row space-x-4 items-center"
                  key={i + index}
                >
                  <View
                    style={{ height: hp(1.5), width: hp(1.5) }}
                    className="bg-amber-300 rounded-full"
                  />
                  <Text
                    style={{ fontSize: hp(1.8) }}
                    className="text-neutral-700"
                  >
                    {i}
                  </Text>
                </View>
              );
            })}
          </Animated.View>
        </View>
      )}
    </ScrollView>
  );
}
