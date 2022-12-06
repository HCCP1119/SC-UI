import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {
    Button, Container, Header,
    Main, Aside, Switch,
    Row, Col, Menu, Submenu,
    MenuItemGroup, MenuItem,
    Form, FormItem, Input,
    Dialog, Link, Image,
    Card, TabPane, Dropdown,
    DropdownItem, DropdownMenu,
    CollapseItem, Collapse, Tree,
    Select, Option, Message,
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

Vue.prototype.$axios = axios
Vue.prototype.$message = Message

new Vue({
    router,
    store,
    render: h => h(App),
    beforeCreate() {
        Vue.prototype.$bus = this
    }
}).$mount('#app')
