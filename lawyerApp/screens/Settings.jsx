import React, { useState ,useEffect} from 'react';
import { View, Text, Image, TouchableOpacity, Button ,ImageBackground,StyleSheet} from 'react-native';
import { ListItem } from 'react-native-elements';
import Modal from 'react-native-modal';
import { Line } from '../components/styles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import * as ImagePicker from 'expo-image-picker';
import { launchImageLibrary } from 'react-native-image-picker';
import NavTab from './NavTab';
import { collection, getDocs } from "firebase/firestore";
import {FIREBASE_AUTH,FIREBASE_DB } from '../firebaseConfig'
import firebase from 'firebase/app';
import { FIREBASE_STORAGE } from "../firebaseConfig"
import 'firebase/firestore';
import {update, updateDoc, doc ,setDoc} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import config from "./ipv";

// import { auth } from 'firebase';





const Settings = ({ navigation }) => {
  const [user, setUser] = useState([]);
  const [profilePic, setProfilePic] = useState("../assets/ahmed.png");
  const [image, setImage] = useState(null);
  const [refresh, setRefresh] = useState(false);



  const db = FIREBASE_DB;






  
  // const updateUserImage = async () => {
  //   try {
  //     await updateDoc(userCollectionRef, {
  //       imageUrl: imageUrl,
  //     });
  //   } catch (error) {
  //     console.log("Error updating user image", error);
  //   }
  // };

  // const uploadImage = async () => {
  // code to upload image
  // let's say imageUrl is the URL of the uploaded image
  //   imageUrl = imageUrl;
  //   await updateUserImage();
  // };
 
  

  const updateUserImage = async (imageUrl) => {
    const userDocRef = doc(db, 'user', user.id);
    await setDoc(userDocRef, { imageUrl: imageUrl }, { merge: true });
  };


  const updateUserImageInDB = async (imageUrl) => {
    console.log('Updating user image in DB with imageUrl:', imageUrl); // Add this line
      try {
      await axios.put(`http://${config}:1128/api/user/updateUser/${user.id}`, {
        ImageUrl: imageUrl
      }).then(response => {
        console.log('Response from server:', response.data);
        setRefresh(!refresh);
      });
    } catch (error) {
      console.error('Error updating user image in DB:', error);
    }
  };

  const handleImageUpload = async (uri) => {
    console.log('Image URI:', uri); // Add this line
  
    const formData = new FormData();
    formData.append('file', { uri, type: 'image/jpeg', name: 'upload.jpg' });
    formData.append('upload_preset', 'oztadvnr');
  
    try {
      const response = await axios.post('https://api.cloudinary.com/v1_1/dl4qexes8/upload', formData);
      console.log('Cloudinary response:', response.data); // Add this line
  
      const imageUrl = response.data.secure_url;
      await updateUserImageInDB(imageUrl);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!result.canceled) {
      delete result.canceled;
      if (result.assets[0] && result.assets[0].uri) {
        handleImageUpload(result.assets[0].uri);
      } else {
        console.error('Image or image URI is not defined');
      }
    }
  };

  const list = [
    { title: 'Edit Profile', page: 'editProfile' },
    { title: 'Notifications', page: 'notifications' },
    { title: 'Reset Password', page: 'resetPassword' },
    { title: 'Privacy Policy', page: 'privacyPolicy' },
    { title: 'Help Center', page: 'helpCenter' },
    { title: 'Logout', page: 'logout' },
  ];

  const [isModalVisible, setModalVisible] = useState(false);
  const userCollectionRef = collection(FIREBASE_DB, "user");
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };


  const clearToken = async () => {
    try {
     const logOutToken= await AsyncStorage.removeItem('token'); //clearing token and type when you signout
     console.log('this is logout token',logOutToken);
  
    } catch (error) {
      console.error('Error clearing token:', error);
    }
  };
  
  

    const logOut = async () => {
      try {
        // await signOut(auth)
        await clearToken()
        navigation.navigate('login')
      } catch (error) {
        console.error('Logout error:', error)
      }
    };



  const handleChoosePhoto = () => {
    const options = {
      noData: true,
    };
    
    launchImageLibrary(options, (response) => {
      if (response.uri) {
        setProfilePic(response.uri);
        // Here, you would also upload the image to Cloudinary and Firebase
      }
    });
  };
  const loggedInUser = FIREBASE_AUTH.currentUser.email;

  const getUser = async () => {
    const response = await axios.get(`http://${config}:1128/api/user/getUserByEmail/${loggedInUser}`)
    .then((res) => {
        console.log("this is user",res.data);
        setUser(res.data[0]);
      })
    };





  useEffect(()=>{
    getUser()

  },[])
  return (
    <View style={{backgroundColor:'white'}}>
      <View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Image source={require("../assets/logo.png")} style={{ width: 70, height: 40 ,marginTop:99}} />
        <Text style={{ fontSize: 27,color:"gray", fontWeight: '700', marginLeft: 1,marginTop:90 }}>Profile</Text>
      </View>
      <View style={{ borderRadius: 200, overflow: 'hidden', alignSelf:'center' }}>
        <ImageBackground source={{uri:user.ImageUrl}} style={{ width: 200, height: 200 }}>
         
      </ImageBackground>
    </View>
       <View>
       <TouchableOpacity onPress={pickImage}>
  <FontAwesome5 name="pen-square" size={32} color="#C28C08" style={{marginLeft:258,marginTop:-30}} />
</TouchableOpacity>
          <Text style={{alignSelf:'center',fontSize:26,fontWeight:"500"}}>{user.fullName}</Text>
        <Text style={{alignSelf:'center',fontSize:19,fontWeight:"400",marginBottom:30}}>{user.email}</Text>
      </View>
      </View>
      {
        list.map((item, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => {
              if (item.page === 'logout') {
                toggleModal();
              } else {
                navigation.navigate(item.page);
              }
            }}
          >
            <ListItem>
            {item.title === 'Edit Profile' && <FontAwesome5 name="user" size={24} color="black" />}
            {item.title === 'Notifications' && <FontAwesome5 name="bell" size={24} color="black" />}
            {item.title === 'Reset Password' && <FontAwesome5 name="lock" size={24} color="black" />}
            {item.title=== 'Privacy Policy' && <FontAwesome5 name="user-secret" size={24} color="black" />}
            {item.title === 'Help Center' && <FontAwesome5 name="question-circle" size={24} color="black" />}
            {item.title === 'Logout' && <FontAwesome5 name="sign-out-alt" size={24} color="black" />}
              <ListItem.Content>
                <ListItem.Title>{item.title}</ListItem.Title>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>
          </TouchableOpacity>
        ))
      }
      <Modal isVisible={isModalVisible} style={{margin: 0, justifyContent: 'flex-end'}}>
        <View style={{backgroundColor: 'white', padding: 22, borderRadius: 50, borderColor: 'rgba(0, 0, 0, 0.1)',justifyContent: 'flex-start', alignItems: 'center',height:240 }}>
            <Line style={{width:40,height:2,marginTop:-12,marginBottom:28}}/>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Logout</Text>
          <Text style={{ fontSize: 17, color: 'gray' , fontWeight:'500',marginTop:40}}>Are you sure you want to logout?</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
  <TouchableOpacity
    style={{
      backgroundColor: '#EADAA5',
      padding: 10,
      borderRadius: 60,
      width: 150,
      alignItems: 'center',
      marginRight: 10,
      marginTop: 20,
    }}
    onPress={toggleModal}
  >
    <Text style={{ color: '#634D05',fontWeight:'600', fontSize:'20',marginTop:5 }}>Cancel</Text>
  </TouchableOpacity>
  <TouchableOpacity
    style={{
      backgroundColor: '#000000',
      padding: 10,
      borderRadius: 60,
      height: 60,
      width: 150,
      alignItems: 'center',
      marginLeft: 10,
      marginTop: 20,
    }}
    onPress={() => navigation.navigate('Logout')}
  >
    <Text  style={{ color: 'white',fontWeight:'500', fontSize:'20',marginTop:5 }}
    
    onPress={logOut}
    >Yes. Logout</Text>
  </TouchableOpacity>
</View>
        </View>
      </Modal>
      <View style={styles.navTabContainer}><NavTab/></View>
      
    </View>
  );
};



const styles = StyleSheet.create({
  navTabContainer: {
    flex: 1, 
    top:120,
    height:0,
  },
  navTab: {
    position: 'absolute',
    width: '100%',
  }
});

export default Settings;


