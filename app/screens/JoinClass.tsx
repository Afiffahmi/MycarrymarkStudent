import React, { useState,useEffect } from 'react';
import {Text, TextInput, Button } from 'react-native-paper';
import { View, StyleSheet,Image, SafeAreaView } from 'react-native';
import { Banner,IconButton,MD3Colors } from 'react-native-paper';
import axios from 'axios';
import { ActivityIndicator } from 'react-native';


const JoinClass = ({navigation,route}:any) => {
  const [classCode, setClassCode] = useState('');
  const [visible, setVisible] = React.useState(true);
  const [message, setMessage] = React.useState('Please get the class code from your lecturer');
  const [inputValues, setInputValues] = React.useState({
    name: '',
    studentid: '',
    avatar: '',
  })
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const {user} = route.params;

  useEffect(() => {
    fetchData();
  },[])

  const handleJoin = async () => {
    setLoading(true);
    try {
      if (classCode.length < 6 && classCode.length > 0) {
        const data = {
          email: user.email,
          name: inputValues.name,
          studentId: inputValues.studentid,
          shordId: classCode,
        };
  
        const response = await axios.post(
          `https://mycarrymark-node-afiffahmis-projects.vercel.app/class/${classCode}/join`,
          data
        );
  
        setMessage(response.data.message);
        setVisible(true);
      }else if (classCode.length > 5){
        setMessage('Class code only have 5 letters');
        setVisible(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://mycarrymark-node-afiffahmis-projects.vercel.app/auth/${user.email}/studentprofile`);
      const data = response.data;
      setInputValues({
        name: data.name,
        studentid: data.studentid,
        avatar: data.avatar,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView>
      {loading ? (
  <View style={{ height:'100%',position: 'absolute', top: 60, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', zIndex: 1 }}>
    
    <ActivityIndicator size="large" color="#0000ff" />
  </View>
) : null}
              <View style={{flexDirection: 'row',position:'absolute'}}>
              
      <IconButton
  icon="arrow-left"
  iconColor={MD3Colors.tertiary80}
  size={25}
  mode='contained-tonal'
  onPress={() => navigation.goBack()} 
/>
</View>
        <Banner
        style={{margin: 'auto'}}
      visible={visible}
      theme={{ colors: { primary: 'red'} }}
      actions={[
        {
          label: 'Okay',
          onPress: () => setVisible(false),
        },
      ]}
      icon='information-outline'>
      <Text style={{ lineHeight: 20, fontSize: 14 }}>{message}</Text>
    </Banner>
    <View style={styles.container}>
        
      <Text style={styles.label}>Enter Class Code</Text>
      <TextInput
        style={styles.input}
        value={classCode}
        onChangeText={setClassCode}
        
      />

      <Button style={{marginTop:20,width:'50%'}} onPress={handleJoin} mode='contained' buttonColor='#FF8080'> Join Class!</Button>
      <Button style={{marginTop:15}} onPress={()=>{navigation.goBack()}}  > Cancel</Button>
    </View></SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
marginTop: '30%',
    alignItems: 'center',
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 0,
    fontSize: 18,
    borderRadius: 6,
    width: '80%',
  },
});

export default JoinClass;