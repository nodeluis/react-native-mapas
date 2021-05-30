import React from 'react'
import { StyleProp, StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native'

interface Props{
    title:String,
    onPress:()=>void;
    style?:StyleProp<ViewStyle>
}
export const BlackButton = ({title,onPress,style={}}:Props) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                ...style as any,
                ...styles.blackButton
            }}
            activeOpacity={0.9}
        >
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles=StyleSheet.create({
    blackButton:{
        height:45,
        width:100,
        backgroundColor:'black',
        borderRadius:50,
        justifyContent:'center',
        shadowColor:'#000',
        shadowOffset:{
            width:0,
            height:3
        },
        elevation:6
        
    },
    buttonText:{
        color:'white',
        fontSize:15,
        textAlign:'center'
    }
});
