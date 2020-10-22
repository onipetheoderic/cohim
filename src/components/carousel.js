import React, {useContext} from 'react';
import {StyleSheet, TouchableOpacity, ActivityIndicator, 
    TextInput, Button, Alert, SafeAreaView, ScrollView, Image, Text,
     View, RefreshControl,ImageBackground, FlatList, StatusBar, Dimensions} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto'
import * as Animatable from 'react-native-animatable';

const Carousel = (props) => {
    const imageLink = props.imageLink
    const { width, height } = Dimensions.get('window');
  return (
      <View>
    <ImageBackground
    source={imageLink} 
    style={{ width: '100%', resizeMode: "cover", height:height/1.7}}
>
  <Text style={{
    marginTop:70,
    color:'white',
    fontWeight:'bold',
    fontSize:22,
    marginLeft:40}}>{props.title} </Text>
    
    <Text style={{fontSize:13,marginTop:20, marginLeft:40, marginRight:40, color:'white', fontFamily:'Poppins_400Regular'}}>
    {props.description}
    </Text>
    <Text style={{fontSize:12,marginTop:20, marginLeft:40, color:'white', fontFamily:'Poppins_400Regular'}}>
    {props.contractName}
  
    </Text>
  
</ImageBackground>
    </View>
  );
}

export default React.memo(Carousel);


const styles = StyleSheet.create({
    swipeoutSide: {
        backgroundColor: '#fff',
       
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
      },
      listContainer: {
        borderRadius: 4,
        
        marginLeft: 15,
        marginRight: 15,
        marginTop: 5,
        marginBottom: 5,
        height: 82,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 0.50,
        shadowRadius: 12.35,
        
        elevation: 5,
          },
         
      listHeader: {
        flex: 1,
        justifyContent: 'center',
        marginLeft: 20
      },
      listTitle: {
        fontSize: 22,
        color: '#1A4024',
        marginBottom: 2,
        fontFamily:'Poppins_400Regular'
      },
      listSubTitle: {
        fontSize: 14,
        color: '#1A4024',
        fontFamily:'Poppins_400Regular'
      },
    cardParent: {
        marginVertical:10,
        height:170,
        borderRadius:10,
        backgroundColor:'green',
        width:'42%',
    },
    circularCard: {
      width:80,
      height:80,
      borderRadius:40,
      justifyContent:'center',
      borderColor:'white',
      borderWidth:1,
      alignSelf:'center'
    },
    image: {
     height:'100%',
      resizeMode: "cover",
      width:'100%',
    
    },
    text: {
        fontFamily: "Poppins_400Regular",
        color: "#3e3e3e",
        fontSize:28
    },
    contractTitle: {
      fontFamily: "Poppins_400Regular",
      color: "#3e3e3e",
      fontSize:17,
      marginLeft:10
    },
    eachCard: {
      margin:10,
      backgroundColor:'white', 
      width:'40%', 
      borderRadius:10,
      height:150,
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
longCard: {
    margin:10,
    backgroundColor:'white', 
    width:'90%', 
    borderRadius:10,
    height:80,
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

 
  title: {
    marginTop:10, 
    marginBottom:20,
    textAlign:'center',
    color:'#095A1F',
    fontFamily:'Poppins_400Regular', 
    fontSize:15,
    
},
state: {
    marginTop:5, 
    textAlign:'center',
    color:'#095A1F',
    fontFamily:'Poppins_400Regular', 
    fontSize:13,
    
},
currentPercentage: {
    marginTop:10, 
    textAlign:'center',
    color:'white',
    fontFamily:'Poppins_400Regular', 
    fontSize:37,
},

})