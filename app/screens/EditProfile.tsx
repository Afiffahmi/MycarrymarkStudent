import React, { useState } from 'react';
import { View, Text,StyleSheet, Image } from 'react-native';
import { TextInput, Button, Appbar,Snackbar } from 'react-native-paper';
import { NavigationProp } from '@react-navigation/native';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import { Camera, CameraType } from 'expo-camera';
import { Platform } from 'react-native';
import { ActivityIndicator } from 'react-native';



interface RouterProps {
    navigation : NavigationProp<any,any>;
}

type InputValues = {
  name: string;
  studentid: string;
  [key: string]: string; // This is the index signature
};

const EditProfile = ({route,navigation}:any) => {
  const [permission, requestPermission] = Camera.useCameraPermissions();
    const {user} = route.params;
    const [image, setImage] = useState('https://cvhrma.org/wp-content/uploads/2015/07/default-profile-photo.jpg');
    const [inputValues, setInputValues] = React.useState<InputValues>({
        name: '',
        studentid: '',
      });
const [email, setEmail] = useState(user.email);
const[reload,setReload] = useState(false);
const [successful, setSuccessful] = useState(false);
const [result, setResult] = useState('');
const [loading, setLoading] = useState(false);

React.useEffect(() => {
    fetchData();
    
  }, [reload]); 


  

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://mycarrymark-node-afiffahmis-projects.vercel.app/auth/${email}/studentprofile`);
      const data = response.data;
      setInputValues({
        name: data.name,
        studentid: data.studentid,
      });
      setImage(data.avatar);
      setReload(false);
    } catch (error) {
      console.error(error);
    }
  };

  const selectImage = async () => {
    await ImagePicker.requestMediaLibraryPermissionsAsync();
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    }) as ImagePicker.ImagePickerResult;
    
    
    
    if (!result.canceled) {
      setResult(result.assets[0].uri);
      
      console.log(result);
      setImage(result.assets[0].uri);
    }
  };

  const handleInputChange = (key: string, value: string) => {
    setInputValues({
      ...inputValues,
      [key]: value,
    });
  };

  const updateData = async () => {
    setLoading(true);

 
        try {
          const formData = new FormData();
      
          if (result) {
            // If an image is selected, append image data to FormData

          
            
          
            formData.append('filename', {
              uri: result,
              name: 'profile.jpg',
              type: 'image/jpg',
            } as any);
          }

          // Append other input values to FormData
          Object.keys(inputValues).forEach((key) => {
            formData.append(key, inputValues[key]);
          });
      
          const formAction = `https://mycarrymark-node-afiffahmis-projects.vercel.app/auth/${email}/studentprofile`;
          const formMethod = 'POST';
      
          fetch(formAction, {
            method: formMethod,
            body: formData,
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
              setLoading(false);
              setSuccessful(true);
              setReload(true);
            })
            .catch((error) => {
              console.error(error);
            });
        } catch (error) {
          console.error(error);
        }
      };
   

  
  

    
  const onDismissSnackBar = () => setSuccessful(false);


  return (
    <View>
    
    <Appbar.Header>
    <Appbar.Action icon='arrow-left' onPress={() => navigation.goBack()} />
    <Appbar.Content title="Edit Profile" />
    </Appbar.Header>
    {loading ? (
  <View style={{ height:'100%',position: 'absolute', top: 60, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', zIndex: 1,backgroundColor:'rgba(0, 0, 0, 0.3)' }}>
    
    <ActivityIndicator size="large" color="#0000ff" />
  </View>
) : null}
    <View>
    <Image source={{uri:image}} style={{width: 100, height: 100, top:20,alignSelf:'center',borderRadius:50}}/>
    <View style={styles.container}>
      
    
      
    <Button onPress={selectImage} >Select Image</Button>
    <Text style={styles.label}>Full Name</Text>
    <TextInput
  placeholder='Enter your name'
  style={styles.input}
  value={inputValues.name}
  onChangeText={(text: string) => handleInputChange('name', text)}
/>

      <Text style={styles.label}>Student ID</Text>
      <TextInput
  placeholder='Enter your Student ID'
  style={styles.input}
  value={inputValues.studentid}
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
      

      <Button style={{top:30}} mode='elevated' onPress={updateData} >Save Changes</Button>
    </View>
    <Snackbar
        visible={successful}
        style={{backgroundColor:'#FF8080',position:'absolute',top:0,zIndex:15,width:'80%', marginHorizontal:20,alignSelf:'center'}}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'Close',
          onPress: () => {
            // Do something
          },
        }}>
        Profile Successfully Updated.
      </Snackbar>
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
    borderRadius: 2,
    marginBottom: 10,
  },
});

export default EditProfile;