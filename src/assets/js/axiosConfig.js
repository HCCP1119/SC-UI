import axios from "axios";
import {Message, MessageBox} from "element-ui";
import router from "@/router";

const request = axios.create({
    baseURL: "http://localhost:9200/"
});

request.all = axios.all
request.spread = axios.spread

//添加请求拦截器添加请求头
request.interceptors.request.use((config) => {
        const isToken = config.headers['isToken'] === false
        if (!isToken) {
            config.headers['Authorization'] = localStorage.getItem("token");
        }
        return config;
    },
    error => {
        return Promise.reject(error)
    }
)
//添加响应拦截器，判断是否有令牌刷新
request.interceptors.response.use(res => {
        if (res.headers['new-token'] !== undefined) {
            localStorage.setItem("token", res.headers['new-token']);
            console.log("newToken")
        }
        if (res.data.code === 401) {
            console.log(res.data.msg)
            MessageBox.confirm('登录状态已过期，您可以继续留在该页面，或者重新登录', '系统提示', {
                    confirmButtonText: '重新登录',
                    cancelButtonText: '取消',
                    type: 'warning'
                }
            ).then(() => {
                console.log(res.data.msg)
            })
        }
        return res;
    },
    error => {
        let { message } = error;
        if (message.includes("401")){
            MessageBox.confirm('登录状态已过期，请重新登录', '系统提示', {
                    confirmButtonText: '确定',
                    showCancelButton: false,
                    type: 'warning'
                }
            ).then(() => {
                router.push("/").then(() => {
                    Message({
                        message: "请登录",
                        type: 'warning',
                        duration: 5 * 1000
                    })
                })
            })
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
        console.log(error)
        return Promise.reject(error)
    }
)

export default request;
