
import React, {useState, useEffect, useContext} from 'react';
import {
  View, 
  ActivityIndicator, 
  Text,ScrollView, 
  AsyncStorage,
  Platform,
  TextInput,
  ImageBackground,
  TouchableOpacity, 
  Dimensions, 
  StyleSheet} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// import { TextInput } from 'react-native-gesture-handler';
import {Colors} from '../components/colors'
import { NavigationActions, StackActions } from 'react-navigation'

import {viewAllContracts, allContractPerformanceWorksState, getUserDetail, doSearchContract} from '../api/apiService';
import HighwayCircleCard from '../components/highwayCircleCard'
import { CounterContext } from "../../store";
import Truncator from "../helpers/truncator";
import Currency from '../helpers/currency';
import ProgressCircle from 'react-native-progress-circle';
import {VictoryLabel, VictoryAxis, VictoryStack, VictoryBar, VictoryChart, VictoryTheme } from "victory-native";

const screenWidth = Dimensions.get("window").width;


const DashboardScreen = (props) => {
  const [housing, setHousing] = useState([]);
  const [national, setNational] = useState([]);
  const [works, setWorks] = useState([]);
  const [hdmi, setHdmi] = useState([]);
  const [spu, setSpu] = useState([]);
  const [userClicked, setUserClicked] = useState(false)
  const [searchValue, setSearchValue] = useState("");
  const [contracts, setContracts] = useState([]);
  const [user, setUser] = useState({});
  const [allWorksContract, setAllWorksContracts] = useState([]);
  const [allStates, setAllStates] = useState([]);
  const [isLoading, setLoading] = useState(true)
    const { width, height } = Dimensions.get('window');
    const globalState = useContext(CounterContext); 
    const {state, dispatch } = globalState;

    const handlePress = () => {
        //console.log("all")
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


//viewAllContracts

useEffect(() => {
 
  setLoading(true)

  AsyncStorage.getItem("@SessionObj")
        .then((result)=>{          
            let parsifiedResult = JSON.parse(result);
            if(parsifiedResult!=null){
              let userDetails = parsifiedResult.userDetails;
              let { user_token } = userDetails;
              // //console.log(user_token)
              getUserDetail(user_token)
              .then((data) => {
              // //console.log("userfffffl", data)
            
              setUser(data.user);
              dispatch({ type: 'newUser',payload:{user:data.user, token:user_token}})
              
              allContractPerformanceWorksState(user_token)
              .then((all_contracts) => {
                // //console.log("XXXXXXXXX", all_contracts)
                  // if(all_contracts.success==true){
                  //   //console.log("all_contracts graph", all_contracts)
                  setAllWorksContracts(all_contracts.overalls)
                  setAllStates(all_contracts.states)
                  // }                 
              })
             
              setContracts([])
              viewAllContracts(user_token).then((data) => {
                
                //console.log("all spu Datas", data.spu)
                let housingData = data.housing;
                let worksData = data.works;
                let spuData = data.spu == undefined ? [] : data.spu
                let hdmiData = data.hdmi == undefined ? [] : data.hdmi
               
                setHousing(housingData);  
                setWorks(worksData);
                setHdmi(hdmiData);
                setSpu(spuData);
                setLoading(false)
              })
          })
          }
        })

}, []);


const logOut = () => {
  console.log("the logout functions")
  setLoading(true)
  let store = async () => await AsyncStorage.removeItem('@SessionObj')
  store().then(() => {
      console.warn('Logout successfully')
      setLoading(false)
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

const setQuery = (val) => {
 
  //console.log(val.length)
  setSearchValue(val);
  let formData = new FormData();
  formData.append("query", val)
  if(val.length>=3){
    doSearchContract(formData).then((data)=>{
      //console.log(data)
      if(data.contracts.length && data.contracts.length>0){
        setContracts(data.contracts)
      }
      else{
        setContracts([])
      }
     
    })
  }
}
const isWorksPresent = works.length > 0 ? true : false
const isSpuPresent = spu.length > 0 ? true : false
const isHousingPresent = housing.length > 0 ? true : false;
const isHdmiPresent = hdmi.length > 0 ? true : false;
//allNewlyAwardedVals, allOngoingVals, allCompletedVals
const isAllWorksContractPresent = allWorksContract.length > 0 ? true : false;

let newlyAwarded = allWorksContract[0];
let ongoingContract = allWorksContract[1];
let completedContract = allWorksContract[2];



if (isLoading) {
  return (
    <View style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ActivityIndicator size="large" color="#07411D" />
    </View>
  )
}  
  return (
<View style={{flex:1}}>
<View style={{backgroundColor:'green', flex: 2}}>
    <ImageBackground
        style={styles.image}
        source={require('../../assets/images/unnamed2.jpg')}
    >
    <View style={{marginTop:Platform.OS === 'android' ? 10 : 30, marginRight:13, alignItems:'flex-end'}}>
      <TouchableOpacity onPress={()=>setUserClicked(!userClicked)}>
      <FontAwesome5 name="user" size={20} color="white" />
      </TouchableOpacity>
    
    {userClicked &&
   
      <TouchableOpacity onPress={()=>logOut()} style={{
        borderRadius:7,
      backgroundColor:'white',
      top:15, width:60, height:30, left:10,
      justifyContent:'center'}}>
          <Text style={{color:'black', fontFamily:'Poppins_400Regular', textAlign:'center'}}>Logout</Text>
              
      </TouchableOpacity>
      
      }
    </View>
      <Text style={{
        marginTop:15,
        color:'white',
        fontWeight:'bold', 
        fontSize:22,
        marginLeft:40}}>Hello! {user.firstName}</Text>
        <Text style={{fontSize:12,marginTop:10, marginLeft:40, color:'white', fontFamily:'Poppins_400Regular'}}>
        Welcome to your Dashboard. You can perform Administrative Tasks from here. Click the Menu below
        </Text>
        <ScrollView horizontal 
        showsHorizontalScrollIndicator={false} 
        style={{flexDirection:'row', marginLeft:10,marginTop:-40}}>
      
         <HighwayCircleCard iconName="envelope" title="Send/Broadcast Messages" navigation={props.navigation} link="AdminMessage"/>
         {/* <HighwayCircleCard iconName="file-contract" title="View All Contracts" navigation={props.navigation} link="AllContracts"/> */}
         <HighwayCircleCard iconName="user" title="Show All Engineers" navigation={props.navigation} link="ShowAllZones"/>
     

        </ScrollView>
    </ImageBackground>
</View> 
<View style={{flex:2.6,backgroundColor:'white',
    borderTopRightRadius:40, 
    marginTop:-30,
    borderTopLeftRadius:40,}}>
    
    <ScrollView style={{marginTop:30}}>
    <Text style={{fontFamily:'Poppins_400Regular',fontSize:13,alignSelf:'center', margin:6}}>Works Contract Performance Across Nigeria</Text>
    <View style={{flexDirection:'row', justifyContent:'space-evenly'}}>
          <View style={{backgroundColor:"#69F409"}}>
            <Text style={{fontFamily:'Poppins_400Regular',fontSize:10, margin:6}}>Newly Awarded</Text>
          </View>
          <View style={{backgroundColor:"#C4D914"}}>
            <Text style={{fontFamily:'Poppins_400Regular',fontSize:10, margin:6}}>Ongoing Contract</Text>
          </View>
          <View style={{backgroundColor:"#0BB434"}}>
            <Text style={{fontFamily:'Poppins_400Regular',fontSize:10, margin:6}}>Completed Contract</Text>
          </View>
        </View>
      <ScrollView style={{marginTop:-50, marginLeft:-20}} horizontal showsHorizontalScrollIndicator={false}>
     
      <VictoryChart
         
          height={400}
          width={1400}
          domainPadding={{x: 10, y: 10 }}
          minDomain={{ y: 0 }}
       
          >
{isAllWorksContractPresent &&
  <VictoryStack
  colorScale={["#0BB434", "#C4D914", "#69F409"]}
>
  <VictoryBar
    data={completedContract}
    />
  <VictoryBar
    data={ongoingContract}
  />
  <VictoryBar    
    data={newlyAwarded}
  />
  {/* ongoing = #C4D914, completed=#0BB434  newlyAwarded = #69F409*/}
</VictoryStack>    
}
<VictoryAxis 
tickFormat={allStates} 
style={{
  axis: {stroke: "white"},
  axisLabel: {fontSize: 20, padding: 10},
  tickLabels: {fontSize: 10, padding: 5}
}}
/>
</VictoryChart>

        {/* <VictoryChart domainPadding={0} width={1050} height={300}
        theme={VictoryTheme.material}>
          <VictoryBar
            cornerRadius={10}
           
          barRatio={0.6}
          data={data} x="state" y="earnings" 
          style={{ data: { fill: Colors.mainGreen,
          stroke: Colors.primaryGreen,strokeWidth: 1 }}}/>
        </VictoryChart> */}
       
      </ScrollView>
      <View style={{marginVertical:30}}>
        <View style={styles.textField}>
            <TextInput
             placeholderTextColor={Colors.mainGreen} 
                placeholder="Search Contracts"
                value={searchValue}
                underlineColorAndroid="transparent"
                style={{marginLeft:25, marginTop:3,fontFamily:'Poppins_400Regular'}}
                onChangeText={(value) => {
                    setQuery(value)                   
                }}
            />
        </View>
        {contracts.map((data,index)=>(
         <TouchableOpacity 
         onPress={() => props.navigation.navigate('SingleContractPage', {
          id: data._id,
          title: data.projectTitle,
          type_of_project: data.contractType
        })}>
            <View style={{marginTop:10,borderBottomWidth:1,height:70,
              justifyContent:'center',
              marginLeft:'auto', marginRight:'auto',width:'80%',
            borderBottomColor:'rgb(202, 207, 210)'}}>
              <Text style={{textAlign:'center',fontSize:14, fontFamily:'Poppins_400Regular'}}>{data.projectTitle}, {data.contractType}</Text>
            </View>
        </TouchableOpacity>
        ))}
       
      </View>
{isWorksPresent &&
      <View style={{marginLeft:10, marginVertical:10}}>
      <Text style={{fontFamily:'Poppins_400Regular', fontSize:14}}>Latest Works Contracts Across Nigeria</Text>
      </View>
      }
      <ScrollView horizontal>
          {works.map((contract) => (
               <TouchableOpacity onPress={() => props.navigation.navigate('SingleContractPage', {
                id: contract.id,
                title: contract.project_title,
                type_of_project: contract.type
              })}>
                <View style={[styles.eachCard]}>
            <Text style={styles.title}>{Truncator(contract.title, 45)}</Text>
             
              <View style={{alignSelf:'center'}}>
              <ProgressCircle
            percent={contract.current_percentage}
            radius={40}
            borderWidth={5}
            color={colorDeterminant(contract.contractor_default,contract.internal_default)}
            shadowColor="#F2F5F3"
            bgColor="#fff"
            containerStyle={{shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 9,
            },
            shadowOpacity: 0.50,
            shadowRadius: 12.35,
            
            elevation: 19,}}
        >
            <Text style={{ fontSize: 18, fontFamily:'Poppins_400Regular' }}>
              {Math.round(contract.current_percentage)}%</Text>
        </ProgressCircle>
        </View>
        <Text style={styles.state}>{Currency(contract.contract_sum)}</Text>
        <Text style={styles.state}>{Truncator(contract.contractor_name, 20)}</Text>
        <Text style={styles.title}>{contract.state}</Text>
            </View>
           
            </TouchableOpacity>
          ))}
        </ScrollView>
{isHousingPresent &&
        <View style={{marginLeft:10, marginVertical:10}}>
      <Text style={{fontFamily:'Poppins_400Regular', fontSize:14}}>Latest Housing Contracts Across Nigeria</Text>
      </View>
      }
      <ScrollView horizontal>
          {housing.map((contract) => (
                <TouchableOpacity onPress={() => props.navigation.navigate('SingleContractPage', {
                 id: contract.id,
                 title: contract.project_title,
                 type_of_project: contract.type
               })}>
                 <View style={[styles.eachCard]}>
             <Text style={styles.title}>{Truncator(contract.title, 45)}</Text>
              
               <View style={{alignSelf:'center'}}>
               <ProgressCircle
             percent={contract.current_percentage}
             radius={40}
             borderWidth={5}
             color={colorDeterminant(contract.contractor_default,contract.internal_default)}
             shadowColor="#F2F5F3"
             bgColor="#fff"
             containerStyle={{shadowColor: "#000",
             shadowOffset: {
               width: 0,
               height: 9,
             },
             shadowOpacity: 0.50,
             shadowRadius: 12.35,
             
             elevation: 19,}}
         >
             <Text style={{ fontSize: 18, fontFamily:'Poppins_400Regular' }}>
               {Math.round(contract.current_percentage)}%</Text>
         </ProgressCircle>
         </View>
         <Text style={styles.state}>{Currency(contract.contract_sum)}</Text>
         <Text style={styles.state}>{Truncator(contract.contractor_name, 20)}</Text>
         <Text style={styles.title}>{contract.state}</Text>
             </View>
            
             </TouchableOpacity>
          ))}

        </ScrollView>


        {isSpuPresent &&
      <View style={{marginLeft:10, marginVertical:10}}>
      <Text style={{fontFamily:'Poppins_400Regular', fontSize:14}}>Latest SPU Contracts Across Nigeria</Text>
      </View>
      }
      <ScrollView horizontal>
          {spu.map((contract) => (
               <TouchableOpacity onPress={() => props.navigation.navigate('SingleContractPage', {
                id: contract.id,
                title: contract.project_title,
                type_of_project: contract.type
              })}>
                <View style={[styles.eachCard]}>
            <Text style={styles.title}>{Truncator(contract.title, 45)}</Text>
             
              <View style={{alignSelf:'center'}}>
              <ProgressCircle
            percent={contract.current_percentage}
            radius={40}
            borderWidth={5}
            color={colorDeterminant(contract.contractor_default,contract.internal_default)}
            shadowColor="#F2F5F3"
            bgColor="#fff"
            containerStyle={{shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 9,
            },
            shadowOpacity: 0.50,
            shadowRadius: 12.35,
            
            elevation: 19,}}
        >
            <Text style={{ fontSize: 18, fontFamily:'Poppins_400Regular' }}>
              {Math.round(contract.current_percentage)}%</Text>
        </ProgressCircle>
        </View>
        <Text style={styles.state}>{Currency(contract.contract_sum)}</Text>
        <Text style={styles.state}>{Truncator(contract.contractor_name, 20)}</Text>
        <Text style={styles.title}>{contract.state}</Text>
            </View>
           
            </TouchableOpacity>
          ))}
        </ScrollView>

        {isHdmiPresent &&
      <View style={{marginLeft:10, marginVertical:10}}>
      <Text style={{fontFamily:'Poppins_400Regular', fontSize:14}}>Latest HDMI Contracts Across Nigeria</Text>
      </View>
      }
      <ScrollView horizontal>
          {hdmi.map((contract) => (
               <TouchableOpacity onPress={() => props.navigation.navigate('SingleContractPage', {
                id: contract.id,
                title: contract.project_title,
                type_of_project: contract.type
              })}>
                <View style={[styles.eachCard]}>
            <Text style={styles.title}>{Truncator(contract.title, 45)}</Text>
             
              <View style={{alignSelf:'center'}}>
              <ProgressCircle
            percent={contract.current_percentage}
            radius={40}
            borderWidth={5}
            color={colorDeterminant(contract.contractor_default,contract.internal_default)}
            shadowColor="#F2F5F3"
            bgColor="#fff"
            containerStyle={{shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 9,
            },
            shadowOpacity: 0.50,
            shadowRadius: 12.35,
            
            elevation: 19,}}
        >
            <Text style={{ fontSize: 17, fontFamily:'Poppins_400Regular' }}>
              {Math.round(contract.current_percentage)}%</Text>
        </ProgressCircle>
        </View>
        <Text style={styles.state}>{Currency(contract.contract_sum)}</Text>
        <Text style={styles.state}>{Truncator(contract.contractor_name, 20)}</Text>
        <Text style={styles.title}>{contract.state}</Text>
            </View>
           
            </TouchableOpacity>
          ))}
        </ScrollView>




      </ScrollView>
      </View>

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
    marginTop:15, 
    marginBottom:10,
    textAlign:'center',
    color:'#095A1F',
    fontFamily:'Poppins_400Regular', 
    fontSize:12,
    
},
state: {
    marginTop:5, 
    textAlign:'center',
    color:'#095A1F',
    fontFamily:'Poppins_400Regular', 
    fontSize:14,
    
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
        height:50,
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



export default DashboardScreen;
