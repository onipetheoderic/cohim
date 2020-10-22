
import React, {useContext, useEffect, useState} from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  AsyncStorage,
  ImageBackground,
  Dimensions,
  Image,
} from 'react-native';
import ProgressCircle from 'react-native-progress-circle'
import { CounterContext } from "../../store";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto'
import {datasheetkey} from '../api/constants';
import { TouchableOpacity } from 'react-native-gesture-handler';
import PlayGround from '../components/playGround'
import HighwayCard from '../components/highwayNav';

import {allAssignedContracts, getUserDetail} from '../api/apiService';
import {Colors} from '../components/colors'
import HighwayCircleCard from '../components/highwayCircleCard'
import Truncator from "../helpers/truncator";
import Currency from '../helpers/currency';


const UploadSelection = (props) => {    
    const { width, height } = Dimensions.get('window');
    const [token, setToken] = useState("");
    const [bridge, setBridge] = useState([]);
    const [road, setRoad] = useState([]);
    const [user, setUser] = useState({});
    const [housing, setHousing] = useState([])
    const [savedDatasheet, setSavedDatasheet] = useState([]);
    const globalState = useContext(CounterContext);    
    
    const {state, dispatch } = globalState;

     

    useEffect(() => {
      // Return the function to unsubscribe from the event so it gets removed on unmount
    
      const {state, dispatch } = globalState;

      console.log("this is the state", state)
      let dataSheetArray = async () => await AsyncStorage.getItem(datasheetkey)
        dataSheetArray().then((val) => {
          console.log("the val", val)
          if (val) {
            let Datasheets = JSON.parse(val)
            console.log("DDDDD",Datasheets)
            dispatch({ type: 'addToDatasheetArray',payload:Datasheets})
            setSavedDatasheet(Datasheets)          
          }
        })
        AsyncStorage.getItem("@SessionObj")
        .then((result)=>{          
            let parsifiedResult = JSON.parse(result);
            if(parsifiedResult!=null){
              let userDetails = parsifiedResult.userDetails;
              let { user_token } = userDetails;
              getUserDetail(user_token)
              .then((data) => {
              console.log("userfffffl", data)
            
              setUser(data.user);
            
            })
              allAssignedContracts(user_token)
              .then((data) => {
              console.log("lllllllllllllllllllll", data)
              setRoad(data.road);
              setBridge(data.bridge);
              setHousing(data.housing);
            
            })
          }
          else {
              return ;
          }
          // allAssignedContracts(state.userDetails.user_token)
          // .then((data) => {
          //   console.log("lllllllllllllllllllll", data)
          //   setRoad(data.road);
          //   setBridge(data.bridge);
          //   setHousing(data.housing);
            
          // })
        })
        
      
        
            
    }, []);

const roadExist = road.length==0?false:true;
const bridgeExist = bridge.length==0?false:true;
const housingExist = housing.length==0?false:true;
/*

<View style={{backgroundColor:'white', flexDirection:'row',marginTop:20,marginBottom:10, justifyContent:'space-evenly', flexWrap:'wrap'}}>
      <HighwayCard iconName="road" title="Saved Inspection Datasheets" navigation={props.navigation} link="AllSavedDatasheets" />
      <HighwayCard iconName="envelope" title="View/Send Messages" navigation={props.navigation} link="Messages" />
      <HighwayCard iconName="water" title="Completed Road/Bridge" link="" />
  
    </View>
*/ 

console.log(roadExist, bridgeExist, housingExist)

  return (
    <View style={{flex:1}}> 

<View style={{backgroundColor:'green', flex: 2}}>
    <ImageBackground
        style={styles.image}
        source={require('../../assets/images/unnamed.jpg')}
    >
      <Text style={{
        marginTop:50,
        color:'white',
        fontWeight:'bold',
        fontSize:22,
        marginLeft:40}}>Hello! {user.firstName}</Text>
        <Text style={{fontSize:12,marginTop:20, marginLeft:40, color:'white', fontFamily:'Poppins_400Regular'}}>
        Welcome to your Dashboard. You can perform Administrative Tasks from here. Click the Menu below
        </Text>
        <ScrollView horizontal 
        showsHorizontalScrollIndicator={false} style={{flexDirection:'row', marginTop:-40}}>
         <HighwayCircleCard iconName="road" navigation={props.navigation} link="AllSavedDatasheets" title="Saved Inspection Datasheets"/>
         <HighwayCircleCard iconName="envelope" title="View/Send Messages" navigation={props.navigation} link="Messages"/>
         <HighwayCircleCard iconName="water" title="Completed Road/Bridge" link=""/>
         <HighwayCircleCard iconName="user" title="Verify HDMI User" link=""/>
     

        </ScrollView>
    </ImageBackground>
</View> 
<View style={{flex:2,backgroundColor:'white',
    borderTopRightRadius:40, 
    marginTop:-30,
    borderTopLeftRadius:40,}}>

<ScrollView style={{
    
  marginTop:50
    }}>
     

     
    <View style={{margin:20}}/>


    <View>
    {housingExist&&
      <Text style={styles.contractTitle}>Housing Contract Your are Assigned To</Text>
    }
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {housing.map((contract) => (
             <TouchableOpacity onPress={() => props.navigation.navigate('SelectDatasheet', {
              id: contract.id,
              type: "housing",
              title: contract.title,
              token:token
            })}>
            <View style={[styles.eachCard]}>
              <Text style={styles.title}>{contract.title}</Text>
              <Text style={styles.state}>{contract.state} {contract.lga}</Text>
              <Text style={styles.currentPercentage}>{Math.round(contract.current_percentage)}%</Text>
              <Text style={styles.state}>{contract.contractor}</Text>           
            </View>
            </TouchableOpacity>
            
          
          ))}
      </ScrollView>
      </View>  
      
      <ScrollView>
      {bridgeExist&&
      <Text style={styles.contractTitle}>Bridge Contract Your are Assigned To</Text>
}
<ScrollView horizontal showsHorizontalScrollIndicator={false}>
    
    


    {bridge.map((contract) => (
        <TouchableOpacity onPress={() => props.navigation.navigate('SelectDatasheet', {
          id: contract.id,
          type: "road",
          token:token,
          title: contract.title,
        })}>
      <View style={[styles.eachCard]}>
      <Text style={styles.title}>{Truncator(contract.title, 45)}</Text>
        {/* 
        <Text style={styles.state}>{contract.state} {contract.lga}</Text>
        <Text style={styles.currentPercentage}>{Math.round(contract.current_percentage)}%</Text>
        <Text style={styles.state}>{contract.contractor}</Text>            */}
        <View style={{alignSelf:'center'}}>
        <ProgressCircle
      percent={contract.current_percentage}
      radius={40}
      borderWidth={5}
      color="#086321"
      shadowColor="#F2F5F3"
      bgColor="#fff"
      containerStyle={{shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 9,
      },
      shadowOpacity: 0.50,
      shadowRadius: 12.35,
      
      elevation: 19,}}
  >
      <Text style={{ fontSize: 18, fontFamily:'Poppins_400Regular' }}>{Math.round(contract.current_percentage)}%</Text>
  </ProgressCircle>
  </View>
  <Text style={styles.state}>{Currency(contract.contract_sum)}</Text>
  <Text style={styles.state}>{Truncator(contract.contractor, 20)}</Text>
  <Text style={styles.title}>{contract.state}</Text>
      </View>
      </TouchableOpacity>

      
    
    ))}
</ScrollView>
      </ScrollView> 

    <ScrollView>
       {roadExist&&
      <Text style={styles.contractTitle}>Road Contract Your are Assigned To</Text>
       }
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
    
    


          {road.map((contract) => (
              <TouchableOpacity onPress={() => props.navigation.navigate('SelectDatasheet', {
                id: contract.id,
                type: "road",
                token:token,
                title: contract.title,
              })}>
            <View style={[styles.eachCard]}>
            <Text style={styles.title}>{Truncator(contract.title, 45)}</Text>
              {/* 
              <Text style={styles.state}>{contract.state} {contract.lga}</Text>
              <Text style={styles.currentPercentage}>{Math.round(contract.current_percentage)}%</Text>
              <Text style={styles.state}>{contract.contractor}</Text>            */}
              <View style={{alignSelf:'center'}}>
              <ProgressCircle
            percent={contract.current_percentage}
            radius={40}
            borderWidth={5}
            color="#086321"
            shadowColor="#F2F5F3"
            bgColor="#fff"
            containerStyle={{shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 9,
            },
            shadowOpacity: 0.50,
            shadowRadius: 12.35,
            
            elevation: 19,}}
        >
            <Text style={{ fontSize: 18, fontFamily:'Poppins_400Regular' }}>{Math.round(contract.current_percentage)}%</Text>
        </ProgressCircle>
        </View>
        <Text style={styles.state}>{Currency(contract.contract_sum)}</Text>
        <Text style={styles.state}>{Truncator(contract.contractor, 20)}</Text>
        <Text style={styles.title}>{contract.state}</Text>
            </View>
            </TouchableOpacity>

            
          
          ))}
      </ScrollView>
      </ScrollView>     
  </ScrollView>
 
</View>
  
    
      
  </View>
  );
};



export default UploadSelection;

const styles = StyleSheet.create({
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
      backgroundColor:'white', 
      width:150, 
      borderRadius:10,
      height:250,
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
    fontSize:13,
    
},
state: {
    marginTop:5, 
    textAlign:'center',
    color:'#095A1F',
    fontFamily:'Poppins_400Regular', 
    fontSize:15,
    
},
currentPercentage: {
    marginTop:10, 
    textAlign:'center',
    color:'white',
    fontFamily:'Poppins_400Regular', 
    fontSize:37,
},

})