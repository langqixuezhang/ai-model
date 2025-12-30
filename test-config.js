// 测试环境变量配置
require('dotenv').config({ path: '.env.development' })

console.log('🔧 智创云AI - 环境变量测试')
console.log('=============================')

const apiKey = process.env.VUE_APP_QWEN_API_KEY

if (!apiKey) {
  console.log('❌ 未找到 VUE_APP_QWEN_API_KEY 环境变量')
  console.log('')
  console.log('🔧 请运行以下命令配置环境变量：')
  console.log('   ./setup-env.sh')
  console.log('   或')
  console.log('   npm run setup')
  console.log('')
  console.log('📖 详细配置指南请查看: CONFIG_GUIDE.md')
  process.exit(1)
}

if (!apiKey.startsWith('sk-')) {
  console.log('⚠️  API密钥格式可能不正确')
  console.log('   正常的通义千问API密钥应该以 "sk-" 开头')
  console.log('   当前配置:', apiKey.substring(0, 10) + '...')
  console.log('')
  console.log('🔧 如需重新配置，请运行:')
  console.log('   ./setup-env.sh')
}

console.log('✅ 环境变量配置正确')
console.log('🔑 API密钥:', apiKey.substring(0, 10) + '...' + apiKey.slice(-4))
console.log('')
console.log('🚀 现在可以启动应用了：')
console.log('   npm run serve')
console.log('')
console.log('📖 如遇问题请查看: CONFIG_GUIDE.md')
