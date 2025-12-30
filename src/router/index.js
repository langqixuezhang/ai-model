import { createRouter, createWebHistory } from 'vue-router'
import BasicLayout from '../layouts/BasicLayout.vue'

const Login = () => import('../views/Login.vue')
const Dashboard = () => import('../views/Dashboard.vue')
const AiChat = () => import('../views/AiChat.vue')
const AiPpt = () => import('../views/AiPpt.vue')

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: { public: true, title: '登录' },
    },
    {
      path: '/',
      component: BasicLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'Dashboard',
          component: Dashboard,
          meta: { title: '首页' },
        },
        {
          path: 'chat',
          name: 'AiChat',
          component: AiChat,
          meta: { title: '聊天' },
        },
        {
          path: 'ppt',
          name: 'AiPpt',
          component: AiPpt,
          meta: { title: 'AI PPT生成' },
        },
      ],
    },
  ],
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('access_token')
  if (to.meta && to.meta.title) {
    document.title = String(to.meta.title)
  }
  if (to.meta && to.meta.requiresAuth && !token) {
    next({ path: '/login', query: { redirect: to.fullPath } })
    return
  }
  if (to.path === '/login' && token) {
    const redirect = to.query && to.query.redirect ? String(to.query.redirect) : '/'
    next({ path: redirect })
    return
  }
  next()
})

export default router
