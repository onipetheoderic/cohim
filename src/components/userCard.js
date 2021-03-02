import React, {useContext} from 'react';
import {StyleSheet, TouchableOpacity, ActivityIndicator, TextInput, Button, Alert, SafeAreaView, ScrollView, Image, Text, View, RefreshControl, FlatList, StatusBar} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function UserCard(props) {
    

  
  return (
    <TouchableOpacity onPress={()=>props.navigation.navigate("SingleUser",{id:props.id})}>
   <View style={{marginTop:20, marginBottom:20}}>
          
          
   
       <View style={styles.eachCard}>
        <View style={{width:'77%', marginLeft:20, }}>
        <Text style={{textAlign:'center', fontWeight:'500', marginBottom:10,
         fontSize:15, fontFamily:'Montserrat_400Regular', color:'#03260A'}}>
            {props.name}
        </Text>
        <Text style={{textAlign:'center', fontWeight:'500', marginBottom:10, 
        fontSize:14, fontFamily:'Montserrat_400Regular', color:'#758578'}}>
            {props.phoneNumber}
        </Text>
        <Text style={{textAlign:'center', fontSize:13, 
        fontFamily:'Montserrat_400Regular', color:'#03260A'}}>
            {props.title} {props.type}
        </Text>
        </View>
       
       <LinearGradient style={styles.circle} colors={['#33FC5E', '#0A4B12']}>
    <Text style={{textAlign:'center', fontSize:35, fontFamily:'Montserrat_400Regular', color:'white'}}>
            {props.count}
        </Text>
        </LinearGradient>
       </View>

    </View>
    </TouchableOpacity>
  );
}



const styles = StyleSheet.create({
    icon: {
        alignSelf:'center', 
        textAlign:'center', 
        color:'white',
       
    },
  eachCard: {
    margin:10,
    backgroundColor:'white', 
    width:'84%', 
    borderRadius:10,
    height:180,
    alignSelf:'flex-start',
    justifyContent:'center',
    shadowColor: "#000",
shadowOffset: {
width: 0,
height: 9,
},
shadowOpacity: 0.50,
shadowRadius: 12.35,

elevation: 10,
},

circle: {
    borderWidth:4,
    borderColor:'white',
    position:'absolute', 
    borderRadius:50, 
    right:-45, 
    top:30, 
    justifyContent:'center',
    width:100, 
    height:100, 
    shadowColor: "#000",
shadowOffset: {
width: 0,
height: 9,
},
shadowOpacity: 0.50,
shadowRadius: 15.35,

elevation: 22,
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
    fontSize:15,
    
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

