import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './app/screens/Login';
import List from './app/screens/List';
import Details from './app/screens/Details';
import {User, onAuthStateChanged} from 'firebase/auth';
import { FIREBASE_AUTH } from './FirebaseConfig';

const InsideStack = createNativeStackNavigator();

function InsideLayout() {
  return (
    <InsideStack.Navigator>
      <InsideStack.Screen name="List" component={List} />
      <InsideStack.Screen name="Details" component={Details} />
    </InsideStack.Navigator>
  );
}

const Stack = createNativeStackNavigator();
export default function App() {
  const [user,setUser] = React.useState<User | null>(null);
  React.useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
    })
  }, [])
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        {user ? <Stack.Screen name="Inside" component={InsideLayout} options={{headerShown : false}}/> 
        : <Stack.Screen name="Login" component={Login} options={{headerShown : false}}/>}

      </Stack.Navigator>
    </NavigationContainer>
  );
}


