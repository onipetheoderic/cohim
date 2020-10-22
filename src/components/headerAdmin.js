import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, ActivityIndicator, TextInput, Button, Alert, SafeAreaView, ScrollView, Image, Text, View, RefreshControl, FlatList, StatusBar} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AsyncStorage from '@react-native-community/async-storage'
import { NavigationActions, StackActions } from 'react-navigation'
import { CounterContext } from "../../store";

export default function Header(props) {
    const [isLoading, setLoading] = useState(false)
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
            <Text style={styles.text}>{props.title}</Text>
            
            <TouchableOpacity  onPress={() => props.navigation.navigate("AdminMessage")}>
                <MaterialCommunityIcons name="message-plus" size={20} color="#52575d" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => clearAsyncStorage()}>
                <FontAwesome5 name="power-off" size={20} color="#52575d" />
            </TouchableOpacity>
        </View>
   
  );
}

const styles = StyleSheet.create({
    headerIcon: {
        marginTop:6
    },
    
    text: {
        fontFamily: "Poppins_400Regular",
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