import React, {useState, useEffect} from 'react';

import {
  StyleSheet,
  ScrollView,
  AsyncStorage,
  View,
  Text,
  Dimensions,
} from 'react-native';
import PlayGround from '../components/playGround'
import HeaderWithBack from '../components/headerWithBack';
import { DatasheetPost} from '../api/apiService';
import {Colors} from '../components/colors'
import * as DocumentPicker from 'expo-document-picker';
import SaveButton from '../components/saveButton';
import {Toast} from 'native-base';


const HighwayMenu = (props) => {    
    const { width, height } = Dimensions.get('window');
    const [token, setToken] = useState("");
    const [contractId, setContractId] = useState("");
    const [type, setType] = useState("")
    const [title, setTitle] = useState("")
    const [length, changeLength] = useState(0)
    const [id, setId] = useState("")
    const [all_datas, changeAllDatas] = useState({})
    const [datasheet, setDatasheetObj] = useState({})
    const [savedDatasheet, setSavedDatasheet] = useState([]);
    const [image, setFile] = useState([]);
    
   //let get a single datasheet
    useEffect(() => {
        let datasheet = props.navigation.getParam('datasheet', null)
        let title = props.navigation.getParam("title", null)
        let contractId = props.navigation.getParam("contractId",null)
        let token = props.navigation.getParam('token', null)
        console.log("ddddddtoken",datasheet)
        setDatasheetObj(datasheet)
        setTitle(title)
        setContractId(contractId)
        setToken(token)
        let session = async () => await AsyncStorage.getItem('@SessionObj')    
        session().then((val) => {
            if (val) {
            let sess = JSON.parse(val)
                setToken(sess.user_token)
            }
        })

       
      
       
                
    }, []);

    MultipleUploader = async () => {
    
        try {
            const results = await DocumentPicker.pickMultiple({
              type: [DocumentPicker.types.images],
            });
            console.log("this iis ithe result",results)
            // for (const res of results) {
            //   console.log(
            //     res.uri,
            //     res.type, // mime type
            //     res.name,
            //     res.size
            //   );
            // }
            setFile(results);
          } catch (err) {
            if (DocumentPicker.isCancel(err)) {
              // User cancelled the picker, exit any dialogs or menus and move on
            } else {
              throw err;
            }
          }    
    }

    const submitDatasheet = () => {
        let component = {components:datasheet.components.components}
        
        console.log("the YYYYYYYYYYYYY component", JSON.stringify(component.components))
        console.log("OOOOOO",datasheet.latitude)
        console.log("OOOOOOO",datasheet)
        let payload = [
            {name: "contract_id", data: contractId.toString()},
            {name: "contract_name", data:title.toString()},
            {name:"contract_type", data:datasheet.type.toString()},
            {name:"longitude", data:datasheet.longitude.toString()},
            {name:"latitude", data:datasheet.latitude.toString()},
            {name:"date_uploaded", data:datasheet.date.toString()},
            {name: "components", data: JSON.stringify(component.components)},
        ];
        for(var i in image){
            let eachcontent = {name : 'image', filename : image[i].name, type:image[i].type}        
            payload.push(eachcontent)
        }
        console.log(payload)
        DatasheetPost(token, payload)
        .then((data) => {
            console.log("succeeesosos", data)
            if(data.success==false){
                showToastWithGravity(data.message)
            }
            else if(data.success==true) {
                showToastWithGravity(data.message)
                props.navigation.navigate(HighwayMenu)
            }               
        }
        )
    }

    const showToastWithGravity = (msg) => {
        Toast.show({
          text: msg,
          duration: 2000
        })
      };


    function underscoreFormatter(str){
        if(str!=undefined){
            let new_str = str.toUpperCase();
            return new_str.replace(/_/g, ' ');
        }
        else return str      
    }
    console.log("PPPPPPPP", datasheet)


    let datasheetAbsent = !Object.keys(datasheet).length;

  return (
    <>
      
<PlayGround home={true} navigation={props.navigation} title={title} height={height} width={width} navigate={props.navigation.navigate}>
<Text style={{fontFamily:'Poppins_400Regular', textAlign:'center', fontSize:16, margin:10}}>Datasheet component saved by you</Text>

    {!datasheetAbsent &&
    <View style={{marginBottom:70}}>
        {datasheet.components.components.map((savedDatasheet, index) => (
           
            <View style={styles.cardStyle} key={savedDatasheet.id}>
                <View style={{marginLeft:20, flexDirection:'row', justifyContent:'space-between'}}>
                <Text style={{fontFamily:'Poppins_400Regular', fontSize:14, color:'white'}}>{underscoreFormatter(savedDatasheet.component_name)}</Text>
                <Text style={{marginRight:20, fontFamily:'Poppins_400Regular', fontSize:18}}>{savedDatasheet.component_score}km</Text>
                </View>
            </View>
           
        ))}
        <SaveButton title="Attach Images" handleSubmit={()=>MultipleUploader()}/>
        <SaveButton title="Upload Datasheet" handleSubmit={()=>submitDatasheet()}/>
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

    cardStyle: {
        marginVertical:10,
        backgroundColor:'green',
        width:'93%',
        justifyContent:'center',
        alignSelf:'center',
        height:80,
        shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 2,
},
shadowOpacity: 0.25,
shadowRadius: 3.84,

elevation: 5,

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

