<template>
  <div class="dashboard">
    <div class="welcome-section">
      <h1>欢迎使用</h1>
      <p>选择下面的功能开始使用</p>
    </div>

    <div class="features-grid">
      <router-link to="/chat" class="feature-card chat-card">
        <div class="feature-icon">💬</div>
        <h3>聊天</h3>
        <p>排忧解惑</p>
        <div class="feature-arrow">→</div>
      </router-link>

      <router-link to="/ppt" class="feature-card ppt-card">
        <div class="feature-icon">📊</div>
        <h3>PPT生成</h3>
        <p>输入主题，自动生成专业的PPT内容和结构</p>
        <div class="feature-arrow">→</div>
      </router-link>
    </div>

    <div class="quick-stats">
      <div class="stat-card">
        <div class="stat-number">1</div>
        <div class="stat-label">可用功能</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">1/7</div>
        <div class="stat-label">在线服务</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'MainDashboard',
  }
</script>

<style scoped>
  .dashboard {
    padding: 24px;
  }

  .welcome-section {
    text-align: center;
    margin-bottom: 40px;
  }

  .welcome-section h1 {
    font-size: 32px;
    font-weight: 700;
    color: #1e293b;
    margin: 0 0 8px;
  }

  .welcome-section p {
    font-size: 18px;
    color: #64748b;
    margin: 0;
  }

  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 24px;
    margin-bottom: 40px;
  }

  .feature-card {
    background: white;
    padding: 32px;
    border-radius: 16px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    text-decoration: none;
    color: inherit;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }

  .feature-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.1);
  }

  .chat-card {
    border-left: 4px solid #3b82f6;
  }

  .chat-card:hover {
    border-left-color: #2563eb;
  }

  .ppt-card {
    border-left: 4px solid #8b5cf6;
  }

  .ppt-card:hover {
    border-left-color: #7c3aed;
  }

  .feature-icon {
    font-size: 48px;
    margin-bottom: 16px;
  }

  .feature-card h3 {
    font-size: 24px;
    font-weight: 600;
    color: #1e293b;
    margin: 0 0 12px;
  }

  .feature-card p {
    color: #64748b;
    line-height: 1.6;
    margin: 0 0 20px;
  }

  .feature-arrow {
    position: absolute;
    top: 24px;
    right: 24px;
    font-size: 24px;
    color: #94a3b8;
    transition: all 0.3s ease;
  }

  .feature-card:hover .feature-arrow {
    color: #3b82f6;
    transform: translateX(4px);
  }

  .quick-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 20px;
  }

  .stat-card {
    background: white;
    padding: 24px;
    border-radius: 12px;
    text-align: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }

  .stat-number {
    font-size: 32px;
    font-weight: 700;
    color: #3b82f6;
    margin-bottom: 8px;
  }

  .stat-label {
    font-size: 14px;
    color: #64748b;
    font-weight: 500;
  }
</style>
