import { View, Text, Pressable, Image, Dimensions } from 'react-native'
import React from 'react'
import Button from '../components/button';
const { width, height } = Dimensions.get("window");
import Colors from '../components/colors';
import {StyledButton,ButtonText} from '../components/styles';



const Onboarding1 = ( { navigation } ) =>{

        return (
        <View style={{ flex : 1,
        height:height*0.5,
        width:width*1,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#DAD3C8",
        gap:80
        }}>
        <View style={{alignItems:'center',
        display:"flex",
        justifyContent:"center",
        backgroundColor:"#DAD3C8",
        gap:30
        }}>
        
         
                    
                    <Image
                        source={require("../assets/1.png")}
                        style={{
                            height: height*0.5,
                            width: width*1,
                            borderRadius: 10,
                        }}
                    />
                       <View>
            <Text style={{

                display:'flex',
                textAlign:'center',
                fontSize: 40,
                fontWeight: 800,
                color: Colors.black,

                }}>Avocato</Text>
                            <Text style={{  
                                padding:20,
                                display:'flex',
                                textAlign:'center',
                                fontSize: 18,
                                fontWeight: 500,
                                color: Colors.black,

                            }}> Your Personalized Legal Solution</Text>
                            </View>

            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '90%' }}>
 
 <Button
              titleStyle={{
                color: Colors.black
             }}
            title="Skip"
            onPress={() => navigation.navigate("login")}
            style={{
                            width: width*0.3,
                            height:height*0.07,
                            backgroundColor: "#DAD3C8",
                            borderRadius:40 ,
                            color: "#000000"
                        }}
                    />
                               <Button
              titleStyle={{
                color: Colors.white
             }}
            title="Next"
            filled
            onPress={() => navigation.navigate("Onboarding2")}
            style={{
                            width: width*0.3,
                            height:height*0.07,
                            backgroundColor: "#222222",
                            borderRadius:40 ,
                            color: Colors.white
                        }}
                    />
</View>
        </View>)



}

export default Onboarding1