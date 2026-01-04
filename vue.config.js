const { defineConfig } = require('@vue/cli-service')
// 导入用户数据和管理函数
const { staticUsers, findUser } = require('./src/data/users')
console.log('导入用户数据成功:', staticUsers.length, '个用户')

module.exports = defineConfig({
  transpileDependencies: true,

  // 开发服务器配置
  devServer: {
    port: 8088,
    setupMiddlewares: (middlewares, devServer) => {
      if (!devServer) return middlewares

      // 本地开发Mock API
      devServer.app.post('/api/auth/login', (req, res) => {
        let body = ''
        req.on('data', (chunk) => {
          body += chunk
        })
        req.on('end', () => {
          console.log('req2: 数据接收完成', 'users长度:', staticUsers.length)

          try {
            const data = JSON.parse(body || '{}')
            const { username, password } = data
            // 使用users数据进行验证
            const user = findUser(username, password)
            if (user) {
              // 生成token (简化版)
              const token = Buffer.from(
                JSON.stringify({
                  userId: user.id,
                  username: user.username,
                  role: user.role,
                  exp: Date.now() + 24 * 60 * 60 * 1000, // 24小时过期
                }),
              ).toString('base64')
              res.json({
                token: token,
                user: {
                  id: user.id,
                  username: user.username,
                  nickname: user.nickname,
                  email: user.email,
                  role: user.role,
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
        console.log(
          '获取用户信息请求，token:',
          authHeader ? authHeader.substring(0, 50) + '...' : '无token',
        )

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
          console.log('无有效token')
          return res.status(401).json({ message: '未授权' })
        }

        try {
          const token = authHeader.substring(7) // 移除 'Bearer ' 前缀
          const tokenData = JSON.parse(Buffer.from(token, 'base64').toString())
          console.log('解析token成功:', tokenData.username)

          // 检查token是否过期
          if (tokenData.exp < Date.now()) {
            console.log('token已过期')
            return res.status(401).json({ message: '登录已过期' })
          }

          // 查找用户信息
          const user = staticUsers.find((u) => u.id === tokenData.userId && u.status === 'active')
          console.log('查找用户:', user ? `找到 ${user.username}` : '用户不存在')

          if (user) {
            res.json({
              id: user.id,
              username: user.username,
              nickname: user.nickname,
              email: user.email,
              role: user.role,
              permissions: user.permissions,
              createTime: user.createTime,
            })
          } else {
            res.status(404).json({ message: '用户不存在' })
          }
        } catch (e) {
          console.log('token解析失败:', e.message)
          res.status(401).json({ message: '无效的登录状态' })
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
