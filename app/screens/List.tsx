import { View, Text,FlatList, TextInput } from 'react-native'
import React, {useEffect, useState} from 'react'
import { NavigationProp } from '@react-navigation/native';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { Card } from 'react-native-paper'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FAB,IconButton } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import JoinClass from './JoinClass';
import { LinearGradient } from 'expo-linear-gradient';

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
  const dataWithCurrentUser = data.filter(item => item.students.some(student => student.email === currentUser));
  return (
    <View style={{paddingBottom:100}}>
        <LinearGradient
        colors={['transparent', 'grey']}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: '100%',
        }}
      />
        <View style={{ flexDirection: 'row', alignItems: 'center', margin: 5 }}>
  <TextInput
    style={{ flex: 1, height: 40, borderColor: 'gray', borderWidth: 1, borderRadius: 10, marginRight: 10, marginLeft:10 }}
    onChangeText={text => setSearchTerm(text)}
    value={searchTerm}
    placeholder=" Search by Course Code"
  />
  <IconButton
  style={{position:'absolute',right: 2}}
    icon="magnify"
    onPress={() => {
      const result = data.filter(item => item.courseCode.toLowerCase().includes(searchTerm.toLowerCase()));
      setFilteredData(result);
    }}
  />
</View>
<Button onPress={() =>{
  navigation.navigate('JoinClass', {user:user});
  
}}mode='elevated' elevation={2} icon='google-classroom' style={{marginHorizontal:40,marginTop:5}} buttonColor='#FF8080' textColor='white'>Join Class</Button>
{dataWithCurrentUser.length === 0 ? (
        <Text style={{alignItems:'center',textAlign:'center',top:'50%'}}>Please join class</Text>
      ) : (
        <FlatList
          data={dataWithCurrentUser}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <Card style={{margin: 15}}>
              <Card.Cover source={{ uri: item.selectedImage }} />
              <Card.Title title={item.courseCode} subtitle={item.courseName} titleVariant='titleMedium'/>
              <Card.Content>
                <Text style={{color:'grey'}}>{item.groupClass}</Text>
                <Text style={{color:'grey'}}>{item.lecturers[0].email}</Text>
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
        }} mode='text' icon='eye' >View Class</Button>
              </Card.Actions>
            </Card>
          )}
        />
      )}
    
    </View>
  )
}

export default List