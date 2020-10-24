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
import { BridgeTemplate } from '../datasheetTemplates/bridgeTemplate';

import UnderscoreFormatter from '../helpers/underscoreFormatter';
import ZeroChecker from '../helpers/zeroChecker';

import {Toast} from 'native-base';


const DatasheetTemplate = (props) => {    
    const { width, height } = Dimensions.get('window');
    const [token, setToken] = useState("");
    const [road, setRoad] = useState(BridgeTemplate);
    const [housing, setHousing] = useState([])
    const [national, setNational] = useState([]);
    const [title, setTitle] = useState("");
    const [location, setLocation] = useState({});
    const [msg, showMsg] = useState(false)
    const [valMsg, setValMsg] = useState("");
    const [type, setType] = useState("");
    const [isLoading, setLoading] = useState(false)

    const [index, setIndex] = useState(0);
    const [value, setValue] = useState(0)

    useEffect(() => {   
        let type = props.navigation.getParam('type', null)
      
        setType(type)
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
        })
        .then(location => {
            console.log("Location is Presseee",location);
            setLocation(location)
        })
        .catch(error => {
            const { code, message } = error;
            console.warn("Error",code, message);
        })
    }, []);

    const handleQuantity = (index, value) => {
      let dup_array = road.road==undefined?road:road.road
      dup_array[index].qty = value.replace(/[^0-9]/g, '')
       setRoad(prevState=>({
           road:dup_array
       }))
    }

    const handleAmount = (indy, valz) => {
      setIndex(indy);
      setValue(valz);
      let dup_array = road.road==undefined?road:road.road
      dup_array[indy].amount = valz.replace(/[^0-9]/g, '')
       setRoad(prevState=>({
           road:dup_array
       }))
    }



    const handleUnit = (index, value) => {
      let dup_array = road.road==undefined?road:road.road
      dup_array[index].unit = value
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
      if(location!=null){
        setLoading(true)
      var today = new Date();
      let dup_array = road.road==undefined?road:road.road
      let zeroChecker = ZeroChecker(dup_array,title);
      console.log(zeroChecker, "llllllllll")
      if(zeroChecker.status === true){
        setLoading(false)
        showToastWithGravity(zeroChecker.msg)
      }
      else {
        console.log(" it good")
        setLoading(true)
        const newDatasheetArray = []
        const dataSheet = {
          latitude:location.latitude, 
          longitude:location.longitude,
          type:type,
          date:today,
          title:title,
          components:road,
          id:Math.floor(Math.random() * 899999 + 100000)
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
                  props.navigation.navigate('UploadMenu');
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
                  props.navigation.navigate('UploadMenu');
              }).catch((e) => {
              console.warn(e.message)
              })    
            }
          })
      }
    }
    else {
      showToastWithGravity("Geolocation not Enabled")
      setLoading(false)
    }
    }

    let allcomponents = road.road==undefined?road:road.road
    console.log(allcomponents)



return (
  <>
  <HeaderWithBack navigation={props.navigation} />
  <ScrollView showsVerticalScrollIndicator={false} style={{marginTop:50, marginBottom:20}}>
 
    <Text style={styles.title}>Enter Datasheet Details, The Title Field must Not be Empty</Text>
    <View style={{justifyContent:'center', alignSelf:'center', width:'90%'}}>
            
            <TextInput
              placeholder="Title of Datasheet"
              textAlign={'center'}
              style={{borderRadius:5, height: 45, width:'100%', fontFamily:'Poppins_400Regular', borderColor: 'gray', borderWidth: 1 }}
              onChangeText={text => setTitle(text)}
              />
      </View>
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
              style={{borderRadius:5, height: 40, width:'100%', fontFamily:'Poppins_400Regular', borderColor: 'gray', borderWidth: 1 }}
              onChangeText={text => handleAmount(index, text)}
              value={params.amount}
              />
          </View>
          <View style={{flexDirection:'column', width:'20%'}}>
            <TextInput
              keyboardType="numeric"
              placeholder="Quantity"
              textAlign={'center'}
              style={{borderRadius:5, height: 40, width:'100%', fontFamily:'Poppins_400Regular', borderColor: 'gray', borderWidth: 1 }}
              onChangeText={text => handleQuantity(index, text)}
              value={params.qty}
              />
          </View>
          <View style={{flexDirection:'column', width:'20%'}}>
          
            <TextInput
              placeholder="Unit"
              textAlign={'center'}
              style={{ borderRadius:5, height: 40, width:'100%', fontFamily:'Poppins_400Regular', borderColor: 'gray', borderWidth: 1 }}
              onChangeText={text => handleUnit(index, text)}
              value={params.unit}
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



export default DatasheetTemplate;

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
      height:140,
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


  });