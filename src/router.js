import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('layouts/HomeLayout.vue'),
    meta: {
      requiresAuth: false
    },
    children: [
      { path: '', name: 'Chats', component: () => import('pages/Chats.vue') }
    ]
  },
  {
    path: '/secret',
    component: () => import('layouts/HomeLayout.vue'),
    meta: {
      requiresAuth: true
    },
    children: [
      { path: '', name: 'Secret', component: () => import('pages/Secret.vue') }
    ]
  },
  {
    path: '/login',
    component: () => import('layouts/HomeLayout.vue'),
    meta: {
      requiresAuth: false
    },
    children: [
      { path: '', name: 'Login', component: () => import('pages/Login.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

const Router = new VueRouter({
  mode: process.env.VUE_ROUTER_MODE,
  routes,
  scrollBehavior: () => ({ x: 0, y: 0 }),
  base: process.env.VUE_ROUTER_BASE
})

Router.beforeEach((to, from, next) => {
  const currentUser = Vue.prototype.$auth.currentUser
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (currentUser === null) {
      return next({
        path: '/login',
        replace: true,
      })
    }
  }
  next()
})

export default Router
