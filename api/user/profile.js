module.exports = (req, res) => {
  // 只允许GET请求
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    // 检查Authorization头
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: '未授权访问' })
    }

    const token = authHeader.substring(7) // 移除 'Bearer ' 前缀

    // 验证token是否为demo token
    if (token.startsWith('demo-token-')) {
      const profile = {
        id: 1,
        username: 'demo',
        nickname: '杜欢',
        email: 'duhuan01@qq.com',
        avatar: null,
        created_at: new Date().toISOString(),
      }

      return res.status(200).json(profile)
    } else {
      return res.status(401).json({ message: '无效的token' })
    }
  } catch (error) {
    console.error('Profile API error:', error)
    return res.status(500).json({ message: '服务器内部错误' })
  }
}
