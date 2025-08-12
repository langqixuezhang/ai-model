<template>
  <div id="app">
    <router-view v-slot="{ Component, route }">
      <component
        :is="route.path === '/login' ? Component : BasicLayout"
        v-if="route.path === '/login'"
      />
      <BasicLayout v-else>
        <component :is="Component" />
      </BasicLayout>
    </router-view>
  </div>
</template>

<script>
  import BasicLayout from './layouts/BasicLayout.vue'

  export default {
    name: 'App',
    components: {
      BasicLayout,
    },
  }
</script>

<style>
  html,
  body,
  #app {
    height: 100%;
    margin: 0;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
      'Noto Sans', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji',
      sans-serif;
  }
</style>
