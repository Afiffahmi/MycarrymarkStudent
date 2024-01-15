import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './app/screens/Login';
import List from './app/screens/List';
import Details from './app/screens/Details';
import {User, onAuthStateChanged} from 'firebase/auth';
import { FIREBASE_AUTH } from './FirebaseConfig';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from './app/screens/Profile';
import { Ionicons } from '@expo/vector-icons';
import { Appbar } from 'react-native-paper';
import { Image } from 'react-native';



const InsideStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
function InsideLayout({route}:any) {
  const user = route.params.user;
  return (
    <>
    <Appbar.Header>
    <Appbar.Content 
          title={<Image source={require('./assets/logo.png')} style={{ width: 150, height: 80 }} />} 
          style={{alignItems: 'center'}}
        />
    </Appbar.Header>
    <InsideStack.Navigator>
      <InsideStack.Screen name="List" component={List} initialParams={{user: user}} options={{headerShown:false}}/>
      <InsideStack.Screen name="Details" component={Details} options={{headerShown:false}}/>
    </InsideStack.Navigator></>
  );
}

function TabLayout({route}:any) {
  const user = route.params.user;
  return (
    <Tab.Navigator
      initialRouteName='Home'
      screenOptions={{headerShown : false}}
    >
      <Tab.Screen name="Home" component={InsideLayout}  initialParams={{user:user}}
      options={{title:'Home', tabBarIcon: ({focused, color, size}) => (
        <Ionicons name="home" size={size} color={color} />
      )}}
      />
      <Tab.Screen name="Profile" component={Profile} options={{
        title:'Profile', tabBarIcon: ({focused, color, size}) => (
          <Ionicons name="person" size={size} color={color} />
        )
      }}
       />
    </Tab.Navigator>
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
      <Stack.Navigator initialRouteName='Login' screenOptions={{headerShown:false}}>
        {user ? <Stack.Screen name="Home" component={TabLayout} initialParams={{user:user}} options={{headerShown : false}}/> 
        : <Stack.Screen name="Login" component={Login} options={{headerShown : false}}/>}

      </Stack.Navigator>
    </NavigationContainer>
  );
}


