export const routes = [
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
