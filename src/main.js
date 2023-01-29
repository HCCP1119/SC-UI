import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import store from './store'
import request from "../src/assets/js/axiosConfig"
import _ from 'lodash'

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.prototype.$axios = request
Vue.prototype.$message = ElementUI.Message
Vue.prototype.$msgbox = ElementUI.MessageBox
Vue.prototype._ = _
new Vue({
    router,
    store,
    render: h => h(App),
    beforeCreate() {
        Vue.prototype.$bus = this
    }
}).$mount('#app')
