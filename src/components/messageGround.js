import React, {useContext} from 'react';
import {StyleSheet, Dimensions,TouchableOpacity, ActivityIndicator, TextInput, Button, Alert, SafeAreaView, ScrollView, Image, Text, View, RefreshControl, FlatList, StatusBar} from 'react-native';
import { CounterContext } from "../../store";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto'
import Header from './header';
import MsgButton from './msgButton'



export default function MessageGround(props) {
    const {state} = useContext(CounterContext)
    console.log("this is the count", state)
 
    
  return (
    <SafeAreaView style={{backgroundColor:'white'}}>
        <View style={{backgroundColor:'white', marginBottom:10}}>
           
            <View style={{flexDirection:'row', justifyContent:'center', marginTop:55, marginBottom:10, }}>
            <Text style={{fontFamily:'Montserrat_400Regular', alignSelf:'center', marginRight:30, fontSize:20, textAlign:'center'}}>Inbox</Text>
                

            </View>
        </View>
       
            <ScrollView style={{backgroundColor:'white'}}
            contentInsetAdjustmentBehavior="automatic"
            showsVerticalScrollIndicator={false}>
                {props.children}   
                <View style={{marginBottom:80}}></View>         
            </ScrollView>                
   
    

   </SafeAreaView>
   
  );
}

const styles = StyleSheet.create({
    headerIcon: {
        marginTop:6
    },

    titleBar: {
        flexDirection: 'row',
    
    },
    



})