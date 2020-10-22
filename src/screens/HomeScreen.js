
import React, {useContext} from 'react';
import { CounterContext } from "../../store";
import {
  View,
  Dimensions,
} from 'react-native';

import {Foods} from '../api/foods';
import FoodCard from '../components/foodCard'

import PlayGround from '../components/playGround'


const App = (props) => {
    
    const { width, height } = Dimensions.get('window');
   
  return (
    <>
      
<PlayGround home={true} navigation={props.navigation} title="New Product" height={height} width={width} navigate={props.navigation.navigate}>
        
         <View style={{flexDirection:'row',marginTop:20,marginBottom:100, justifyContent:'space-evenly', flexWrap:'wrap'}}>
         {Foods.map((food, index) => (
            <FoodCard navigation={props.navigation} key={food.id} id={food.id} name={food.name} price={food.price} image={food.image} description={food.description}/>
         ))}
    
      </View>
      </PlayGround>
  </>
  );
};



export default App;
