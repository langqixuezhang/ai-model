<template>
  <div class="layout">
    <header class="header">My App</header>
    <main class="main">
      <slot />
    </main>
  </div>
</template>

<script>
  export default { name: 'BasicLayout' }
</script>

<style scoped>
  .layout {
    display: grid;
    grid-template-rows: 56px 1fr;
    min-height: 100vh;
  }
  .header {
    background: #0f172a;
    color: white;
    display: flex;
    align-items: center;
    padding: 0 16px;
  }
  .main {
    padding: 16px;
  }
</style>
