// Vercel Serverless Function for login
export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: '只支持POST请求' })
  }

  try {
    const { username, password } = req.body

    // 演示账号
    if (username === 'demo' && password === 'demo123') {
      res.status(200).json({
        token: 'demo-token-for-preview',
        user: {
          id: 1,
          username: 'demo',
          nickname: '演示账号',
          email: 'duhuan01@qq.com',
        },
      })
    } else {
      res.status(401).json({
        message: '账号或密码错误',
      })
    }
  } catch (error) {
    res.status(400).json({ message: '请求错误' })
  }
}
