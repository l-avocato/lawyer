import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import Colors from './colors';

const Button = (props) => {
    const filledBgColor = props.color || Colors.primary;
    const outlinedColor = "#ffffff";
    const bgColor = props.filled ? filledBgColor : outlinedColor;
    const textColor = props.filled ? Colors.white : Colors.black;

    return (
        <TouchableOpacity
            style={{
                ...styles.button,
                ...{ backgroundColor: "#000000" },
                ...props.style
            }}
            onPress={props.onPress}
        >
            <Text style={{ fontSize: 18, ... { color: textColor } }}>{props.title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        paddingBottom: 16,
        paddingVertical: 10,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    }
})
export default Button