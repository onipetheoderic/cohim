
import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  AsyncStorage,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';
import { CounterContext } from "../../store";


const SplashScreen = (props) => {
  const [isLoading, setLoading] = useState(false)
  const globalState = useContext(CounterContext);    
  const { width, height } = Dimensions.get('window');
  const [currentRoute, setCurrentRoute] = useState("");


  useEffect(() => {
    const {state, dispatch } = globalState;
    let device_token = async () => await AsyncStorage.getItem('device_token')
    device_token().then((raw_token) =>{
      console.log("RAWWWWWWW",raw_token)
      if(raw_token!=null){
        let data = JSON.parse(raw_token)
        
        console.log("the device token", data)
       
        let payload = {
          deviseToken:data
        }
        dispatch({ type: 'SaveDeviseToken', payload:payload })
      }
      props.navigation.navigate('LoginScreen');
  
   
 


  // session().then((val) => {
  //     console.log("the session", val)
  //     if (val) {
  //         // setLoading(true)
          
  //         let data = JSON.parse(val)
  //         console.log("splash",data)

  //         const isSuper = data.section == "all_sections" ?true:false
  //         let payload = {
  //           userDetails:data,
  //           isSuper:isSuper
  //         }
          
  //         if(isSuper==true){
  //           setCurrentRoute('Dashboard')
  //           dispatch({ type: 'loginUser', isSuper:true, payload:payload })
  //           props.navigation.navigate('Dashboard');
  //         }
  //         else {
  //           setCurrentRoute('HighwayMenu')
  //           dispatch({ type: 'loginUser', isSuper:false, payload:payload })
  //           props.navigation.navigate('HighwayMenu');
  //         }
  //     }
  //     else{
  //       setCurrentRoute('LoginScreen')
  //       props.navigation.navigate('LoginScreen');
  //     }

})
}, []);


  setTimeout(() => {
      props.navigation.navigate(currentRoute); //this.props.navigation.navigate('Login')
  }, 4300);

  return (
    <>
        <View style={{flex:1, justifyContent:'center', backgroundColor:'#0FC816'}} duration={3000} animation="zoomInUp">
        
        <Animatable.Text duration={2500} animation="zoomInUp" style={{textAlign:'center', fontSize:25}}>
        Welcome to Cohims
        </Animatable.Text>
        <View style={{flexDirection:'row', justifyContent:'center'}}>
            <Animatable.Text animation="pulse" easing="ease-out" iterationCount="infinite" style={{textAlign:'center', marginLeft:4,fontSize:10, fontFamily:'Poppins_400Regular', fontWeight:'bold'}}>
               Contract and Highway Mgt System
            </Animatable.Text>
           
            </View>
            <Animatable.Text delay={2000} duration={2000} animation="bounceInUp" style={{textAlign:'center',fontSize:10, fontFamily:'Poppins_400Regular'}}>
                Ministry of Works Nigeria
            </Animatable.Text>            
        </View>
    </>
  );
};



export default SplashScreen;
