
import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

import Onboarding from "react-native-onboarding-swiper";


const Dots = ({ selected }) => {
    let backgroundColor;

    backgroundColor = selected ? "#000000" : "#7c7c7c";

    return (
        <View
            style={{
                width: 6,
                height: 6,
                marginHorizontal: 3,
                backgroundColor,
            }}
        />
    );
}

const Skip = ({ ...props }) => (
    <TouchableOpacity style={{ marginHorizontal: 10 }} {...props}>
        <Text style={{ fontSize: 16, color: "#7c7c7c" }}>Skip</Text>
    </TouchableOpacity>
);

const Next = ({ ...props }) => (
    <TouchableOpacity style={{ marginHorizontal: 10 }} {...props}>
        <Text style={{ fontSize: 16, color: "#000000" }}>Next</Text>
    </TouchableOpacity>
);

const Done = ({ ...props }) => (
    <TouchableOpacity style={{ marginHorizontal: 10 }} {...props}>
        <Text style={{ fontSize: 16, color: "#000000" }}>Done</Text>
    </TouchableOpacity>
);

 const Onboarding2 = ({ navigation }) => {
    return (
        <Onboarding
            SkipButtonComponent={Skip}
            NextButtonComponent={Next}
            DoneButtonComponent={Done}
            DotComponent={Dots}
            onSkip={() => navigation.replace("Login")}
            onDone={() => navigation.navigate("Login")}
            pages={[
                {
                    backgroundColor: "#fff",
                    image: <Image source={require("../assets/robe.jpg")} />,
                    title: "Welcome to Avocato",
                    subtitle: "Your Best Lawyer App",
                },
                {
                    backgroundColor: "#fff",
                    image: <Image source={require("../assets/avocat.jpg")} />,
                    title: "Welcome to Avocato",
                    subtitle: "Your Best Lawyer App",
                },
                {
                    backgroundColor: "#fff",
                    image: <Image source={require("../assets/robe.jpg")} />,
                    title: "Welcome to Avocato",
                    subtitle: "Your Best Lawyer App",
                },
            ]}
        />
    );
}

export default Onboarding2;