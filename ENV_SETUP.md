# 🔧 环境变量配置指南

## 📋 必需配置

### 1. 获取 Groq API 密钥

1. **访问**: https://console.groq.com/keys
2. **注册**: 使用邮箱注册（无需 VPN）
3. **验证**: 点击邮箱验证链接
4. **创建密钥**: "Create API Key"
5. **复制**: 复制生成的 API 密钥

### 2. 配置环境变量

#### 本地开发

创建 `.env.development` 文件：

```bash
# .env.development
VUE_APP_GROQ_API_KEY=gsk_your-actual-key-here
VUE_APP_TITLE=智创云AI
VUE_APP_VERSION=1.0.0
```

#### Vercel 部署

在 Vercel 项目设置中添加：

- **变量名**: `VUE_APP_GROQ_API_KEY`
- **变量值**: `gsk_your-actual-key-here`

## 🔒 安全注意事项

- ✅ **不要提交真实 API 密钥**到代码仓库
- ✅ **使用环境变量**而不是硬编码
- ✅ **定期轮换**API 密钥以增强安全性
- ✅ **监控使用量**避免意外费用（虽然 Groq 是免费的）

## 🧪 测试配置

运行以下命令测试配置是否正确：

```bash
# 启动应用
npm run serve

# 在浏览器中打开AI聊天页面
# 发送消息测试AI回复
```

如果看到 AI 正常回复，说明配置成功！🎉
