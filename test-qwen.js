// 测试通义千问API连接
require('dotenv').config({ path: '.env.development' })
const axios = require('axios')

async function testQwenAPI() {
  console.log('🧪 测试通义千问API连接')
  console.log('===========================')

  const apiKey = process.env.VUE_APP_QWEN_API_KEY

  if (!apiKey) {
    console.log('❌ 未找到 VUE_APP_QWEN_API_KEY 环境变量')
    console.log('')
    console.log('请先运行配置脚本：')
    console.log('npm run setup')
    return
  }

  if (!apiKey.startsWith('sk-')) {
    console.log('⚠️  API密钥格式不正确，应该以 "sk-" 开头')
    console.log(`当前密钥: ${apiKey.substring(0, 10)}...`)
    return
  }

  console.log('✅ API密钥格式正确')
  console.log(`🔑 密钥前缀: ${apiKey.substring(0, 10)}...`)

  try {
    console.log('')
    console.log('🔄 正在调用通义千问API...')

    const response = await axios.post(
      'https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions',
      {
        model: 'qwen-turbo',
        messages: [{ role: 'user', content: '你好，请简单回复一个问候' }],
        max_tokens: 100,
        temperature: 0.8,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        timeout: 30000,
      },
    )

    console.log('✅ API调用成功！')
    console.log(`🤖 AI回复: ${response.data.choices[0].message.content}`)
    console.log(`📊 Token使用: ${JSON.stringify(response.data.usage)}`)
  } catch (error) {
    console.log('❌ API调用失败')
    console.log(`错误信息: ${error.message}`)

    if (error.response) {
      console.log(`状态码: ${error.response.status}`)
      console.log(`响应数据: ${JSON.stringify(error.response.data, null, 2)}`)
    }
  }
}

testQwenAPI()
