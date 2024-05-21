import { useState } from 'react'
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

import { icons } from "../constants"

const CustomFormField = ({ title, otherStyles, placeholder,
     value, handleChangeText, keyboardType }) => {
        const [showPassword, setShowPassword] = useState(false)

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-gray-100 font-pmedium">{title}</Text>
        <View className="border-2 border-gray-300 rounded-lg w-full px-4 py-2 focus:border-secondary">
          <TextInput
            placeholder={placeholder}
            value={value}
            onChangeText={handleChangeText}
            keyboardType={keyboardType}
            className="text-base text-gray-100 font-pregular"
            placeholderTextColor={"#9CA3AF"}
            secureTextEntry={title==="Password" && !showPassword}
          />

          {title==="Password" && (
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Image
                source={showPassword ? icons.eyeHide : icons.eye}
                className="w-7 h-7 absolute right-0 bottom-0 bg-primary px-1 py-1" resizeMode='contain'
              />
            </TouchableOpacity>
          )}
        </View>
    </View>
  )
}
export default CustomFormField