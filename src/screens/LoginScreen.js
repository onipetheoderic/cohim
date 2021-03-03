
import React, {useContext, useEffect, useState} from 'react';
import {View, AsyncStorage, Text, TouchableOpacity, Dimensions, Image, StyleSheet} from 'react-native';
import { CounterContext } from "../../store";

import { doLogin, } from '../api/apiService'
import Spinner from 'react-native-loading-spinner-overlay';
import { LinearGradient } from 'expo-linear-gradient';
// import messaging from '@react-native-firebase/messaging';
import FormField from '../components/FormFields/FormField';
import {Toast} from 'native-base';
import AuthButton from '../components/AuthButton'


export default function Login(props) {
    const [value, changeValue] = React.useState({email:"",password:""})

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


const handleForm = (name, text) => {
    console.log("the vals", value)
    changeValue({...value, [name]:text})   
}


const validate = (text) => {
    console.log(text);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
        return false
    }
    else {
        return true
    }
}


const loginPost = () => {   
    setLoading(true)
    const {state, dispatch } = globalState;
    let { email, password } = value
    if (email.length < 1 || password.length < 1) {
        showToastWithGravity("email and Password is required")
        setLoading(false)
    } 
    if(validate(email)===false){
        showToastWithGravity("Invalid Email Address")
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
                    if(data.position=="5"){
                        setLoading(false)
                        showToastWithGravity("You are not authorized to use this app")
                    }
                    if(data.position=="8"){
                        setLoading(false)
                        showToastWithGravity("You are not authorized to use this app")
                    }
                    if(data.position=="9"){
                        setLoading(false)
                        showToastWithGravity("You are not authorized to use this app")
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

  const loadSpinner = isLoading ? true : false;

  return (

        <View style={styles.container}>
            <View style={styles.logoParent}>
                <Image source={require('../../assets/images/logo.png')} style={styles.avatar}/>
               <Text style={styles.logoText}>CONTRACT PERFORMANCE MONITORING AND HIGHWAY ROAD ACCESS MANAGEMENT SYSTEM</Text>
               
            </View>
            <LinearGradient  colors={['#43F476', '#0E481F']} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} style={styles.formParent}>
                
                <FormField handleForm={handleForm} name="email" value={value.email} marginVertical={10} placeholder="mail@gmail.com" secure={false} icon="user"/>
                <FormField handleForm={handleForm} name="password" value={value.password} marginVertical={10} placeholder="password" secure={true} icon="lock"/>
                <AuthButton title="SIGN IN" marginVertical={30} onPress={()=>loginPost()}/>
                <View style={styles.signupCont}>
                <Text style={styles.signUpText}>Want to Upload Your Datasheet Offline? </Text>
                <TouchableOpacity onPress={()=>props.navigation.navigate('UploadMenu')}>
                <Text style={styles.signUpText2}>Click Here </Text>
                </TouchableOpacity>
               
                </View>
                
               
            </LinearGradient>
            <Spinner
          //visibility of Overlay Loading Spinner
          visible={loadSpinner}
          //Text with the Spinner 
          textContent="loading"
          //Text style of the Spinner Text
          textStyle={styles.spinnerTextStyle}
        />
        </View>
  );

}
const styles = StyleSheet.create({
    spinnerTextStyle: {
        color: '#FFF',
      },
    avatar: {
        width:100,
        height:100,
        alignSelf:'center'
    },
    signupCont: {
        flexDirection:'row',
        justifyContent:'center'
    },
    signupCont2: {
        marginTop:5,
        flexDirection:'row',
        justifyContent:'center'
    },
    signUpText2: {
        fontFamily:'Montserrat_600SemiBold',
        fontSize:14,
        color: 'white',
    },
    signUpText: {
        fontFamily:'Montserrat_400Regular',
        fontSize:12,
        color: 'black',
    },
    logoText: {
        marginHorizontal:10,
        fontSize:15,
        fontFamily:'Montserrat_600SemiBold',
        color:'green',
        alignSelf:'center',
        textAlign:'center'
    },  
    logoParent: {
        marginTop:20,
        flex: 1,
        backgroundColor:'white',
        justifyContent:'center',
    },
    formParent: {
        flex: 1.8,
        justifyContent:'center',
        paddingTop:30,
        flexDirection:'column',
        borderTopRightRadius:30,
        borderTopLeftRadius:30
    },
    container: {
      flex: 1,
    backgroundColor:'white'
    },
   
  });
