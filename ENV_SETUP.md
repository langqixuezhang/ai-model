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

## 🌐 Vercel 部署环境变量配置

### 方法 1：通过 Vercel 控制台配置（推荐）

1. **访问 Vercel 控制台**：

   ```
   https://vercel.com/dashboard
   ```

2. **选择你的项目**：

   - 点击你的项目名称

3. **进入设置页面**：

   - 点击 "Settings" 选项卡
   - 点击左侧菜单中的 "Environment Variables"

4. **添加环境变量**：

   - 点击 "Add New" 按钮
   - **Name**: `VUE_APP_QWEN_API_KEY`
   - **Value**: 你的通义千问 API 密钥（`sk-xxx...`）
   - **Environment**: 选择 `Production`、`Preview`、`Development`（建议都选）
   - 点击 "Save"

5. **重新部署**：
   - 环境变量修改后需要重新部署才能生效
   - 点击 "Deployments" 选项卡
   - 点击最新的部署
   - 点击 "Redeploy" 按钮

### 方法 2：通过 Vercel CLI 配置

如果你安装了 Vercel CLI，可以使用命令行配置：

```bash
# 设置生产环境变量
vercel env add VUE_APP_QWEN_API_KEY

# 设置所有环境
vercel env add VUE_APP_QWEN_API_KEY --environment production,preview,development
```

### 🔍 验证部署配置

部署完成后：

1. **访问你的 Vercel 应用**
2. **打开 AI 聊天页面**
3. **发送一条消息测试**

如果 AI 能够正常回复，说明部署配置成功！

### ⚠️ 常见问题

**Q: 部署后仍然提示 API 密钥未配置？**
A: 请检查：

- 环境变量名称是否正确：`VUE_APP_QWEN_API_KEY`
- 环境变量值是否正确（以 `sk-` 开头）
- 是否选择了正确的环境（Production）
- 是否重新部署了应用

**Q: 如何查看 Vercel 环境变量？**
A: 在项目设置页面的 "Environment Variables" 部分可以查看和编辑所有环境变量。

**Q: 环境变量修改后多久生效？**
A: 需要重新部署应用才能生效，通常需要 1-2 分钟。
