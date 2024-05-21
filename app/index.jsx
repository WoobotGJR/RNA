import { Link, Redirect, Tabs, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, View, Text, ScrollView } from "react-native";
import { icons } from "../constants";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "../constants"
import CustomButton from "../components/CustomButton";
import { useGlobalContext } from "@/context/GlobalProvider";

export default function App() {
  const { isLogged, isLoading } = useGlobalContext();
  
  if (!isLoading && isLogged) return <Redirect href="/home" />

  return (
    <>
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full items-center justify-center h-full px-4">
          <Image source={images.logo} className="w-[130px] h-[84px]" resizeMode="contain" />
          <Image source={images.cards} className="max-w--[380px] w-full h-[300px]" resizeMode="contain" />
          <View className="relative mt-5">
            <Text className="text-3xl text-white font-bold text-center">Dicsover endless possibilities with {""}
              <Text className="text-secondary-200">Aora</Text>
            </Text>

            <Image source={images.path} className="w-[96px] h-[18px] absolute -bottom-2 -right-4" />
          </View>
          <Text className="text-sm font-pregular text-gray-100 text-center mt-3">Where creativity meets innovation: emark on a journey of limitless exploration with Aora</Text>
          <CustomButton title="Get Started" handlePress={() => router.push('/sign-in')} containerStyles="w-full mt-7"/>
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#161622" style="light"/>
    </SafeAreaView>
    </>
  );
}

/*StatisBar customizing the upper phone icons to light or dark (battery icon, and so on)*/