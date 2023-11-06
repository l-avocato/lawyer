import React,{useState,useEffect,useLayoutEffect,useCallback} from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { TouchableOpacity , View,Button} from "react-native";
import { collection,addDoc,orderBy,query,onSnapshot } from "firebase/firestore";
import { FIREBASE_AUTH ,FIREBASE_DB  } from "../firebaseConfig";
import { useNavigation } from "@react-navigation/native";
// import VideoCall from "./VideoCall";

export default function Chat(){
    
    const [messages, setMessages] = useState([]);
    const navigation = useNavigation();

    const [showVideoCall, setShowVideoCall] = useState(false);

    const startVideoCall = () => {
        setShowVideoCall(true);
    }
    

    useLayoutEffect(() => {

        const collectionRef = collection(FIREBASE_DB , 'chats');
        const q = query(collectionRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, querySnapshot => {
        console.log('querySnapshot unsusbscribe');
          setMessages(
            querySnapshot.docs.map(doc => ({
              _id: doc.data()._id,
              createdAt: doc.data().createdAt.toDate(),
              text: doc.data().text,
              user: doc.data().user
            }))
          );
        });
    return unsubscribe;
      }, []);

      const onSend = useCallback((messages = []) => {
        setMessages(previousMessages =>
          GiftedChat.append(previousMessages, messages)
        );
        // setMessages([...messages, ...messages]);
        const { _id, createdAt, text, user } = messages[0];    
        addDoc(collection(FIREBASE_DB , 'chats'), {
          _id,
          createdAt,
          text,
          user
        });
      }, []);

    
    return(
        <GiftedChat
          messages={messages}
          showAvatarForEveryMessage={false}
          showUserAvatar={false}
          onSend={messages => onSend(messages)}
          messagesContainerStyle={{
            backgroundColor: '#fff'
          }}
          textInputStyle={{
            backgroundColor: '#fff',
            borderRadius: 20,
          }}
          user={{
            _id: FIREBASE_AUTH?.currentUser?.email,
            avatar: 'https://i.pravatar.cc/300'
          }}
        />
    )
    
}