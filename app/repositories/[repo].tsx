import { useLocalSearchParams } from 'expo-router'
import React from 'react'
import { Text, View } from 'react-native'

function Repository() {
    const {repo}=useLocalSearchParams();
  return (
    <View>
      <Text>{repo}</Text>
    </View>
  )
}

export default Repository
