import React, {useContext, useState} from 'react';
import {StyleSheet, TouchableOpacity, ActivityIndicator, TextInput, Button, Alert, SafeAreaView, ScrollView, Image, Text, View, RefreshControl, FlatList, StatusBar} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto'
import * as Animatable from 'react-native-animatable';


export default function HighwayCircleCard(props) {
    const [bgColor, setBgColor] = useState("transparent");
    const [iconColor, setIconColor] = useState("white")

   

  return (
   
    <Animatable.View animation="slideInRight" style={{width:100,  justifyContent:'center'}}>
    <TouchableOpacity  onPress={()=>props.navigation.navigate(props.link)}>
    <View style={[styles.circularCard,{backgroundColor:bgColor}]}>
    <Animatable.Text animation="pulse" easing="ease-out" iterationCount="infinite" style={{textAlign:'center',fontSize:9, fontFamily:'Montserrat_400Regular', color:'white'}}>
    <FontAwesome5 style={{alignSelf:'center', textAlign:'center'}} 
    name={props.iconName} size={21} color={iconColor}/>
    </Animatable.Text>
    </View>
    <View style={{width:'80%', marginLeft:'auto', marginRight:'auto'}}>
    <Animatable.Text animation="pulse" easing="ease-out" 
    iterationCount="infinite" style={{textAlign:'center',fontSize:9, fontFamily:'Montserrat_400Regular', color:'white',}}>
   
   {props.title}
 </Animatable.Text>
    </View>
    
    </TouchableOpacity>
  </Animatable.View>
  
   
  );
}

const styles = StyleSheet.create({
    circularCard: {
        width:60,
        height:60,
        borderRadius:40,
        justifyContent:'center',
        borderColor:'white',
        borderWidth:1,
        alignSelf:'center'
      },
})