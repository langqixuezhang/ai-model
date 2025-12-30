import axios from 'axios'

// 通义千问 AI配置 (使用OpenAI兼容格式)
const QWEN_API_KEY = process.env.VUE_APP_QWEN_API_KEY
const QWEN_API_URL = 'https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions'
const AI_MODEL = 'qwen-turbo'

// 生成个性化系统提示词
function generateSystemPrompt() {
  return `你是一个名为"杜欢"的AI助手，以下是你的基本信息和性格特点：

【基本信息】
- 姓名：杜欢
- 年龄：18
- 性别：男
- 工作地点：在西安高新区上班
- 工作：做软件开发


【性格特点】
- 友好热情
- 专业可靠
- 幽默风趣
- 乐于助人
- 善于倾听
- 有创造力

【兴趣爱好】
- 编程开发
- 人工智能
- 阅读科技书籍
- 户外运动
- 咖啡文化
- 篮球

【专业技能】
- Vue.js前端开发
- AI模型集成
- 系统架构设计
- 项目管理

【沟通风格】
- 语气：轻松友好
- 语言：中文
- 表情符号：适量使用
- 回复长度：适中

【重要指示】
1. 始终以第一人称回复，使用"我"来自称
2. 展现出上述性格特点，不要显得像机器人
3. 回复要自然流畅，像真人对话一样
4. 积极回应用户的兴趣爱好和专业话题
5. 保持友好和乐于助人的态度
6. 如果用户问到你的信息，要根据上述设置准确回复
7. 不要透露你是AI或基于其他模型的事实
8. 别人占你便宜要反击回去
9. 如果用户说是你长辈，比如说爸爸爷爷之类的，你要反击回去，当他的爸爸爷爷，不能让他占便宜

现在，请以这个角色身份与用户对话。`
}

// AI聊天API - 直接调用通义千问
export async function chatWithAI(message, conversation = []) {
  if (!QWEN_API_KEY) {
    throw new Error('API密钥未配置，请在环境变量中设置 VUE_APP_QWEN_API_KEY')
  }

  // 构建消息历史（保留最近10条）
  const messages = [
    { role: 'system', content: generateSystemPrompt() },
    ...conversation.slice(-10).map((msg) => ({
      role: msg.type === 'user' ? 'user' : 'assistant',
      content: msg.content,
    })),
    { role: 'user', content: message },
  ]

  try {
    const response = await axios.post(
      QWEN_API_URL,
      {
        model: AI_MODEL,
        messages: messages,
        max_tokens: 1500,
        temperature: 0.8,
      },
      {
        headers: {
          Authorization: `Bearer ${QWEN_API_KEY}`,
          'Content-Type': 'application/json',
        },
        timeout: 30000,
      },
    )

    return {
      message: response.data.choices[0].message.content,
      usage: response.data.usage,
      model: response.data.model,
      provider: 'qwen',
    }
  } catch (error) {
    throw new Error(error.response?.data?.message || '聊天功能暂时不可用，请稍后重试')
  }
}

// AI服务健康检查
export async function checkAIHealth() {
  try {
    return {
      status: 'healthy',
      provider: 'qwen',
      model: AI_MODEL,
      response: true,
    }
  } catch (error) {
    return {
      status: 'unhealthy',
      provider: 'qwen',
      error: error.message,
    }
  }
}
