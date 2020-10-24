import {baseUrl} from './constants';

export async function allAssignedContracts(token) {
    try {
        let feeds = await fetch(`${baseUrl}all_assigned_contract`, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        let result = await feeds.json();

        feeds = null;
        return result;
    } catch (e) {
        console.warn(e.message)
    }
}



export async function getSingleContract(id, type) {
    console.log("Details sent",id, type)
    console.log(`${baseUrl}get_single_contract/${id}/${type}`)
    try {
        let feeds = await fetch(`${baseUrl}get_single_contract/${id}/${type}`, {
            headers: {
                'Accept': 'application/json'
            }
        });
        let result = await feeds.json();

        feeds = null;
        return result;
    } catch (e) {
        console.warn(e.message)
    }
}
//usersInSection
//get_user_details
export async function getUserDetail(userToken) {
    try {
        let feeds = await fetch(`${baseUrl}get_user_details`, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${userToken}`
            }
        });
        let result = await feeds.json();

        feeds = null;
        return result;
    } catch (e) {
        console.warn(e.message)
    }
}
export async function usersInSection(userToken) {
    try {
        let feeds = await fetch(`${baseUrl}users_in_section`, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${userToken}`
            }
        });
        let result = await feeds.json();

        feeds = null;
        return result;
    } catch (e) {
        console.warn(e.message)
    }
}


export async function viewAllMessages(userToken) {
    try {
        let feeds = await fetch(`${baseUrl}view_all_messages`, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${userToken}`
            }
        });
        let result = await feeds.json();

        feeds = null;
        return result;
    } catch (e) {
        console.warn(e.message)
    }
}

export async function getAllSections(userToken) {
    try {
        let feeds = await fetch(`${baseUrl}get_all_sections`, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${userToken}`
            }
        });
        let result = await feeds.json();

        feeds = null;
        return result;
    } catch (e) {
        console.warn(e.message)
    }
}

//hdmi_verify_code_post
export async function hdmiVerifyCodePost(formData, userToken) {    
    try {
        let feeds = await fetch(`${baseUrl}hdmi_verify_code_post`, {
            method: 'post',
            body: formData,
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${userToken}`
            }
        });
        let result = await feeds.json();
        console.log("loggi", result)
        feeds = null;
        return result;
    } catch (e) {
        console.warn(e.message)
    }
}


export async function datasheetHousingPost(formData, userToken, id, type) {
    try {
        let feeds = await fetch(`${baseUrl}upload_datasheet_document_house/${id}/${type}`, {
            method: 'post',
            body: formData,
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${userToken}`
            }
        });
        let result = await feeds.json();
        console.log("loggi", result)
        feeds = null;
        return result;
    } catch (e) {
        console.warn(e.message)
    }
}


export async function datasheetRoadBridgePost(formData, userToken) {   
    
    try {
        let feeds = await fetch(`${baseUrl}datasheet_road_bridge_post`, {
            method: 'post',
            body: formData,
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${userToken}`
            }
        });
        let result = await feeds.json();
        console.log("loggi", result)
        feeds = null;
        return result;
    } catch (e) {
        console.warn(e.message)
    }
}
//show_all_zones_page
//show_all_highway_in_state
//show_all_highway_in_state_single
//engineer_profile_page
//all_contract_performance_works_states

export async function allContractPerformanceWorksState(userToken) {   
    
    try {
        let feeds = await fetch(`${baseUrl}all_contract_performance_works_states`, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${userToken}`
            }
        });
        let result = await feeds.json();
        
        feeds = null;
        return result;
    } catch (e) {
        console.warn(e.message)
    }
}

export async function engineerProfileDetails(userToken, id) {   
    
    try {
        let feeds = await fetch(`${baseUrl}engineer_profile_page/${id}`, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${userToken}`
            }
        });
        let result = await feeds.json();
        
        feeds = null;
        return result;
    } catch (e) {
        console.warn(e.message)
    }
}
export async function showHighwaySingleState(userToken,type) {   
    
    try {
        let feeds = await fetch(`${baseUrl}show_all_highway_in_state_single/${type}`, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${userToken}`
            }
        });
        let result = await feeds.json();
        
        feeds = null;
        return result;
    } catch (e) {
        console.warn(e.message)
    }
}


export async function showHighwayAllZones(userToken,type) {   
    
    try {
        let feeds = await fetch(`${baseUrl}show_all_highway_in_state/${type}`, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${userToken}`
            }
        });
        let result = await feeds.json();
        
        feeds = null;
        return result;
    } catch (e) {
        console.warn(e.message)
    }
}


export async function showAllZones(userToken) {   
    
    try {
        let feeds = await fetch(`${baseUrl}show_all_zones_page`, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${userToken}`
            }
        });
        let result = await feeds.json();
        
        feeds = null;
        return result;
    } catch (e) {
        console.warn(e.message)
    }
}

//send_msg_to_sections, get_all_sections broadcast_msg_to_all_users

