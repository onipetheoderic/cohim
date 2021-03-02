
import React, {useContext, useEffect, useState} from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  ImageBackground,
  Dimensions,
  AsyncStorage
} from 'react-native';
import ProgressCircle from 'react-native-progress-circle'
import { CounterContext } from "../../store";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {datasheetkey} from '../api/constants';
import { TouchableOpacity } from 'react-native-gesture-handler';

import {allAssignedContracts, getUserDetail} from '../api/apiService';
import HighwayCircleCard from '../components/highwayCircleCard'
import Truncator from "../helpers/truncator";
import Currency from '../helpers/currency';
import { NavigationActions, StackActions } from 'react-navigation'

const HighwayMenu = (props) => {    
    const { width, height } = Dimensions.get('window');
    const [token, setToken] = useState("");
    const [bridge, setBridge] = useState([]);
    const [road, setRoad] = useState([]);
    const [user, setUser] = useState({});
    const [userClicked, setUserClicked] = useState(false)
    const [housing, setHousing] = useState([])
    const [savedDatasheet, setSavedDatasheet] = useState([]);
    const globalState = useContext(CounterContext);    
    
    const {state, dispatch } = globalState;

    const logOut = () => {
      const {state, dispatch } = globalState;
      let store = async () => await AsyncStorage.removeItem('@SessionObj')
      store().then(() => {
          const resetAction = StackActions.reset({
              index: 0,
              actions: [
                  NavigationActions.navigate({
                      routeName: "LoginScreen"
                  })
              ]
          });
          dispatch({ type: 'logOut',payload:{}})
          props.navigation.dispatch(resetAction);
      }).catch((err) => {
      })
  }
  

    useEffect(() => {
      const {state, dispatch } = globalState;
      let dataSheetArray = async () => await AsyncStorage.getItem(datasheetkey)
        
        AsyncStorage.getItem("@SessionObj")
        .then((result)=>{          
            let parsifiedResult = JSON.parse(result);
            if(parsifiedResult!=null){
              let userDetails = parsifiedResult.userDetails;
              let { user_token } = userDetails;
              getUserDetail(user_token)
              .then((data) => {
              if(data.success==true){
                setUser(data.user);
                dataSheetArray().then((val) => {
                  if (val) {
                    let Datasheets = JSON.parse(val)
                    dispatch({ type: 'addToDatasheetArray',payload:Datasheets})
                    setSavedDatasheet(Datasheets)          
                  }
                })
              }
              else {
                props.navigation.navigate('LoginScreen')
              }
              
              
            
            })
              allAssignedContracts(user_token)
              .then((data) => {
              setRoad(data.road);
              setBridge(data.bridge);
              setHousing(data.housing);
            
            })
          }
          else {
              return ;
          }
         
        })
        
      
        
            
    }, []);

const roadExist = road.length==0?false:true;
const bridgeExist = bridge.length==0?false:true;
const housingExist = housing.length==0?false:true;

const zeroDatasheet = !roadExist && !bridgeExist && !housingExist ? true : false

  return (
    <View style={{flex:1}}> 

<View style={{backgroundColor:'green', flex: 2}}>
    <ImageBackground
        style={styles.image}
        source={require('../../assets/images/unnamed.jpg')}
    >

      <View style={{width:'88%', alignSelf:'center', }}>
        <Text style={{
          marginTop:40,
          color:'white',
          fontFamily:'Montserrat_600SemiBold',
          fontSize:22,
          }}>Hello! {user.firstName}</Text>
        
        
        <Text style={{fontSize:12,marginTop:20, color:'white', fontFamily:'Montserrat_400Regular'}}>
        Welcome to your Dashboard. You can perform Administrative Tasks from here. Click the Menu below
        </Text>
        
        
        <View style={{marginTop:20, height:100}}>
        <ScrollView horizontal 
        showsHorizontalScrollIndicator={false} style={{flexDirection:'row'}}>
         <HighwayCircleCard iconName="road" navigation={props.navigation} link="AllSavedDatasheets" title="Saved Inspection Datasheets"/>
         <HighwayCircleCard iconName="envelope" title="View/Send Messages" navigation={props.navigation} link="Messages"/>
         <HighwayCircleCard iconName="water" title="Create A New Datasheet" navigation={props.navigation} link="UploadMenu"/>

     
          <View style={{alignItems:'center', justifyContent:'center'}}>
            <TouchableOpacity onPress={()=>setUserClicked(!userClicked)}>
                <FontAwesome5 name="chevron-down" size={30} color="white" />
            </TouchableOpacity>
            {userClicked &&
            <TouchableOpacity onPress={()=>logOut()} style={{
            borderRadius:7,
            backgroundColor:'white',
            top:15, width:60, height:30, left:0,
            justifyContent:'center'}}>
            <Text style={{color:'black', fontFamily:'Montserrat_400Regular', textAlign:'center'}}>Logout</Text>
                
            </TouchableOpacity>            
            }
          </View> 
        </ScrollView>
        </View>
      
        

      </View>

   
      
        
       
    </ImageBackground>
</View> 
<View style={{flex:2,backgroundColor:'white',
    borderTopRightRadius:40, 
    marginTop:-40,
    borderTopLeftRadius:40,}}>
{zeroDatasheet &&
<View style={{alignSelf:'center', marginTop:30, }}>
  <Text style={{ fontFamily:'Montserrat_600SemiBold',}}>No Datasheet has been assigned to you</Text>
</View>

}
<ScrollView style={{
    
  marginTop:30
    }}>
     

     
    <View style={{margin:20}}/>


    <View>
    {housingExist&&
      <Text style={styles.contractTitle}>Housing Contract Your are Assigned To</Text>
    }
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
    {housing.map((contract) => (
              <TouchableOpacity 
              key={contract.id}
              onPress={() => props.navigation.navigate('SelectDatasheet', {
                id: contract.id,
                type: "housing",
                token:token,
                title: contract.title,
              })}>
            <View style={[styles.eachCard]}>
            <Text style={styles.title}>{Truncator(contract.title, 45)}</Text>
             
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
            <Text style={{ fontSize: 18, fontFamily:'Montserrat_400Regular' }}>{Math.round(contract.current_percentage)}%</Text>
        </ProgressCircle>
        </View>
        <Text style={styles.state}>{Currency(contract.contract_sum)}</Text>
        <Text style={styles.state}>{Truncator(contract.contractor, 20)}</Text>
        <Text style={styles.title}>{contract.state}</Text>
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
        <TouchableOpacity
        key={contract.id}
        onPress={() => props.navigation.navigate('SelectDatasheet', {
          
          id: contract.id,
          type: "road",
          token:token,
          title: contract.title,
        })}>
      <View style={[styles.eachCard]}>
      <Text style={styles.title}>{Truncator(contract.title, 45)}</Text>
       
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
      <Text style={{ fontSize: 18, fontFamily:'Montserrat_400Regular' }}>{Math.round(contract.current_percentage)}%</Text>
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
              <TouchableOpacity 
              key={contract.id}
              onPress={() => props.navigation.navigate('SelectDatasheet', {
                id: contract.id,
                type: "road",
                token:token,
                title: contract.title,
              })}>
            <View style={[styles.eachCard]}>
            <Text style={styles.title}>{Truncator(contract.title, 45)}</Text>
             
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
            <Text style={{ fontSize: 18, fontFamily:'Montserrat_400Regular' }}>{Math.round(contract.current_percentage)}%</Text>
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



export default HighwayMenu;

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
        fontFamily: "Montserrat_400Regular",
        color: "#3e3e3e",
        fontSize:28
    },
    contractTitle: {
      fontFamily: "Montserrat_400Regular",
      color: "#3e3e3e",
      fontSize:14,
      marginTop:10,
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
    marginTop:16, 
    marginBottom:20,
    textAlign:'center',
    color:'#095A1F',
    fontFamily:'Montserrat_400Regular', 
    fontSize:10,
    
},
state: {
    marginTop:5, 
    textAlign:'center',
    color:'#095A1F',
    fontFamily:'Montserrat_400Regular', 
    fontSize:11,
    
},
currentPercentage: {
    marginTop:10, 
    textAlign:'center',
    color:'white',
    fontFamily:'Montserrat_400Regular', 
    fontSize:37,
},

})