import React, {useContext} from 'react';
import {StyleSheet, TouchableOpacity, ActivityIndicator, TextInput, Button, Alert, SafeAreaView, ScrollView, Image, Text, View, RefreshControl, FlatList, StatusBar} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function MsgCard(props) {
    

  
  return (
    <TouchableOpacity onPress={props.onPress}>
   <View style={{marginTop:20, marginBottom:20}}>
          
          
   
       <View style={styles.eachCard}>
        <View style={{width:'50%', marginLeft:20, }}>
        <Text animation="pulse" easing="ease-out" iterationCount="infinite"
        style={{textAlign:'center', fontSize:15, fontFamily:'Montserrat_400Regular', color:'#03260A'}}>
            {props.title}
        </Text>
        </View>
       
       <LinearGradient style={styles.circle} colors={['#33FC5E', '#0A4B12']}>
       <FontAwesome5 style={styles.icon} 
    name={props.iconName} size={41} />
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
    width:'90%', 
    borderRadius:10,
    height:100,
    alignSelf:'center',
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
    borderRadius:70, 
    right:-15, 
    top:-20, 
    justifyContent:'center',
    width:140, 
    height:140, 
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

