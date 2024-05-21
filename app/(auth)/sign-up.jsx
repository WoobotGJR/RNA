import { ScrollView, StyleSheet, Text, View, Image, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { images } from "../../constants"
import { useState } from 'react';
import CustomFormField from "../../components/CustomFormField";
import CustomButton from '@/components/CustomButton';
import { Link, router } from 'expo-router';
import { createUser } from '@/lib/appwrite';
import { useGlobalContext } from '@/context/GlobalProvider';
 
const SignUp = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false)

  const {setUser, setIsLogged} = useGlobalContext();

  const submit = async () => {
    if (!form.username || !form.email || !form.password) {
      Alert.alert("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await createUser(form.username, form.email, form.password);

      setUser(response);
      setIsLogged(true);

      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full items-center justify-center h-full px-4 my-10">
          <Image source={images.logo} resizeMode='contain' className="w-[130px] h-[84px]" />
          <Text className="text-xl text-white font-semibold text-center mt-4">Sign up to Aora</Text>

          <CustomFormField title="Username" placeholder="Enter your username"
          value={form.username} handleChangeText={(text) => setForm({ ...form, username: text })}
          otherStyles="mt-7 w-full" />

          <CustomFormField title="Email" placeholder="Enter your email"
          value={form.email} handleChangeText={(text) => setForm({ ...form, email: text })}
          keyboardType="email-address" otherStyles="mt-7 w-full" />

          <CustomFormField title="Password" placeholder="Enter your password" 
          value={form.password} handleChangeText={(text) => setForm({ ...form, password: text })}
          keyboardType="password" otherStyles="mt-7 w-full" />

          <CustomButton title="Sign up" isLoading={isSubmitting}
          handlePress={submit} containerStyles="w-full mt-12"  />

          <View className="flex-row items-center justify-center mt-7">
            <Text className="text-white font-pregular">Already have an account?</Text>
            <Link href="/sign-in" className="text-white font-psemibold ml-1">Sign In</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
export default SignUp