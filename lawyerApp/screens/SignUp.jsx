import React, {useState} from "react";
import { StatusBar } from 'expo-status-bar';
import {FIREBASE_DB} from "../firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
//formik
import { Formik } from "formik";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
//icons
import { Octicons, Fontisto, Ionicons } from "@expo/vector-icons";
import { FIREBASE_AUTH } from "../firebaseConfig";
import {
    StyledContainer,
    InnerContainer,
    PageLogo,
    PageTitle,
    SubTitle,
    StyledFormArea,
    LeftIcon,
    StyledInputLabel,
    StyledTextInput,
    RightIcon,
    StyledButton,
    ButtonText,
    Colors,
    MsgBox,
    Line,
    ExtraView,
    ExtraText,
    TextLink,
    TextLinkContent,
} from "../components/styles";

//colors
const { brand, darkLight, primary } = Colors;
//DateTimePicker
import DateTimePicker from "@react-native-community/datetimepicker";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Signup = ({ navigation }) => {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [phoneNumber, setPhoneNumber] = useState(0);
const [confirmPassword, setConfirmPassword] = useState("");
const [fullName, setFullName] = useState("");   
const [loading, setLoading] = useState(false);

const [hidePassword, setHidePassword] = useState(true);
const [show, setShow] = useState(false);
const [date, setDate] = useState(new Date(2000, 0, 1));
const auth = FIREBASE_AUTH;
const db = FIREBASE_DB;
//Actual date of birth to be sent
// const [dob, setDob] = useState();

const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
    setDob(currentDate);
}

const userCollectionRef = collection(db, "user");
console.log("usercollection",userCollectionRef);


const signUp = async () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        addDoc(userCollectionRef, {
          localId: res.user.uid,
          fullName: fullName,
          email: email,
          password: res.user.reloadUserInfo.passwordHash  ,
          phoneNumber: phoneNumber,
        })
          .then((res) => {
            alert("User added successfully");
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
      navigation.navigate("login");
};




    return (
        <StyledContainer>
            <StatusBar style="dark" />
            <InnerContainer>
                <PageTitle>Avocato</PageTitle>
                <SubTitle>Create an account</SubTitle>
                <Formik
                    initialValues={{fullName:"", email: "",dateOfBirth:"", password: "",confirmPassword:""}}
                    onSubmit={(values) => {
                        console.log(values);
                    }} >
                  {({handleChange,handleBlur,handleSubmit,values})=>(<StyledFormArea>
                        <MyTextInput
                            label="Full Name"
                            icon="person"
                            placeholder="Please enter your full name" 
                            placeholderTextColor={darkLight}
                            onChangeText={(text)=>setFullName(text)}
                            onBlur={handleBlur('fullName')}
                            value={fullName}                            />
                        <MyTextInput
                            label="Email Address"
                            icon="mail"
                            placeholder="please enter your email" 
                            placeholderTextColor={darkLight}
                            onChangeText={(text)=>setEmail(text)}
                            onBlur={handleBlur('email')}
                            value={email}
                            keyboardType="email-address"
                            />
                        <MyTextInput
                            label="Phone Number"
                            icon='device-mobile'
                            placeholder="+216 000 000 000" 
                            placeholderTextColor={darkLight}
                            onChangeText={(text)=>setPhoneNumber(text)}
                            onBlur={handleBlur('phoneNumber')}
                            value={phoneNumber} 
                            keyboardType="phone-pad" 
                             />

                        <MyTextInput
                            label="Password"
                            icon="lock"
                            placeholder="* * * * * * * *"
                            placeholderTextColor={darkLight}
                            onChangeText={(text)=>setPassword(text)}                            onBlur={handleBlur('password')}
                            value={password}
                            secureTextEntry={hidePassword}
                            isPassword={true}
                            hidePassword={hidePassword}
                            setHidePassword={setHidePassword}
                            />
                        <MyTextInput
                            label="Confirm Password"
                            icon="lock"
                            placeholder="* * * * * * * *"
                            placeholderTextColor={darkLight}
                            onChangeText={(text)=>setConfirmPassword(text)}
                            onBlur={handleBlur('confirmPassword')}
                            value={confirmPassword}
                            secureTextEntry={hidePassword}
                            isPassword={true}
                            hidePassword={hidePassword}
                            setHidePassword={setHidePassword}
                            />
                        <MsgBox>...</MsgBox>
                        <StyledButton onPress={signUp}>
                            <ButtonText>Sign up</ButtonText>
                        </StyledButton>
                       <Line/> 
                        <ExtraView>
                            <ExtraText>Already have an account?</ExtraText>
                            <TextLink onPress={() => navigation.navigate('login')}>
                                <TextLinkContent>Login</TextLinkContent>
                            </TextLink>
                        </ExtraView>
                  </StyledFormArea>)}  

                </Formik>
            </InnerContainer>
        </StyledContainer>
    )
}

const MyTextInput = ({ label, icon,isPassword,hidePassword,setHidePassword,isDate,showDatePicker, ...props }) => {
    return (
        <View>
            <LeftIcon style={{ top: 35 }}>
                <Octicons name={icon} size={30} color={brand} />
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            {!isDate && <StyledTextInput {...props} />}
            {isDate && 
                <TouchableOpacity onPress={showDatePicker}>
                    <StyledTextInput {...props} />
                </TouchableOpacity>
            }
            {isPassword && (
                <RightIcon style={{ top: 35 }} onPress={()=>setHidePassword(!hidePassword)} >
                    <Ionicons name={hidePassword ?"md-eye-off": "md-eye"} size={30} color={darkLight} />
                </RightIcon>
            )}
        </View>
    );
}

export default Signup