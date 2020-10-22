
import React, {useContext, useEffect, useState} from 'react';
import { CounterContext } from "../../store";
import messaging from '@react-native-firebase/messaging';
import {Toast} from 'native-base';


const PushNotification = (props) => {
  const globalState = useContext(CounterContext);
 


const getDeviseToken = () => {
  const {state, dispatch } = globalState;
      // Get the device token
    messaging()
      .getToken()
      .then(token => {
          console.log("the devise tokenHHHHHHHH", token)
          let payload = {
            deviseToken:token
          }
          dispatch({ type: 'SaveDeviseToken', payload:payload })
        
    });
    messaging().onTokenRefresh(token => {
        console.log("the devise tokenHHHH", token)
        let payload = {
          deviseToken:token
        }
        dispatch({ type: 'SaveDeviseToken', payload:payload })
        stateSetter(token)
    });
}
const showToastWithGravity = (msg) => {  
  Toast.show({
    text: msg,
    duration: 2000
  })
};

const stateSetter = async (deviceToken) => {
  await AsyncStorage.setItem('device_token', JSON.stringify(deviceToken))
      store().then(() => {
        console.log('Device Token Received', deviceToken)
        let payload = {
          deviseToken:token
        }
        dispatch({ type: 'SaveDeviseToken', payload:payload })
      })
}

// https://i.ibb.co/XDDjNXG/trcn.png

useEffect(() => {
  // console.log("before getDevisse tokens")
    getDeviseToken();        
    // Register background handler
    messaging().setBackgroundMessageHandler(async remoteMessage => {
        console.log('Message handled in the background!', remoteMessage);
    });

    messaging()
    .subscribeToTopic('cohims_broadcast')
    .then(() => console.log('Subscribed to topic!'));
    
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log("the msg notitiiication",remoteMessage)
      showToastWithGravity("A new Msg from the Admin Users")
      showToastWithGravity(remoteMessage.notification.title)
    });

    return unsubscribe;
  }, []);



  return (
  <>{props.children}</>
  );
};



export default PushNotification;
