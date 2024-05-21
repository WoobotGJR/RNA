import { ScrollView, StyleSheet, Text, View, Image, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { images } from "../../constants"
import { useEffect, useState } from 'react';
import CustomFormField from "../../components/CustomFormField";
import CustomButton from '@/components/CustomButton';
import { Link, router } from 'expo-router';
import { signIn, signOut } from '@/lib/appwrite';
import { useGlobalContext } from '@/context/GlobalProvider';
 
const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false)

  const {setUser, setIsLogged} = useGlobalContext();

  const submit = async () => {
    if (!form.email || !form.password) {
      Alert.alert("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await signIn(form.email, form.password);

      setUser(response);
      setIsLogged(true);

      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmitting(false); 
    }
  }

  const logout = async () => {
    await signOut();
    setIsLogged(false);
    setUser(null);
    router.replace("/sign-in");
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full items-center justify-center h-full px-4 my-10">
          <Image source={images.logo} resizeMode='contain' className="w-[130px] h-[84px]" />
          <Text className="text-xl text-white font-semibold text-center mt-4">Login to Aora</Text>

          <CustomFormField title="Email" placeholder="Enter your email"
          value={form.email} handleChangeText={(text) => setForm({ ...form, email: text })}
          keyboardType="email-address" otherStyles="mt-7 w-full" />

          <CustomFormField title="Password" placeholder="Enter your password" 
          value={form.password} handleChangeText={(text) => setForm({ ...form, password: text })}
          keyboardType="password" otherStyles="mt-7 w-full" />

          <CustomButton title="Login" isLoading={isSubmitting}
          handlePress={submit} containerStyles="w-full mt-12"  />

          <CustomButton title="Logout" isLoading={isSubmitting}
          handlePress={logout} containerStyles="w-full mt-12"  />

          <View className="flex-row items-center justify-center mt-7">
            <Text className="text-white font-pregular">Don't have an account?</Text>
            <Link href="/sign-up" className="text-white font-psemibold ml-1">Sign Up</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
export default SignIn