import React, {useState} from "react";
import { StatusBar } from 'expo-status-bar';
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
const [loading, setLoading] = useState(false);

const [hidePassword, setHidePassword] = useState(true);
const [show, setShow] = useState(false);
const [date, setDate] = useState(new Date(2000, 0, 1));
const auth = FIREBASE_AUTH;
//Actual date of birth to be sent
const [dob, setDob] = useState();

const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
    setDob(currentDate);
}

const signUp = async () => {
    setLoading(true);
    try {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Account created successfully", "Welcome to Avocato");
        setLoading(false);
        navigation.navigate("login");
    } catch (error) {
        alert( error.message);
        setLoading(false);
    }
}

const showDatePicker = () => {
    setShow(true);
}


    return (
        <StyledContainer>
            <StatusBar style="dark" />
            <InnerContainer>
                <PageTitle>Avocato</PageTitle>
                <SubTitle>Create an account</SubTitle>
                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode="date"
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                        style={{
                            backgroundColor: "#fff",
                        }}
                    />
                
                )}
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
                            onChangeText={handleChange('fullName')}
                            onBlur={handleBlur('fullName')}
                            value={values.fullName}                            />
                        <MyTextInput
                            label="Email Address"
                            icon="mail"
                            placeholder="please enter your email" 
                            placeholderTextColor={darkLight}
                            onChangeText={(text)=>setEmail(text)}
                            onBlur={handleBlur('email')}
                            // value={values.email}
                            keyboardType="email-address"
                            />
                        <MyTextInput
                            label="Date of Birth"
                            icon="calendar"
                            placeholder="YYYY - MM - DD" 
                            placeholderTextColor={darkLight}
                            onChangeText={handleChange('dateOfBirth')}
                            onBlur={handleBlur('dateOfBirth')}
                            value={dob ? dob.toDateString() : ''}  
                            is Date={true}
                            editable={false}
                            showDatePicker={showDatePicker}
                             />

                        <MyTextInput
                            label="Password"
                            icon="lock"
                            placeholder="* * * * * * * *"
                            placeholderTextColor={darkLight}
                            onChangeText={(text)=>setPassword(text)}                            onBlur={handleBlur('password')}
                            // value={values.password}
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
                            onChangeText={handleChange('confirmPassword')}
                            onBlur={handleBlur('confirmPassword')}
                            value={values.confirmPassword}
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
            <LeftIcon>
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
                <RightIcon onPress={()=>setHidePassword(!hidePassword)} >
                    <Ionicons name={hidePassword ?"md-eye-off": "md-eye"} size={30} color={darkLight} />
                </RightIcon>
            )}
        </View>
    );
}

export default Signup