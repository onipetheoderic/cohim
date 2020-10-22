export function _extensionGetter(file_name) {
    if (file_name != undefined) {
        var array = file_name.toString().split(/\.(?=[^\.]+$)/);
        if (array[1] != undefined) {
            return array[1].toLowerCase()
        }

    }

}


//A function to check for Image Extensions
export function _checkImageExtension(extension_name) {
    let all_images_extension = ['jpg', 'jpeg', 'png', 'gif', 'ico', 'bmp']
    if (all_images_extension.includes(extension_name)) {
        return true
    } else {
        return false
    }
}


//A function to check for Video Extensions
export function _checkVideoExtension(extension_name) {
    let all_videos_extension = ['mp4', 'mpeg', 'avi', 'mov', 'flv', 'wmv', 'mpeg', 'webm']
    if (all_videos_extension.includes(extension_name)) {
        return true
    } else {
        return false
    }
}
//A function to detect the necessary files needed, this is the what we are going
//to submit to the cloud
export function _overallLegitFile(extension_name){
    let all_videos_and_image_extension = ['jpg', 'jpeg', 'png', 'gif', 'ico', 'bmp','mp4', 'mpeg', 'avi', 'mov', 'flv', 'wmv', 'mpeg', 'webm']
    if (all_videos_and_image_extension.includes(extension_name)) {
        return true
    } else {
        return false
    }
}

export function fileIntelligience(fileArray){
    
    const imageFiles = [];
    const videoFiles = [];
    const neededFiles = [];
    console.log("the file int", fileArray)

    for(var k=0; k<fileArray.length; k++){
        console.log("frm interl",fileArray[k].name)
        let currentExtension = _extensionGetter(fileArray[k].name)
        if(_checkImageExtension(currentExtension)){
            console.log("Imagee", fileArray[k])
            imageFiles.push(fileArray[k])
        }
        if(_checkVideoExtension(currentExtension)){
            console.log("Video", fileArray[k])
            videoFiles.push(fileArray[k])
        }
        if(_overallLegitFile(currentExtension)){
            console.log("Neeede", fileArray[k])
            neededFiles.push(fileArray[k])
        }
        
    }
    let organiser = {
        images: imageFiles,
        videos: videoFiles,
        needed: neededFiles
    }
    return organiser;
}
