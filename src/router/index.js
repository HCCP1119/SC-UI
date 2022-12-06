import Vue from 'vue'
import VueRouter from 'vue-router'
import Welcome from "@/views/Welcome";
import Home from "@/views/Home";
import RichText from "@/components/RichText";


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: Welcome
  },
  {
    path: '/Home',
    name: 'Home',
    component: Home,
    children:[
      {
        path: '/editor',
        name: 'richText',
        component: RichText,
      },
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
