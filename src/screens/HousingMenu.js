import React, {useState, useEffect} from 'react';

import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Dimensions,
} from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


import { TouchableOpacity } from 'react-native-gesture-handler';
import Carousel from '../components/carousel'
import CarouselPlayGround from '../components/carouselPlayground'
import HighwayCircleCard from '../components/highwayCircleCard';
import GetLocation from 'react-native-get-location'
import {Toast} from 'native-base';

const HousingMenu = (props) => {    
    const { width, height } = Dimensions.get('window');
    const [token, setToken] = useState("");
    const [bridge, setBridge] = useState([]);
    const [road, setRoad] = useState([]);
    const [housing, setHousing] = useState([])
    const [national, setNational] = useState([]);
    
   
    useEffect(() => {   
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
        })
        .then(location => {
            console.log("Location is Presseee",location);
        })
        .catch(error => {
            const { code, message } = error;
            console.warn("Error",code, message);
        })
    }, []);
/*
 <HighwayCard navigation={props.navigation} iconName="road" title="Ongoing Road Project" link="ongoing_road" />
*/ 

return (
  <View style={{flex:1}}> 

  <View style={{backgroundColor:'green', flex: 1.6}}>
    <View style={{position:'absolute', top:height/4.1, right:10, zIndex:100000}}>
      <HighwayCircleCard iconName="road" navigation={props.navigation} link="AllSavedDatasheets" title="Saved Inspection Datasheets"/>
    </View>
      <CarouselPlayGround>
         
         <Carousel navigation={props.navigation} contractName="One Bedroom Semi-detached Bungalow" title="One Bedroom Bungalow" imageLink = {require('../../assets/images/house.jpg')} description="Upload One Bedroom Semi Detached Burgalow"/>
         <Carousel navigation={props.navigation} contractName="Two Bedroom Semi-detached Burgalow" title="Two Bedroom Semi-detached" imageLink = {require('../../assets/images/house1.jpg')} description="Upload Two bedroom Semi Detached"/>
         <Carousel navigation={props.navigation} contractName="Three Bedroom Semi-detached Burgalow" title="Three Bedroom Semi-detached" imageLink = {require('../../assets/images/house2.jpg')} description="Upload Three bedroom Datasheet"/>
         <Carousel navigation={props.navigation} contractName="Condominium" title="Condominium" imageLink = {require('../../assets/images/house3.jpg')} description="Upload Condominium Datasheet"/>
        
      
      </CarouselPlayGround>
     
  </View>


  <View style={{flex:2,backgroundColor:'white',
      borderTopRightRadius:40, 
      marginTop:-30,
      borderTopLeftRadius:40,}}>
  
      <ScrollView style={{marginTop:30}}>    
        <View style={{flexDirection:'row', justifyContent:'space-around'}}>
          
          <View style={[styles.eachCard]}>
            <TouchableOpacity onPress={()=>props.navigation.navigate('HousingTemplate', {
              type:"one_bedroom_semi_detached_bungalow"
            })}>
              <FontAwesome5 style={{alignSelf:'center', textAlign:'center'}} 
              name="home" size={41} color="green"/>
              <Text style={styles.state}>One Bedroom Semi-detached Burgalow</Text>  
            </TouchableOpacity>
          </View>

          <View style={[styles.eachCard]}>
            <TouchableOpacity onPress={()=>props.navigation.navigate('HousingTemplate', {
              type:"two_bedroom_semi_detached_bungalow_type_a"
            })}>
                <FontAwesome5 style={{alignSelf:'center', textAlign:'center'}} 
                    name="home" size={41} color="green"/>
                <Text style={styles.state}>Two Bedroom Semi-detached Burgalow Type A</Text>   
            </TouchableOpacity>                     
          </View>
        
        </View>     
        <View style={{flexDirection:'row', justifyContent:'space-around'}}>
          
          <View style={[styles.eachCard]}>
            <TouchableOpacity onPress={()=>props.navigation.navigate('HousingTemplate', {
              type:"two_bedroom_semi_detached_bungalow_type_b"
            })}>
              <FontAwesome5 style={{alignSelf:'center', textAlign:'center'}} 
              name="home" size={41} color="green"/>
              <Text style={styles.state}>Two Bedroom Semi-detached Burgalow Type B</Text>  
            </TouchableOpacity>
          </View>

          <View style={[styles.eachCard]}>
            <TouchableOpacity onPress={()=>props.navigation.navigate('HousingTemplate', {
              type:"three_bedroom_semi_detached_bungalow"
            })}>
                <FontAwesome5 style={{alignSelf:'center', textAlign:'center'}} 
                    name="home" size={41} color="green"/>
                <Text style={styles.state}>Three Bedroom Semi-detached Burgalow</Text>   
            </TouchableOpacity>                     
          </View>
        </View>    
        <View style={{flexDirection:'row', justifyContent:'space-around'}}>
          <View style={[styles.eachCard]}>
          <TouchableOpacity onPress={()=>props.navigation.navigate('HousingTemplate', {
              type:"three_bedroom_semi_detached_bungalow_laterite_blocks"
            })}>
              <FontAwesome5 style={{alignSelf:'center', textAlign:'center'}} 
              name="home" size={41} color="green"/>
              <Text style={styles.state}>Three Bedroom Semi-detached Laterite block</Text>  
          </TouchableOpacity>
          </View>

          <View style={[styles.eachCard]}>
            <TouchableOpacity onPress={()=>props.navigation.navigate('HousingTemplate', {
                type:"condominium"
              })}>
                <FontAwesome5 style={{alignSelf:'center', textAlign:'center'}} 
                    name="home" size={41} color="green"/>
                <Text style={styles.state}>Condominium Datasheet</Text>       
            </TouchableOpacity>                
          </View>

        </View>   
      </ScrollView>
   
  </View>
    
      
        
    </View>
    );
  };



export default HousingMenu;

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
    alignSelf:'center',
    backgroundColor:'white', 
    width:'45%', 
    borderRadius:10,
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
  marginHorizontal:3,
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