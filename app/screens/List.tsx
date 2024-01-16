import { View, Text, Button, FlatList, TextInput } from 'react-native'
import React, {useEffect, useState} from 'react'
import { NavigationProp } from '@react-navigation/native';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { Card } from 'react-native-paper'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FAB } from 'react-native-paper';
import { StyleSheet } from 'react-native';

interface RouterProps {
    navigation : NavigationProp<any,any>;
}

interface Lecturer {
  email: string;
}

interface Student {
  email: string;
  studentid: string;
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
  const styles = StyleSheet.create({
    fab: {
      position: 'absolute',
      margin: 16,
      right: 0,
      bottom: 0,
    },
  })
  const currentUser = user.email;
  return (
    <View style={{paddingBottom:80}}>
        
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
      <Button onPress={() => {
  const student = item.students.find(student => student.email === currentUser);
  if (student) {
    const studentId = student.studentid;
    navigation.navigate('Details', {item, studentId});
  } else {
    // Handle the case where the student is not found
    console.log('Student not found');
  }
}} title='Open Details'/>
      </Card.Actions>
    </Card>) : null

  )}
/>
    </View>
  )
}

export default List