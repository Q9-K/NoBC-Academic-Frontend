import axios from 'axios'

import { ElLoading } from 'element-plus'
import Message from "./Message"

const contentTypeForm = "application/x-www-form-urlencoded;charset=UTF-8";
const contentTypeJson = "application/json"

const instance = axios.create({
    timeout: 10 * 1000,
    baseURL: "https://api.buaa-q9k.xyz",
})
//请求前过滤器
let loading = null;
instance.interceptors.request.use(
    (config) => {
        if (config.showLoading) {
            loading = ElLoading.service({
                lock: true,
                text: "加载中......",
                background: 'rgba(0,0,0,0.7)'
            })
        }
        if (config.addToken && JSON.parse(localStorage.getItem("userInformation")).token) {
            config.headers['token'] = JSON.parse(localStorage.getItem("userInformation")).token;//这里应该为获取Token的方法
        }
        if(config.addManagerToken && localStorage.getItem("manager")){
            config.headers['token'] = localStorage.getItem("manager");
        }
        if(config.useTestEnv){
            config.baseURL = config.testEnv
        }
        return config;
    }, (error) => {
        if (error.config.showLoading && loading) {
            loading.close();
        }
        Message.error("请求发送失败");
        return Promise.reject("请求发送失败");
    }
);

//请求后过滤器
instance.interceptors.response.use(
    (response) => {
        const { showLoading, errorCallback, showError } = response.config;
        if (showLoading && loading) {
            loading.close();
        }
        const responseData = response.data;
        if (responseData.code == 200) {
            return responseData;
        }else {
            if (errorCallback) {
                errorCallback(responseData)
            }
            return Promise.reject({ showError: showError, msg: responseData.msg });
        }


    }, (error) => {
        if (error.config.showLoading && loading) {
            loading.close();
        }
        return Promise.reject({ showError: true, msg: "网络异常" });
    }
);


const request = (config) => {
    const { url, params, dataType, showLoading = true, addToken = false,addManagerToken=false,useTestEnv = true,testEnv="",errorCallback, showError = true } = config
    let contentType = contentTypeForm;
    let fromData = new FormData();
    for (let key in params) {
        fromData.append(key, params[key] == undefined ? "" : params[key]);
    }
    if (dataType != null && dataType === "json") {
        contentType = contentTypeJson;
    }
    let headers = {
        'Content-Type': contentType,
        'X-Requested-With': 'XMLHttpRequest',
    }
    return instance.post(url, fromData, {
        headers: headers,
        addToken: addToken,
        addManagerToken: addManagerToken, // 是否添加管理端token
        showLoading: showLoading,
        useTestEnv: useTestEnv,
        testEnv: testEnv,
        errorCallback: errorCallback,
        showError: showError
    }).catch(error => {
        if (error.showError) {
            Message.error(error.msg);
        }
        return null;
    })
}

export default request;
