import React, {useContext} from 'react';
import {StyleSheet, TouchableOpacity, TouchableHighlight, ActivityIndicator, TextInput, Button, Alert, SafeAreaView, ScrollView, Image, Text, View, RefreshControl, FlatList, StatusBar} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {Colors} from './colors'
export default function SignInButton(props) {
    

  console.log("props", props)
  let {handlePress} = props
  return (
   
        <TouchableOpacity onPress={props.onPress} style={{flex:1, margin:40, justifyContent:'center'}}>
        <LinearGradient style={{borderRadius:30,height:45, justifyContent:'center'}} colors={[Colors.mainGreen, Colors.primaryGreen]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
            <Text style={{textAlign:'center', fontFamily:'Poppins_400Regular', color:'white', fontSize:16}}>{props.title}</Text>
        </LinearGradient>
        </TouchableOpacity>
    
  );
}
