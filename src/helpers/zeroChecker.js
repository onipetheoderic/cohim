function zeroChecker(components,title){
    let falsyVals = [];
    console.log("the componentsssss", components)
    for(var i=0; i<components.length; i++){
        console.log("UUUUUUUUUU",components[i].amount)
        if(components[i].amount==0){
            console.log(components[i].amount)
            falsyVals.push(1)
        }
    }
    console.log("XXXXXXXX",falsyVals, falsyVals.length)
    if(title.length<=5){
        return {status:true, msg:"Check Title Field, it must be more than 6 characters"}
    }
    if(falsyVals.length>=30){
        return {status:true, msg:"Too many Empty Fields, minimum of 30 rows must be populated"}
        
    }
   if(falsyVals.length<30){
    return {status:false}
   }
}


export default zeroChecker