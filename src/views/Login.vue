<template>
  <div class="login-page">
    <div class="card">
      <div class="tabs">
        <button :class="{ active: isLogin }" @click="switchToLogin" type="button">登录</button>
        <button :class="{ active: !isLogin }" @click="switchToRegister" type="button">注册</button>
      </div>

      <!-- 登录表单 -->
      <form v-if="isLogin" @submit.prevent="onLoginSubmit">
        <h2>登录</h2>
        <label>
          用户名
          <input
            v-model.trim="username"
            placeholder="输入用户名"
            autocomplete="username"
            required
          />
        </label>
        <label>
          密码
          <input
            type="password"
            v-model.trim="password"
            placeholder="输入密码"
            autocomplete="current-password"
            required
          />
        </label>
        <button :disabled="loading" type="submit">{{ loading ? '登录中...' : '登录' }}</button>
        <p v-if="error" class="error">{{ error }}</p>
      </form>

      <!-- 注册表单 -->
      <form v-else @submit.prevent="onRegisterSubmit">
        <h2>注册</h2>
        <label>
          用户名
          <input
            v-model.trim="username"
            placeholder="输入用户名"
            autocomplete="username"
            required
          />
        </label>
        <label>
          昵称
          <input v-model.trim="nickname" placeholder="输入昵称" autocomplete="nickname" />
        </label>
        <label>
          邮箱
          <input type="email" v-model.trim="email" placeholder="输入邮箱" autocomplete="email" />
        </label>
        <label>
          密码
          <input
            type="password"
            v-model.trim="password"
            placeholder="输入密码"
            autocomplete="new-password"
            required
          />
        </label>
        <label>
          确认密码
          <input
            type="password"
            v-model.trim="confirmPassword"
            placeholder="再次输入密码"
            autocomplete="new-password"
            required
          />
        </label>
        <button :disabled="loading" type="submit">{{ loading ? '注册中...' : '注册' }}</button>
        <p v-if="error" class="error">{{ error }}</p>
      </form>
    </div>
  </div>
</template>

<script>
  import { ref } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  import { useUserStore } from '../stores/user'
  import { loginApi, fetchProfileApi } from '../api/auth'
  import { ElMessage } from 'element-plus'

  export default {
    name: 'LoginPage',
    setup() {
      const router = useRouter()
      const route = useRoute()
      const store = useUserStore()

      // 表单状态
      const isLogin = ref(true)
      const username = ref('')
      const password = ref('')
      const confirmPassword = ref('')
      const nickname = ref('')
      const email = ref('')
      const loading = ref(false)
      const error = ref('')

      // 切换到登录
      const switchToLogin = () => {
        isLogin.value = true
        error.value = ''
        username.value = ''
        password.value = ''
        confirmPassword.value = ''
        nickname.value = ''
        email.value = ''
      }

      // 切换到注册
      const switchToRegister = () => {
        isLogin.value = false
        error.value = ''
        username.value = ''
        password.value = ''
        confirmPassword.value = ''
        nickname.value = ''
        email.value = ''
      }

      // 登录提交
      const onLoginSubmit = async () => {
        error.value = ''
        if (!username.value || !password.value) {
          error.value = '请输入用户名和密码'
          return
        }
        loading.value = true
        try {
          const data = await loginApi({ username: username.value, password: password.value })
          store.setToken(data.token)
          const profile = await fetchProfileApi()
          store.setProfile(profile)
          ElMessage.success('登录成功！')
          const redirect = route.query && route.query.redirect ? String(route.query.redirect) : '/'
          router.replace(redirect)
        } catch (e) {
          error.value = e?.response?.data?.message || e?.message || '登录失败'
        } finally {
          loading.value = false
        }
      }

      // 注册提交
      const onRegisterSubmit = async () => {
        error.value = ''
        if (!username.value || !password.value) {
          error.value = '请输入用户名和密码'
          return
        }
        if (password.value !== confirmPassword.value) {
          error.value = '两次输入的密码不一致'
          return
        }
        if (password.value.length < 6) {
          error.value = '密码长度至少6位'
          return
        }

        loading.value = true
        try {
          // 这里需要添加注册API调用
          // const data = await registerApi({ username: username.value, password: password.value, nickname: nickname.value, email: email.value })
          // 暂时显示注册成功消息
          ElMessage.success('注册功能即将上线，敬请期待！')
        } catch (e) {
          error.value = e?.response?.data?.message || e?.message || '注册失败'
        } finally {
          loading.value = false
        }
      }

      return {
        isLogin,
        username,
        password,
        confirmPassword,
        nickname,
        email,
        loading,
        error,
        switchToLogin,
        switchToRegister,
        onLoginSubmit,
        onRegisterSubmit,
      }
    },
  }
</script>

<style scoped>
  .login-page {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f5f7fb;
  }
  .card {
    width: 420px;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
    padding: 24px 24px 28px;
  }

  /* 标签页样式 */
  .tabs {
    display: flex;
    margin-bottom: 20px;
    border-bottom: 1px solid #e5e7eb;
  }

  .tabs button {
    flex: 1;
    padding: 12px 0;
    border: none;
    background: transparent;
    font-size: 16px;
    font-weight: 500;
    color: #6b7280;
    cursor: pointer;
    transition: all 0.2s;
    border-bottom: 2px solid transparent;
  }

  .tabs button.active {
    color: #667eea;
    border-bottom-color: #667eea;
  }

  .tabs button:hover:not(.active) {
    color: #374151;
  }
  h2 {
    margin: 0 0 16px;
    font-weight: 600;
  }
  form {
    display: grid;
    gap: 12px;
  }
  label {
    display: grid;
    gap: 6px;
    text-align: left;
    color: #333;
  }
  input {
    height: 38px;
    padding: 0 12px;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
  }
  button {
    height: 40px;
    background: #3b82f6;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
  }
  button[disabled] {
    opacity: 0.7;
    cursor: not-allowed;
  }
  .error {
    color: #ef4444;
    font-size: 13px;
  }
</style>
