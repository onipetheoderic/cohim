export default function underscoreFormatter(str){
    if(str!=undefined){
        let new_str = str.toUpperCase();
        return new_str.replace(/_/g, ' ');
    }
    
}