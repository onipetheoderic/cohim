import React, {useContext} from 'react';
import {StyleSheet,TouchableOpacity, ActivityIndicator, TextInput, Button, Alert, SafeAreaView, ScrollView, Image, Text, View, RefreshControl, FlatList, StatusBar} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function SaveButton(props) {
    

  
  return (
   
        <TouchableOpacity onPress={props.handleSubmit} style={{flex:1, margin:10, height:80, justifyContent:'center'}}>
        <LinearGradient style={{borderRadius:3,height:50, justifyContent:'center'}} colors={['#ffb656', '#f98845']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
            <Text style={{textAlign:'center', fontFamily:'Poppins_400Regular',  color:'white', fontSize:17}}>{props.title}</Text>
        </LinearGradient>
        </TouchableOpacity>
    
  );
}
