import React, { useState, createContext, useReducer, useEffect } from "react";
import AsyncStorage from '@react-native-community/async-storage'
// Create Context Object
const initialState = {
    count:0,
    selectedItems: [],
    datasheetArray: [],
    total:0,
    isLoggedIn:false,
    userDetails:null,
    isSuper:false,
    deviseToken:null,
    user:null
};

const getUser = async () => {
  // AsyncStorage.getItem("@SessionObj")
  // .then((result)=>{
  //   console.log("the result from context", result)
  //     let parsifiedResult = JSON.parse(result);
  //     let userDetails = parsifiedResult.userDetails;
      
  // })

  try {
    const user = await AsyncStorage.getItem('@SessionObj')
    return user ? JSON.parse(user) : {};
  } catch (e) {
    console.log('Failed to fetch the data from storage');
  }
}


export const CounterContext = createContext(initialState);


// Create a provider for components to consume and subscribe to changes
export const CounterContextProvider = props => {

  const [state, dispatch] = useReducer((state, action) => {

    switch(action.type) {
        
        case 'selectItem':            
            let total = action.payload.productPrice;
            let accumulatedTotal = state.total+total
            return {...state, total:accumulatedTotal, selectedItems: state.selectedItems.concat(action.payload)}
        
        case 'logOut':
            return {...state, userDetails:null, isSuper:false, isLoggedIn:false}

        case 'updateUser':
            return {...state, userDetails:action.payload}

        case 'newUser':
            return {...state, user:action.payload}

        case 'loginUser':          
          return {
            ...state, 
            userDetails: action.payload.userDetails, 
            isSuper:action.payload.superStatus,
            isLoggedIn:true
          }
          

        case 'SaveDeviseToken':         
          return {
            ...state, 
            deviseToken: action.payload.deviseToken, 
          }

        case 'addToDatasheetArray':
          return {...state, datasheetArray: state.datasheetArray.concat(action.payload)}

        
        case 'incrementQty':          
            return {...state, selectedItems: action.payload.myArray, total:action.payload.total}
        
        case 'decrementQty':       
            return {...state, selectedItems: action.payload.myArray2, total:action.payload.total}
        
        default:
            throw new Error();
        };
  },initialState)
  return (
    <CounterContext.Provider value={{ state, dispatch }}>
      {props.children}
    </CounterContext.Provider>
  );
};