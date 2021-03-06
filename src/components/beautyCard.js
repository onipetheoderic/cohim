import React, {useContext} from 'react';
import {StyleSheet, TouchableOpacity, ActivityIndicator, TextInput, Button, Alert, SafeAreaView, ScrollView, Image, Text, View, RefreshControl, FlatList, StatusBar} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto'
export default function BeautyCard(props) {
    
 
const centralizer = (str) => {
    const stringLength = str != undefined ? str.length : 0
    let newMargin = 5-stringLength;
    let finalMargin = newMargin*6.5
    return finalMargin
}
  const monthName = props.monthName
  return (
    <LinearGradient colors={['#9EF0A8', '#0FA922', '#023909']}
    style={{width:'92%', borderRadius: 25, alignSelf:'center', height:130, marginVertical:10 }}>
        <View style={{top:50, 
        position:'absolute',
        left:0,marginLeft:centralizer(monthName),
        transformOrigin: 'top left',
        transform: [{ rotate: '270deg'}]}}>
            <Text style={{fontFamily:'Montserrat_400Regular',fontSize:20,        
            color:'white',
           }}>{monthName}</Text>
        </View>
      
        <LinearGradient colors={['#FDFFFE','#E5FEE8', '#C7FECE']} 
        style={{alignSelf:'flex-end', borderRadius: 25, width:'80%', height:130, backgroundColor:'white'}}>
            <View style={{flexDirection:'row'}}>
            <Text style={{fontFamily:'Montserrat_400Regular',fontSize:16,marginTop:10, marginLeft:20}}>
                {props.type}
            </Text>
           
            </View>
            <View style={{flexDirection:'row'}}>
            <Text style={{fontFamily:'Montserrat_400Regular',fontSize:36,marginTop:0, marginLeft:20}}>
                {props.day}
            </Text>
            <Text style={{fontFamily:'Montserrat_400Regular',fontSize:12,marginTop:20}}>
                ({props.time})
            </Text>
            </View>
            
            <View style={{position:'relative'}}>

                <Text style={{width:'80%', fontFamily:'Montserrat_400Regular',fontSize:15,marginTop:10, marginLeft:20}}>
                {props.title}
                </Text>
                <View style={{position:'absolute', right:0}}>
                <TouchableOpacity onPress={()=>props.handleTrash()}>
                    <Fontisto name="trash" size={20} color="red" />
                </TouchableOpacity>
                </View>
              
            </View>
            
        </LinearGradient>
    </LinearGradient>
    
  );
}
