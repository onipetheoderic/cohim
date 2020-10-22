import React, {useContext} from 'react';
import {StyleSheet, TouchableOpacity, TouchableHighlight, ActivityIndicator, TextInput, Button, Alert, SafeAreaView, ScrollView, Image, Text, View, RefreshControl, FlatList, StatusBar} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {Colors} from './colors'
import {Toast} from 'native-base';

export default function ShowToastwithGravity(props) {


     
const showToastWithGravity = (msg) => {
  Toast.show({
    text: msg,
    duration: 2000
  })
};

  return (
    <>
    {showToastWithGravity(props.msg)}
    </>
  );

}
