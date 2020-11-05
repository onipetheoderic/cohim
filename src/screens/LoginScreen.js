
import React, {useContext, useEffect, useState} from 'react';
import {View, TextInput, AsyncStorage, ActivityIndicator, Alert, Text, TouchableOpacity, StatusBar, Dimensions, Image, StyleSheet} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { CounterContext } from "../../store";
import * as Animatable from 'react-native-animatable';
import {Colors} from '../components/colors'
import { doLogin, } from '../api/apiService'
import SignInButton from '../components/signInButton'
// import messaging from '@react-native-firebase/messaging';

import {Toast} from 'native-base';

const LoginScreen = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setLoading] = useState(false)
    const { width, height } = Dimensions.get('window');
    const globalState = useContext(CounterContext);    
  

  
useEffect(() => {   
    const {state, dispatch } = globalState;
    console.log("the login Screen state", state)
    AsyncStorage.getItem("@SessionObj")
    .then((result)=>{
        let parsifiedResult = JSON.parse(result);
        if(parsifiedResult!=null){
            let userDetails = parsifiedResult.userDetails;
            let { section } = userDetails;
            if(section!="all_sections"){
                props.navigation.navigate("HighwayMenu")
            }
            else {
                props.navigation.navigate("Dashboard")
            }
        }
        else {
            return ;
        }
    })

}, []);


// const departmentSubscriber = (section) =>{
//     messaging()
//     .subscribeToTopic(section)
//     .then(() => console.log('Subscribed to sectional topic'));

// }



const loginPost = () => {   
    console.log("thtoooeoeoeoe")
    setLoading(true)
    const {state, dispatch } = globalState;
    console.log("login details",email, password)
    if (email.length < 1 || password.length < 1) {
        // alert('Both email/password are required')
        showToastWithGravity("email and Password is required")
        setLoading(false)
    } 
    else {
        let formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);
        formData.append('devise_token', state.deviseToken)
        doLogin(formData).then((data) => {
         console.log("ddddd", data)
            if (data.success==true) {   
                setLoading(false)
                const isSuper = data.section == "all_sections" ?true:false;
                // departmentSubscriber(data.section)
                let payload = {
                    userDetails:data,
                    isSuper:isSuper
                }

                if(data.section!="all_sections"){
                    setLoading(false)
                    AsyncStorage.setItem("@SessionObj", JSON.stringify(payload)).then(
                        () => AsyncStorage.getItem("@SessionObj")
                              .then((result)=>{
                                    console.log("TEST",result)
                                    dispatch({ type: 'loginUser', isSuper:false, payload:payload})
                                    props.navigation.navigate("HighwayMenu")
                        })
                    )                  
                }
                else { 
                    setLoading(false)
                    AsyncStorage.setItem("@SessionObj", JSON.stringify(payload)).then(
                        () => AsyncStorage.getItem("@SessionObj")
                              .then((result)=>{
                                    console.log("TEST",result)                   
                                    dispatch({ type: 'loginUser', isSuper:true, payload:payload})
                                    props.navigation.navigate("Dashboard")
                        })
                    )    
                }
               
            }else{
                setLoading(false)
                showToastWithGravity(data.message)
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


//   if (isLoading) {
//     return (
//       <View style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//         <ActivityIndicator size="large" color="#07411D" />
//       </View>
//     )
//   }
  return (
    <>
    
      <StatusBar translucent={true} backgroundColor="transparent"/>
        <View style={{flex:1, justifyContent:'center', backgroundColor:'white'}} duration={3000} animation="zoomInUp">
       
        <Animatable.View duration={2500} animation="zoomInUp" 
        style={{marginBottom:10,justifyContent:'center'}}>
            <View style={{justifyContent:'center'}}>
            <Image
        style={{width:130, height:130, marginLeft:'auto', marginRight:'auto'}}
        source={require('../../assets/images/logo.png')}
      />
      <Text style={{fontSize:20, fontFamily:'Poppins_400Regular', textAlign:'center', marginBottom:30,}}>Cohims</Text>
            </View>
        <View style={{width:'85%', marginLeft:'auto', marginRight:'auto',}}>
        <Text style={{fontSize:12, fontFamily:'Poppins_400Regular', color:"#a79d9d"}}>Email Address</Text>
        </View>
        
        <View style={styles.textField}>
            <TextInput
             autoCapitalize = 'none'
             placeholderTextColor={Colors.mainGreen} 
                placeholder="Email Address"
                underlineColorAndroid="transparent"
                style={{marginLeft:25, marginTop:3}}
                onChangeText={(value) => {
                    setEmail(value)
                   
                }}
            />
        </View>
       
        </Animatable.View>
      
        <Animatable.View duration={2500} animation="zoomInUp" 
        style={{marginTop:13, justifyContent:'center'}}>
            <View style={{width:'85%', marginLeft:'auto', marginRight:'auto',}}>
        <Text style={{fontSize:12, fontFamily:'Poppins_400Regular',  color:"#a79d9d"}}>
            Password</Text>
        </View>
        <View style={styles.textField}>
            <TextInput
            placeholderTextColor={Colors.mainGreen} 
                placeholder="Password"
                secureTextEntry
                underlineColorAndroid="transparent"
                style={{marginLeft:25, marginTop:3}}
                onChangeText={(value) => {
                    setPassword(value)                   
                }}
            />
        </View>
        <View style={{marginVertical:10}}>
        {isLoading &&
            <ActivityIndicator size="large" color="#07411D" />
        }
            
           
                <SignInButton title="SIGN IN" onPress={()=>loginPost()} />
            
            
        </View>
        
        </Animatable.View>
           
            
            </View>
<View style={{marginVertical:20, justifyContent:'center', backgroundColor:'white'}}>
    {/* <Text style={{textAlign:'center', fontFamily:'Poppins_400Regular', color:"#a79d9d"}}>
        HDMI Registration
    </Text> */}
    <TouchableOpacity onPress={()=>props.navigation.navigate('UploadMenu')}>
    <Text style={{textAlign:'center', fontFamily:'Poppins_400Regular', color:"#a79d9d"}}>
        Upload Inspection Datasheet
    </Text>
    </TouchableOpacity>
</View>
    </>
  );
};

const styles = StyleSheet.create({
    textField: {
      
        textAlign:'center',
        height:50,
        justifyContent:'center',
        marginLeft:'auto',
        marginRight:'auto',
        borderRadius:26,
        width:'85%',
        
        shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 4,
},
shadowOpacity: 0.41,
shadowRadius: 9.11,

elevation: 8,
    }
})



export default LoginScreen;
