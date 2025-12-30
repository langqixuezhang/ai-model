# 🚀 智创云 AI - 个性化 AI 助手

基于 Vue.js + 通义千问 AI 的完全个性化的 AI 聊天助手，让别人用起来就像在使用你本人一样！

## ✨ 功能特性

- 🤖 **AI 对话** - 集成通义千问 AI 引擎（阿里云提供）
- 🎭 **个性化** - 完全按照你的性格、爱好、技能定制
- ⚡ **快速响应** - 毫秒级 AI 回复速度
- 💰 **低成本** - 通义千问提供免费试用额度
- 🌐 **一键部署** - 直接部署到 Vercel
- 📱 **响应式设计** - 支持桌面和移动端

## 🛠️ 技术栈

### 前端

- **Vue 3** - 渐进式 JavaScript 框架
- **Element Plus** - Vue 3 UI 组件库
- **Axios** - HTTP 客户端调用 AI API

### AI 集成

- **通义千问** - 阿里云提供的 AI 大模型
- **Llama 3.1** - 最新开源大模型

## 🚀 快速开始

### 环境要求

- Node.js >= 14.0.0
- npm >= 6.0.0

### 本地开发

```bash
# 1. 获取通义千问API密钥
# 访问: https://dashscope.aliyun.com/

D# 2. 配置环境变量 (推荐自动配置)
npm run setup

# 或手动创建 .env.development 文件：
# VUE_APP_QWEN_API_KEY=你的API密钥

# 3. 测试配置是否正确
npm run test-config

# 4. 安装依赖
npm install

# 5. 启动开发服务器
npm run serve
```

### 访问应用

- **本地**: http://localhost:8080
- **AI 引擎**: 通义千问 (阿里云，稳定可靠)
- **配置检查**: 运行 `npm run test-config` 验证配置

## 🌐 部署到 Vercel

### 方式 1：命令行部署

```bash
# 安装 Vercel CLI
npm install -g vercel

# 登录 Vercel
vercel login

# 构建项目
npm run build

# 部署到 Vercel
vercel --prod
```

### 方式 2：GitHub 自动部署

1. 将代码推送到 GitHub 仓库
2. 在 [Vercel](https://vercel.com) 中导入项目
3. **重要**: 在 Vercel 设置中添加环境变量：
   - `VUE_APP_QWEN_API_KEY`: 你的通义千问 API 密钥
4. Vercel 会自动部署

### 方式 3：直接拖拽部署

1. 运行 `npm run build`
2. 访问 [Vercel Deploy](https://vercel.com/new)
3. 将 `dist` 文件夹拖拽到页面中
4. 在部署设置中添加环境变量

## ⚙️ 环境变量配置

**必需的环境变量**:

- `VUE_APP_QWEN_API_KEY`: 你的通义千问 API 密钥

**配置方法**:

1. **自动配置**: 运行 `npm run setup` 自动配置
2. **手动配置**: 创建 `.env.development` 文件
3. **验证配置**: 运行 `npm run test-config` 检查配置
4. **Vercel 部署**: 在项目设置中添加环境变量

详见: [CONFIG_GUIDE.md](./CONFIG_GUIDE.md)

## 🎭 个性化定制

你的 AI 助手会根据以下设置来回复：

### 基本信息

- **姓名**: 智创云 AI
- **昵称**: 小智
- **年龄**: 25 岁
- **性别**: 男

### 性格特点

- 友好热情
- 专业可靠
- 幽默风趣
- 乐于助人
- 善于倾听
- 有创造力

### 兴趣爱好

- 编程开发
- 人工智能
- 阅读科技书籍
- 户外运动
- 咖啡文化
- 音乐欣赏

### 专业技能

- Vue.js 前端开发
- Node.js 后端开发
- AI 模型集成
- 系统架构设计
- 技术写作
- 项目管理

### 沟通风格

- 语气：轻松友好
- 语言：中文
- 表情符号：适量使用
- 回复长度：适中

**你可以在 `src/api/ai.js` 中修改这些设置，让 AI 更像你本人！**

## 📁 项目结构

```
智创云AI/
├── src/
│   ├── views/AiChat.vue      # AI聊天界面
│   ├── api/ai.js             # AI API调用
│   ├── composables/          # Vue组合函数
│   └── components/           # UI组件
├── public/                   # 静态资源
├── dist/                     # 构建输出
├── setup-env.sh             # 环境变量配置脚本
├── deploy-frontend.sh       # Vercel部署脚本
├── test-config.js           # 配置测试脚本
├── CONFIG_GUIDE.md          # 配置指南
└── package.json             # 项目配置
```

## 🎯 使用说明

1. **配置 API 密钥** - 获取通义千问 API 密钥并配置环境变量
2. **个性化定制** - 修改 AI 的性格和背景信息
3. **本地测试** - 运行 `npm run serve` 测试功能
4. **部署上线** - 使用 Vercel 一键部署
5. **分享体验** - 把链接发给朋友，让他们体验你的专属 AI！

## 💰 费用说明

- **通义千问**: 免费试用额度，超出后按量付费
- **Vercel**: 免费额度足够个人使用
- **总体成本**: 0 元/月

## 🔧 高级配置

### 修改 AI 性格

编辑 `src/api/ai.js` 中的 `generateSystemPrompt()` 函数

### 调整 AI 参数

- `temperature`: 0.8 (创造性)
- `max_tokens`: 2000 (回复长度)

### 添加新功能

- 在 `src/views/` 中添加新页面
- 在 `src/api/ai.js` 中添加新功能

## 📞 技术支持

- **通义千问文档**: https://help.aliyun.com/zh/dashscope/
- **Vercel 文档**: https://vercel.com/docs
- **Vue.js 文档**: https://vuejs.org

---

**🎈 现在就开始创建你的专属 AI 助手吧！**

你的 AI 会以你的性格、爱好和专业技能与人对话，让别人感觉就像在和你本人聊天一样！🚀
