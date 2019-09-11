export const routes = [
  {
    path: '/',
    component: () => import('layouts/HomeLayout.vue'),
    meta: {
      requiresAuth: false
    },
    children: [
      { path: '', name: 'Home', component: () => import('pages/Home.vue') }
    ]
  },
  {
    path: '/chats',
    component: () => import('layouts/HomeLayout.vue'),
    meta: {
      requiresAuth: true
    },
    children: [
      { path: '', name: 'Chats', component: () => import('pages/Chats.vue') }
    ]
  },
  {
    path: '/chats/:id',
    component: () => import('layouts/ConversationLayout.vue'),
    meta: {
      requiresAuth: true
    },
    children: [
      { path: '', name: 'Conversation', component: () => import('pages/Conversation.vue') }
    ]
  },
  {
    path: '/people',
    component: () => import('layouts/HomeLayout.vue'),
    meta: {
      requiresAuth: true
    },
    children: [
      { path: '', name: 'People', component: () => import('pages/People.vue') }
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
