<script lang="ts" setup>
  import itemVue from './_source/item.vue'
  import { ref } from 'vue'
  const sideMenuList = ref([
    {
      label: '热门对战统计',
      icon: 'icon-duizhanpingtai',
      path: '/dashboard'
    },
    {
      label: '选手行为分析',
      icon: 'icon-fenxi',
      path: '/analysys'
    }
  ])
</script>
<template>
  <div class="sider-menu">
    <itemVue v-for="item in sideMenuList" :key="item.label" :label="item.label" :icon="item.icon" :path="item.path"></itemVue>
  </div>
</template>

<style lang="scss">
  .sider-menu {
    width: 100%;
    padding: 0 16px;
  }
</style>