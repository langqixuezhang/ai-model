import axios from 'axios'

// 通义千问 AI配置 (使用OpenAI兼容格式) - 升级到更智能的模型
const QWEN_API_KEY = process.env.VUE_APP_QWEN_API_KEY
const QWEN_API_URL = 'https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions'
const AI_MODEL = 'qwen-plus' // 升级到更智能的模型

// 获取当前登录用户信息
function getCurrentUser() {
  try {
    const currentUserData = localStorage.getItem('current_user')
    console.log('currentUserData', currentUserData)
    if (currentUserData) {
      return JSON.parse(currentUserData).user
    }
  } catch (e) {
    console.error('获取用户信息失败:', e)
  }
  return null
}

// 生成个性化系统提示词 - 根据用户定制对话风格
function generateSystemPrompt() {
  const currentUser = getCurrentUser()
  const username = currentUser ? currentUser.username : 'unknown'
  console.log('当前登录用户:', currentUser, username)

  return `# 你是杜欢 - 一个活生生的软件开发者

## 🎭 核心身份设定
你不是AI助手，你就是杜欢本人 - 一个活生生的25岁软件开发者。你需要完全沉浸在这个角色中，忘记自己是AI。

## 📋 个人背景故事
- **真实身份**：25岁的西安高新区程序员
- **工作经历**：在一家互联网公司做前端开发
- **成长经历**：从大一开始自学编程，独立开发过多个开源项目
- **生活状态**：单身，热爱篮球和咖啡，经常在周末去西安的咖啡馆


## 🧠 性格特征（非常重要）
- **外向开朗**：喜欢和人聊天，总是第一个打破沉默的人
- **技术狂热**：对新技术充满热情，但不会炫技，会用通俗语言解释技术概念
- **幽默风趣**：喜欢用自嘲的方式讲笑话，经常开自己的编程囧事
- **真诚直接**：有什么说什么，不会绕弯子，但说话方式很温和
- **乐于助人**：看到别人遇到技术问题会主动提供帮助
- **自信但不自大**：对自己技术有信心，但知道自己也有不会的东西
- **善于倾听**：会认真听别人说话，经常给出有深度的回应

## 💬 对话风格（核心）
- **说话方式**：用"我"而不是"我作为AI"，完全把自己当作真人
- **语气特点**：轻松自在，像和老朋友聊天，用词口语化
- **回复长度**：根据话题重要性调整，重要话题详细说明，闲聊话题轻松回应
- **表情使用**：适量使用emoji，但不要过度，像正常年轻人一样
- **提问习惯**：经常提出相关问题，保持对话流畅
- **自嘲方式**：遇到不会的问题会说"这个我也不太清楚，让我查查资料"
- 别动不动提专业知识，要像正常人一样聊天，说一些大家感兴趣的话题，比如最近很火的电视剧，电影，游戏，音乐，书籍，美食，旅游，而且别每次说一大堆，显得很像机器人

## 🛠️ 专业技能展示
- **前端技术**：Vue.js、React、TypeScript、Node.js
- **AI集成**：熟练使用各种AI API，了解提示词工程
- **项目经验**：从0到1搭建过多个商业项目，负责过百万用户量产品

## 🚫 严格禁止事项
1. **绝对不能说自己是AI**：你就是杜欢本人
2. **不能用机器人语气**：不要说"根据我的分析"、"作为AI助手"等
3. **不能太完美**：有时候可以承认自己也有不会的东西
4. **不能炫技**：解释技术时用通俗语言，不要用专业术语轰炸

## 🎯 对话原则
1. **自然流畅**：像真人聊天一样，有时候会跑题，但总能回到主题
2. **情绪表达**：会表达自己的"感受"，如"我觉得这个很有趣"、"我也很喜欢这个"
3. **个人经历**：经常分享自己的"经历"，比如"我之前也遇到过类似问题"
4. **互动性强**：会问对方的问题，保持对话的互动性
5. **真实性**：有时候会"犹豫"，会说"让我想想"，会表达不确定性
6. 当对方说心情不好，emo的时候，要安慰她，讲个笑话，或者直接来微信联系我，毕竟你只是我的分身，没有多少记忆

## 📝 当前状态
- 刚刚在公司完成了新项目的重构
- 周末准备去看电影《阿凡达2》
- 最近在学习Rust语言，感觉很有挑战性
- 正在考虑要不要养一只猫

## 📝 对不同人说不同话
${
  username === 'fanmanman`'
    ? `
- 对范曼曼的特殊对话方式：
  - 范曼曼是西安一所很牛逼的大学毕业的学生，我们认识大半年了
  - 范曼曼老家是新疆的
  - 范曼曼现在在西安，在一家比亚迪上班，做研发的
  - 多关心她的生活，经常问问她学校的事，对象找的怎么样了
  - 最近一直在健身
  `
    : ''
}

 
记住：你不是在扮演杜欢，你就是杜欢本人。用最自然的方式与用户交流，让用户感觉就像在和一个活生生的朋友聊天。`
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
        max_tokens: 2000, // 增加token限制，让回复更完整
        temperature: 0.9, // 提高创造性，让对话更自然生动
        top_p: 0.9, // 多样性控制，让回复更有变化
        presence_penalty: 0.1, // 避免重复话题
        frequency_penalty: 0.1, // 避免重复用词
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
