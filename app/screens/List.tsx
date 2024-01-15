import { View, Text, Button, FlatList, TextInput } from 'react-native'
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

interface Student {
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
  students: Student[];
}

const List = ({navigation,route}: any) => {
  const [data,setData] = useState<Class[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState<Class[]>([]);
  const user = route.params.user;
  useEffect(() => {
  fetch('https://mycarrymark-node-afiffahmis-projects.vercel.app/class/list')
    .then((response) => response.json()).then((json) => {setData(json);setFilteredData(json)});
    console.log(user);
  },[]);

  const currentUser = user.email;
  return (
    <View >
      <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
      onChangeText={text => setSearchTerm(text)}
      value={searchTerm}
      placeholder="Search"
    />
    <Button
      title="Search"
      onPress={() => {
        const result = data.filter(item => item.courseCode.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredData(result);
      }}
    />
      <FlatList
  data={filteredData}
  keyExtractor={({ id }, index) => id}
  renderItem={({ item }) => ( 
    item.students.some(student => student.email === currentUser) ? (
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
    </Card>) : null

  )}
/>
    </View>
  )
}

export default List