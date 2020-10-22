import React, {useContext, useState, useEffect} from 'react';
import {StyleSheet, SafeAreaView, ScrollView, Image, Text, View, RefreshControl, FlatList, StatusBar} from 'react-native';
import { CounterContext } from "../../store";

import {viewSingleMessage} from '../api/apiService';
import TimeAgo from 'react-native-timeago';
import SingleMessageHeader from '../components/singleMessageHeader';



export default function SingleMessageScreen(props) {
    const [message, setMessage] = useState(null);
    const [fullname, setFullname] = useState(null);
    const [time, setTime] = useState(null);
    const globalState = useContext(CounterContext);

 
    const fetchSingleMsg = () => {
        const {state, dispatch } = globalState;
        let id = props.navigation.getParam('id', null)
        viewSingleMessage(id, state.user.token).then((single_msg)=>{
            console.log("GGGGGGGGG", single_msg)
           
            if(single_msg.success==true){
                console.log("seeneder", single_msg.msg.senderId[0])
                let fullName = single_msg.msg.senderId[0].firstName + " " + single_msg.msg.senderId[0].lastName
                setMessage(single_msg.msg.message)
                setFullname(fullName)
                setTime(single_msg.msg.createdAt)
            }

        })
       
    }
    useEffect(() => {
        fetchSingleMsg()
      }, []);


  return (
    <SafeAreaView style={{backgroundColor:'white'}}>
        <View style={{backgroundColor:'white', marginBottom:10}}>
            <SingleMessageHeader title={fullname} navigation={props.navigation} />
        <View style={{flexDirection:'row', marginTop:10, width:'100%'}}>
        <View style={{borderTopColor:'#4E4E50',borderTopWidth:1, flex:1, marginTop:10, marginRight:2, marginLeft:10}}></View>
            <Text style={{fontSize:12, color:'#4E4E50', fontFamily:'Poppins_400Regular', fontWeight:'bold'}}> 
            <TimeAgo time={time}/>
            </Text>
        <View style={{borderTopColor:'#4E4E50', borderTopWidth:1, flex:1, marginTop:10, marginLeft:2, marginRight:10}}></View>
        </View>
        </View>
       
            <ScrollView style={{backgroundColor:'white'}}
            contentInsetAdjustmentBehavior="automatic"
            showsVerticalScrollIndicator={false}>
            <View style={{marginHorizontal:15,marginTop:30, backgroundColor:'#0baffe', 
            borderRadius:20 }}>
                <Text style={{fontSize:13, color:'white', marginLeft:20, 
                fontFamily:'Poppins_400Regular', marginTop:20}}>{fullname}</Text>
                <Text style={{fontSize:16, textAlign:'justify', lineHeight:26, color:'white', fontFamily:'Poppins_400Regular', margin:20}}>
               {message}
                </Text>
                 </View>
                <View style={{marginBottom:80}}></View>         
            </ScrollView>                
   
    

   </SafeAreaView>
   
  );
}

const styles = StyleSheet.create({
    headerIcon: {
        marginTop:6
    },

    titleBar: {
        flexDirection: 'row',
    
    },
    



})