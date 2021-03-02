import React from 'react';
import { SafeAreaView, StyleSheet, Share, Text, View, Image, TouchableOpacity, 
    Dimensions, ScrollView, ImageBackground, TextInput, TouchableHighlight, Platform, Alert } from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import styles from './form.component.styles';


export default function FormFields({handleForm, value, name, icon, placeholder,marginVertical, secure, disabled, label, editable}) {
  
    const displayOnly = disabled ? '100%' : '90%'
    const displayOnlyMargin = disabled ? 5 : 15
    return (
        <View style={[styles.container,{width:displayOnly,  marginVertical:marginVertical,}]}>
            <View style={styles.typeCont}>
            <Feather name={icon} size={20} style={styles.iconStyle} />
            </View>
            <View style={styles.formPortion}>
                <Text style={styles.label}>{label}</Text>
                <TextInput
                editable={editable}
                style={styles.textInput}
                onChangeText={text => handleForm(name,text)}
                value={value}
                placeholder={placeholder}
                secureTextEntry={secure}
                placeholderTextColor='#000000'
                />
            </View>
            
        </View>
    )
}
 