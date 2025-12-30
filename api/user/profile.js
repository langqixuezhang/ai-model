// Vercel Serverless Function for user profile
export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: '只支持GET请求' })
  }

  // 检查token
  const authHeader = req.headers.authorization
  if (authHeader === 'Bearer demo-token-for-preview') {
    res.status(200).json({
      id: 1,
      username: 'demo',
      nickname: '演示账号',
      email: 'duhuan01@qq.com',
      created_at: new Date().toISOString(),
    })
  } else {
    res.status(401).json({
      message: '账号或密码错误',
    })
  }
}
