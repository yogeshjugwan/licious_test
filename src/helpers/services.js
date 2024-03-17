import axios from "axios"
import RNRestart from 'react-native-restart';

import * as Config from './Config'
import * as Constants from './Constants'
import { clearAll, getData } from "./localStorage";
export const apiPostService = async (url, postData) => {
    let localDataObj = await getData(Constants?.store_key_login_details);
    if (localDataObj) {
        localDataObj = await JSON.parse(localDataObj);
    }
    console.log("localDataObj---1", localDataObj, postData)
    return await axios({
        method: 'POST',
        url: `${Config.baseUrl + url}`,
        data: {
            ...postData,
            appType: localDataObj?.loginData?.data?.appType,
            loginType: "9999"
        },
        headers: {
            token: localDataObj?.loginData?.data?.session_token,
            "Content-Type": "application/json",
        },
    }).then(res => {
        console.log("res?.data?.message", res)
        if (res?.data?.message == 'Auth Failed!!' || res.status === 401) {
            RNRestart.restart();
        }
        return res;
    }).catch(error => {
        console.log('getAxiosData error==>', error);
        return error
    });
}

export const apiGetService = async (url) => {
    return await axios({
        method: 'GET',
        url: `${Config.baseUrl + url}`,
        headers: {
            "Content-Type": "application/json",
        },
    }).then(res => {
        return res;
    })
        .catch(error => {
            console.log('getAxiosData error==>', error);
            if (error) {
                return error;
            }
        });
}
