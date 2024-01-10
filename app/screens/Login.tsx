import { View, Text, StyleSheet, TextInput, Button, KeyboardAvoidingView } from 'react-native'
import React from 'react'
import { FIREBASE_AUTH } from '../../FirebaseConfig'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'


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
        <Button title='Login' onPress={signIn}></Button>
        <Button title='Create account' onPress={signUp}></Button>
        </>}
        </KeyboardAvoidingView>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        flex: 1,
        justifyContent: 'center',
    },
    input: {
        height: 50,
        marginVertical: 4,
        borderWidth: 1,
        padding: 10,
        borderRadius: 4,
        backgroundColor: '#fff',
    },

})