export async function sendMsgToSection(formData, userToken) {   
    
    try {
        let feeds = await fetch(`${baseUrl}send_msg_to_sections`, {
            method: 'post',
            body: formData,
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${userToken}`
            }
        });
        let result = await feeds.json();
        console.log("loggi", result)
        feeds = null;
        return result;
    } catch (e) {
        console.warn(e.message)
    }
}

/*
const message = {
  data: {
    type: 'warning',
    content: 'A new weather warning has been created!',
  },
  topic: 'weather',
};
*/ 

// send_msg_to_single_user
export async function sendMsgToSingleUser(rawData){
    // send_msg_to_topic
    console.log("the raw data")
    try {
        let feeds = await fetch(`${baseUrl}send_msg_to_single_user`, {
            method: 'post',
            body: rawData,
            headers: {
                'Content-type': 'application/json',
            }
        });
        console.log("ressss",feeds)
        let result = await feeds;

        feeds = null;
        return result;
    } catch (e) {
        console.warn(e.message)
    }
}

export async function sendMsgToTopic(rawData){
    // send_msg_to_topic
    console.log("the raw data")
    try {
        let feeds = await fetch(`${baseUrl}send_msg_to_topic`, {
            method: 'post',
            body: rawData,
            headers: {
                'Content-type': 'application/json',
            }
        });
        console.log("ressss",feeds)
        let result = await feeds;

        feeds = null;
        return result;
    } catch (e) {
        console.warn(e.message)
    }
}

export async function fireBaseNotification(rawData) {
    try {
        let feeds = await fetch(`https://fcm.googleapis.com/fcm/send`, {
            method: 'post',
            body: rawData,
            headers: {
                'Content-type': 'application/json',
                'Authorization': "key=AAAADX25ItA:APA91bFC8TBFRz0rHMZg95AiM3F3BnFCEYOOv_1yE3Vi1p7fepA9Owzt4mTaJQTTeH8dw_4_NowAAt8XoJCbdb4KGciyLNNe3RqQibzlavOshAPuFuFTtLzm9bwlwrmeVaO6PcBRlcCz"
            }
        });
        console.log("ressss",feeds)
        let result = await feeds;

        feeds = null;
        return result;
    } catch (e) {
        console.warn(e.message)
    }
}


export async function BroadcastMsgToAllUsers(formData, userToken) {   
    
    try {
        let feeds = await fetch(`${baseUrl}broadcast_msg_to_all_users`, {
            method: 'post',
            body: formData,
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${userToken}`
            }
        });
        let result = await feeds.json();
        console.log("loggi", result)
        feeds = null;
        return result;
    } catch (e) {
        console.warn(e.message)
    }
}


export async function submitMsg(formData, userToken) {   
    
    try {
        let feeds = await fetch(`${baseUrl}send_mail`, {
            method: 'post',
            body: formData,
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${userToken}`
            }
        });
        let result = await feeds.json();
        console.log("loggi", result)
        feeds = null;
        return result;
    } catch (e) {
        console.warn(e.message)
    }
}

export async function viewSingleMessage(id,userToken) {
    try {
        let feeds = await fetch(`${baseUrl}view_single_msg/${id}`, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${userToken}`
            }
        });
        let result = await feeds.json();

        feeds = null;
        return result;
    } catch (e) {
        console.warn(e.message)
    }
}


export async function viewAllContracts(user_token) {
    try {
        let feeds = await fetch(`${baseUrl}view_all_contract`, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${user_token}`
            }
        });
        let result = await feeds.json();

        feeds = null;
        return result;
    } catch (e) {
        console.warn(e.message)
    }
}


export async function doSearchUsers(formData, userToken) {   
    
    try {
        let feeds = await fetch(`${baseUrl}search_users`, {
            method: 'post',
            body: formData,
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${userToken}`
            }
        });
        let result = await feeds.json();
        console.log("loggi", result)
        feeds = null;
        return result;
    } catch (e) {
        console.warn(e.message)
    }
}

export async function doSearchContract(formData) {   
    
    try {
        let feeds = await fetch(`${baseUrl}seach_contract`, {
            method: 'post',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        let result = await feeds.json();
        console.log("loggi", result)
        feeds = null;
        return result;
    } catch (e) {
        console.warn(e.message)
    }
}

export async function doLogin(formData) {
    try {
        let feeds = await fetch(`${baseUrl}login`, {
            method: 'post',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        let result = await feeds.json();
        feeds = null;
        return result;
    } catch (e) {
        console.warn(e.message)
    }
}


export async function uploadInspectionDatasheet(id, type) {
    try {
        let feeds = await fetch(`${baseUrl}upload_inspection_datasheet/${id}/${type}`);
        let result = await feeds.json();

        feeds = null;
        return result;
    } catch (e) {
        console.warn(e)
    }
}

export async function DatasheetPost(token, payload) {
    console.log("the feeds", token, payload)
    try {
        let feeds = await fetch(`${baseUrl}datasheet_post`, {
                        method: 'POST',
                        body: payload,
                        headers: {
                            'Accept': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    })
        let result = await feeds.json();
        feeds = null;
        return result;

        }
        catch(e){
            console.warn(e)
        }
}



