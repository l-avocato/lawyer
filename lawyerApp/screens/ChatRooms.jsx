import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { collection, addDoc, getDocs, query, doc, orderBy ,where,limit,onSnapshot} from 'firebase/firestore';
import { FIREBASE_DB } from '../firebaseConfig';
import { ScrollView, TextInput } from 'react-native';
import { Button ,Icon} from 'react-native-elements';

const ChatRooms = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState({}); 

  const handleConversationPress = (conversationId) => {
    navigation.navigate('Chat', { conversationId });
  };

  const conversationsRef = collection(FIREBASE_DB, 'conversations');
  // const messagesRef = collection(FIREBASE_DB, 'chat');

  const getConversations = async () => {
    try {
      const result = await getDocs(conversationsRef);
      const convers = result.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setConversations(convers);

      
  

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getConversations();
    const collectionRef = collection(FIREBASE_DB , 'chats');
    const q = query(collectionRef, orderBy('createdAt', 'desc'));
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const updatedMessages = querySnapshot.docs.map((doc) => ({
          _id: doc.id,
          ...doc.data(),
        }));
        setMessages(updatedMessages);
      });
  
      return () => unsubscribe();
  }, []);

console.log(messages[0]?.text,"say hello");
  // const createConversationsCollection = async () => {
  //   try {
  //     const conversationsRef = collection(FIREBASE_DB, 'conversations');

  //     const sampleConversations = [
  //       { username: 'User A', otherDetails: 'Details for User A conversation' },
  //       { username: 'User B', otherDetails: 'Details for User B conversation' },
  //     ];

  //     for (const conversation of sampleConversations) {
  //       await addDoc(conversationsRef, conversation);
  //     }

  //     console.log('Sample conversations added to Firestore.');
  //   } catch (error) {
  //     console.error('Error adding sample conversations: ', error);
  //   }
  // };

  // useEffect(() => {
  //   createConversationsCollection();
  // }, []);

  return (
    // <View style={styles.container}>
    //   <TextInput
    //     style={styles.searchInput}
    //     placeholder="Search Conversations"
    //     value={searchTerm}
    //     onChangeText={(text) => setSearchTerm(text)}
    //   />

    //   <Button
    //     title="Search"
    //     onPress={() => {
    //       const filteredConversations = conversations.filter((conversation) =>
    //         conversation.username.toLowerCase().includes(searchTerm.toLowerCase())
    //       );
    //       console.log('filtered conversations', filteredConversations);
    //     }}
    //   />
    <View style={styles.container}>
    <View style={styles.header}>
      <Text style={styles.headerText}>Chats</Text>
      <TouchableOpacity>
        <Icon
          name="search"
          type="material"
          color="white"
          size={24}
          onPress={() => {
            
            const filteredConversations = conversations.filter((conversation) =>
              conversation.username.toLowerCase().includes(searchTerm.toLowerCase())
            );
            console.log('filtered conversations', filteredConversations);
          }}
        />
      </TouchableOpacity>
    </View>

    <TextInput
      style={styles.searchInput}
      placeholder="Search Conversations"
      value={searchTerm}
      onChangeText={(text) => setSearchTerm(text)}
    />

      <ScrollView>
        {conversations.map((conversation) => {
          const lastMessage = messages[conversation.id]?.[0]?.message; 
          return (
            <TouchableOpacity
              key={conversation.id}
              style={styles.conversation}
              onPress={() => handleConversationPress(conversation.id)}
            >
              <Image
                style={styles.userPicture}
                source={{ uri: 'https://i.pravatar.cc/300' }}
              />

              <View style={{ flex: 1 }}>
                <Text style={styles.username}>{conversation.username}</Text>

                {messages[0]?.text && (
                  <Text style={styles.lastMessage}>
                    {messages[0]?.text.length > 30
                      ? `${messages[0]?.text.substring(0, 30)}...`
                      : messages[0]?.text}
                  </Text>
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop:50,
        backgroundColor:'black'
      },
      header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginTop: 10,
      },
      headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
      },
      conversation: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#fff',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        // borderRadius:40,
        marginTop:5,
        borderBottomRightRadius:7
      },
      userPicture: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
      },
      username: {
        fontSize: 18,
        fontWeight: 'bold',
      },
      searchBar: {
        marginTop: 20,
        width: '100%',
        borderColor: '#ccc',
        borderWidth: 1,
      },
      searchInput: {
        height: 40,
        padding: 10,
        backgroundColor: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
      },
      button: {
        backgroundColor: '#007bff',
        width: '100%',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
      },
});

export default ChatRooms;



