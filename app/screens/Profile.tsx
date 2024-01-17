import { View, Text, Image, StyleSheet,Button } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import {FIREBASE_AUTH} from '../../FirebaseConfig';
import { Card } from 'react-native-paper';
import { NavigationProp } from '@react-navigation/native';

interface RouterProps {
  navigation : NavigationProp<any,any>;
}

const Profile = ({navigation,route}:any) => {
  const {user} = route.params;


  return (
    <View style={styles.container}>
      <Card style={{width:'85%'}}>
      
      <Text style={styles.name}>{user.email}</Text>
      <Text style={styles.email}>{user.email}</Text>
      <Button 
  title="Edit Profile" 
  onPress={() => navigation.navigate('EditProfile', { user: user })}
/>
      <Button title="Logout" onPress={() => {FIREBASE_AUTH.signOut()}} /></Card>
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
  },
  name: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  email: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default Profile