function zeroChecker(components){
    console.log("the compon",components)
    let falsyVals = [];
    let componentLength = components.length;
    for(var i=0; i<components.length; i++){
        if(components[i].unit==0){
            console.log(components[i].unit)
            falsyVals.push(1)
        }
    }   
    let percentageFalsy = (falsyVals.length/componentLength)*100
    if(percentageFalsy>=50){
        return {status:true, msg:"Too many Empty Fields, Cant be Saved"}
        
    }
   if(percentageFalsy<50){
    return {status:false}
   }
}


export default zeroChecker