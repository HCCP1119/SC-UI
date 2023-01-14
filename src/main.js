import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {
    Button, Container, Header,
    Main, Aside, Switch, Footer,
    Row, Col, Menu, Submenu,
    MenuItemGroup, MenuItem,
    Form, FormItem, Input,
    Dialog, Link, Image,
    Card, TabPane, Dropdown,
    DropdownItem, DropdownMenu,
    CollapseItem, Collapse, Tree,
    Select, Option, Message,
    MessageBox, Tabs, Pagination,
    Loading, Table, TableColumn,
    Divider, Upload, RadioGroup,
    RadioButton, DatePicker,
} from "element-ui";
import store from './store'
// import axios from "axios";
import request from "../src/assets/js/axiosConfig"
import _ from 'lodash'

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
Vue.use(Divider)
Vue.use(Upload)
Vue.use(RadioGroup)
Vue.use(RadioButton)
Vue.use(DatePicker)
Vue.use(Loading)
Vue.prototype.$axios = request
Vue.prototype.$message = Message
Vue.prototype.$msgbox = MessageBox
Vue.prototype._ = _
new Vue({
    router,
    store,
    render: h => h(App),
    beforeCreate() {
        Vue.prototype.$bus = this
    }
}).$mount('#app')
