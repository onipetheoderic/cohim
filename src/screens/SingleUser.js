
import React, {useState, useEffect, useContext} from 'react';
import {
  View, 
  ActivityIndicator, 
  Text,ScrollView, 
  ImageBackground,
  Dimensions, 
  BackHandler,
  Image, 
  StyleSheet} from 'react-native';

import {Colors} from '../components/colors'
import {engineerProfileDetails, showHighwaySingleState, getUserDetail, doSearchContract} from '../api/apiService';
import { CounterContext } from "../../store";
import ContractCard from '../components/contractCard';
import Accordion from '../components/accordion';
import {Toast} from 'native-base';
const screenWidth = Dimensions.get("window").width;


const SingleUser = (props) => {
    const [states, setStates] = useState([]);

    const [userClicked, setUserClicked] = useState(false)
    const [searchValue, setSearchValue] = useState("");
    const [contracts, setContracts] = useState([]);
    const [user, setUser] = useState({});
    const [user_summary, setUserSummary] = useState({})
    const [contract_summary, setContractSummary] = useState({})
    const [contracts_all, setContractAll] = useState([])
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

/*
 user, 
contracts:contracts, 
contract_summary:contract_summary

 contract_count: contracts.length,
contract_videos_count: contract_videos.length,
contract_images_count: contract_images.length,
workers_count: user_workers.length
*/ 
//contract_count, contract_videos_count, contract_images_count, workers_count

useEffect(() => {
    let id = props.navigation.getParam('id', null);
    console.log("the types",id )
    engineerProfileDetails(state.user.token, id).then((data)=>{
       console.log("SingleVVVVV", data)
       if(data.success==true){
           
        setUserSummary(data.user);
        setContractSummary(data.contract_summary);
        setContractAll(data.contracts)
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


const {
    contract_count, 
    contract_videos_count, 
    contract_images_count, 
    workers_count } = contract_summary;


const arrayfiedContractSummary = [
    {question: "Number of Contracts Inspecting", answer: contract_count},
    {question: "Number of Videos Uploaded", answer: contract_videos_count},
    {question: "Number of Images Uploaded", answer: contract_images_count},
    {question: "Number of Employees Under Engineer", answer: workers_count}
]

//"email": "f.alawal@cohims.com", "firstName": "F.A LAWAL", 
//"phoneNumber": "0", "position": "7", "role": 7, "section
const {
    email,
    firstName,
    phoneNumber,
    section
} = user_summary;
const arrayfiedUserSummary = [
    {question: "email", answer: email},
    {question: "Name", answer: firstName},
    {question: "Phone Number", answer: phoneNumber},
    {question: "Section", answer: section}
]

if (isLoading) {
  return (
    <View style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ActivityIndicator size="large" color="#07411D" />
    </View>
  )
}  
  return (
<View style={{flex:1}}>
<View style={{backgroundColor:'green', flex: 2, borderBottomWidth:4, borderBottomColor:'green'}}>
    <ImageBackground
        style={styles.image}
        source={require('../../assets/images/avatarbg4.jpg')}
    >
    
       
        <ScrollView horizontal 
        showsHorizontalScrollIndicator={false} style={{flexDirection:'row', marginTop:-40}}>
           

        </ScrollView>
    </ImageBackground>
    </View>
    <View style={{flex:5}}>
    <Image source={require('../../assets/images/avatar.png')} style={styles.avatar}/>
        <ScrollView>
            <Text style={{fontSize:16,alignSelf:'center',color:'black', fontFamily:'Poppins_400Regular'}}>
               {user_summary.firstName}
                </Text>
            <Text style={{fontSize:13,alignSelf:'center',color:'#758177', fontFamily:'Poppins_400Regular'}}>
                {user_summary.section} Sector Nigeria
            </Text>
            <Accordion 
            questions={arrayfiedUserSummary}
            title="User Summary"
            description="Quick Summary of User Details"
            />

            <Accordion 
            questions={arrayfiedContractSummary} 
            title="Contract Summary" 
            description="Quick Summary of the Users Contracts Activities"
            />
             <Text style={{fontSize:15, fontWeight:'500', alignSelf:'center',
             color:'#758177', marginBottom:10,marginTop:20, fontFamily:'Poppins_400Regular'}}>
                Contracts Assigned to {user_summary.firstName}
            </Text>
       
            {contracts_all.map((state, index)=>(
              
                <ContractCard 
                    title={state.projectTitle} 
                    count={`${Math.round(state.currentPercentage)}%`}
                    amount_certified_to_date={state.amountCertifiedToDate}
                    contract_sum={state.contractSum}
                    type={state.state}
                    zone={state.zone}
                    date_awarded={state.dateAwarded}
                    date_completion={state.dateCompletion}
                    project_length={state.projectLength}
                    monthly_operational_cost={state.monthly_operational_cost}
                 />
            ))}
    </ScrollView>

    </View>

</View>
  );
};

const styles = StyleSheet.create({
avatar: {
    width:120,
    alignSelf:'center',
    marginTop:-60,
    height:120,
    borderRadius:60,
    borderColor:'green',
    borderWidth:4, 
    backgroundColor:'white'
},
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
    fontFamily:'Poppins_400Regular', 
    fontSize:13,
    
},
state: {
    marginTop:5, 
    textAlign:'center',
    color:'#095A1F',
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



export default SingleUser;
