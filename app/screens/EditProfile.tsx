import React, { useState } from 'react';
import { View, Text,StyleSheet } from 'react-native';
import { TextInput, Button, Appbar } from 'react-native-paper';
import { NavigationProp } from '@react-navigation/native';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import { Platform } from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob';



interface RouterProps {
    navigation : NavigationProp<any,any>;
}

const EditProfile = ({route,navigation}:any) => {
    const {user} = route.params;
    const [inputValues, setInputValues] = React.useState({
        name: '',
        studentid: '',
      });
const [email, setEmail] = useState(user.email);
const[reload,setReload] = useState(false);
const [successful, setSuccessful] = useState(false);
React.useEffect(() => {
    fetchData();
    
  }, [reload]); 

  

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://mycarrymark-node-afiffahmis-projects.vercel.app/auth/${email}/profile`);
      const data = response.data;
      setInputValues({
        name: data.name,
        studentid: data.studentid,
      });
      console.log(data);
      setReload(false);
    } catch (error) {
      console.error(error);
    }
  };

  const selectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    }) as ImagePicker.ImagePickerResult;
    
    console.log(result);
    
    if (!result.canceled) {
      // If the user didn't cancel the image picker, you can use the result.uri property to get the selected image
      console.log(result.assets[0].uri);
    }
  };

  const handleInputChange = (field: string,value:string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValues({
      ...inputValues,
      [field]: event.target.value,
    });
  };

  const updateData = async () => {
    try {
      const response = await axios.post(`https://mycarrymark-node-afiffahmis-projects.vercel.app/auth/${email}/profile`, inputValues);
      console.log(response.data);
      setSuccessful(true);
      setReload(true);
      
    } catch (error) {
      console.error(error);
    }

  };



  return (
    <View>
    <Appbar.Header>
    <Appbar.Action icon='arrow-left' onPress={() => navigation.goBack()} />
    <Appbar.Content title="Edit Profile" />
    </Appbar.Header>
    <View style={styles.container}>
    <Button onPress={selectImage} >Select Image</Button>

    <TextInput
  placeholder='Enter your name'
  style={styles.input}
  value={inputValues.name || ''}
  onChangeText={(text: string) => handleInputChange('firstName', text)}
/>

      <Text style={styles.label}>Student ID</Text>
      <TextInput
  placeholder='Enter your name'
  style={styles.input}
  value={inputValues.studentid || ''}
  onChangeText={(text: string) => handleInputChange('studentid', text)}
/>
<Text style={styles.label}>Email</Text>
<TextInput
        placeholder='Enter your email'
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        disabled
      />
      

      <Button style={{top:80}} mode='elevated' onPress={updateData} >Save Changes</Button>
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