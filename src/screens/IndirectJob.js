import React, {useState, useEffect, useMemo} from 'react';
import HeaderWithBack from '../components/headerWithBack';
import {
  AsyncStorage,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  ActivityIndicator,
  Text,
  TextInput,
  Dimensions,
  PixelRatio,
} from 'react-native';

import AdvertiseButton from '../components/advertiseButton';
import {datasheetkey} from '../api/constants';
import GetLocation from 'react-native-get-location'
import { indirect_job } from '../datasheetTemplates/otherTemplates';

import UnderscoreFormatter from '../helpers/underscoreFormatter';
import ZeroChecker from '../helpers/zeroCheck';

import {Toast} from 'native-base';


const IndirectJob = (props) => {    
    const [road, setRoad] = useState(indirect_job);
 
    const [title, setTitle] = useState("Indirect labour used");
    const [location, setLocation] = useState({});
    const [type, setType] = useState("indirect_job");
    const [isLoading, setLoading] = useState(false)

    const [index, setIndex] = useState(0);
   

    useEffect(() => {   
      
    }, []);


    const handleAmount = (indy, valz) => {
      let dup_array = road.road==undefined?road:road.road
      dup_array[indy].amount = valz.replace(/[^0-9]/g, '')
       setRoad(prevState=>({
           road:dup_array
       }))
    }

    const zerofy = () => {
      let dup_array = road.road==undefined?road:road.road
      let clearedObj = [];
  
      for(var i in dup_array){
          dup_array[i].amount = 0                
          dup_array[i].unit = "";
          dup_array[i].qty = "";
          clearedObj.push(dup_array[i])
      }
      console.log("IIIIIII", clearedObj)
      setRoad(prevState=>({
          road:clearedObj
      }))
  }


  const showToastWithGravity = (msg) => {
    Toast.show({
      text: msg,
      duration: 2000
    })
  };





  const submitDatasheet = () => {
    var today = new Date();
  let dup_array = road.road==undefined?road:road.road
  let zeroChecker = ZeroChecker(dup_array,title);
  console.log(zeroChecker, "llllllllll")
  if(zeroChecker.status === true){
    setLoading(false)
    showToastWithGravity(zeroChecker.msg)
  }
  else {
    setLoading(true)
    const newDatasheetArray = []
    const dataSheet = {
        title:title,
        date:today,
      type:type,//will later be passed to a post route as a params
      parameters:road,
      id: Math.floor(Math.random() * 899999 + 100000)
    }
      // datasheetkey
      newDatasheetArray.push(dataSheet)
      let dataSheetArray = async () => await AsyncStorage.getItem(datasheetkey)
      dataSheetArray().then((val) => {
        if (val) {
          let sess = JSON.parse(val)
          sess.push(dataSheet)
          let store = async () => await AsyncStorage.setItem(datasheetkey, JSON.stringify(sess))
          store().then(() => {
            showToastWithGravity("Datasheet Saved")
              zerofy()
              setLoading(false)
              props.navigation.navigate('UploadRoadEconomy');
          }).catch((e) => {
          console.warn(e.message)
          })    
        }
        else {
          let store = async () => await AsyncStorage.setItem(datasheetkey, JSON.stringify(newDatasheetArray))
          store().then(() => {                  
              showToastWithGravity("Datasheet Saved")
              zerofy()
              setLoading(false)
              props.navigation.navigate('UploadRoadEconomy');
          }).catch((e) => {
          console.warn(e.message)
          })    
        }
      })
  }
}

let allcomponents = road.road==undefined?road:road.road
 
return (
  <>
  <HeaderWithBack navigation={props.navigation} />
  <ScrollView showsVerticalScrollIndicator={false} style={{marginTop:50, marginBottom:20}}>
 
    <Text style={styles.title2}>Enter Datasheet Details, The Title Field must Not be Empty</Text>
 
    {allcomponents.map((params, index) => {
      console.log(params, index)
      return (
    <View style={[styles.eachCard]}>
       
       <Text style={styles.title}>{ UnderscoreFormatter(params.name) }</Text>
      <View style={{flexDirection:'row', justifyContent:'space-around'}}>     
         
         
          <View style={{flexDirection:'column', width:'50%'}}>
          
            <TextInput
             keyboardType="numeric"
              placeholder="Amount"
              textAlign={'center'}
              style={{ borderRadius:5, height: 40, width:'100%', fontFamily:'Montserrat_400Regular', borderColor: 'gray', borderWidth: 1 }}
              onChangeText={text => handleAmount(index, text)}
              value={params.amount}
              />
          </View>
      </View>
         
   </View>
      )
    })}
    <View>
      <Text style={styles.title}>Clicking the save button means you agree with the values you have Entered</Text>
      {!isLoading &&
        <AdvertiseButton title="Save Datasheet and Use Later" handleSubmit={()=>submitDatasheet()}/>
      }
      {isLoading &&
        <ActivityIndicator size="large" color="#07411D" />
      }
    </View>
    
  </ScrollView>
  </>
    );
  };



export default IndirectJob;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#F5FCFF'
    },
    table: {
      flex: 1,
      marginBottom: 30
    },
    eachCard: {
      margin:10,
      alignSelf:'center',
      backgroundColor:'white', 
      width:'90%', 
      borderRadius:10,
      height:110,
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
  title2: {
    marginTop:10, 
    marginLeft:30,
    marginBottom:20,
    textAlign:'center',
    color:'#095A1F',
    fontFamily:'Montserrat_400Regular', 
    fontSize:13,
    
},
title: {
  marginTop:10, 
  marginBottom:20,
  textAlign:'center',
  color:'#095A1F',
  fontFamily:'Montserrat_400Regular', 
  fontSize:12,
  
},
state: {
    marginTop:5, 
    textAlign:'center',
    color:'#095A1F',
    fontFamily:'Montserrat_400Regular', 
    fontSize:13,
    
},
currentPercentage: {
    marginTop:10, 
    textAlign:'center',
    color:'white',
    fontFamily:'Montserrat_400Regular', 
    fontSize:37,
},


  });