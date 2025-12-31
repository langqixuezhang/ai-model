module.exports = (req, res) => {
  // 只允许POST请求
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { username, password } = req.body

    // 简单的演示账号验证
    if (username === 'demo' && password === 'demo123') {
      const token = `demo-token-${Date.now()}`
      const user = {
        id: 1,
        username: 'demo',
        nickname: '杜欢',
        email: 'duhuan01@qq.com',
      }

      return res.status(200).json({
        token,
        user,
      })
    } else {
      return res.status(401).json({ message: '用户名或密码错误' })
    }
  } catch (error) {
    console.error('Login API error:', error)
    return res.status(500).json({ message: '服务器内部错误' })
  }
}
