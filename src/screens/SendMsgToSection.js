
import React, {useContext, useEffect, useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  TextInput,
  ImageBackground,
  ActivityIndicator,
  Text,
  Dimensions,
} from 'react-native';
import { CounterContext } from "../../store";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { TouchableOpacity } from 'react-native-gesture-handler';
import HeaderWithBack from '../components/headerWithBack';
import AdvertiseButton from '../components/advertiseButton';
import {getAllSections,sendMsgToSection, sendMsgToTopic, viewAllMessages} from '../api/apiService';
import {Colors} from '../components/colors'
import * as Animatable from 'react-native-animatable';
import MsgCard from '../components/msgCards';

import {Toast} from 'native-base';


const SendMsgToSection = (props) => {    
    const { width, height } = Dimensions.get('window');
    const [token, setToken] = useState("");
    const [content, changeContent] = useState("");
    const [msgs, setMsgs] = useState([]);
    const [selectedUser, setSelectedUsers] = useState(null)
    const globalState = useContext(CounterContext);
    const [showMsg, changeShowMsg] = useState(false);
    const [userClicked, setUserClicked] = useState(false)
    const [isLoading, setLoading] = useState(true);
    const [currentPage, changeCurrentPage] = useState(null);
    const [lastPage, changeLastPage] = useState(null);
    const [isRefreshing, changeIsRefreshing] = useState(false);
    const [allSections, changeAllSection] = useState([])
    const [subject, changeSubject] = useState(null);
    const [singleSection, setSection] = useState(null)

    const {state, dispatch } = globalState;
   

//userToken
const fetchFeeds = () => {
    const {state, dispatch } = globalState;
    console.log("this is the state", state) 
    viewAllMessages(state.user.token).then((data) => {
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



const fetchSections = () => {
    setLoading(true)
    console.log("this is the state", state) 
    getAllSections(state.user.token).then((data) => {
        console.log("the DAATA",data)
        if(data.success==true){
            changeAllSection(data.sections)
            setLoading(false)
        }
    })
}

useEffect(() => {
    fetchSections()
  }, []);


const submitMessage = () =>{
   
    setLoading(true)
    if(subject.length<=10){
        showToastWithGravity("Subject must be atleast 10 characters")
        setLoading(false)
    }
    else if(content.length<=10){
        showToastWithGravity("Content must be atleast 10 characters")
        setLoading(false)
    }
  
    else {
        let formData = new FormData();
        formData.append('section', singleSection);
        formData.append('message', content);
        formData.append('subject', subject)
        console.log("the sectionssss", state.user.token)
        sendMsgToSection(formData, state.user.token).then((data) => {
            console.log(data, "response")
            if(data.success==true){
                showToastWithGravity(data.message)
                let rawData = 
                {
                  type: "warning",
                  content: `${subject}...`,
                  topic: singleSection
                  
                }
                sendMsgToTopic(JSON.stringify(rawData)).then((data)=>{
                  console.log("frm firebase",data)
                })
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

const displayMsgBox = (ref_name) => {
    changeShowMsg(true)
    setSection(ref_name)
}

const showToastWithGravity = (msg) => {
  Toast.show({
    text: msg,
    duration: 2000
  })
};


  const firstName = state.user.user.firstName
  if (isLoading) {
    return (
      <View style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" color="#07411D" />
      </View>
    )
  }  
  return (

    <View style={{flex:1}}>
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
                    
    <AdvertiseButton title="Submit" handleSubmit={()=>submitMessage()}/>
      <AdvertiseButton title="Close" handleSubmit={()=>changeShowMsg(false)}/>
 
      </ScrollView>
      
</Animatable.View>
    }
     <View style={{backgroundColor:'green', flex: 2}}>
    <ImageBackground
        style={styles.image}
        source={require('../../assets/images/unnamed.jpg')}
    >
    <View style={{marginTop:26, marginRight:10, alignItems:'flex-end'}}>
      <TouchableOpacity onPress={()=>setUserClicked(!userClicked)}>
      <FontAwesome5 name="user" size={20} color="white" />
      </TouchableOpacity>
    {userClicked &&
      <View style={{borderRadius:7, backgroundColor:'white', position:'absolute', top:25, width:60, height:30, justifyContent:'center'}}>
        <TouchableOpacity onPress={()=>logOut()}>
          <Text style={{color:'black', fontFamily:'Poppins_400Regular', textAlign:'center'}}>Logout</Text>
        </TouchableOpacity>       
      </View>
      }
    </View>
      <Text style={{
        marginTop:20,
        color:'white',
        fontWeight:'bold', 
        fontSize:22,
        marginLeft:40}}>Hello! {firstName}</Text>
        <Text style={{fontSize:15,marginTop:20, marginLeft:40, color:'white', fontFamily:'Poppins_400Regular'}}>
       What Can I do Here?
        </Text>
        <Text style={{fontSize:12,marginTop:10, marginLeft:40, color:'white', fontFamily:'Poppins_400Regular'}}>
        Click/Press on the Section Card
        </Text>
        <Text style={{fontSize:12,marginTop:10, marginLeft:40, color:'white', fontFamily:'Poppins_400Regular'}}>
        Fill In the Message Box and submit
        </Text>
     
        <ScrollView horizontal 
        showsHorizontalScrollIndicator={false} style={{flexDirection:'row', marginTop:-40}}>
      
       

        </ScrollView>
    </ImageBackground>
</View>
<View style={{flex:3,backgroundColor:'white',
    borderTopRightRadius:40, 
    marginTop:-30,
    borderTopLeftRadius:40,}}>
   <ScrollView style={{marginTop:30, marginBottom:10,}}>
       {allSections.map((section, index) => (

<MsgCard onPress={()=>displayMsgBox(section.ref_name)} 
iconName="user-friends" title={section.name}/>
       ))}
 

    </ScrollView>
    </View>
      
  </View>
  );
};



export default SendMsgToSection;

const styles = StyleSheet.create({
    cardParent: {
        marginVertical:10,
        height:170,
        borderRadius:10,
        backgroundColor:'green',
        width:'42%',
    },
    image: {
        height:'100%',
         resizeMode: "cover",
       
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