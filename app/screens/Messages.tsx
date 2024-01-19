import { View, Text,ScrollView } from 'react-native'
import React from 'react'
import { Card,IconButton,MD3Colors } from 'react-native-paper'


const Messages = ({route,navigation}:any) => {
const { selectedForum } = route.params;
  return (
    <ScrollView>
        <IconButton
          icon="arrow-left"
          iconColor={MD3Colors.tertiary80}
          size={25}
          mode="contained-tonal"
          onPress={() => navigation.goBack()}
        />
    <View>
      <Card mode='contained' style={{backgroundColor:'transparent'}}>
          <Card.Title title={selectedForum?.title} />

          {selectedForum?.messages.sort((a:any, b:any) => a.timestamp - b.timestamp).map((message:any) => (
  <Card key={message.id} style={{ margin: 15, backgroundColor:'#ffd6d6' }}>
    <Card.Content>
      <Text style={{ color: 'black' }}>{message.content}</Text>
    </Card.Content>
    <Card.Actions>
      <Text style={{ color: 'black' }}>
        {new Date(message.timestamp).toLocaleString()}
      </Text>
    </Card.Actions>
  </Card>
))}

        </Card>
    </View></ScrollView>
  )
}

export default Messages