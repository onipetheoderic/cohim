import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';

import { CounterContextProvider } from "./store";
import { StyleSheet, View, AppState, AsyncStorage } from 'react-native'
import { createSwitchNavigator, createAppContainer } from 'react-navigation'

import { createStackNavigator } from 'react-navigation-stack';

import { NavigationContainer } from '@react-navigation/native';
import NetInfo from '@react-native-community/netinfo';
import { AppLoading } from 'expo';
import { Pacifico_400Regular } from '@expo-google-fonts/pacifico';
import {
  useFonts,
  Poppins_100Thin,
  Poppins_100Thin_Italic,
  Poppins_200ExtraLight,
  Poppins_200ExtraLight_Italic,
  Poppins_300Light,
  Poppins_300Light_Italic,
  Poppins_400Regular,
  Poppins_400Regular_Italic,
  Poppins_500Medium,
  Poppins_500Medium_Italic,
  Poppins_600SemiBold,
  Poppins_600SemiBold_Italic,
  Poppins_700Bold,
  Poppins_700Bold_Italic,
  Poppins_800ExtraBold,
  Poppins_800ExtraBold_Italic,
  Poppins_900Black,
  Poppins_900Black_Italic,
} from '@expo-google-fonts/poppins';
import { Font } from 'expo';

import { NetworkProvider } from 'react-native-offline';
import { Root } from "native-base";

import SplashScreen from './src/screens/SplashScreen';
import SingleContractPage from './src/screens/SingleContractPage';
import LoginScreen from './src/screens/LoginScreen';
import Dashboard from './src/screens/Dashboard';
import HighwayMenu from './src/screens/HighwayMenu';
import DatasheetScreen from './src/screens/DatasheetScreen';
import UploadMenu from './src/screens/UploadMenu';
import Project from './src/screens/Project';
import SelectDatasheet from './src/screens/SelectDatasheet';
import SelectedLocalDatasheet from './src/screens/SelectedLocalDatasheet';
import AllSavedDatasheets from './src/screens/AllSavedDatasheets';
import Messages from './src/screens/Messages';
import SingleMessage from './src/screens/SingleMessage';
import AdminMessage from './src/screens/AdminMessage';
import SingleUserMessage from './src/screens/SingleUserMessage';
import SendMsgToSection from './src/screens/SendMsgToSection';
import FileUploadScreen from './src/screens/FileUploadScreen';
import DatasheetTemplate from './src/screens/DatasheetTemplate';
import BridgeDatasheet from './src/screens/BridgeDatasheet';
import DatasheetEdit from './src/screens/DatasheetEdit';
import HdmiVerification from './src/screens/HdmiVerification';
import ShowAllZones from './src/screens/ShowAllZones';
import ShowEngineersState from './src/screens/ShowEngineersState';
import ShowEngineersStateSingle from './src/screens/ShowEngineersStateSingle';
import SingleUser from './src/screens/SingleUser';
import HousingMenu from './src/screens/HousingMenu';
import HousingTemplate from './src/screens/HousingTemplate';



export default function App() {
  state = {
    appState: AppState.currentState,
  };
  useEffect(()=> {
     //Subscribe to network state updates
     const subscribe = NetInfo.addEventListener(state => {
      console.log(
         'Connection type: ' + 
          state.type + 
         ', Is connected?: ' + 
          state.isConnected);
    });
  }, [])
  
let [fontsLoaded] = useFonts({
  Poppins_100Thin,
  Poppins_100Thin_Italic,
  Poppins_200ExtraLight,
  Poppins_200ExtraLight_Italic,
  Pacifico_400Regular,
  Poppins_300Light,
  Poppins_300Light_Italic,
  Poppins_400Regular,
  Poppins_400Regular_Italic,
  Poppins_500Medium,
  Poppins_500Medium_Italic,
  Poppins_600SemiBold,
  Poppins_600SemiBold_Italic,
  Poppins_700Bold,
  Poppins_700Bold_Italic,
  Poppins_800ExtraBold,
  Poppins_800ExtraBold_Italic,
  Poppins_900Black,
  Poppins_900Black_Italic,
  'Roboto': require('native-base/Fonts/Roboto.ttf'),
  'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
});
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
  return (
    <View style={styles.container}>
      
        <CounterContextProvider initialValue="Theoderic iiiii">
          
          <NetworkProvider>
          <Root>
            <NavigationContainer>
              <AppNavigator />
            </NavigationContainer>
            </Root>
          </NetworkProvider>
          
        </CounterContextProvider>
     
    </View>
  );
}
}

const AppSwitchNavigator = createStackNavigator(
 
  {
  
  SplashScreen:SplashScreen,   
    LoginScreen:LoginScreen,
    UploadMenu:UploadMenu,
    Dashboard:Dashboard,
    SingleContractPage:SingleContractPage,
    HighwayMenu:HighwayMenu,
    DatasheetScreen:DatasheetScreen,
    Project:Project,
    SelectDatasheet:SelectDatasheet,
    SelectedLocalDatasheet:SelectedLocalDatasheet,
    AllSavedDatasheets:AllSavedDatasheets,
    Messages:Messages,
    SingleMessage:SingleMessage,
    AdminMessage:AdminMessage,
    SingleUserMessage:SingleUserMessage,
    SendMsgToSection:SendMsgToSection,
    FileUploadScreen:FileUploadScreen,
    DatasheetTemplate:DatasheetTemplate,
    BridgeDatasheet:BridgeDatasheet,
    DatasheetEdit:DatasheetEdit,
    HdmiVerification:HdmiVerification,
    ShowAllZones:ShowAllZones,
    ShowEngineersState:ShowEngineersState,
    ShowEngineersStateSingle:ShowEngineersStateSingle,
    SingleUser:SingleUser,
    HousingMenu:HousingMenu,
    HousingTemplate:HousingTemplate
},{
headerMode:'none',
}
)

const AppNavigator = createAppContainer(AppSwitchNavigator)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

