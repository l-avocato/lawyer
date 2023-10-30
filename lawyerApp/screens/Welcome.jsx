import React, {useState} from "react";
import { StatusBar } from 'expo-status-bar';
//formik
import { Formik } from "formik";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
//icons
import { Octicons, Fontisto, Ionicons } from "@expo/vector-icons";

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
    WelcomeContainer,
    Avatar,
    WelcomeImage,
} from "../components/styles";



const Welcome = () => {


    return (
        <>
            <StatusBar style="light" />
            <InnerContainer>
                <WelcomeImage resizeMode="cover" source={require("../assets/suits.png")} />
                <WelcomeContainer>
                <PageTitle welcome={true} >Welcome!</PageTitle>
                <SubTitle welcome={true}>Ahmed Irmani</SubTitle>
                <SubTitle welcome={true}>ahmedirmani@gmail.com</SubTitle>
   <StyledFormArea>
                      <Avatar resizeMode="cover" source={require("../assets/logo.png")} /> 
                       <Line/> 

                        <StyledButton onPress={()=>{}}>
                            <ButtonText>Logout</ButtonText>
                        </StyledButton>
                  </StyledFormArea>
                  </WelcomeContainer>
            </InnerContainer>
        </>
    )
}


export default Welcome