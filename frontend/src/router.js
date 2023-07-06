
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);


import UserManagementAndAuthenticationUserManager from "./components/listers/UserManagementAndAuthenticationUserCards"
import UserManagementAndAuthenticationUserDetail from "./components/listers/UserManagementAndAuthenticationUserDetail"

import ProfileManagementProfileManager from "./components/listers/ProfileManagementProfileCards"
import ProfileManagementProfileDetail from "./components/listers/ProfileManagementProfileDetail"

import PostAndNewsFeedManagementPostManager from "./components/listers/PostAndNewsFeedManagementPostCards"
import PostAndNewsFeedManagementPostDetail from "./components/listers/PostAndNewsFeedManagementPostDetail"


export default new Router({
    // mode: 'history',
    base: process.env.BASE_URL,
    routes: [
            {
                path: '/userManagementAndAuthentications/users',
                name: 'UserManagementAndAuthenticationUserManager',
                component: UserManagementAndAuthenticationUserManager
            },
            {
                path: '/userManagementAndAuthentications/users/:id',
                name: 'UserManagementAndAuthenticationUserDetail',
                component: UserManagementAndAuthenticationUserDetail
            },

            {
                path: '/profileManagements/profiles',
                name: 'ProfileManagementProfileManager',
                component: ProfileManagementProfileManager
            },
            {
                path: '/profileManagements/profiles/:id',
                name: 'ProfileManagementProfileDetail',
                component: ProfileManagementProfileDetail
            },

            {
                path: '/postAndNewsFeedManagements/posts',
                name: 'PostAndNewsFeedManagementPostManager',
                component: PostAndNewsFeedManagementPostManager
            },
            {
                path: '/postAndNewsFeedManagements/posts/:id',
                name: 'PostAndNewsFeedManagementPostDetail',
                component: PostAndNewsFeedManagementPostDetail
            },



    ]
})
