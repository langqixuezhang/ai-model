# 🔧 配置指南 - 解决 API 密钥问题

## 🚨 当前问题

应用报错：`通义千问API密钥未配置，请在环境变量中设置 VUE_APP_QWEN_API_KEY`

## ✅ 解决方案

### 第一步：获取通义千问 API 密钥

1. **访问阿里云控制台**: https://dashscope.aliyun.com/
2. **注册账号**: 使用手机号或邮箱注册阿里云账号
3. **开通 DashScope 服务**: 进入控制台开通 DashScope 服务
4. **创建 API 密钥**: 在 API-KEY 管理页面创建新的 API-KEY
5. **复制密钥**: 复制生成的密钥（格式类似：`sk-xxx...`）

### 第二步：配置环境变量

#### 方法 1：本地开发配置

在项目根目录创建 `.env.development` 文件：

```bash
# 创建文件
touch .env.development

# 编辑文件内容
VUE_APP_QWEN_API_KEY=sk-your-actual-api-key-here
VUE_APP_TITLE=智创云AI
VUE_APP_VERSION=1.0.0
```

**注意**：

- 文件名是 `.env.development`（前面有个点）
- `VUE_APP_QWEN_API_KEY` 后面直接跟你的 API 密钥
- 保存文件后重启开发服务器

#### 方法 2：使用命令创建

```bash
# macOS/Linux
echo "VUE_APP_QWEN_API_KEY=sk-your-actual-api-key-here" > .env.development

# Windows PowerShell
echo "VUE_APP_QWEN_API_KEY=sk-your-actual-api-key-here" | Out-File -FilePath .env.development -Encoding UTF8
```

### 第三步：重启应用

配置完成后，重启开发服务器：

```bash
# 停止当前服务器 (Ctrl+C)
# 重新启动
npm run serve
```

### 第四步：测试配置

1. 打开浏览器访问 http://localhost:8080
2. 进入 AI 聊天页面
3. 发送消息："你好，请介绍一下自己"
4. 如果 AI 正常回复，说明配置成功！

## 🔧 Vercel 部署配置

如果要部署到 Vercel，需要在 Vercel 控制台配置环境变量：

1. 进入 Vercel 项目设置
2. 找到 "Environment Variables"
3. 添加变量：
   - **Name**: `VUE_APP_GROQ_API_KEY`
   - **Value**: `gsk_your-actual-api-key-here`
4. 保存并重新部署

## 🐛 常见问题

### 问题 1：配置了还是报错

**解决**：

- 确保文件名是 `.env.development`（前面有句点）
- 确保变量名是 `VUE_APP_GROQ_API_KEY`
- 重启开发服务器
- 检查 API 密钥是否正确

### 问题 2：API 密钥无效

**解决**：

- 检查 API 密钥是否完整复制
- 确认密钥格式正确（以 `gsk_` 开头）
- 重新生成新的 API 密钥

### 问题 3：网络问题

**解决**：

- 检查网络连接
- 尝试使用 VPN 访问 Groq
- 确认防火墙没有阻止 API 请求

## 📞 获取帮助

如果问题仍然存在：

1. 检查浏览器开发者工具的 Console 错误
2. 确认 API 密钥在 Groq 控制台中有效
3. 尝试重新生成 API 密钥

---

**🎯 配置完成后，你就可以正常使用 AI 聊天功能了！**
