import Vue from 'vue'
import VueRouter from 'vue-router'
import Welcome from "@/views/Welcome";
import Home from "@/views/Home";
import RichText from "@/components/RichText";
import Files from "@/components/Files";
import WorkSpace from "@/components/WorkSpace";
import StarFile from "@/components/StarFile";
import Trash from "@/components/Trash";


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
        path: '/notes/:id',
        name: 'richText',
        component: RichText,
      },
      {
        path: '/note/files',
        name: 'Files',
        component: Files
      },
      {
        path: '/note/workspace/:id',
        name: 'WorkSpace',
        component: WorkSpace,
      },
      {
        path: '/note/starFile',
        name: 'StarFile',
        component: StarFile,
      },
      {
        path: '/note/trash',
        name: 'Trash',
        component: Trash
      }
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
