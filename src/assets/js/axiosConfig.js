import axios from "axios";
import {Message, MessageBox} from "element-ui";
import router from "@/router";

// 是否显示重新登录
export let isRelogin = { show: false };

const request = axios.create({
    baseURL: "http://192.168.1.129:9200/"
    // baseURL: "http://localhost:9200/"
});

request.all = axios.all
request.spread = axios.spread

//添加请求拦截器添加请求头
request.interceptors.request.use((config) => {
        const isToken = config.headers['isToken'] === false
        if (!isToken) {
            config.headers['satoken'] = localStorage.getItem("token");
        }
        return config;
    },
    error => {
        return Promise.reject(error)
    }
)
//添加响应拦截器
request.interceptors.response.use(res => {
        if (res.data.code === 401) {
            if (!isRelogin.show){
                isRelogin.show = true;
                MessageBox.confirm('登陆失效，请重新登录', '系统提示', {
                        confirmButtonText: '重新登录',
                        showCancelButton: false,
                        type: 'warning'
                    }
                ).then(() => {
                    isRelogin.show = false;
                    router.push("/").then(() => {
                        Message({
                            message: "请登录",
                            type: 'warning',
                            duration: 5 * 1000
                        })
                    })
                })
            }
        }
        return res;
    },
    error => {
        let { message } = error;
        if (message.includes("401")){
            if (!isRelogin.show){
                isRelogin.show = true;
                MessageBox.confirm('登陆失效，请重新登录', '系统提示', {
                        confirmButtonText: '确定',
                        showCancelButton: false,
                        type: 'warning'
                    }
                ).then(() => {
                    isRelogin.show = false;
                    router.push("/").then(() => {
                        Message({
                            message: "请登录",
                            type: 'warning',
                            duration: 5 * 1000
                        })
                    })
                })
            }
        }
        else if (message.includes("timeout")){
            Message({
                message: "系统请求超时",
                type: 'error',
                duration: 5 * 1000
            })
        }
        else if (message.includes("500")){
            Message({
                message: "服务器出错，稍后再试",
                type: 'error',
                duration: 5 * 1000
            })
        }
        else if (message.includes("503")){
            Message({
                message: "服务器繁忙，稍后再试",
                type: 'warning',
                duration: 5 * 1000
            })
        }
        return Promise.reject(error)
    }
)

export default request;
