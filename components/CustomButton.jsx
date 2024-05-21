import { Text, TouchableOpacity } from 'react-native'

const CustomButton = ({ title, handlePress, containerStyles, textStyles, isLoading }) => {
  return (
    <TouchableOpacity onPress={handlePress}
    activeOpacity={0.8}
    className={`bg-secondary rounded-xl w-[130px] min-h-[50px] items-center justify-center ${containerStyles} 
                ${isLoading ? "opacity-50" : "opacity-100"}`} disabled={isLoading}
    >
        <Text className={`text-primary font-semibold text-lg ${textStyles}`}>{title}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton