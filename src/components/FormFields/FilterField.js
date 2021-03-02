import React from 'react';
import { SafeAreaView, StyleSheet, Share, Text, View, Image, TouchableOpacity, 
    Dimensions, ScrollView, ImageBackground, TextInput, TouchableHighlight, Platform, Alert } from 'react-native';

import styles from './form.component.styles';
import email from '../../../assets/images/email.png'


export default function FilterField({placeholder, secure, disabled}) {
    const [value, onChangeText] = React.useState('');

    return(
        <View>
            <View style={styles.containerFilter}>
                <Text></Text>
                <Text style={styles.clearTextStyle}>Clear</Text>
            </View>
            <View style={styles.filterField}>
            <TextInput
                style={styles.textInput2}
                onChangeText={text => onChangeText(text)}
                value={value}
                placeholder={placeholder}
                secureTextEntry={true}
                placeholderTextColor='#B8B8B8'
                />
                
            </View>
            
        </View>

       
    )

}