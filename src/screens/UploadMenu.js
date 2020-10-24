import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  BackHandler,
  Dimensions,
  PixelRatio,
} from 'react-native';
import HeaderWithBack from '../components/headerWithBack';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto'

import { TouchableOpacity } from 'react-native-gesture-handler';
import Carousel from '../components/carousel'
import CarouselPlayGround from '../components/carouselPlayground'
import HighwayCircleCard from '../components/highwayCircleCard';
import GetLocation from 'react-native-get-location'


const UploadMenu = (props) => {    
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
<HeaderWithBack navigation={props.navigation} />
  <View style={{backgroundColor:'green', flex: 1.6}}>
    <View style={{position:'absolute', top:height/4.1, right:3, zIndex:100000}}>
      <HighwayCircleCard iconName="road" 
      navigation={props.navigation} 
      link="AllSavedDatasheets" 
      title="Saved Inspection Datasheets"/>
    </View>
      <CarouselPlayGround>
         
         <Carousel navigation={props.navigation} contractName="Upload Road Contract Datasheet" title="Already Existing Road Beme for you to select from" imageLink = {require('../../assets/images/offline.jpg')} description="If you want a road Beme, click on Road Beme, and Start populating the BEME"/>
         <Carousel navigation={props.navigation} contractName="Upload Bridge Contract Datasheet" title="Easy to Use Bridge Beme for you to Select from" imageLink = {require('../../assets/images/offline1.jpg')} description="You Need a Bridge Beme, Click on the Bridge Beme and Start populating the Template"/>
         <Carousel navigation={props.navigation} contractName="Upload Housing Contract Datasheet" title="Already Existing Housing Beme for you to Populate" imageLink = {require('../../assets/images/offline2.jpg')} description="Click on Housing Beme, Select the Type of House, then Start populating"/>
         <Carousel navigation={props.navigation} contractName="Upload HDMI Contract Datasheet" title="Quickly Populate the HDMI Beme" imageLink = {require('../../assets/images/offline5.jpg')} description="Upload HDMI inspection details by populating the preexisting Beme"/>
        
      
      </CarouselPlayGround>
     
  </View>


  <View style={{flex:2,backgroundColor:'white',
      borderTopRightRadius:40, 
      marginTop:-30,
      borderTopLeftRadius:40,}}>
  
      <ScrollView style={{marginTop:30}}>    
        <View style={{flexDirection:'row', justifyContent:'space-around'}}>
          
          <View style={[styles.eachCard]}>
            <TouchableOpacity onPress={()=>props.navigation.navigate('DatasheetTemplate', {
              type:"road"
            })}>
              <FontAwesome5 style={{alignSelf:'center', textAlign:'center'}} 
              name="road" size={41} color="green"/>
              <Text style={styles.state}>Road Contract Beme</Text>  
            </TouchableOpacity>
          </View>

          <View style={[styles.eachCard]}>
            <TouchableOpacity onPress={()=>props.navigation.navigate('BridgeDatasheet', {
              type:"bridge"
            })}>
                <FontAwesome5 style={{alignSelf:'center', textAlign:'center'}} 
                    name="water" size={41} color="green"/>
                <Text style={styles.state}>Bridge Contract Beme</Text>   
            </TouchableOpacity>                     
          </View>
        
        </View>       
        <View style={{flexDirection:'row', justifyContent:'space-around'}}>
          <View style={[styles.eachCard]}>
          <TouchableOpacity onPress={()=>props.navigation.navigate('HousingMenu')}>
              <FontAwesome5 style={{alignSelf:'center', textAlign:'center'}} 
              name="home" size={41} color="green"/>
              <Text style={styles.state}>Housing Beme</Text>
          </TouchableOpacity>
          </View>

          <View style={[styles.eachCard]}>
                <FontAwesome5 style={{alignSelf:'center', textAlign:'center'}} 
                    name="broadcast-tower" size={41} color="green"/>
                <Text style={styles.state}>HDMI Datasheet</Text>                       
          </View>
        </View>   
      </ScrollView>
   
  </View>
    
      
        
    </View>
    );
  };



export default UploadMenu;

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