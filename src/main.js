import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {
    Button, Container, Header,
    Main, Aside, Switch,Footer,
    Row, Col, Menu, Submenu,
    MenuItemGroup, MenuItem,
    Form, FormItem, Input,
    Dialog, Link, Image,
    Card, TabPane, Dropdown,
    DropdownItem, DropdownMenu,
    CollapseItem, Collapse, Tree,
    Select, Option, Message,
    MessageBox,Tabs,Pagination,
    Loading,Table,TableColumn,
} from "element-ui";
import store from './store'
import axios from "axios";

Vue.config.productionTip = false
Vue.use(Button)
Vue.use(Container)
Vue.use(Switch)
Vue.use(Header)
Vue.use(Main)
Vue.use(Aside)
Vue.use(Row)
Vue.use(Col)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(MenuItem)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Dialog)
Vue.use(Link)
Vue.use(Card)
Vue.use(Image)
Vue.use(TabPane)
Vue.use(Dropdown)
Vue.use(DropdownItem)
Vue.use(DropdownMenu)
Vue.use(CollapseItem)
Vue.use(Collapse)
Vue.use(Tree)
Vue.use(Select)
Vue.use(Option)
Vue.use(Tabs)
Vue.use(Pagination)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Footer)
Vue.use(Loading)
Vue.prototype.$axios = axios
Vue.prototype.$message = Message
Vue.prototype.$msgbox = MessageBox

new Vue({
    router,
    store,
    render: h => h(App),
    beforeCreate() {
        Vue.prototype.$bus = this
    }
}).$mount('#app')



// // 设置基础地址
// axios.defaults.baseURL = "http://localhost:9200/"
// //添加请求拦截器添加请求头
// axios.interceptors.request.use((config) => {
//         const isToken = config.headers['isToken'] === false
//         console.log(isToken+"132")
//         if (!isToken) {
//             console.log(isToken+"加token")
//             config.headers['Authorization'] = "Bearer " + localStorage.getItem("token");
//         }
//         return config;
//     },
//     error => {
//         return Promise.reject(error)
//     }
// )
// //添加响应拦截器，判断是否有令牌刷新
// axios.interceptors.response.use(res => {
//         if (res.headers['new-token'] !== undefined) {
//             localStorage.setItem("token", res.headers['new-token']);
//         }
//         if (res.data.code === 401) {
//             console.log(res.data.msg)
//             MessageBox.confirm('登录状态已过期，您可以继续留在该页面，或者重新登录', '系统提示', {
//                     confirmButtonText: '重新登录',
//                     cancelButtonText: '取消',
//                     type: 'warning'
//                 }
//             ).then(() => {
//                 console.log(res.data.msg)
//             })
//         }
//         return res;
//     },
//     error => {
//         let { message } = error;
//         if (message.includes("401")){
//             MessageBox.confirm('登录状态已过期，请重新登录', '系统提示', {
//                     confirmButtonText: '确定',
//                     showCancelButton: false,
//                     type: 'warning'
//                 }
//             ).then(() => {
//                 router.push("/").then(() => {
//                     Message({
//                         message: "请登录",
//                         type: 'warning',
//                         duration: 5 * 1000
//                     })
//                 })
//             })
//         }
//         else if (message.includes("timeout")){
//             Message({
//                 message: "系统请求超时",
//                 type: 'error',
//                 duration: 5 * 1000
//             })
//         }
//         else if (message.includes("500")){
//             Message({
//                 message: error,
//                 type: 'error',
//                 duration: 5 * 1000
//             })
//         }
//         console.log(error)
//         return Promise.reject(error)
//     }
// )
