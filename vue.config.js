const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
    onBeforeSetupMiddleware(devServer) {
      if (!devServer) return
      const app = devServer.app

      // 简易本地 Mock 登录
      app.post('/api/auth/login', (req, res) => {
        let body = ''
        req.on('data', (chunk) => {
          body += chunk
        })
        req.on('end', () => {
          try {
            const data = JSON.parse(body || '{}')
            const { username, password } = data
            if (username === 'admin' && password === '123456') {
              res.json({ token: 'mock-token-admin' })
            } else {
              res.status(401).json({ message: '用户名或密码错误' })
            }
          } catch (e) {
            res.status(400).json({ message: '请求体错误' })
          }
        })
      })

      app.get('/api/user/profile', (_req, res) => {
        res.json({ id: 1, username: 'admin', nickname: '管理员' })
      })
    },
  },
})
