import { View, Text, Pressable, Image, Dimensions } from 'react-native'
import React from 'react'
import Colors from '../components/colors';

const { width, height } = Dimensions.get("window");
import button from '../components/button';
import Button from '../components/button';

const Onboarding2 = ( { navigation } ) =>{
  
    
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
                            source={require("../assets/2.png")}
                            style={{
                                height: height*0.5,
                                width: width*0.8,
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
        
                    }}>Find Your Lawyer</Text>
                                <Text style={{  
                                    padding:20,
                                    display:'flex',
                                    textAlign:'center',
                                    fontSize: 18,
                                    fontWeight: 500,
                                    color: Colors.black,
    
                                }}>Expert Legal Assistance, Tailored Just for You</Text>
                                </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '90%' }}>

                <Button
                  titleStyle={{
                    color: "#FFFFFF"
                 }}
                title="Previous"
                onPress={() => navigation.navigate("Onboarding1")}
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
                    color: "#FFFFFF"
                 }}
                title="Next"
                filled
                onPress={() => navigation.navigate("Onboarding3")}
                style={{
                    width: width*0.3,
                    height:height*0.07,
                    backgroundColor: "#000000",
                    borderRadius:40 ,
                    color: "#000000"
                            }}
                        />
     </View>
            </View>)



}

export default Onboarding2