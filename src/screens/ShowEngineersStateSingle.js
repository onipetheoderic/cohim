
import React, {useState, useEffect, useContext} from 'react';
import {
  View,  
  ActivityIndicator, 
  AsyncStorage,
  Text,ScrollView, 
  ImageBackground,
  TouchableOpacity, 
  Dimensions, 
  StyleSheet} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Colors} from '../components/colors'
import {showHighwaySingleState} from '../api/apiService';
import HighwayCircleCard from '../components/highwayCircleCard'
import { CounterContext } from "../../store";
import DisplayName from '../helpers/displayName';
import DisplayPhone from '../helpers/displayPhone';
import HeaderWithBack from '../components/headerWithBack';
import DisplayId from '../helpers/displayId';
import {Toast} from 'native-base';
import UserCard from '../components/userCard';
import { NavigationActions, StackActions } from 'react-navigation'
import Spinner from 'react-native-loading-spinner-overlay';
const screenWidth = Dimensions.get("window").width;



const ShowEngineersStateSingle = (props) => {
  const [states, setStates] = useState([]);
  const [type, setType] = useState("");
  const [userClicked, setUserClicked] = useState(false)
  const [searchValue, setSearchValue] = useState("");
  const [contracts, setContracts] = useState([]);
  const [user, setUser] = useState({});
  const [isLoading, setLoading] = useState(true)
    const { width, height } = Dimensions.get('window');
    const globalState = useContext(CounterContext); 
    const {state, dispatch } = globalState;

    const handlePress = () => {
        console.log("all")
    }
    
    
const colorDeterminant = (contract_default, int_default) => {
  if(contract_default!=undefined && int_default!=undefined){
    if(contract_default===true || int_default===true){
      return "red"
  }
  else return Colors.mainGreen;
  }
    
}
const _default = (str) => {
    if(str!=undefined){
      if(str === true){
        return "Yes"
    }
    else return "No"
    }
    
}


useEffect(() => {
    let type = props.navigation.getParam('type', null);
  setType(type)
 showHighwaySingleState(state.user.token, type).then((data)=>{
    console.log("the users data", data)
    if(data.success==true){
        setStates(data.states)
        setLoading(false)
       

    }
    else {
        setLoading(false)
        showToastWithGravity("Error getting zones")
    }
})

}, []);

const showToastWithGravity = (msg) => {
  Toast.show({
    text: msg,
    duration: 2000
  })
};

const logOut = () => {
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



const loadSpinner = isLoading ? true : false;
  return (
<View style={{flex:1}}>
<HeaderWithBack navigation={props.navigation} color="white"/>
<View style={{backgroundColor:'green', flex: 2}}>
    <ImageBackground
        style={styles.image}
        source={require('../../assets/images/unnamed2.jpg')}
    >
 
 <Text style={{
        marginTop:40,
        color:'white',
        fontFamily:'Montserrat_600SemiBold',
        fontSize:22,
        marginLeft:40}}>Hello! {state.user.user.firstName}</Text>
        <Text style={{fontSize:12,marginTop:10, marginLeft:40, color:'white', fontFamily:'Montserrat_400Regular'}}>
     List of Engineers Across In the {type}
        </Text>
        <ScrollView horizontal 
        showsHorizontalScrollIndicator={false} style={{flexDirection:'row', marginTop:-40}}>
      
         <HighwayCircleCard iconName="envelope" title="Send/Broadcast Messages" navigation={props.navigation} link="AdminMessage"/>
         {/* <HighwayCircleCard iconName="file-contract" title="View All Contracts" navigation={props.navigation} link="AllContracts"/> */}
         <HighwayCircleCard iconName="user" title="Show All Engineers" navigation={props.navigation} link="ShowAllZones"/>
     

        </ScrollView>
    </ImageBackground>
</View> 
<View style={{flex:2.6,backgroundColor:'white',
    borderTopRightRadius:40, 
    marginTop:-30}}>
    {!loadSpinner &&
    <ScrollView style={{marginTop:30}}>
    
  
            {states.map((state, index)=>(
                //   <StateCard navigation={props.navigation} title={state.projectTitle} count={`${Math.round(state.currentPercentage)}%`} type={state.state_name} littleDesc={DisplayName(state.user_assigned)} />
                <UserCard navigation={props.navigation} 
                title={state.projectTitle} 
                count={`${Math.round(state.currentPercentage)}%`}
                 type={state.state_name} name={DisplayName(state.user_assigned)}
                 phoneNumber={DisplayPhone(state.user_assigned)}
                 id={DisplayId(state.user_assigned)} />
            ))}
       
    </ScrollView>
    }
      </View>
      <Spinner
          //visibility of Overlay Loading Spinner
          visible={loadSpinner}
          //Text with the Spinner 
          textContent="loading"
          //Text style of the Spinner Text
          textStyle={styles.spinnerTextStyle}
        />
      </View>
  );
};

const styles = StyleSheet.create({
  eachCard: {
    margin:10,
    backgroundColor:'white', 
    width:150, 
    borderRadius:10,
    height:250,
    justifyContent:'center',
    shadowColor: "#000",
shadowOffset: {
width: 0,
height: 9,
},
shadowOpacity: 0.50,
shadowRadius: 12.35,

elevation: 19,
},

image: {
  height:'100%',
   resizeMode: "cover",
 
 },


    default: {
        fontSize:10,
        color:'white',
        textAlign:'center'
    },
   
  title: {
    marginTop:10, 
    marginBottom:20,
    textAlign:'center',
    color:'#095A1F',
    fontFamily:'Montserrat_400Regular', 
    fontSize:13,
    
},
state: {
    marginTop:5, 
    textAlign:'center',
    color:'#095A1F',
    fontFamily:'Montserrat_400Regular', 
    fontSize:15,
    
},
currentPercentage: {
    marginTop:10, 
    textAlign:'center',
    color:'white',
    fontFamily:'Montserrat_400Regular', 
    fontSize:37,
},


    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5fcff"
      },
    textField: {
      
        textAlign:'center',
        justifyContent:'center',
        marginLeft:'auto',
        marginRight:'auto',
        marginBottom:10,
        borderRadius:26,
        width:'90%',
        
        shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 4,
},
shadowOpacity: 0.41,
shadowRadius: 9.11,

elevation: 8,
    }
})



export default ShowEngineersStateSingle;
