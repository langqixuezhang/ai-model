const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8080,
    setupMiddlewares: (middlewares, devServer) => {
      if (!devServer) return middlewares

      // 本地开发Mock API
      devServer.app.post('/api/auth/login', (req, res) => {
        let body = ''
        req.on('data', (chunk) => {
          body += chunk
        })
        req.on('end', () => {
          try {
            const data = JSON.parse(body || '{}')
            const { username, password } = data
            // 演示账号
            if (username === 'demo' && password === 'demo123') {
              res.json({
                token: 'demo-token-for-preview',
                user: {
                  id: 1,
                  username: 'demo',
                  nickname: '演示账号',
                  email: 'duhuan01@qq.com',
                },
              })
            } else {
              res.status(401).json({ message: '账号或密码错误' })
            }
          } catch (e) {
            res.status(400).json({ message: '请求错误' })
          }
        })
      })

      devServer.app.get('/api/user/profile', (req, res) => {
        const authHeader = req.headers.authorization
        if (authHeader === 'Bearer demo-token-for-preview') {
          res.json({
            id: 1,
            username: 'demo',
            nickname: '演示账号',
            email: 'duhuan01@qq.com',
            created_at: new Date().toISOString(),
          })
        } else {
          res.status(401).json({ message: '账号或密码错误' })
        }
      })

      return middlewares
    },
  },

  // 生产环境配置
  configureWebpack: {
    devtool: process.env.NODE_ENV === 'production' ? false : 'eval-source-map',
  },

  // PWA支持
  pwa: {
    name: 'ddhAI',
    themeColor: '#667eea',
    msTileColor: '#667eea',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    workboxOptions: {
      skipWaiting: true,
      clientsClaim: true,
    },
  },
})
