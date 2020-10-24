import React, {useState, useEffect} from 'react';

import {
  StyleSheet,
  View,
  Text,
  
  Dimensions,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import PlayGround from '../components/playGround'
import HeaderWithBack from '../components/headerWithBack';
import {uploadInspectionDatasheet} from '../api/apiService';
import {Colors} from '../components/colors'
import NumericInput from 'react-native-numeric-input'
import UnderscoreFormatter from '../helpers/underscoreFormatter';


const HighwayMenu = (props) => {    
    const { width, height } = Dimensions.get('window');
    const [length, changeLength] = useState(0)
    const [id, changeId] = useState("")
    const [title, changeTitle] = useState("")
    const [type, changeType] = useState("");
    
    const [all_datas, changeAllDatas] = useState({})
    const [parameters, changeParameters] = useState({})

    useEffect(() => {   
        let id = props.navigation.getParam('id', null)
        let title = props.navigation.getParam('title', null) 
        let type = props.navigation.getParam('type', null)
        changeId(id)
        changeTitle(title)
        changeType(type)    
    
        uploadInspectionDatasheet(id, type).then((data)=>{
     
            changeLength(data.length)
            if(data.new===false && type=="housing"){             
                changeAllDatas(data.data)  
                changeParameters(data.parameters)             
            }
        })
        
    }, []);


// console.log("all datasssss", all_datas)
console.log("all parameters", parameters)

const handleChange = (targetName, value) => {
    changeAllDatas(prevState=>({
        ...prevState, [targetName]:value
    }))
}
//...state, selectedItems: action.payload.myArray2, 
const handleChangeTwo = (index, value) => {
    console.log("handleTwo params",index, value)
    let dup_array = parameters.parameters==undefined?parameters:parameters.parameters
    // let dup_array = parameters
    console.log("current",dup_array[index].component_score)
    dup_array[index].component_score = dup_array[index].component_score+1;
    changeParameters(prevState=>({
        parameters:dup_array
    }))
}


let parametersAbsent = !Object.keys(parameters).length;
let allParameters = parameters.parameters==undefined?parameters:parameters.parameters
console.log("HJJJJJ", allParameters)
console.log("list of params",parametersAbsent)

function underscoreFormatter(str){
    let new_str = str.toUpperCase();
    return new_str.replace(/_/g, ' ');
}

  return (
    <>
       <HeaderWithBack navigation={props.navigation} />
<PlayGround home={true} navigation={props.navigation} title="Highway Inspection Portal" height={height} width={width} navigate={props.navigation.navigate}>
<Text style={{marginBottom:20, textAlign:'center', fontSize:17, marginVertical:10}}>{length}km</Text>

        <View style={{flexDirection:'row', marginLeft:20}}>
            <Text style={{marginTop:6, fontFamily:'Poppins_400Regular', fontSize:15}}>
                plumbing
            </Text>
            <NumericInput value={all_datas.plumbing} onChange={value => handleChange("plumbing", value)}/>
        </View>
    {!parametersAbsent &&
        <View>
        {allParameters.map((params, index) => (
            <View style={{flexDirection:'row', marginLeft:20}}>
                <Text style={{marginTop:6, fontFamily:'Poppins_400Regular', fontSize:15}}>
                {underscoreFormatter(params.component_name)}
                </Text>
               <Text>{params.component_score}</Text>
                <TouchableOpacity onPress={()=>handleChangeTwo(index,params.component_score)}>
                <Text>Increment</Text>
                </TouchableOpacity>
            </View>   
        ))}
        </View>
        }
        
         
         
            

</PlayGround>
    
      
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
    textField: {
      
        textAlign:'center',
        justifyContent:'center',
        marginLeft:'auto',
        marginRight:'auto',
        borderRadius:26,
        width:'85%',
        
        shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 4,
},
shadowOpacity: 0.41,
shadowRadius: 9.11,
elevation: 8,
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