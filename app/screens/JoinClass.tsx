import React, { useState } from 'react';
import {Text, TextInput, Button } from 'react-native-paper';
import { View, StyleSheet,Image, SafeAreaView } from 'react-native';
import { Banner,IconButton,MD3Colors } from 'react-native-paper';

const JoinClass = ({navigation,route}:any) => {
  const [classCode, setClassCode] = useState('');
  const [visible, setVisible] = React.useState(true);

  const handleJoin = () => {
    // Handle the join class logic here
  }

  return (
    <SafeAreaView>
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
      <Text style={{ lineHeight: 20, fontSize: 14 }}>Please get the class code from your lecturer</Text>
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