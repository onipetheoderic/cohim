export function MonthGetter(date) {
    //expecting date to be in this format 2020-07-25T12:02:53.876Z
    if(date!=undefined){
    let neededDate = date.split("T")[0].toString();
    let monthNames = [
       "January","February", "March", "April", "May", "June", "July",
       "August", "September", "October", "November", "December"
   ]
   let neededMonth = neededDate.split("-")[1]
   console.log(monthNames[parseInt(neededMonth-1)])
   return monthNames[parseInt(neededMonth-1)]
}
else return;
}

export function DayGetter(date) {
    if(date!=undefined){
        let neededx = date.split("T")[0]
        return neededx.split("-")[2]
    }
    else return;
   
   
}
