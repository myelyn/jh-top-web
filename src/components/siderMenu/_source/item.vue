<script setup>
  import { ref, watch } from 'vue'
  import { useRouter } from 'vue-router'

  const props = defineProps({
    label: String,
    icon: String,
    path: String
  })
  const isActive = ref(false)
  const router = useRouter()

  watch(() => router.currentRoute.value, (r) => {
    isActive.value = r.path.includes(props.path)
  }, {
    immediate: true
  })
</script>

<template>
  <div :class="['side-menu-item', isActive && 'active']">
    <router-link :to="path" tag="div">
      <i :class="['iconfont', icon]"></i>
      <span class="label-text">{{ label }}</span>
    </router-link>
  </div>
</template>

<style lang="scss" scoped>
  .side-menu-item {
    width: 100%;
    height: 32px;
    margin-bottom: 6px;
    >a {
      display: inline-flex;
      align-items: center;
      width: 150px;
      height: 100%;
      border-radius: 16px;
      padding-left: 19px;
      >.iconfont {
        margin-right: 10px;
        color: #999;
        font-size: 14px;
      }
      >.label-text {
        color: #333;
        font-size: 12px;
      }
    }
    &.active {
      >a {
        background-color: #e4eff9;
        >.iconfont {
          color: #3375b9;
        }
        >.label-text {
          color: #3375b9;
        }
      }
    }
  }
</style>