import React, {useState, useEffect} from 'react';

import {
  StyleSheet,
  ScrollView,
  View,
  Text, 
  Alert,
  Dimensions,
  AsyncStorage
} from 'react-native';
import HeaderWithBack from '../components/headerWithBack';
import {datasheetkey} from '../api/constants';
import AdvertiseButton from '../components/advertiseButton';
import {Colors} from '../components/colors'
import BeautyCard from '../components/beautyCard';
import TimeAgo from 'react-native-timeago';
import * as Animatable from 'react-native-animatable';
import { MonthGetter, DayGetter } from '../helpers/dateFormatter';
import underscoreFormatter from '../helpers/underscoreFormatter';

import {Toast} from 'native-base';


const AllSavedDatasheets = (props) => {    
    const { width, height } = Dimensions.get('window');
    const [token, setToken] = useState("");
    const [type, setType] = useState("")
    const [title, setTitle] = useState("")
    const [length, changeLength] = useState(0)
    const [id, setId] = useState("")
    const [all_datas, changeAllDatas] = useState({})
    const [parameters, changeParameters] = useState(null)
    const [savedDatasheet, setSavedDatasheet] = useState([]);
    const [showModal, changeShowModal] = useState(false)
    
   //let get a single datasheet
    useEffect(() => {
        let dataSheetArray = async () => await AsyncStorage.getItem(datasheetkey)
        dataSheetArray().then((val) => {
        if (val) {
            let Datasheets = JSON.parse(val)
            console.log("DDDDD",Datasheets)            
            setSavedDatasheet(Datasheets)          
            }
        })

    }, []);

const showDatasheet = (id,index) => {
 console.log("the show", id)
 changeShowModal(true)
 let selectedDatasheet = savedDatasheet[parseInt(index)];
 console.log(selectedDatasheet)
 changeParameters(selectedDatasheet.components)
}

const deleteDatasheet = (id) => {
    let removedArray = savedDatasheet.filter( el => el.id !== id);
    let store = async () => await AsyncStorage.setItem(datasheetkey, JSON.stringify(removedArray))
    store().then(() => {
        
        showToastWithGravity("Datasheet Removed")
        setSavedDatasheet(removedArray)
    }).catch((e) => {
    console.warn(e.message)
    }) 
   
}

   const createTwoButtonAlert = (id, index) =>
      
    Alert.alert(
      "Update Post",
      "You edit or delete a post from here",
      [ 
        {
          text: "Show",
          onPress: () => showDatasheet(id, index)
        },
        
        { text: "Delete Datasheet", 
          onPress: () => deleteDatasheet(id)
        
      } 
      ],
      { cancelable: true }
    );

  
    const showToastWithGravity = (msg) => {
      Toast.show({
        text: msg,
        duration: 2000
      })
    };

    const handleTrash = (id)=>{
        console.log("to be delete")
        Alert.alert(
            "Delete post",
            "You edit or delete a post from here",
            [ 
              
            { text: "Delete Datasheet", 
                onPress: () => deleteDatasheet(id)             
            } 
            ],
            { cancelable: true }
          );
      
    }

  return (
    <>
    <HeaderWithBack navigation={props.navigation} color="black"/>
      {showModal && parameters &&
      <Animatable.View duration={3000} animation="zoomInDown" style={{justifyContent:'center', borderRadius:10, position:'absolute', zIndex:1000, top:50, left:'10%', width:'80%', height:320, backgroundColor:'#07411D'}}>
           
      <ScrollView>
      {parameters.map((parameter, index) => (
            <Text style={{marginHorizontal:20, marginVertical:15, fontSize:15, color:'white', fontFamily:'Poppins_400Regular'}}>
              {underscoreFormatter(parameter.component_name)}: {parameter.component_score}km
            </Text>
      ))}
      <AdvertiseButton title="Close" handleSubmit={()=>changeShowModal(false)}/>
 
      </ScrollView>
      
</Animatable.View>
    }
<ScrollView>
<Text style={{fontFamily:'Poppins_400Regular', marginTop:40, textAlign:'center',
 fontSize:14, margin:10}}>List of Inspection Datasheets Saved By You ({savedDatasheet.length})</Text>
<View style={{marginBottom:70}}>

{savedDatasheet.map((savedDatasheet, index) => (
    <BeautyCard 
    key={savedDatasheet.id}
    title={savedDatasheet.title}
    type={underscoreFormatter(savedDatasheet.type)}
    time={<TimeAgo time={savedDatasheet.date}/>}
    day={DayGetter(savedDatasheet.date)}
    monthName={MonthGetter(savedDatasheet.date)}
    handleTrash = {()=>handleTrash(savedDatasheet.id, index)}
    />
    // <View style={styles.cardStyle} key={savedDatasheet.id}>
    //     <View style={{marginLeft:20}}>
    //     <Text style={{fontFamily:'Poppins_400Regular', fontSize:17, color:'white'}}>{savedDatasheet.title}</Text>
    //     <Text style={{fontFamily:'Poppins_400Regular', fontSize:12, color:'white'}}><TimeAgo time={savedDatasheet.date}/></Text>
    //     <Text style={{fontFamily:'Poppins_400Regular', fontSize:12, color:'white'}}>{underscoreFormatter(savedDatasheet.type)}</Text>
    //     <TouchableOpacity onPress={()=>createTwoButtonAlert(savedDatasheet.id, index)}>
    //         <Text style={{fontFamily: "Poppins_400Regular", fontSize:10}}>Datasheet setting</Text>
    //     </TouchableOpacity>
    //     </View>
    // </View>
    
))}

</View>

</ScrollView>
    
      
  </>
  );
};



export default AllSavedDatasheets;

const styles = StyleSheet.create({
    
    cardParent: {
        marginVertical:10,
        height:170,
        borderRadius:10,
        backgroundColor:'green',
        width:'42%',
    },

    cardStyle: {
        marginVertical:10,
        backgroundColor:'green',
        width:'93%',
        justifyContent:'center',
        alignSelf:'center',
        height:80,
        shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 2,
},
shadowOpacity: 0.25,
shadowRadius: 3.84,

elevation: 5,

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
      backgroundColor:Colors.mainGreen, 
      width:180, 
      borderRadius:10,
      height:200
  },
  title: {
    marginTop:25, 
    textAlign:'center',
    color:'white',
    fontFamily:'Poppins_400Regular', 
    fontSize:18
},
state: {
    marginTop:10, 
    textAlign:'center',
    color:'white',
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

/*In this screen we get all the saved datasheet and also create a function to do the following:
2)Delete Datasheet values

*/ 