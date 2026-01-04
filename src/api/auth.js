// 检测是否在生产环境（Vercel等）
const isProduction =
  process.env.NODE_ENV === 'production' ||
  process.env.VERCEL_ENV ||
  !process.env.VUE_APP_QWEN_API_KEY

if (isProduction) {
  console.log('生产环境：使用静态数据验证')
} else {
  console.log('开发环境：使用Mock API')
}

import http from './http'
import { findUser, getUserById } from '../data/users'

// 模拟API延迟
const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms))

export function loginApi(payload) {
  console.log('登录请求:', payload.username)

  if (isProduction) {
    // 生产环境：直接使用静态数据验证
    return delay().then(() => {
      const user = findUser(payload.username, payload.password)

      if (!user) {
        console.log('登录失败：用户名或密码错误')
        throw new Error('账号或密码错误')
      }

      console.log('登录成功:', user.username, user.role)

      // 生成token (简化版)
      const token = btoa(
        JSON.stringify({
          userId: user.id,
          username: user.username,
          role: user.role,
          exp: Date.now() + 24 * 60 * 60 * 1000, // 24小时过期
        }),
      )

      return {
        token: token,
        user: {
          id: user.id,
          username: user.username,
          nickname: user.nickname,
          email: user.email,
          role: user.role,
        },
      }
    })
  } else {
    // 开发环境：使用Mock API
    return http.post('/api/auth/login', payload)
  }
}

export function fetchProfileApi() {
  console.log('获取用户信息')

  if (isProduction) {
    // 生产环境：从localStorage获取用户信息
    return delay().then(() => {
      const currentUserData = localStorage.getItem('current_user')

      if (!currentUserData) {
        console.log('未登录')
        throw new Error('未登录')
      }

      const { token, user } = JSON.parse(currentUserData)

      // 验证token
      try {
        const tokenData = JSON.parse(atob(token))
        if (tokenData.exp < Date.now()) {
          console.log('token已过期')
          localStorage.removeItem('current_user')
          throw new Error('登录已过期')
        }

        // 获取完整用户信息
        const fullUser = getUserById(user.id)
        console.log('查找用户:', fullUser ? `找到 ${fullUser.username}` : '用户不存在')

        if (fullUser) {
          return {
            id: fullUser.id,
            username: fullUser.username,
            nickname: fullUser.nickname,
            email: fullUser.email,
            role: fullUser.role,
            permissions: fullUser.permissions,
            createTime: fullUser.createTime,
          }
        } else {
          throw new Error('用户不存在')
        }
      } catch (e) {
        console.log('token解析失败:', e.message)
        localStorage.removeItem('current_user')
        throw new Error('无效的登录状态')
      }
    })
  } else {
    // 开发环境：使用Mock API
    return http.get('/api/user/profile')
  }
}
