const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,

  // 开发服务器配置
  devServer: {
    port: 8080,
    setupMiddlewares: (middlewares, devServer) => {
      console.log('setupMiddlewares', middlewares, devServer)
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

  // 生产环境配置 - 简化以避免构建问题
  configureWebpack: {
    // 在生产环境中禁用source map以减少构建时间和文件大小
    devtool: false,
  },

  // 移除PWA配置以避免构建问题
  // pwa: {...}
})
