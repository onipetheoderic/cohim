
import React, {useContext, useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Picker,
  RefreshControl,
  TextInput,
  Platform,
  PickerIOS,
  FlatList,
  AsyncStorage,
  ActivityIndicator,
  Text,
  Dimensions,
  
  PixelRatio,
} from 'react-native';
import SingleMessageHeader from '../components/singleMessageHeader';
import { CounterContext } from "../../store";
import MessageGround from '../components/messageGround';
import AdvertiseButton from '../components/advertiseButton';
import MessageCard from '../components/messageCard';
import { submitMsg, viewAllMessages,usersInSection, viewSingleMessage} from '../api/apiService';
import {Colors} from '../components/colors'
import * as Animatable from 'react-native-animatable';
import {Toast} from 'native-base';
import HeaderWithBack from '../components/headerWithBack';

const HighwayMenu = (props) => {    
    const { width, height } = Dimensions.get('window');
    const [token, setToken] = useState("");
    const [content, changeContent] = useState("");
    const [msgs, setMsgs] = useState([]);
    const [selectedUser, setSelectedUsers] = useState(null)
    const globalState = useContext(CounterContext);
    const [showMsg, changeShowMsg] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const [currentPage, changeCurrentPage] = useState(null);
    const [lastPage, changeLastPage] = useState(null);
    const [isRefreshing, changeIsRefreshing] = useState(false);
    const [allUser, changeAllUser] = useState([])
    const [subject, changeSubject] = useState(null);

   //submitMsg
    const showMsgBox = () => {
        changeShowMsg(true)
    }
//userToken
const fetchFeeds = (user_token) => {
    console.log("the tokenHHHHHHH", user_token)
    viewAllMessages(user_token).then((data) => {
        if(data.success==true){
            console.log("datas gotten from api", data)
           
            setMsgs(data.msgs)
            setLoading(false)
        }
        else {
            
            setMsgs(data.msg)
            setLoading(false)
        }
       
    })    
}

const fetchUserSection = (user_token) => {
    usersInSection(user_token).then((data) => {
        console.log("the DAATA",data)
        if(data.success==true){
            changeAllUser(data.users)
        }
    })
}

useEffect(() => {    
    
    AsyncStorage.getItem("@SessionObj")
    .then((result)=>{          
        let parsifiedResult = JSON.parse(result);
        if(parsifiedResult!=null){
          let userDetails = parsifiedResult.userDetails;
          let { user_token } = userDetails;
          console.log("thy token", user_token)
          setToken(user_token);
            fetchFeeds(user_token)
            fetchUserSection(user_token)
        }
    })     
    
  }, []);

const handleInfiniteScroll = () => { 
    if (currentPage < lastPage) {
      changeCurrentPage({
        currentPage: currentPage + 1,
      }, () => {
        viewAllMessages(token).then((data) => {
            setMsgs(data.msgs)
            changeIsRefreshing(false)
        }).catch((e) => {
            changeIsRefreshing(false)
            console.warn(e.message)
        })
      })
    }
}
/*
 message.recieverId = req.body.reciever_id
        message.subject = req.body.subject
        message.message = req.body.message
*/ 
const submitMessage = () =>{
    const {state, dispatch } = globalState;
   
    setLoading(true)
    if(subject.length<=10){
        showToastWithGravity("Subject must be atleast 10 characters")
        setLoading(false)
    }
    else if(content.length<=10){
        showToastWithGravity("Content must be atleast 10 characters")
    }
    else if(selectedUser==null || selectedUser.length==0 || selectedUser==" "){
        showToastWithGravity("No User is Selected")
        setLoading(false)
    }
    else {
        let formData = new FormData();
        formData.append('recieverId', selectedUser);
        formData.append('message', content);
        formData.append('subject', subject)
        submitMsg(formData, token).then((data) => {
            console.log(data)
            if(data.success==true){
                showToastWithGravity(data.msg)
                changeShowMsg(false)
                setLoading(false)
                
            }
            else {
                showToastWithGravity("Server Error")
                changeShowMsg(false)
                setLoading(false)
            }
           
        })
    
    }
    
}
const showToastWithGravity = (msg) => {
    Toast.show({
      text: msg,
      duration: 2000
    })
  };

  if (isLoading) {
    return (
      <View style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" color="#07411D" />
      </View>
    )
  }  

  return (

    <>
       {showMsg &&
      <Animatable.View duration={3000} animation="zoomInDown" style={{justifyContent:'center', borderRadius:10, position:'absolute', zIndex:1000, top:50, left:'10%', width:'80%', height:320, backgroundColor:'#07411D'}}>
           
      <ScrollView>
      <Text style={[{marginTop:20, marginLeft:10, fontFamily:'Poppins_400Regular', color:'white'}]}>Subject</Text>
                    <View style={{margin:10}}>
                        <TextInput 
                        style={{color:'white'}}
                        value={subject}
                        placeholder="subject" 
                        placeholderTextColor="white"                        
                        onChangeText={(text) => changeSubject(text)}
                        />
                        
                    </View>
      <Text style={[{marginTop:20, marginLeft:10, fontFamily:'Poppins_400Regular', color:'white'}]}>Message Content</Text>
                    <View style={{margin:10}}>
                        <TextInput 
                        style={{color:'white'}}
                        textAlignVertical={'top'}
                        value={content}
                        placeholder="Content" 
                        placeholderTextColor="white" 
                        multiline={true}
                       numberOfLines={10}
                        onChangeText={(text) => changeContent(text)}
                        />
                        
                    </View>
                    <Text style={[{marginTop:20, marginLeft:10, textAlign:'left', color:'white',fontFamily:'Poppins_400Regular'}]}>Select Recipient</Text>
                    <View>
                    <Picker
                       selectedValue={selectedUser}
                        style={{ height: 50, width: 150, color:'white'}}
                        
                        onValueChange={(itemValue, itemIndex) => setSelectedUsers(itemValue)}>
                         <Picker.Item label={" "} value={" "} />
                        
                        {allUser.map((category, index)=>{
                            console.log(category)
                            return(
                                
                                <Picker.Item key={index} label={category.firstName} value={category._id} /> 
                                
                            )
                        })}
                      
                    </Picker>

             
                   
                    </View>
    <AdvertiseButton title="Submit" handleSubmit={()=>submitMessage()}/>
      <AdvertiseButton title="Close" handleSubmit={()=>changeShowMsg(false)}/>
 
      </ScrollView>
      
</Animatable.View>
    }
      
       <HeaderWithBack navigation={props.navigation} color="black"/>
<MessageGround buttonOnpress={()=>showMsgBox()} home={false} navigation={props.navigation} title="Messages" height={height} width={width}>
<FlatList
                data={msgs}
                keyExtractor={(item, index) => 'key' + index}
                renderItem={({item, index}) => {
                    return (
                        <MessageCard navigation={props.navigation} 
                        link="SingleMessage"
                        id={item.id}
                        fullname={item.fullname} 
                        seen={item.read} 
                        titled={item.subject} 
                        description={item.message}
                        />
                  )}}
                  refreshControl={
                      <RefreshControl
                        refreshing={isRefreshing}
                        onRefresh={() => {
                          changeIsRefreshing(true)
                          fetchFeeds()
                          changeIsRefreshing(true)
                         
                        }}
                      />
                    }
                    onEndReached={() => { handleInfiniteScroll() }}
                  onEndReachedThreshold={0.01}
                  scrollEnabled={!isLoading}
              />


<View style={{marginBottom:60}}></View>
</MessageGround>
    
      
  </>
  );
};



export default HighwayMenu;

const styles = StyleSheet.create({
    cardParent: {
        marginVertical:10,
        height:170,
        borderRadius:10,
        backgroundColor:'green',
        width:'42%',
    },
    
    text: {
        fontFamily: "Poppins_400Regular",
        color: "#3e3e3e",
        fontSize:28
    },
    contractTitle: {
      fontFamily: "Poppins_400Regular",
      color: "#3e3e3e",
      fontSize:17,
      marginLeft:10
    },
    eachCard: {
      margin:10,
      backgroundColor:Colors.mainGreen, 
      width:180, 
      borderRadius:10,
      height:200
  },
  title: {
    marginTop:25, 
    textAlign:'center',
    color:'white',
    fontFamily:'Poppins_400Regular', 
    fontSize:18
},
state: {
    marginTop:10, 
    textAlign:'center',
    color:'white',
    fontFamily:'Poppins_400Regular', 
    fontSize:15,
    
},
currentPercentage: {
    marginTop:10, 
    textAlign:'center',
    color:'white',
    fontFamily:'Poppins_400Regular', 
    fontSize:37,
},

})