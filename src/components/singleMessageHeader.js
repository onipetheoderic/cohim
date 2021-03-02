import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, ActivityIndicator, TextInput, Button, Alert, SafeAreaView, ScrollView, Image, Text, View, RefreshControl, FlatList, StatusBar} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto'
import Entypo from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-community/async-storage'
import { NavigationActions, StackActions } from 'react-navigation'
import { CounterContext } from "../../store";

export default function Header(props) {
   
  const {goBack} = props.navigation;
  const globalState = useContext(CounterContext); 
  

const clearAsyncStorage = () => {
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


  return (
   
        <View style={styles.titleBar}>
            
            <TouchableOpacity onPress={() => props.navigation.goBack()}>
                <Entypo name="chevron-thin-left" size={20} color="#52575d" />
            </TouchableOpacity>
            <Text style={styles.text}>{props.title}</Text>
        <View></View>
        </View>
   
  );
}

const styles = StyleSheet.create({
    headerIcon: {
        marginTop:6
    },
    
    text: {
        fontFamily: "Montserrat_400Regular",
        color: "#3e3e3e",
        fontSize:18
    },
    image: {
        flex:1,
        width: undefined,
        height: undefined,
    },
    subText: {
        fontSize: 12,
        color: '#AEB5BC',
        textTransform: 'uppercase',
        fontWeight: '500'
    },  
    titleBar: {
        flexDirection: 'row',
       
        justifyContent: "space-between",
        marginTop: 18,
        marginHorizontal: 15,
        marginBottom:10
    },
    



})