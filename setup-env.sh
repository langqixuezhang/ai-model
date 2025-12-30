#!/bin/bash

echo "🔧 智创云AI - 环境变量配置脚本"
echo "================================"

# 检查是否已经存在环境变量文件
if [ -f ".env.development" ]; then
    echo "⚠️  发现已存在的 .env.development 文件"
    read -p "是否要覆盖现有配置？(y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "❌ 配置取消"
        exit 1
    fi
fi

echo "🔑 配置通义千问API密钥"
echo ""
echo "获取API密钥步骤："
echo "1. 访问: https://dashscope.aliyun.com/"
echo "2. 注册阿里云账号并开通DashScope服务"
echo "3. 在控制台创建API-KEY"
echo "4. 复制生成的密钥（格式类似：sk-xxx...）"
echo ""

# 提示用户输入API密钥
read -p "请输入你的通义千问API密钥 (sk-xxx...): " api_key

if [ -z "$api_key" ]; then
    echo "❌ API密钥不能为空"
    exit 1
fi

# 验证API密钥格式
if [[ ! $api_key =~ ^sk- ]]; then
    echo "⚠️  API密钥格式不正确，通常以 'sk-' 开头"
    read -p "确定要继续吗？(y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "❌ 配置取消"
        exit 1
    fi
fi

# 创建环境变量文件
cat > .env.development << EOF
# 智创云AI应用开发环境配置

# 通义千问AI API密钥
VUE_APP_QWEN_API_KEY=${api_key}

# 应用配置
VUE_APP_TITLE=智创云AI
VUE_APP_VERSION=1.0.0
EOF

echo "✅ 环境变量配置完成！"
echo ""
echo "📁 创建的文件: .env.development"
echo "🤖 AI服务商: 通义千问 (Qwen)"
echo "🔑 配置的API密钥: ${api_key:0:10}..."
echo ""
echo "🚀 现在可以启动应用了："
echo "   npm run serve"
echo ""
echo "📖 更多配置信息请查看: CONFIG_GUIDE.md"
