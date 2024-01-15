import { View, Text } from 'react-native'
import React from 'react'

const Details = ({route}:any) => {
  const {item} = route.params;
  return (
    <View>
      <Text>{item.courseName}</Text>
      
    </View>
  )
}



export default Details