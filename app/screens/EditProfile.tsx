import React, { useState } from 'react';
import { View, Text,StyleSheet } from 'react-native';
import { TextInput, Button, Appbar } from 'react-native-paper';
import { MD3Colors } from 'react-native-paper';
import { IconButton } from 'react-native-paper';
import { NavigationProp } from '@react-navigation/native';
import App from '../../App';

interface RouterProps {
    navigation : NavigationProp<any,any>;
}

const EditProfile = ({route,navigation}:any) => {
    const {user} = route.params;
const [name, setName] = useState('');
const [studentid, setStudentid] = useState('');
const [email, setEmail] = useState(user.email);


  const handleSave = () => {
    // Save the changes here
  }

  return (
    <View>
    <Appbar.Header>
    <Appbar.Action icon='arrow-left' onPress={() => navigation.goBack()} />
    <Appbar.Content title="Edit Profile" />
    </Appbar.Header>
    <View style={styles.container}>

      <Text style={styles.label}>Name</Text>
      <TextInput
        placeholder='Enter your name'
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Student ID</Text>
      <TextInput
        placeholder='Enter your student ID'
        style={styles.input}
        value={studentid}
        onChangeText={setStudentid}
      />
<Text style={styles.label}>Email</Text>
<TextInput
        placeholder='Enter your email'
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        disabled
      />
      

      <Button style={{top:80}} mode='elevated' onPress={handleSave} >Save Changes</Button>
    </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    
    padding: 20,
    top: 0,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: '#666',
  },
  input: {
    borderWidth: 0,
    borderColor: '#ddd',
    padding: 0,
    fontSize: 15,
    borderRadius: 6,
    marginBottom: 10,
  },
});

export default EditProfile;