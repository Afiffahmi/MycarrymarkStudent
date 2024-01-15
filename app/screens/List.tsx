import { View, Text, Button, FlatList } from 'react-native'
import React, {useEffect, useState} from 'react'
import { NavigationProp } from '@react-navigation/native';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { Card } from 'react-native-paper'
import { TouchableOpacity } from 'react-native-gesture-handler';

interface RouterProps {
    navigation : NavigationProp<any,any>;
}

interface Lecturer {
  email: string;
}
interface Class {
  id: string;
  courseCode: string;
  courseName: string;
  groupClass: string;
  nStudent: number;
  lecturers: Lecturer[];
  selectedImage : string;
  predictive: boolean;
}

const List = ({navigation}: RouterProps) => {
  const [data,setData] = useState<Class[]>([]);

  useEffect(() => {
  fetch('https://mycarrymark-node-afiffahmis-projects.vercel.app/class/list')
  .then((response) => response.json()).then((json) => setData(json));
  });

  return (
    <View >
      <FlatList
  data={data}
  keyExtractor={({ id }, index) => id}
  renderItem={({ item }) => (
    <Card style={{margin: 15}}>
      <Card.Cover source={{ uri: item.selectedImage }} />
      <Card.Title title={item.courseCode} subtitle={item.courseName} titleVariant='titleMedium'/>
      <Card.Content>
        <Text >{item.groupClass}</Text>
        <Text>{item.lecturers[0].email}</Text>
      </Card.Content>
      
      <Card.Actions>
        <Button onPress={() => navigation.navigate('Details',{item})} title='Open Details'/>
      </Card.Actions>
    </Card>

  )}
/>
    </View>
  )
}

export default List