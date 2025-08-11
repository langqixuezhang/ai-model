<template>
  <div class="dashboard">
    <div class="topbar">
      <div class="brand">My App</div>
      <div class="actions">
        <span v-if="user?.profile">你好，{{ user.profile.nickname || user.profile.username }}</span>
        <button @click="onLogout">退出登录</button>
      </div>
    </div>
    <div class="content">
      <h1>受保护页面</h1>
      <p>这是一个仅登录后可访问的页面。</p>
    </div>
  </div>
</template>

<script>
  import { useRouter } from 'vue-router'
  import { useUserStore } from '../stores/user'

  export default {
    name: 'MainDashboard',
    setup() {
      const router = useRouter()
      const user = useUserStore()
      const onLogout = () => {
        user.logout()
        router.replace('/login')
      }
      return { user, onLogout }
    },
  }
</script>

<style scoped>
  .dashboard {
    min-height: 100vh;
    background: #f8fafc;
  }
  .topbar {
    height: 56px;
    background: #111827;
    color: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;
  }
  .brand {
    font-weight: 600;
  }
  .actions {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .content {
    padding: 20px;
  }
  button {
    height: 32px;
    padding: 0 12px;
    border-radius: 6px;
    border: 1px solid #374151;
    background: #1f2937;
    color: white;
    cursor: pointer;
  }
  button:hover {
    background: #374151;
  }
</style>
