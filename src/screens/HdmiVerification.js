
import React, {useContext, useEffect, useState} from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  SafeAreaView,
  StyleSheet,
  Alert,
  ScrollView,
  View,
  ActivityIndicator,
  TextInput,
  Text,
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
import AsyncStorage from '@react-native-community/async-storage'
import {allAssignedContracts, getUserDetail, hdmiVerifyCodePost} from '../api/apiService';
import {Colors} from '../components/colors'
import HighwayCircleCard from '../components/highwayCircleCard'
import Truncator from "../helpers/truncator";
import Currency from '../helpers/currency';
import { NavigationActions, StackActions } from 'react-navigation'
import AdvertiseButton from '../components/advertiseButton';
import HeaderWithBack from '../components/headerWithBack';
import {Toast} from 'native-base';

const HdmiVerification = (props) => {    
    const { width, height } = Dimensions.get('window');
    const [token, setToken] = useState("");
    
    const [user, setUser] = useState({});
    const [userClicked, setUserClicked] = useState(false)
    const [currentHdmi, setHdmi] = useState({})
    const [hdmiPresent, setHdmiPresent] = useState(false)
    const globalState = useContext(CounterContext);    
    const [content, changeContent] = useState("FMWH-VMP-");
    const [isLoading, setLoading] = useState(false);
    const {state, dispatch } = globalState;
    const [otherDetails, setOtherDetails] = useState({})
    const [singleHdmi, setSingleHdmi] = useState({})


    const logOut = () => {
      const {state, dispatch } = globalState;
      let store = async () => await AsyncStorage.removeItem('@SessionObj')
      store().then(() => {
          console.warn('Logout successfully')
         
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
          console.warn('Logout failed', err.message)
      })
  }
  

    useEffect(() => {
      // Return the function to unsubscribe from the event so it gets removed on unmount
    
      const {state, dispatch } = globalState;
     
        AsyncStorage.getItem("@SessionObj")
        .then((result)=>{          
            let parsifiedResult = JSON.parse(result);
            if(parsifiedResult!=null){
              let userDetails = parsifiedResult.userDetails;
              let { user_token } = userDetails;
              setToken(user_token);
              getUserDetail(user_token)
              .then((data) => {
            
              setUser(data.user);
            
            })
           
          }
          else {
              return ;
          }
        
        })
        
      
        
            
    }, []);

    const showToastWithGravity = (msg) => {
      Toast.show({
        text: msg,
        duration: 2000
      })
    };
    
const submitHdmiContent = () => {
    if(content.length>10){
        setLoading(true)
        let formData = new FormData();
        formData.append('code', content);
        
        
        hdmiVerifyCodePost(formData, token).then((data) => {
          
          if(data.success==false){
            setLoading(false)
            setHdmiPresent(false)
           
            Alert.alert(
              "Error",
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
            console.log("the data hhh", data)
            console.log("single chdmi", data.single_hdmi)
            setSingleHdmi(data.single_hdmi)
            // props.navigation.navigate('HighwayMenu')
            setLoading(false)
            showToastWithGravity(data.message)
            setHdmiPresent(true)
           
            let { success, single_hdmi, ...otherdetails } = data;
            console.log( "UUUUUUX", single_hdmi)
            setOtherDetails(otherdetails)
           
          }
        })
    }
   else {
    showToastWithGravity("Invalid HDMI Code")
   }
  
}
const paidStatus = (bool) => {
    if(bool===true){
        return "Paid"
    }
    else {
        return "Not Paid"
    }
}

const expirationStatus = (bool) => {
    if(bool===true){
        return "Expired"
    }
    else {
        return "Not Expired"
    }
}
console.log("YYYYYYYYYYYYYYYY",singleHdmi)
  return (
    <View style={{flex:1}}> 
<HeaderWithBack navigation={props.navigation} color="white" />
<View style={{backgroundColor:'green', flex: 2}}>
    <ImageBackground
        style={styles.image}
        source={require('../../assets/images/unnamed.jpg')}
    >
    <View style={{marginTop:30, marginRight:10, alignItems:'flex-end'}}>
      <TouchableOpacity onPress={()=>setUserClicked(!userClicked)}>
      <FontAwesome5 name="user" size={20} color="white" />
      </TouchableOpacity>
    {userClicked &&
      <View style={{borderRadius:7, backgroundColor:'white', position:'absolute', top:25, width:60, height:30, justifyContent:'center'}}>
        <TouchableOpacity onPress={()=>logOut()}>
          <Text style={{color:'black', fontFamily:'Poppins_400Regular', textAlign:'center'}}>Logout</Text>
        </TouchableOpacity>       
      </View>
      }
    </View>
      <Text style={{
        marginTop:20,
        color:'white',
        fontWeight:'bold', 
        fontSize:22,
        marginLeft:40}}>Hello! {user.firstName}</Text>
        <Text style={{fontSize:15,marginTop:20, marginLeft:40, color:'white', fontFamily:'Poppins_400Regular'}}>
        HDMI Verification Page
        </Text>
        <ScrollView horizontal 
        showsHorizontalScrollIndicator={false} style={{flexDirection:'row', marginTop:-40}}>
         <HighwayCircleCard iconName="road" navigation={props.navigation} link="AllSavedDatasheets" title="Saved Inspection Datasheets"/>
         <HighwayCircleCard iconName="envelope" title="View/Send Messages" navigation={props.navigation} link="Messages"/>
         <HighwayCircleCard iconName="water" title="Create A New Datasheet" navigation={props.navigation} link="UploadMenu"/>
        

        </ScrollView>
    </ImageBackground>
</View> 
<View style={{flex:2,backgroundColor:'white',
    borderTopRightRadius:40, 
    marginTop:-30,
    borderTopLeftRadius:40,}}>

<ScrollView style={{
    
  marginTop:30
    }}>
     
    <View style={{marginBottom:20, marginTop:20}}>
            <Text style={[styles.title,{marginBottom:20}]}>Enter HDMI Code</Text> 
            
            <View style={[styles.eachCard]}>
                <TextInput 
                textAlignVertical={'top'}
                value={content}
                placeholder="FMWH-VMP-0000000000" 
                multiline={true}
                style={{marginLeft:20,fontSize:20, fontFamily:'Poppins_400Regular',}}
                onChangeText={(text) => changeContent(text)}
                />
            </View>
            {!isLoading &&
            <AdvertiseButton title="Check HDMI" handleSubmit={()=>submitHdmiContent()}/>
            }
            {isLoading &&
            <ActivityIndicator size="large" color="#07411D" />
            }
            </View>

    {hdmiPresent &&
    <View style={styles.detailCard}>
        {/*  "hdmi_category": "shops", "hdmi_code": "FMWH-VMP-276521549", 
        "hdmi_type": "vendor_market_place", "paid": true, "password": "123456", 
        "pension_social_security_contribution": "", "phoneNumber": "07039148866", 
        "position_in_company": "CEO", "ppp_assigned": false,
         "project_location": "wesozobaj@mailinator.com", 
         "project_name": "vyni@mailinator.com", 
         "reference_paystack": "arhnr70aeo", 
         "sworn_affidavit_crime": "1594566807107IMG_20200208_120316.jpg",
          "sworn_affidavit_director": "", "transaction": [Array], 
          "updatedAt": "2020-07-12T19:55:26.619Z",
         "user_assigned": [Array], "verifiedPayment": true}] */}
        <Text style={styles.title3}>{singleHdmi.ppp[0].fullname}</Text>
        <Text style={styles.title2}>Position in Company: {singleHdmi.ppp[0].position_in_company}</Text>
        <Text style={styles.title2}>Phone Number: {singleHdmi.ppp[0].phoneNumber}</Text>
        <Text style={styles.title2}>Verified Payment: {paidStatus(singleHdmi.ppp[0].verifiedPayment)}</Text>
        <Text style={styles.title2}>Project Location: {singleHdmi.ppp[0].project_location}</Text>
        <Text style={styles.title2}>Project Name: {singleHdmi.ppp[0].project_name}</Text>
        <Text style={styles.title2}>Company Name: {singleHdmi.ppp[0].company_name}</Text>
        <Text style={styles.title2}>Company Start Date: {singleHdmi.ppp[0].company_dob}</Text>
        <Text style={styles.title2}>HDMI Category: {singleHdmi.ppp[0].hdmi_category}</Text>
        <Text style={styles.title2}>Admin Verified: {singleHdmi.ppp[0].admin_verified}</Text>
        <Text style={styles.title2}>HDMI Type: {singleHdmi.ppp[0].hdmi_type}</Text>
        <Text style={styles.title2}>Paid: {paidStatus(singleHdmi.ppp[0].paid)}</Text>
        <Text style={styles.title2}>HDMI Code: {singleHdmi.ppp[0].hdmi_code}</Text>
        <Text style={styles.title2}>Days Elapsed: {otherDetails.daysElapsedFromLicence} Days</Text>
        <Text style={styles.title2}>Days Remaining For Licence: {otherDetails.daysRemainingInLicence} Days</Text>
        <Text style={styles.title2}>Expiration Status: {expirationStatus(otherDetails.isExpired)}</Text>


    </View>  
    }
      
    


  </ScrollView>
 
</View>
  
    
      
  </View>
  );
};



export default HdmiVerification;

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
    detailCard: {
        margin:10,
      backgroundColor:'white', 
     width:'85%',
      borderRadius:10,
      height:600,
      alignSelf:'center',
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
    eachCard: {
      margin:10,
      backgroundColor:'white', 
     width:'85%',
      borderRadius:10,
      height:100,
      alignSelf:'center',
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
    marginBottom:10,
    textAlign:'center',
    color:'#095A1F',
    fontFamily:'Poppins_400Regular', 
    fontSize:13,
    
},
title3: {
    marginTop:10, 
    marginBottom:10,
    textAlign:'center',
    color:'#095A1F',
    fontFamily:'Poppins_400Regular', 
    fontSize:17,
    
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