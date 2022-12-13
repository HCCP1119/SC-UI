import Vue from 'vue'
import VueRouter from 'vue-router'
import Welcome from "@/views/Welcome";
import Home from "@/views/Home";
import RichText from "@/components/RichText";
import Files from "@/views/Files";
import WorkSpace from "@/views/WorkSpace";


Vue.use(VueRouter)
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}

const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: Welcome
  },
  {
    path: '/Note',
    name: 'Home',
    component: Home,
    children:[
      {
        path: '/note/editor',
        name: 'richText',
        component: RichText,
      },
      {
        path: '/note/files',
        name: 'Files',
        component: Files
      },
      {
        path: '/note/workspace',
        name: 'WorkSpace',
        component: WorkSpace
      }
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
