import React, { useState, useEffect } from 'react';
import { GiftedChat, Send, Bubble } from 'react-native-gifted-chat';
import { TouchableOpacity, View, StyleSheet, Alert, Image, Text, Linking } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';
import { collection, addDoc, orderBy, query, onSnapshot, serverTimestamp,where,getDocs } from 'firebase/firestore';
import { FIREBASE_DB, FIREBASE_AUTH } from '../firebaseConfig';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Icon } from 'react-native-elements';
import * as DocumentPicker from 'expo-document-picker';

const Chat = ({ route }) => {
  const { item } = route.params;
  const [messages, setMessages] = useState([]);
  const [roomId, setRoomId] = useState('');
  const [conversations, setConversations] = useState([]);

  const makePhoneCall = () => {
    if (item.phoneNumber) {
      Linking.openURL(`tel:${item.phoneNumber}`);
    } else {
      console.log('Phone number not available');
    }
  };

  const handleCameraIconPress = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Camera permission is required to take a photo.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images });

    if (!result.canceled) {
      const newMessage = {
        text: '',
        image: result.assets[0].uri,
      };

      onSend([newMessage]);
    }
  };


  const onSend = async (newMessages = []) => {
    const formattedMessages = newMessages.map((message) => ({
      ...message,
      createdAt: serverTimestamp(),
      user: {
        _id: FIREBASE_AUTH?.currentUser?.email,
        avatar: 'https://i.pravatar.cc/300',
      },
      roomId: roomId, // Use the current roomId
    }));

    await Promise.all(formattedMessages.map((message) => addDoc(collection(FIREBASE_DB, 'chats'), message)));
    // Do not add a new conversation entry for every message
  };

  // const fetchRoomId = async () => {
  //   try {
  //     // Check if there is an existing conversation with the selected lawyer
  //     const querySnapshot = await getDocs(
  //       query(collection(FIREBASE_DB, 'conversations'), where('lawyerId', '==', item.id))
  //     );

  //     if (!querySnapshot.empty) {
  //       // If a conversation exists, use its roomId
  //       const existingConversation = querySnapshot.docs[0].data();
  //       setRoomId(existingConversation.roomId);
  //     } else {
  //       // If no conversation exists, generate a new roomId
  //       const newRoomId = generateUniqueId(); // Replace this with your logic to generate a unique ID
  //       setRoomId(newRoomId);

  //       // Save the new conversation in the 'conversations' collection
  //       await addDoc(collection(FIREBASE_DB, 'conversations'), {
  //         roomId: newRoomId,
  //         lawyerId: item.id,
  //       });
  //     }
  //   } catch (error) {
  //     console.error('Error fetching/generating roomId:', error);
  //   }
  // };
  // useEffect(() => {
   
  
  //   fetchRoomId();
  // }, [item]);
  

  useEffect(() => {
    if (!roomId) {
      console.error('roomId is undefined');
      return;
    }

    const collectionRef = collection(FIREBASE_DB, 'chats');
    const q = query(collectionRef, orderBy('createdAt', 'desc'), where('roomId', '==', roomId));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const updatedMessages = querySnapshot.docs.map((doc) => ({
        _id: doc.id,
        ...doc.data(),
      }));
      setMessages(updatedMessages);
    });

    return () => unsubscribe();
  }, [roomId]);


 

  _pickDocument = async () => {

    let result = await DocumentPicker.getDocumentAsync({});
    
    Alert.alert(result.assets[0].name);
    
    console.log(result);
    if (!result.canceled) {
      const newMessage = {
        text: result.assets[0].name,
        document: result.assets[0].uri,
      };

      onSend([newMessage]);
    }
    
    }
    // useEffect(() => {
    //   const fetchLawyerDetails = async () => {
    //     try {
    //       const lawyersCollection = collection(FIREBASE_DB, 'lawyers');
    //       const querySnapshot = await getDocs(lawyersCollection);
          
    //       if (!querySnapshot.empty) {
    //         const lawyer = querySnapshot.docs[0].data();
    //         setLawyerDetails({
    //           name: lawyer.name, // Replace 'name' with the field name in your Firestore
    //           image: lawyer.imageUrl, // Replace 'image' with the field name containing the image URL
    //         });
    //       }
    //     } catch (error) {
    //       console.error('Error fetching lawyer details:', error);
    //     }
    //   };
  
    //   fetchLawyerDetails();
    // }, []);


  const renderSend = (props) => {
    return (
      <Send {...props}>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity onPress={()=>_pickDocument()}>
          <Icon
            type="font-awesome"
            name="paperclip"
            style={styles.paperClip}
            size={25}
            color='black'
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{handleCameraIconPress()}}>
        <View >
        <MaterialIcons name="photo-camera" size={24} color="black" style={styles.icon}/>
      
      </View>
      </TouchableOpacity>
      <Icon
          type="font-awesome"
          name="send"
          // eslint-disable-next-line react-native/no-inline-styles
          style={{marginBottom: 10, marginRight: 10}}
          size={25}
          color='black'
          tvParallaxProperties={undefined}
        />
      </View>
      </Send>
    );
  };


  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#2e64e5',
          },
        }}
        textStyle={{
          right: {
            color: '#fff',
          },
        }}
      />
    );
  };

  const scrollToBottomComponent = () => {
    return <FontAwesome name="angle-double-down" size={22} color="#333" />;
  };

  return (
    <View style={styles.container}>
    <View style={styles.header}>
      <Image source={{ uri: item.imageUrl }} style={styles.lawyerImage} />
      <Text style={styles.lawyerName}>{item.fullName}</Text>
      <TouchableOpacity onPress={makePhoneCall}>
        <MaterialIcons   style={styles.phone} name="phone" size={24} color="black" />
      </TouchableOpacity>
    </View>
    
    <GiftedChat
      messages={messages}
      onSend={onSend}
      user={{
        _id: FIREBASE_AUTH?.currentUser?.email,
        avatar: 'https://i.pravatar.cc/300',
      }}
      renderBubble={renderBubble}
      alwaysShowSend
      scrollToBottom
      renderSend={renderSend}
      scrollToBottomComponent={scrollToBottomComponent}
      // renderInputToolbar={renderInputToolbar}
      />
      </View>

  );
};

const styles = StyleSheet.create({
  inputToolbar: {
    flexDirection: 'row',
    // alignItems: 'center',
    paddingHorizontal: 3,
    paddingVertical:15 
    
  },
  icon: {
    marginHorizontal: 25, 
    // marginTop:-190
  },
  container: {
    flex: 1,
    backgroundColor: 'white', // Set the desired background color
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor:'white',
    marginTop:40
  },
  lawyerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  lawyerName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  phone:{
    marginLeft:180
  }
});

 


export default Chat;