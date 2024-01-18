import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import {FIREBASE_AUTH} from '../../FirebaseConfig';
import { Card, Button } from 'react-native-paper';
import { NavigationProp } from '@react-navigation/native';
import axios from 'axios';
import { useEffect, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient';

interface RouterProps {
  navigation : NavigationProp<any,any>;
}

const Profile = ({navigation,route}:any) => {
  const {user} = route.params;
  const [inputValues, setInputValues] = React.useState({
    name: '',
    studentid: '',
    avatar: '',
  })

  React.useEffect(() => {
    fetchData();
    
  }, []); 

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
    <View style={styles.container}>
      <Image source={{uri:'https://previews.123rf.com/images/mirquurius/mirquurius1703/mirquurius170300136/75166496-space-background-with-cosmic-objects-hand-drawn-vector-illustration.jpg'}} style={styles.wallpaperimage} />
      <LinearGradient
        colors={['transparent', 'purple']}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: '50%',
        }}
      />
      <Image source={require('../../assets/logo.png')} style={{ width: 150, height: 80 , bottom: 50}} />
      <Card style={{width:'85%'}}>
      <Card.Title title="Student Profile" titleStyle={{textAlign:'center',fontSize:18,fontWeight:'500',color:'white'}}/>
      <Image style={styles.image} source={{ uri: inputValues.avatar || 'https://cvhrma.org/wp-content/uploads/2015/07/default-profile-photo.jpg'}} />
      <Image style={styles.backgroundimage} source={{ uri: 'https://cdn.dribbble.com/users/1770290/screenshots/6183149/bg_79.gif' }} />
      <Text style={styles.name}>{inputValues.name || ''}</Text>
      <Text style={styles.email}>{inputValues.studentid || ''}</Text>
      <Text style={styles.email}>{user.email}</Text>
      <Button 
      icon='account-edit'
  onPress={() => navigation.navigate('EditProfile', { user: user })}
>Edit Profile</Button>
      <Button onPress={() => {FIREBASE_AUTH.signOut()}} icon='logout'>Logout</Button></Card>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    border: '5px solid white',
  },
  backgroundimage: {
    width: '100%',
    height: '40%',
    zIndex: -1,
    alignSelf: 'center',
    position: 'absolute',
    borderRadius: 15,
  },

  wallpaperimage: {
    width: '100%',
    height: '30%',
    zIndex: -1,
    alignSelf: 'center',
    position: 'absolute',
    borderRadius: 15,
  },
  name: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    fontWeight: 'bold',
  },
  email: {
    textAlign: 'center',
    color: 'grey',
    marginBottom: 5,
  },
});

export default Profile