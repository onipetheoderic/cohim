export default function truncator(str, length) {
    if(str!=undefined && length!=undefined){
        var trimmedString = str.substr(0, length);
        return trimmedString + ".."
    }
   
}