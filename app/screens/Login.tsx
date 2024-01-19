import { View, StyleSheet, KeyboardAvoidingView, Image } from 'react-native'
import React from 'react'
import { FIREBASE_AUTH } from '../../FirebaseConfig'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigation } from '@react-navigation/native'
import { Text,Button,TextInput } from 'react-native-paper'

const Login = () => {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [loading, setLoading] = React.useState(false);
    const auth = FIREBASE_AUTH;

const signIn = async () => {
    try {
        const user = await signInWithEmailAndPassword(auth,email, password);
        console.log(user);
    } catch (error:any) {
        console.log(error);
        alert('Sign in failed :' + error.message)
    } finally {
        setLoading(false);
    
    }

}

const signUp = async () => {
    try {
        const user = await createUserWithEmailAndPassword(auth, email, password);
        console.log(user);
    } catch (error:any) {
        console.log(error);
        alert('Sign up failed :' + error.message)
    } finally{
        setLoading(false);
    
    }

}
  return (
    <View style={styles.container}>
        <Image style={{width: 250, height: 90, alignSelf: 'center', bottom:30}} source={require('../../assets/logo.png')}/>
        <Text style={{alignSelf:'center',fontSize:18,fontWeight:'200',bottom:20}}>Student view </Text>
        <KeyboardAvoidingView behavior='padding'>
      <TextInput
        style={styles.input}
        placeholder='Email'
        value={email}
        autoCapitalize='none'
        onChangeText={(text)=> setEmail(text)}></TextInput>
        <TextInput 
        style={styles.input}
        placeholder='Password'
        value={password}
        secureTextEntry
        autoCapitalize='none'
        onChangeText={(text)=> setPassword(text)}></TextInput>
        
        {loading ? <Text>Loading...</Text> : <>
        <Button style={{top:10,marginHorizontal:20}} mode='contained' onPress={signIn} buttonColor='#FF8080'>Sign in</Button>
        <Button style={{top:10}}  onPress={signUp} textColor='#963c3c'>Create an account</Button>
        </>}
        </KeyboardAvoidingView>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
    container: {
        
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    input: {
        marginHorizontal: 20,
        height: 50,
        marginVertical: 4,
        borderRadius: 4,
        backgroundColor: '#fff',
    },

})