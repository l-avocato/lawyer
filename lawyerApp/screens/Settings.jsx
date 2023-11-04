import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Button ,ImageBackground,StyleSheet} from 'react-native';
import { ListItem } from 'react-native-elements';
import Modal from 'react-native-modal';
import { Line } from '../components/styles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ImagePicker from 'react-native-image-picker';
import { launchImageLibrary } from 'react-native-image-picker';
import NavTab from './NavTab';


const Settings = ({ navigation }) => {

  const [profilePic, setProfilePic] = useState("../assets/ahmed.png");

  const list = [
    { title: 'Edit Profile', page: 'editProfile' },
    { title: 'Notifications', page: 'notifications' },
    { title: 'Reset Password', page: 'resetPassword' },
    { title: 'Privacy Policy', page: 'privacyPolicy' },
    { title: 'Help Center', page: 'helpCenter' },
    { title: 'Logout', page: 'logout' },
  ];

  const [isModalVisible, setModalVisible] = useState(false);

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

  return (
    <View style={{backgroundColor:'white'}}>
      <View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Image source={require("../assets/logo.png")} style={{ width: 70, height: 40 ,marginTop:99}} />
        <Text style={{ fontSize: 27,color:"gray", fontWeight: '700', marginLeft: 1,marginTop:90 }}>Profile</Text>
      </View>
      <View style={{ borderRadius: 200, overflow: 'hidden', alignSelf:'center' }}>
        <ImageBackground source={require("../assets/ahmed.png")} style={{ width: 200, height: 200 }}>
         
      </ImageBackground>
    </View>
       <View>
       <TouchableOpacity onPress={handleChoosePhoto}>
  <FontAwesome5 name="pen-square" size={32} color="#C28C08" style={{marginLeft:258,marginTop:-30}} />
</TouchableOpacity>
          <Text style={{alignSelf:'center',fontSize:26,fontWeight:"500"}}>Ahmed Irmani</Text>
        <Text style={{alignSelf:'center',fontSize:19,fontWeight:"400",marginBottom:30}}>ahmedirmani@gmail.com</Text>
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


