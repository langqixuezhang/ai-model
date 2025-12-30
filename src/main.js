import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

// 按需导入Element Plus组件（推荐）
import { ElButton, ElInput, ElMessage } from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)
app.use(createPinia())
app.use(router)

// 注册需要的组件
app.component(ElButton.name, ElButton)
app.component(ElInput.name, ElInput)

// 配置$message到全局属性
app.config.globalProperties.$message = ElMessage

app.mount('#app')
