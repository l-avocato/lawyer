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


const Settings = ({ navigation }) => {
  const [user, setUser] = useState([]);
  const [profilePic, setProfilePic] = useState("../assets/ahmed.png");
  const [image, setImage] = useState(null);

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
  const handleImageUpload = async (image) => {
    // Create a reference to the location you want to upload to in Firebase
      const storageRef =ref(FIREBASE_STORAGE,`images/${image.uri.split('/').pop()}`);
      const uploadTask = uploadBytesResumable(storageRef, blob);
    // Upload the file to Firebase Storage
    const response = await fetch(image.uri);
    const blob = await response.blob();
  
    uploadTask.on('state_changed', 
    (snapshot) => {
      console.log('Bytes transferred:', snapshot.bytesTransferred);
      console.log('Total bytes:', snapshot.totalBytes);
  
      if (snapshot.totalBytes > 0) {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      } else {
        console.log('Upload is 0% done');
      }
    },
    async () => {
      // Handle successful uploads on complete
      const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
      await updateUserImage(downloadURL);
    }
  );
  };
  
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!result.canceled) {
      handleImageUpload(result);
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
  const getUser = async () => {
    try {
      const result = await getDocs(userCollectionRef);
      const users = result.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })).filter((e)=>e.email === FIREBASE_AUTH.currentUser.email)[0]
      console.log("this is user",users);
      setUser(users);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
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
        <ImageBackground source={{uri:image}} style={{ width: 200, height: 200 }}>
         
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
    onPress={() => navigation.navigate('logout')}
  >
    <Text  style={{ color: 'white',fontWeight:'500', fontSize:'20',marginTop:5 }}>Yes. Logout</Text>
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


