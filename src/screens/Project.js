import React, {useState, useEffect} from 'react';

import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  Dimensions,
  AsyncStorage
} from 'react-native';
import {Colors} from '../components/colors'
import GetLocation from 'react-native-get-location'
import {datasheetkey} from '../api/constants';
import {completed_housing, 
        ongoing_housing,
        completed_road,
        ongoing_road,
        completed_bridge,
        ongoing_bridge
        } from '../api/fields';
import SaveButton from '../components/saveButton'

import {Toast} from 'native-base';


const OngoingRoad = (props) => {    
    const { width, height } = Dimensions.get('window');
    const [type, setType] = useState("");
    const [location, setLocation] = useState({});
    const [components, setComponent] = useState([]);
    const [title, setTitle] = useState("")

    useEffect(() => {   
        let type = props.navigation.getParam('type', null)
        setType(type)
        const currentForm = type==Object.keys({completed_bridge})[0]?completed_bridge
        :Object.keys({completed_road})[0]==type?completed_road
        :Object.keys({ongoing_bridge})[0]==type?ongoing_bridge
        :Object.keys({ongoing_road})[0]==type?ongoing_road
        :Object.keys({ongoing_housing})[0]==type?ongoing_housing
        :completed_housing
        setComponent(currentForm)
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
    
   
const showToastWithGravity = (msg) => {
Toast.show({
    text: msg,
    duration: 2000
})
};
function underscoreFormatter(str){
    let new_str = str.toUpperCase();
    return new_str.replace(/_/g, ' ');
}
const handleChangeTwo = (index, value) => {
   let dup_array = components.components==undefined?components:components.components
   dup_array[index].component_score = value.replace(/[^0-9]/g, '')
    setComponent(prevState=>({
        components:dup_array
    }))
}

const zerofy = () => {
    let dup_array = components.components==undefined?components:components.components
    let clearedObj = [];

    for(var i in dup_array){
        dup_array[i].component_score = 0                
        clearedObj.push(dup_array[i])
    }
    console.log("IIIIIII", clearedObj)
    setComponent(prevState=>({
        components:clearedObj
    }))
}

const zeroChecker = () => {
    let falsyVals = [];
    for(var i in components){
        if(components[i].component_score==0){
            console.log(components[i])
            falsyVals.push(components[i])
        }
    }
    console.log(falsyVals, falsyVals.length)
    if(title.length<=5){
        return {status:true, msg:"Check Title Field"}
    }
    if(falsyVals.length>=3){
        return {status:true, msg:"Too many Empty Fields"}
        return true
    }
   else if(falsyVals.length<3){
    return {status:false}
   }
}
var today = new Date();

const saveDatasheet = () => {
    if(location!=null){
        let zeroCheck = zeroChecker()
       console.log("GGGGG",zeroCheck)
        if(zeroCheck.status==true){
            showToastWithGravity(zeroCheck.msg)
        }
        else if(zeroCheck.status===false){
            const newDatasheetArray = []
            const dataSheet = {
                latitude:location.latitude, 
                longitude:location.longitude,
                type:type,
                date:today,
                title:title,
                components:components,
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
                    // props.navigation.navigate('HighwayMenu');
                }).catch((e) => {
                console.warn(e.message)
                })    
              }
              else {
                let store = async () => await AsyncStorage.setItem(datasheetkey, JSON.stringify(newDatasheetArray))
                store().then(() => {
                    
                    showToastWithGravity("Datasheet Saved")
                    zerofy()
                    // props.navigation.navigate('HighwayMenu');
                }).catch((e) => {
                console.warn(e.message)
                })    
              }
            })
         
        }

    }
    else {
        showToastWithGravity("Geolocation not Enabled")
    }
   
}

let allcomponents = components.components==undefined?components:components.components
console.log(allcomponents)

  return (
      <ScrollView showsVerticalScrollIndicator={false} style={{marginTop:20}}>
        <View style={{marginTop:30,flexDirection:'row', justifyContent:'space-between'}}>
        <View style={{flex:2, marginLeft:10, marginTop:8}}>
                <Text>
                   Title
                </Text>
            </View>
            <View style={{flex:10, flexDirection:'row'}}>
        <TextInput        
        style={{ height: 40, width:'95%', borderColor: 'gray', borderWidth: 1 }}
        onChangeText={text => setTitle(text)}
        value={title}
        />
        </View>
        </View>
     {allcomponents.map((params, index) => {
        console.log(params.component_score)
 return(
   
        <View style={{marginTop:30,flexDirection:'row', justifyContent:'space-between'}}>
            <View style={{flex:2, marginLeft:10, marginTop:8}}>
                <Text>
                   { underscoreFormatter(params.component_name) }
                </Text>
            </View>
            <View style={{flex:2, flexDirection:'row'}}>
                <TextInput
                keyboardType="numeric"
                style={{ height: 40, width:150, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={text => handleChangeTwo(index, text)}
                value={params.component_score.toString()}
                /><Text style={{marginTop:8}}>km</Text>
              

            </View>
         
        </View>   
  
    ) })}  
<SaveButton title="Save datasheet" handleSubmit={()=>saveDatasheet()}/>
</ScrollView>
  );
};



export default OngoingRoad;

const styles = StyleSheet.create({
    cardParent: {
        marginVertical:10,
        height:170,
        borderRadius:10,
        backgroundColor:'green',
        width:'42%',
    },
    
    text: {
        fontFamily: "Montserrat_400Regular",
        color: "#3e3e3e",
        fontSize:28
    },
    contractTitle: {
      fontFamily: "Montserrat_400Regular",
      color: "#3e3e3e",
      fontSize:17,
      marginLeft:10
    },
    eachCard: {
      margin:10,
      backgroundColor:Colors.mainGreen, 
      width:180, 
      borderRadius:10,
      height:200
  },
  title: {
    marginTop:25, 
    textAlign:'center',
    color:'white',
    fontFamily:'Montserrat_400Regular', 
    fontSize:18
},
state: {
    marginTop:10, 
    textAlign:'center',
    color:'white',
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

})