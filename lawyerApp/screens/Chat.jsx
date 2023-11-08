import React, { useState, useEffect,useCallback } from 'react';
import { GiftedChat,Send,Bubble } from 'react-native-gifted-chat';
import { TouchableOpacity, View, StyleSheet, Alert } from 'react-native'; 
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';
import { collection, addDoc, orderBy, query, onSnapshot,serverTimestamp,Timestamp} from 'firebase/firestore';
import { FIREBASE_DB , FIREBASE_AUTH } from '../firebaseConfig';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Icon } from 'react-native-elements';
import * as DocumentPicker from 'expo-document-picker';

const Chat = () => {
  
  const [messages, setMessages] = useState([]);

  
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

  const handleFileIconPress = async () => {
    // File upload logic
    // ... (implementation for file upload)
  };

  const onSend = async (newMessages = []) => {
    const formattedMessages = newMessages.map((message) => ({
      ...message,
      createdAt:  serverTimestamp(),
      user: {
        _id: FIREBASE_AUTH?.currentUser?.email,
        avatar: 'https://i.pravatar.cc/300',
      },
    }));

    await Promise.all(formattedMessages.map((message) => addDoc(collection(FIREBASE_DB , 'chats'), message)));
  };

  useEffect(() => {
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
});

 


export default Chat;
