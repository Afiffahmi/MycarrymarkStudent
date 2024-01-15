import { View, Text } from 'react-native'
import React from 'react'
import { Button } from 'react-native';
import { Appbar } from 'react-native-paper';

const Details = ({route,navigation}:any) => {
  const {item} = route.params;
  return (
    <View>
      <Text>{item.courseName}</Text>
      
    </View>
  )
}



export default Details