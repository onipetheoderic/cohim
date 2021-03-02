import React, {useContext} from 'react';
import {StyleSheet, TouchableOpacity, ActivityIndicator, TextInput, Button, Alert, SafeAreaView, ScrollView, Image, Text, View, RefreshControl, FlatList, StatusBar} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function ZoneCard(props) {
    
// count, littleDesc, title
  
  return (
   
    <View style={[styles.eachCard]}>
        <TouchableOpacity onPress={()=>props.navigation.navigate("ShowEngineersStateSingle",{type:props.type})}>

     

    <Text style={styles.title}>{props.title}</Text>
     
<View style={{alignSelf:'center'}}>
     
</View>
<Text style={styles.state}>{props.count}</Text>
<Text style={styles.title}>{props.littleDesc}</Text>
</TouchableOpacity>
</View>
    
  );
}

const styles = StyleSheet.create({
    eachCard: {
      marginVertical:10,
      backgroundColor:'white', 
      width:'42%', 
      borderTopRightRadius:40,
      height:200,
      justifyContent:'center',
      shadowColor: "#000",
  shadowOffset: {
  width: 0,
  height: 9,
  },
  shadowOpacity: 0.50,
  shadowRadius: 12.35,
  
  elevation: 19,
  },
  
  image: {
    height:'100%',
     resizeMode: "cover",
   
   },
  
  
      default: {
          fontSize:10,
          color:'white',
          textAlign:'center'
      },
     
    title: {
      marginTop:10, 
      marginBottom:20,
      textAlign:'center',
      color:'#095A1F',
      fontFamily:'Montserrat_400Regular', 
      fontSize:13,
      
  },
  state: {
      marginTop:5, 
      textAlign:'center',
      color:'#095A1F',
      fontFamily:'Montserrat_400Regular', 
      fontSize:25,
      
  },
  currentPercentage: {
      marginTop:10, 
      textAlign:'center',
      color:'white',
      fontFamily:'Montserrat_400Regular', 
      fontSize:37,
  },
  
  
      container: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f5fcff"
        },
      textField: {
        
          textAlign:'center',
          justifyContent:'center',
          marginLeft:'auto',
          marginRight:'auto',
          marginBottom:10,
          borderRadius:26,
          width:'90%',
          
          shadowColor: "#000",
  shadowOffset: {
      width: 0,
      height: 4,
  },
  shadowOpacity: 0.41,
  shadowRadius: 9.11,
  
  elevation: 8,
      }
  })
  
/*
  <View style={[styles.eachCard]}>
            <Text style={styles.title}>South West</Text>
             
        <View style={{alignSelf:'center'}}>
             
        </View>
        <Text style={styles.state}>50</Text>
        <Text style={styles.state}>Engineers</Text>
     
    </View>

*/ 