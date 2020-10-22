export default function currency(x) {
    if(x!=undefined && x!=null){
        return "₦"+x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    else return;
    
}
  