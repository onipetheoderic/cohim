import React, {useState, useEffect, useMemo} from 'react';
import HeaderWithBack from '../components/headerWithBack';
import {
  SafeAreaView,
  StyleSheet,
  Picker,
  ScrollView,
  View,
  ActivityIndicator,
  Text,
  TextInput,
  AsyncStorage,
  Dimensions,
  PixelRatio,
} from 'react-native';

import AdvertiseButton from '../components/advertiseButton';

import {datasheetkey} from '../api/constants';
import {Colors} from '../components/colors'
import GetLocation from 'react-native-get-location'

import { housing } from '../api/housing_field';
import {Toast} from 'native-base';


const DatasheetTemplate = (props) => {    
    const { width, height } = Dimensions.get('window');
    const [token, setToken] = useState("");
   
  
    const [title, setTitle] = useState("");

    const [location, setLocation] = useState({});
    const [msg, showMsg] = useState(false)
    const [valMsg, setValMsg] = useState("");
    const [type, setType] = useState("");
    const [isLoading, setLoading] = useState(false);
    const [currentHouse, setHouse] = useState(null);

    const [index, setIndex] = useState(0);
    const [value, setValue] = useState(0)

    useEffect(() => {
        setLoading(true)
        let type = props.navigation.getParam('type', null)
        var housingPos =  housing.findIndex(i => i.name == type);
        setHouse({currentHouse: housing[housingPos].data})
        setType(housing[housingPos].name)
        setLoading(false)
        setTitle(housing[housingPos].name)
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

    const handleAmount = (indy, valz) => {
        let dup_array = currentHouse.currentHouse;
        dup_array[indy].number_of_houses = valz.replace(/[^0-9]/g, '')
        setHouse(prevState=>({
           currentHouse:dup_array
       }))
    }

    const setSelectedDone = (selectedVal, index) => {
        console.log("IIIIIII",selectedVal, index)
        let dup_array = currentHouse.currentHouse==undefined?currentHouse:currentHouse.currentHouse
        console.log("ttttt", dup_array)
        dup_array[index].done = selectedVal;
        setHouse(prevState=>({
            currentHouse:dup_array
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
    
      
        console.log(" it good")
        setLoading(true)
        const newDatasheetArray = []
        const dataSheet = {
          latitude:location.latitude, 
          longitude:location.longitude,
          type:"housing",
          date:today,
          title:title,
          components:currentHouse.currentHouse,
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
                 
                  setLoading(false)
                  props.navigation.navigate('UploadMenu');
              }).catch((e) => {
              console.warn(e.message)
              })    
            }
          })
      
    }
    else {
      showToastWithGravity("Geolocation not Enabled")
      setLoading(false)
    }
    }

  console.log("housing data from state", currentHouse)


if (isLoading) {
    return (
        <View style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" color="#07411D" />
        </View>
    )
}  
return (
  <>
  <HeaderWithBack navigation={props.navigation} />
  <ScrollView showsVerticalScrollIndicator={false} style={{marginTop:50, marginBottom:20}}>
 
    <Text style={styles.title}>Enter Housing Datasheet Details</Text>
   
    {currentHouse!=null &&
    <View>
    {currentHouse.currentHouse.map((params, index) => {
      return (
    <View style={[styles.eachCard]}>
        <Text style={styles.titleBold}>Scope of Work:</Text>
       <Text style={styles.title}>{params.scope_of_work}</Text>
       <Text style={styles.titleBold}>sub stage of work:</Text>
       <Text style={styles.title}>{params.sub_stage_of_work}</Text>
      <View style={{flexDirection:'row', justifyContent:'space-around'}}>     
          <View style={{flexDirection:'column', width:'50%'}}>            
            <TextInput
              keyboardType="numeric"
              placeholder="Number of Houses"
              textAlign={'center'}
              style={{borderRadius:5, height: 40, width:'100%', fontFamily:'Poppins_400Regular', borderColor: 'gray', borderWidth: 1 }}
              onChangeText={text => handleAmount(index, text)}
              value={params.number_of_houses}
              />
          </View>
          <View style={{flexDirection:'column', width:'30%'}}>
          <Picker
                selectedValue={params.done}
                style={{fontSize:9, height: 50, width: 120, padding:0, color:'black'}}                
                onValueChange={(itemValue, itemIndex) => { setSelectedDone(itemValue, index)}}>
                  <Picker.Item label='Done' value="done" />
                  <Picker.Item label='Not Done' value="not done" />
            </Picker>
          </View>
          
      </View>
         
   </View>
      )
    })}
    </View>
    }
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
      height:240,
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
    marginTop:3, 
    marginHorizontal:4,
    marginBottom:20,
    textAlign:'center',
    color:'#095A1F',
    fontFamily:'Poppins_400Regular', 
    fontSize:12,
    
},
titleBold: {
    marginHorizontal:4,
    textAlign:'center',
    color:'#095A1F',
    fontFamily:'Poppins_400Regular',
    fontWeight:'bold',
    fontSize:13,
},
state: {
    marginTop:5, 
    textAlign:'center',
    color:'#095A1F',
    fontFamily:'Poppins_400Regular', 
    fontSize:12,
    
},
currentPercentage: {
    marginTop:10, 
    textAlign:'center',
    color:'white',
    fontFamily:'Poppins_400Regular', 
    fontSize:37,
},


  });