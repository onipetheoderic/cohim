import React, {useContext} from 'react';
import {StyleSheet,TouchableOpacity, ActivityIndicator, TextInput, Button, Alert, SafeAreaView, ScrollView, Image, Text, View, RefreshControl, FlatList, StatusBar} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function MsgButton(props) {
    

  
  return (
   
        <TouchableOpacity onPress={props.onPress} 
        style={{flex:1, marginHorizontal:5, height:50, backgroundColor:'green', justifyContent:'center'}}>
        
            <Text style={{textAlign:'center', fontFamily:'Montserrat_400Regular',  color:'white', fontSize:17}}>{props.title}</Text>
        
        </TouchableOpacity>
    
  );
}
