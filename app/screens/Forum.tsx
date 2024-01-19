
import React from 'react'
import { IconButton, MD3Colors } from 'react-native-paper'
import { NavigationProp } from '@react-navigation/native'
import axios from 'axios';
import { useEffect } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { Card, List, Divider, Button, TextInput, Text,Chip } from 'react-native-paper';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useNavigation } from '@react-navigation/native';


interface Forums {
    avatar: string;
    name: string
    title: string;
    sender: string
    messages: [{id: string,content : string, sender : string,timestamp : number}]
    id : string
  }
  
  

const Forum = ({route,navigation}:any) => {
    const [selectedId, setSelectedId] = React.useState(null);
    const [reload, setReload] = React.useState(false);
    const [message, setMessage] = React.useState('');
    const [forum, setForum] = React.useState<Forums[]>([]);
    const [selectedForum, setSelectedForum] = React.useState<Forums | null>(null);
    const {item} = route.params;
    useEffect(() => {
        axios({
          method: "get",
          url: `https://mycarrymark-node-afiffahmis-projects.vercel.app/class/${item.id}/forum`,
        }).then((response) => {
            setForum(response.data);
            forum.map((item:any) => (
              item.id === selectedForum?.id ? setSelectedForum(item) : null
            ))
        }); },[]);

  return (
<ScrollView style={{ flex: 1, width: '100%' }}>
      <View>
      <View style={{ flexDirection: "row" }}>
        <IconButton
          icon="arrow-left"
          iconColor={MD3Colors.tertiary80}
          size={25}
          mode="contained-tonal"
          onPress={() => navigation.goBack()}
        />
      </View>
      
        <List.Section title="Forum"
        >
  {forum.map((item) => (
    <React.Fragment key={item.id}>
      <List.Item 
      title={item.title}
      left={() => <List.Icon icon="forum" />}
  onPress={() => {
    setSelectedForum(item);
    navigation.navigate('Messages', { selectedForum: item });
  }}
  style={{
    backgroundColor: item === selectedForum ? '#ea6e6e' : 'transparent',
    margin: 5,
    padding: 5,
    borderRadius: 5,
  }}
/>

      <Divider />
    </React.Fragment>
  ))}
</List.Section>

        
      </View>
    </ScrollView>
  )
}

export default Forum