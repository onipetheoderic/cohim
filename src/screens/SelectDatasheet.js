
import React, {useContext, useEffect, useState} from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Alert,
  Text,
  ImageBackground,
  Dimensions,
  Image,
} from 'react-native';
import HeaderWithBack from '../components/headerWithBack';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {datasheetkey} from '../api/constants';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage'
import underscoreFormatter from '../helpers/underscoreFormatter';
import { adatasheetHousingPost, datasheetHousingPost, datasheetRoadBridgePost } from '../api/apiService';
import {Colors} from '../components/colors'
import TimeAgo from 'react-native-timeago';
import Swipeout from 'react-native-swipeout';
import {Toast} from 'native-base';


const SelectDatasheet = (props) => {    
    const { width, height } = Dimensions.get('window');
    const [token, setToken] = useState("");
    const [type, setType] = useState("")
    const [title, setTitle] = useState("")
    const [user, setUser] = useState({});
    const [length, changeLength] = useState(0)
    const [id, setId] = useState("")
    const [all_datas, changeAllDatas] = useState({})
    const [parameters, changeParameters] = useState({})
    const [savedDatasheet, setSavedDatasheet] = useState([]);
    
   //let get a single datasheet
    useEffect(() => {
        let type = props.navigation.getParam('type', null)
        let id = props.navigation.getParam('id', null);
        let title = props.navigation.getParam('title', null)
        let token = props.navigation.getParam('token',null);      
        console.log("the toekn",token)
        AsyncStorage.getItem("@SessionObj")
        .then((result)=>{          
            let parsifiedResult = JSON.parse(result);
            if(parsifiedResult!=null){
              let userDetails = parsifiedResult.userDetails;
              let { user_token } = userDetails;
              console.log("thy token",user_token)
              setToken(user_token);  
            }
        })     
        setTitle(title);
        setId(id);
        let dataSheetArray = async () => await AsyncStorage.getItem(datasheetkey)
        dataSheetArray().then((val) => {
        if (val) {
            let Datasheets = JSON.parse(val)
            console.log("DDDDD",Datasheets)            
            setSavedDatasheet(Datasheets)          
            }
        })
       
                
    }, []);

    const isNew = all_datas.new===true?true:false
   
const gotoLocalReport = (obj, title) => {
    console.log("selected obj",obj)
    props.navigation.navigate('SelectedLocalDatasheet', {
        datasheet:obj,
        title:title,
        contractId: id,
        token: token
    })
}

const getDatasheetById = (storageId) => {
  let storageIndex = savedDatasheet.findIndex(x => x.id === storageId)
  let selectedDatasheet = savedDatasheet[storageIndex];
  let { components, date, latitude, longitude, type } = selectedDatasheet;
  if(type==="housing"){
    let componentData = components;

    let selectedData = [];
    for(var i=0; i<componentData.length; i++){
      if(componentData[i].amount!="" && componentData[i].qty!="" && componentData[i].unit!=""){
        selectedData.push(componentData[i])
      
      }    
    }
    console.log("na housing tins,", latitude, longitude, type, date)
    let formData = new FormData();
    formData.append('date', date);
    formData.append('latitude', latitude);
    formData.append('longitude', longitude);
    formData.append('type', type);
    formData.append('selected_data',JSON.stringify(selectedData));
    formData.append('contract_id', id);

    
  datasheetHousingPost(formData, token, id, type).then((data) => {
    if(data.success==false){
      // showToastWithGravity(data.message)
      // alert(data.message)
      Alert.alert(
        "Error During Upload",
        data.message,
        [
          {
            text: "OK",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          
        ],
        { cancelable: false }
      );
  
    }
    else {
      showToastWithGravity(data.message)
      props.navigation.navigate('HighwayMenu')
    }
  })
  }

  else {
  let componentData = components.road;

  let selectedData = [];
  for(var i=0; i<componentData.length; i++){
    if(componentData[i].amount!="" && componentData[i].qty!="" && componentData[i].unit!=""){
      selectedData.push(componentData[i])

    }
    
  }
  console.log("this is the tyep",type)
  console.log("the selected data", selectedData)
  //datasheetRoadBridgePost
  let formData = new FormData();
  formData.append('date', date);
  formData.append('latitude', latitude);
  formData.append('longitude', longitude);
  formData.append('type', type);
  formData.append('selected_data',JSON.stringify(selectedData));
  formData.append('contract_id', id);

  datasheetRoadBridgePost(formData, token).then((data) => {
    if(data.success==false){
      // showToastWithGravity(data.message)
      // alert(data.message)
      Alert.alert(
        "Error During Upload",
        data.message,
        [
         
          {
            text: "OK",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          
        ],
        { cancelable: false }
      );
  
    }
    else {
      showToastWithGravity(data.message)
      props.navigation.navigate('HighwayMenu')
    }
  })

  }
}


const showToastWithGravity = (msg) => {
  Toast.show({
    text: msg,
    duration: 2000
  })
};

  const rightActionOne = (id) => (
    {
        backgroundColor: '#fff',
        component: (
          <View style={styles.swipeoutSide}>
            <Ionicons
              size={30}
              onPress={() => getDatasheetById(id)}
              color='#ffc107'
              name= {
                Platform.OS === 'ios'
                  ? `send`
                  : 'send'
              }/>
            </View>
          )
        }
  )

  const rightActionTwo = (id) => (
    {
        backgroundColor: '#fff',
        component: (
          <View style={styles.swipeoutSide}>
            <FontAwesome5
              size={30}
              onPress={() => props.navigation.navigate("DatasheetEdit", {id:id})}
              color='#28a745'
              name= {
                Platform.OS === 'ios'
                ? `edit`
                : 'edit'
              }
            />
          </View>
        )
      }
  )
/*

 <Swipeout left={[leftActionOne(savedDatasheet.id), leftActionTwo(savedDatasheet.id)]} 
                right={[rightActionOne(savedDatasheet.id), leftActionTwo(savedDatasheet.id)]}  backgroundColor="#fff">
            <TouchableOpacity style={styles.listContainer}>
            <View style={styles.listHeader}>
                <Text style={styles.listTitle}>{savedDatasheet.title}</Text>
                <Text style={styles.listSubTitle}>{underscoreFormatter(savedDatasheet.type)}(<TimeAgo time={savedDatasheet.date}/>)</Text>
            </View>
            </TouchableOpacity>
        </Swipeout>
*/ 
//   const leftActionOne = (id) => (
//     {
//         backgroundColor: '#fff',
//         component: (
//           <View style={styles.swipeoutSide}>
//             <Ionicons
//               size={40}
//               onPress={() => alert("Share", +id)}
//               color='#007bff'
//               name= {
//                 Platform.OS === 'ios'
//                   ? `ios-share-outline`
//                   : 'md-share-alt'
//             }/>
//           </View>
//         )
//       }
//  )
  // const leftActionTwo = (id) => (
  //    {
  //       backgroundColor: '#fff',
  //       component: (
  //         <View style={styles.swipeoutSide}>
  //           <Ionicons
  //             size={40}
  //             onPress={() => alert("Complete"+id)}
  //             color='#28a745'
  //             name= {
  //               Platform.OS === 'ios'
  //                 ? `ios-checkmark-circle-outline`
  //                 : 'md-checkmark-circle-outline'
  //           }/>
  //         </View>
  //       )
  //     }
  // )


  return (
    <View style={{flex:1}}> 
<HeaderWithBack navigation={props.navigation} color="white"/>
    <View style={{backgroundColor:'green', flex: 1.5}}>
        <ImageBackground
            style={styles.image}
            source={require('../../assets/images/sky3.jpg')}
        >
          <Text style={{
            marginTop:60,
            color:'white',
            fontWeight:'bold',
            fontSize:20,
            marginLeft:40,
            marginRight:40, }}>File and Datasheet Upload Section</Text>
            <Text style={{fontSize:11,marginTop:20, marginLeft:40, marginRight:40, color:'white', fontFamily:'Poppins_400Regular'}}>
           Here you can select the Datasheet you want to upload for:
            </Text>
            <Text style={{fontSize:11,marginTop:20, marginLeft:40, marginRight:40, color:'white', fontFamily:'Poppins_400Regular'}}>
            {title}
            </Text>
          
        </ImageBackground>
    </View> 
    <View style={{flex:2,backgroundColor:'white',
        borderTopRightRadius:40, 
        marginTop:-30,
        borderTopLeftRadius:40,}}>
    
        <ScrollView style={{marginTop:30}}>    
            <View style={{flexDirection:'row', justifyContent:'space-around'}}>
                {/* <View style={[styles.eachCard]}>
                <TouchableOpacity onPress={() => props.navigation.navigate('FileUploadScreen', {
                    id: id,
                    type: type,
                    token:token,
                    title: title,
              })}>
                <FontAwesome5 style={{alignSelf:'center', textAlign:'center'}} 
    name="file-upload" size={41} color="green"/>
  <Text style={styles.state}>Edit/Add Fields Datasheet</Text>
              </TouchableOpacity>
                </View> */}
               
                    <View style={[styles.eachCard]}>
                    <TouchableOpacity onPress={() => props.navigation.navigate('FileUploadScreen', {
                    id: id,
                    type: type,
                    token:token,
                    title: title,
              })}>
                        <FontAwesome5 style={{alignSelf:'center', textAlign:'center'}} 
                            name="camera" size={41} color="green"/>
                        <Text style={styles.state}>Upload Photos/Videos</Text>  
                        </TouchableOpacity>
                    </View>
             


            </View>

            <View style={{marginBottom:20, marginTop:20}}>
            <Text style={[styles.title,{marginBottom:20}]}>Recent Datasheet Saved Within this Device</Text> 
        
        
        {savedDatasheet.map((savedDatasheet, index) => (
        <Swipeout right={[rightActionOne(savedDatasheet.id), rightActionTwo(savedDatasheet.id)]}  backgroundColor="#fff">
            <TouchableOpacity style={styles.listContainer}>
            <View style={styles.listHeader}>
                <Text style={styles.listTitle}>{savedDatasheet.title}</Text>
                <Text style={styles.listSubTitle}>{underscoreFormatter(savedDatasheet.type)}(<TimeAgo time={savedDatasheet.date}/>)</Text>
            </View>
            </TouchableOpacity>
        </Swipeout>
        ))}

       



            </View>
        </ScrollView>
     
    </View>
      
        
          
      </View>
      );
    };
    
    
    
    export default React.memo(SelectDatasheet);
    
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
            fontSize: 16,
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
          backgroundColor:'white', 
          width:'84%', 
          borderRadius:10,
          height:150,
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