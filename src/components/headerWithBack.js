import React, {useState, useContext} from 'react';
import { SafeAreaView, StyleSheet, Share, Text, View, Image, TouchableOpacity, 
    Dimensions, ScrollView, ImageBackground, TouchableHighlight, Platform, Alert } from 'react-native';
import PropTypes from 'prop-types';
import AntDesign from 'react-native-vector-icons/AntDesign';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function HeaderWithBackButton({navigation, color}) {
  let fontColor = color===undefined?'black':color
  return (
    <View style={{width:'100%', marginTop:40,
    backgroundColor:'transparent', 
    position:'absolute', zIndex:10000, alignItems:'center', height:60, flexDirection:'row', 
    justifyContent:'space-between'}}>
    <TouchableOpacity onPress={()=>navigation.goBack()}>
        <MaterialIcons name="keyboard-arrow-left" 
                style={{color:fontColor,}} size={30} />
    </TouchableOpacity>
   
    <View>

    </View>
    </View>
  )
}


HeaderWithBackButton.propTypes = {

}
