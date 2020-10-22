import React, {useContext} from 'react';
import {StyleSheet, TouchableOpacity, ActivityIndicator, TextInput, Button, Alert, SafeAreaView, ScrollView, Image, Text, View, RefreshControl, FlatList, StatusBar} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto'

export default function MessageCard(props) {


  let replied_status=props.seen;
    let dot_oscillator = replied_status===true? styles.green_dot:styles.red_dot;
    let replied_text = replied_status===true?"Seen":"Not Seen";
    
    function truncator (str, length) {
        if(str!=undefined){
            if(str.length>=length) {
                var maxLength = length // maximum number of characters to extract
            
            //trim the string to the maximum length
                var trimmedString = str.substr(0, maxLength);
            
            //re-trim if we are in the middle of a word
                trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")))
                return trimmedString+"...";
              }
              else{
                return str;
              }
        }
        else {
            return;
        }
        
    }
console.log("this is the id", props.id)
  return (
   
    <View style={styles.cardParent}>
        <TouchableOpacity onPress={()=>props.navigation.navigate(props.link,{id:props.id})}>
        <View style={styles.positioner}>
            <View style={{flexDirection:'row'}}>
                <Text style={styles.fullname}>{props.fullname}</Text>
                <View style={dot_oscillator}></View>
                <Text style={styles.replied_text_style}>{replied_text}</Text>
            </View>
            <Text style={styles.title}>
            {truncator(props.titled, 40)}
            </Text>
            <Text style={styles.description}>
            {truncator(props.description, 70)}
            </Text>

        </View>
        </TouchableOpacity>
        
    </View>
   
  );
}

const styles = StyleSheet.create({
    title: {
        fontFamily: 'Poppins_400Regular',
        marginTop:10,
        fontWeight:'bold',
        color:'#535552'
    },
    description: {
        fontFamily: 'Poppins_400Regular',
        
        
        color:'#535552'
    },

    replied_text_style: {
        fontFamily:'Poppins_400Regular',
    },
    fullname: {
        fontFamily:'Poppins_400Regular',
        fontWeight:'bold',
    },
    red_dot: {
        width:20,
        height:20,
        marginHorizontal:10,
       
        borderRadius:20,
        backgroundColor:'#F0333E'
    },
    green_dot: {
        width:20,
        height:20,
        marginHorizontal:10,
       
        borderRadius:20,
        backgroundColor:'#2D7C0D'
    },
    positioner: {
        marginTop:20,
        marginLeft:30,
    },
    cardParent: {
        marginVertical:10,
        height:120,
        borderRadius:10,
        backgroundColor:'white',
        borderLeftColor:'green',
        borderLeftWidth:4,
        width:'88%',
        marginLeft:'auto',
        marginRight:'auto',
        shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 11,
},
shadowOpacity: 0.55,
shadowRadius: 14.78,

elevation: 22,

    },
    
    text: {
        fontFamily: "Poppins_400Regular",
        color: "#3e3e3e",
        fontSize:25
    },
})