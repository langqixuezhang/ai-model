<template>
  <div class="layout" :class="{ collapsed: isCollapsed }">
    <aside class="sidebar">
      <div class="sidebar-header">
        <div class="logo" v-show="!isCollapsed">AI助手</div>
        <div class="logo" v-show="isCollapsed">AI</div>
      </div>

      <nav class="nav">
        <router-link to="/chat" class="nav-item" :class="{ active: $route.path === '/chat' }">
          <span class="nav-icon">💬</span>
          <span class="nav-text" v-show="!isCollapsed">聊天</span>
        </router-link>

        <router-link to="/ppt" class="nav-item" :class="{ active: $route.path === '/ppt' }">
          <span class="nav-icon">📊</span>
          <span class="nav-text" v-show="!isCollapsed">生成</span>
        </router-link>
      </nav>

      <div class="sidebar-footer">
        <button @click="toggleSidebar" class="collapse-btn">
          {{ isCollapsed ? '→' : '←' }}
        </button>
      </div>
    </aside>

    <div class="main-content">
      <header class="topbar">
        <div class="breadcrumb">{{ currentPageTitle }}</div>
        <div class="user-info">
          <span v-if="user?.profile"
            >你好，{{ user.profile.nickname || user.profile.username }}</span
          >
          <button @click="onLogout" class="logout-btn">退出登录</button>
        </div>
      </header>

      <main class="content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script>
  import { computed, ref } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useUserStore } from '../stores/user'

  export default {
    name: 'BasicLayout',
    setup() {
      const route = useRoute()
      const router = useRouter()
      const user = useUserStore()
      const isCollapsed = ref(false)

      const currentPageTitle = computed(() => {
        const routeMap = {
          '/chat': 'AI聊天',
          '/ppt': 'AI PPT生成',
        }
        return routeMap[route.path] || '首页'
      })

      const toggleSidebar = () => {
        isCollapsed.value = !isCollapsed.value
      }

      const onLogout = () => {
        user.logout()
        router.replace('/login')
      }

      return { user, currentPageTitle, onLogout, isCollapsed, toggleSidebar }
    },
  }
</script>

<style scoped>
  .layout {
    display: grid;
    grid-template-columns: 250px 1fr;
    min-height: 100vh;
    background: #f8fafc;
    transition: grid-template-columns 0.3s ease;
  }

  .layout.collapsed {
    grid-template-columns: 80px 1fr;
  }

  .sidebar {
    background: #1e293b;
    color: white;
    padding: 20px 0 0;
    display: flex;
    flex-direction: column;
    transition: all 0.3s ease;
    overflow: hidden;
  }

  .sidebar-header {
    padding: 0 20px 20px;
    border-bottom: 1px solid #334155;
    margin-bottom: 20px;
  }

  .logo {
    font-size: 20px;
    font-weight: 600;
    text-align: center;
    transition: all 0.3s ease;
  }

  .nav {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 0 16px;
    flex: 1;
  }

  .nav-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
    border-radius: 8px;
    color: #cbd5e1;
    text-decoration: none;
    transition: all 0.2s;
    white-space: nowrap;
  }

  .nav-item:hover {
    background: #334155;
    color: white;
  }

  .nav-item.active {
    background: #3b82f6;
    color: white;
  }

  .nav-icon {
    font-size: 18px;
    flex-shrink: 0;
    width: 20px;
    text-align: center;
  }

  .nav-text {
    transition: opacity 0.3s ease;
  }

  .layout.collapsed .nav-text {
    opacity: 0;
  }

  .sidebar-footer {
    padding: 20px;
    border-top: 1px solid #334155;
    margin-top: auto;
    display: flex;
    justify-content: center;
  }

  .collapse-btn {
    width: 40px;
    height: 40px;
    background: #334155;
    border: none;
    border-radius: 8px;
    color: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    transition: all 0.2s;
  }

  .collapse-btn:hover {
    background: #475569;
    transform: scale(1.05);
  }

  .main-content {
    display: flex;
    flex-direction: column;
  }

  .topbar {
    height: 64px;
    background: white;
    border-bottom: 1px solid #e2e8f0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 24px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  .breadcrumb {
    font-size: 18px;
    font-weight: 600;
    color: #1e293b;
  }

  .user-info {
    display: flex;
    align-items: center;
    gap: 16px;
    color: #64748b;
  }

  .logout-btn {
    padding: 8px 16px;
    background: #ef4444;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    transition: background 0.2s;
  }

  .logout-btn:hover {
    background: #dc2626;
  }

  .content {
    flex: 1;
    padding: 24px;
    overflow-y: auto;
  }

  /* 响应式设计 */
  @media (max-width: 768px) {
    .layout {
      grid-template-columns: 1fr;
    }

    .layout.collapsed {
      grid-template-columns: 1fr;
    }

    .sidebar {
      position: fixed;
      left: 0;
      top: 0;
      height: 100vh;
      z-index: 1000;
      transform: translateX(-100%);
      transition: transform 0.3s ease;
    }

    .layout:not(.collapsed) .sidebar {
      transform: translateX(0);
    }

    .layout.collapsed .sidebar {
      transform: translateX(-100%);
    }
  }
</style>
