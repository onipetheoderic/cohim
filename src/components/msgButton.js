import React, {useContext} from 'react';
import {StyleSheet,TouchableOpacity, ActivityIndicator, TextInput, Button, Alert, SafeAreaView, ScrollView, Image, Text, View, RefreshControl, FlatList, StatusBar} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function MsgButton(props) {
    

  
  return (
   
        <TouchableOpacity onPress={props.buttonOnpress} style={{flex:1, marginHorizontal:10, height:50, justifyContent:'center'}}>
        <LinearGradient style={{borderRadius:3,height:40, justifyContent:'center'}} colors={['#615CF3', '#0E0B73']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
            <Text style={{textAlign:'center', fontFamily:'Poppins_400Regular',  color:'white', fontSize:17}}>{props.title}</Text>
        </LinearGradient>
        </TouchableOpacity>
    
  );
}
