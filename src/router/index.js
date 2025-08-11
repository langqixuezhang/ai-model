import { createRouter, createWebHistory } from 'vue-router'

const Login = () => import('../views/Login.vue')
const Dashboard = () => import('../views/Dashboard.vue')

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
      name: 'Dashboard',
      component: Dashboard,
      meta: { requiresAuth: true, title: '首页' },
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
