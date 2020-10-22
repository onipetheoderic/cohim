export function MonthGetter(date) {
    //expecting date to be in this format 2020-07-25T12:02:53.876Z
    
    let neededDate = date.split("T")[0].toString();
    let monthNames = [
       "January","February", "March", "April", "May", "June", "July",
       "August", "September", "October", "November", "December"
   ]
   let neededMonth = neededDate.split("-")[1]
   console.log(monthNames[parseInt(neededMonth-1)])
   return monthNames[parseInt(neededMonth-1)]
}

export function DayGetter(date) {
    
    let neededx = date.split("T")[0]
    return neededx.split("-")[2]
   
}
