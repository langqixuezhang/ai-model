#!/bin/bash

echo "🚀 智创云AI - 前端部署脚本"
echo "================================"

# 检查是否安装了Vercel CLI
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI 未安装，正在安装..."
    npm install -g vercel
fi

# 检查是否已登录
if ! vercel whoami &> /dev/null; then
    echo "🔐 请先登录 Vercel:"
    vercel login
fi

echo "📦 构建项目..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ 构建失败，请检查错误信息"
    exit 1
fi

echo "🌐 部署到 Vercel..."
vercel --prod

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ 部署成功！"
    echo "🔗 访问上面的链接即可体验智创云AI"
    echo ""
    echo "⚠️ 重要提醒："
    echo "   请确保在Vercel项目设置中配置了环境变量："
    echo "   VUE_APP_QWEN_API_KEY=你的通义千问API密钥"
    echo ""
    echo "🔧 Vercel环境变量配置步骤："
    echo "   1. 访问: https://vercel.com/dashboard"
    echo "   2. 选择你的项目"
    echo "   3. 点击 'Settings' -> 'Environment Variables'"
    echo "   4. 添加变量: VUE_APP_QWEN_API_KEY"
    echo "   5. 值填写你的通义千问API密钥 (sk-xxx...)"
    echo "   6. 保存后重新部署"
    echo ""
    echo "📖 详细配置请参考: ENV_SETUP.md"
else
    echo "❌ 部署失败，请检查错误信息"
    exit 1
fi
