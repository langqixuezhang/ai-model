import axios from 'axios'
import { useUserStore } from '../stores/user'

const http = axios.create({
  baseURL: process.env.VUE_APP_API_BASE || '/api',
  timeout: 15000,
})

http.interceptors.request.use((config) => {
  try {
    const store = useUserStore()
    if (store && store.accessToken) {
      config.headers = config.headers || {}
      config.headers.Authorization = `Bearer ${store.accessToken}`
    }
  } catch (_) {
    // pinia not ready in some non-vue contexts; ignore
  }
  return config
})

http.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response && error.response.status === 401) {
      try {
        const store = useUserStore()
        store.logout()
      } catch (_) {
        // ignore
      }
    }
    return Promise.reject(error)
  },
)

export default http
