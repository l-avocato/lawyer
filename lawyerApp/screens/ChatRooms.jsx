import React from 'react';
import { View, FlatList } from 'react-native';
import Chat from './Chat'; 

const ChatRooms = ({ chatRoomsData }) => {
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={chatRoomsData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Chat chatRoomData={item} />
        )}
      />
    </View>
  );
};

export default ChatRooms;

