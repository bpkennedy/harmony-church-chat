import Vue from 'vue'
import VueRouter from 'vue-router'
import { routes } from './routes'
import { getCurrentUser } from '../boot/auth'

Vue.use(VueRouter)

const Router = new VueRouter({
  mode: process.env.VUE_ROUTER_MODE,
  routes,
  scrollBehavior: () => ({ x: 0, y: 0 }),
  base: process.env.VUE_ROUTER_BASE
})

Router.beforeEach((to, from, next) => {
  const currentUser = getCurrentUser()
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
