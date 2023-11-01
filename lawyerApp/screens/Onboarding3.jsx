import { View, Text, Pressable, Image, Dimensions } from 'react-native'
import React from 'react'
import button from '../components/button';
import Colors from '../components/colors';
import Button from '../components/button';
const { width, height } = Dimensions.get("window");

const Onboarding3 = ( { navigation } ) =>{


        return ( 
        <View style={{ flex : 1,
            height:height*0.5,
            width:width*1,
            justifyContent:"center",
            backgroundColor:"#DAD3C8",
            alignItems:"center",
            gap:80
            }}>
            <View style={{alignItems:'center',
            display:"flex",
            justifyContent:"center",
            gap:30
            }}>
            
               
                        
                        <Image
                            source={require("../assets/3.png")}
                            style={{
                                height: height*0.5,
                                width: width*0.7,
                                borderRadius: 10,
                            }}
                        />
     <View>
                <Text style={{
    
                    display:'flex',
                    textAlign:'center',
                    fontSize: 45,
                    fontWeight: 800,
                    color: Colors.black,
    
                    }}> Stay Informed, Stay Empowered</Text>
                                <Text style={{  
                                    padding:20,
                                    display:'flex',
                                    textAlign:'center',
                                    fontSize: 18,
                                    fontWeight: 500,
                                    color:Colors.black,
    
                                }}>Track Your Case, Chat with Your Lawyer, and Receive Updates in Real-Time</Text>
                                </View>
                </View>
                <Button
                  titleStyle={{
                    color: "#FFFFFF"
                 }}
                title="Start"
                filled
                onPress={() => navigation.navigate("login")}
                style={{
                                width: width*0.721,
                                backgroundColor: "#000000",
                                borderRadius:40 ,
                                color: "#000000"
                            }}
                        />
    
            </View>)



}

export default Onboarding3