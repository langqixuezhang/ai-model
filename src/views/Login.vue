<template>
  <div class="login-page">
    <div class="card">
      <h2>登录</h2>
      <form @submit.prevent="onSubmit">
        <label>
          用户名
          <input v-model.trim="username" placeholder="输入用户名" autocomplete="username" />
        </label>
        <label>
          密码
          <input
            type="password"
            v-model.trim="password"
            placeholder="输入密码"
            autocomplete="current-password"
          />
        </label>
        <button :disabled="loading" type="submit">{{ loading ? '登录中...' : '登录' }}</button>
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

  export default {
    name: 'LoginPage',
    setup() {
      const router = useRouter()
      const route = useRoute()
      const store = useUserStore()
      const username = ref('admin')
      const password = ref('123456')
      const loading = ref(false)
      const error = ref('')

      const onSubmit = async () => {
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
          const redirect = route.query && route.query.redirect ? String(route.query.redirect) : '/'
          router.replace(redirect)
        } catch (e) {
          error.value = e?.response?.data?.message || e?.message || '登录失败'
        } finally {
          loading.value = false
        }
      }

      return { username, password, loading, error, onSubmit }
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
    width: 360px;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
    padding: 24px 24px 28px;
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
