import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity,
  StyleSheet, Pressable,Platform, Image
  } from 'react-native';
  import DateTimePicker from '@react-native-community/datetimepicker';
  import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
  import { useNavigation } from '@react-navigation/native';
  import axios from 'axios';
  import { FIREBASE_AUTH} from "../firebaseConfig";


const EditProfile = ({ navigation }) => {
  // const [fullName, setFullName] = useState('');
  // const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState(0);
  const [address, setAddress] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [birthDate, setBirthDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [user, setUser] = useState({});
  const [refresh, setRefresh] = useState(false);
  
  const config = "172.20.10.3";

  const toggleDatePicker = () => {
    setShowPicker(!showPicker);
  };
  const onChange = ({ type }, selectedDate) => {
    let currentDate = birthDate;
    if (type === 'set') {
      currentDate = selectedDate || birthDate;
      setBirthDate(currentDate);
    }
    if (Platform.OS === 'android') {
      toggleDatePicker();
      setBirthDate(selectedDate.toString().split('T')[0]);
    }
    if (Platform.OS === 'ios') {
      setBirthDate(selectedDate.toString().split('T')[0]);
    }
    console.log(birthDate);
    console.log(selectedDate);
    console.log(currentDate);
  };

  const handleUpdateUser = async () => {
    const response = axios.put(`http://${config}:1128/api/user/updateUser/${user.id}`,user)
    .then((res) => {
      setRefresh(!refresh);
      console.log(res.data,"this is success edit");
      navigation.navigate('settings');
        
      })
      .catch((err) => {
        console.log(err,"this is error edit");
      });
  }

  // console.log(FIREBASE_AUTH.currentUser.email,"this is firebase email");
  const loggedInUser = FIREBASE_AUTH.currentUser.email;

  const getUser = async () => {
    const response = await axios.get(`http://${config}:1128/api/user/getUserByEmail/${loggedInUser}`)
    .then((res) => {
      setUser(res.data[0]);
      console.log("this is userrr",user);
      })
    };
  
    useEffect(() => {
      getUser();
    }, [refresh]);

  return (
    <View style={styles.container}>
  {/* <Image source={require("../assets/logo.png")} style={{alignSelf:"center"}} /> */}
  {/* <FontAwesome5 name="pen-square" size={32} color="#C28C08" style={{top:70}} /> */}
  {/* <Image source={require("../assets/logo.png")} style={{}}/> */}
  <Image source={require("../assets/logo.png")} style={{ width: 70, height: 40, top:75,left:-20 }} />


      <Text style={styles.title}>Edit Profile</Text>
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        value={user.fullName? user.fullName : ''}
        onChangeText={(text) => setUser({...user, fullName: text})}
        placeholder="Enter your name"
      />
      <Text style={styles.label}>Email</Text>
      <TextInput
  style={styles.input}
  value={user.email? user.email : ''}
  onChangeText={(text) => setUser({...user, email: text})}
  placeholder="Enter your email"
/>
      <Text style={styles.label}>Phone Number</Text>
      <TextInput
  style={styles.input}
  value={user.phoneNumber ? user.phoneNumber.toString() : 0}
  onChangeText={(text) => setUser({...user, phoneNumber: parseInt(text)})}
  placeholder="Enter your phone number"
/>
      <Text style={styles.label}>Address</Text>
      <TextInput
  style={styles.input}
  value={user.adress? user.adress : ''}
  onChangeText={(text) => setUser({...user, adress: text})}
  placeholder="Enter your address"
/>
      <Text style={styles.label}>Date Of Birth</Text>
      {showPicker && (
        <DateTimePicker
        // date={user.birthDate ? new Date(user.birthDate) : new Date()}
          mode='date'
          display='spinner'
          value={user.birthDate ? new Date(user.birthDate) : new Date()} 
          onDateChange={(newdate) => {
          const dateString = newdate.toString().split('T')[0];
          setUser({...user, birthDate: dateString});
          }}
          style={styles.datePicker}
        />
      )}
      {!showPicker && (
        <Pressable onPress={toggleDatePicker}>
          <TextInput
            style={styles.dateInput}
            placeholder={user.birthDate ? new Date(user.birthDate).toLocaleDateString() : 'Enter your birth date'}
            value={user.birthDate ? new Date(user.birthDate) : new Date()}
            placeholderTextColor='#11182744'
            editable={false}
            onPressIn={toggleDatePicker}
          />
        </Pressable>
      )}
      <TouchableOpacity style={styles.submitButton}
      onPress={handleUpdateUser} >
  <Text style={styles.submitButtonText}
    >Submit</Text>
</TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: '#fff',
  
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 20,
    marginLeft: 50,
    fontSize: 27,
    color:"gray", 
    fontWeight: '700'
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 4,
    backgroundColor: '#fff',
    height: 50,
    marginBottom: 15,
  },
  datePicker: {
    height: 150,
    marginBottom: 15,
  },
  dateInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 4,
    marginBottom: 15,
  },
  submitButton: {
    backgroundColor: '#000000',
    padding: 13,
    borderRadius: 4,
    alignItems: 'center',
    height: 50,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default EditProfile;