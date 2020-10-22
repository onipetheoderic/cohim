import React, {useState, useEffect, useMemo} from 'react';

import {
  StyleSheet,
  ScrollView,
  AsyncStorage,
  View,
  ActivityIndicator,
  Text,
  TextInput,
  Dimensions,
} from 'react-native';

import AdvertiseButton from '../components/advertiseButton';
import {datasheetkey} from '../api/constants';

import {Toast} from 'native-base';
import UnderscoreFormatter from '../helpers/underscoreFormatter';
const DatasheetTemplate = (props) => {    
    const { width, height } = Dimensions.get('window');
    const [token, setToken] = useState("");
    const [road, setRoad] = useState({});
    const [housing, setHousing] = useState([])
    const [national, setNational] = useState([]);
    const [title, setTitle] = useState("");
    const [location, setLocation] = useState({});
    const [msg, showMsg] = useState(false)
    const [valMsg, setValMsg] = useState("");
    const [type, setType] = useState("");
    const [storage_id, setStorageId] = useState(0)
    const [isLoading, setLoading] = useState(false)

    const [index, setIndex] = useState(0);
    const [value, setValue] = useState(0);
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");

    useEffect(() => {   
        let type = props.navigation.getParam('type', null)
        let id = props.navigation.getParam('id',null);
        setStorageId(id);
        // console.log("the id", id)
        setType(type)
        let dataSheetArray = async () => await AsyncStorage.getItem(datasheetkey)
        dataSheetArray().then((val) => {
        if (val) {
            let Datasheets = JSON.parse(val)
            // console.log("DDDDD",Datasheets)            
            let storageIndex = Datasheets.findIndex(x => x.id === id)
            let singleDatasheet = Datasheets[storageIndex]
            let {components, ...others} = singleDatasheet
            // console.log("other fields", others)
            setLocation(others)
            setTitle(others.title)
            setRoad(singleDatasheet.components)
            }
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
  

    
const deleteDatasheet = (id) => {
    let removedArray = savedDatasheet.filter( el => el.id !== storage_id);
    let store = async () => await AsyncStorage.setItem(datasheetkey, JSON.stringify(removedArray))
    store().then(() => {
        
        showToastWithGravity("Datasheet Removed")
        setSavedDatasheet(removedArray)
    }).catch((e) => {
        console.warn(e.message)
    }) 
   
}
    const submitDatasheet = () => {
      if(location!=null){
        setLoading(true)
      var today = new Date();
      let dup_array = road.road==undefined?road:road.road
    
        setLoading(true)
        const newDatasheetArray = []
        const dataSheet = {
            ...location,
            components:road,
        }
          // datasheetkey
          newDatasheetArray.push(dataSheet)
          let dataSheetArray = async () => await AsyncStorage.getItem(datasheetkey)
          dataSheetArray().then((val) => {
            if (val) {
                console.log(dataSheet)
                let sess = JSON.parse(val)
                let newArray = sess.filter( el => el.id !== storage_id);//we remove the former
                newArray.push(dataSheet)//we push to the new one
                let store = async () => await AsyncStorage.setItem(datasheetkey, JSON.stringify(newArray))
                store().then(() => {
                    showToastWithGravity("Datasheet Updated")
                    zerofy()
                    setLoading(false)
                    props.navigation.navigate('HighwayMenu');
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
    let datasheetAbsent = !Object.keys(road).length;
console.log("SSSSSSSSSSS",road)
    let allcomponents = road.road==undefined?road:road.road
    console.log("All component",allcomponents)



return (
  <ScrollView showsVerticalScrollIndicator={false} style={{marginTop:40, marginBottom:20}}>
 
    <Text style={styles.title}>Update Datasheet Details, After Inputing the Details Click on Submit</Text>
    
    {!datasheetAbsent&&
    <View>
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