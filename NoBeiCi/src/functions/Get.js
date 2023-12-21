import axios from 'axios'

import { ElLoading } from 'element-plus'
import Message from "./Message"

const contentTypeForm = "application/x-www-form-urlencoded;charset=UTF-8";
const contentTypeJson = "application/json"

const instance = axios.create({
    timeout: 10 * 1000,
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
        //console.log("config",config)
        //console.log("token:",JSON.parse(localStorage.getItem("userInformation")).token)
        if (config.addToken && JSON.parse(localStorage.getItem("userInformation")).token) {
            config.headers['token'] = JSON.parse(localStorage.getItem("userInformation")).token;//这里应该为获取Token的方法
        }
        console.log("config",config)
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
            return Promise.reject({ showError: showError, msg: responseData.info });
        }


    }, (error) => {
        if (error.config.showLoading && loading) {
            loading.close();
        }
        return Promise.reject({ showError: true, msg: "网络异常" });
    }
);



const get=(config)=>{
    const { url, params, showLoading = true, addToken = false,errorCallback, showError = true } = config
    let contentType = contentTypeJson;
    let headers = {
        'Content-Type': contentType,
        'X-Requested-With': 'XMLHttpRequest',
    }
    return instance.get(url, {
        headers: headers,
        addToken: addToken,
        params: params,
        showLoading: showLoading,
        errorCallback: errorCallback,
        showError: showError
    }).catch(error => {
        if (error.showError) {
            Message.error(error.msg);
        }
        return null;
    })
}
export default get;