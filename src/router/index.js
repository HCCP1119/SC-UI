import Vue from 'vue'
import VueRouter from 'vue-router'
import Welcome from "@/views/Welcome";
import Home from "@/views/Home";
import RichText from "@/components/RichText";
import Files from "@/components/Files";
import WorkSpace from "@/components/WorkSpace";
import Trash from "@/components/Trash";
import StarNote from "@/components/StarNote";
import Share from "@/components/Share";
import Setting from "@/components/Setting";
import AccountInfo from "@/components/AccountInfo";
import ResetPassword from "@/components/ResetPassword";
import AccountSecurity from "@/components/AccountSecurity";


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
        path: '/note',
        name: 'Home',
        component: Home,
        children: [
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
                path: '/note/starNote',
                name: 'StarNote',
                component: StarNote,
            },
            {
                path: '/note/share',
                name: 'Share',
                component: Share
            },
            {
                path: '/note/trash',
                name: 'Trash',
                component: Trash
            },
            {
                path: '/note/setting',
                name: 'Setting',
                component: Setting,
                children: [
                    {
                        path: '/note/setting/info',
                        name: 'AccountInfo',
                        component: AccountInfo
                    },
                    {
                        path: '/note/setting/resetPassword',
                        name: 'ResetPassword',
                        component: ResetPassword
                    },
                    {
                        path: '/note/setting/security',
                        name: 'AccountSecurity',
                        component: AccountSecurity
                    }

                ]
            }
        ]
    },
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router
