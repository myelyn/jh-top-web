<template>
  <el-tooltip v-if="text==='MVP'" placement="top">
    <template #content>斩获全场MVP</template>
    <span class="tag-y tag-mvp"><i class="iconfont icon-MVP1"></i>{{ text }}</span>
  </el-tooltip>
  <el-tooltip v-else-if="text==='杀人王'" placement="top">
    <template #content>杀人数第一名</template>
    <span class="tag-y tag-mtb"><i class="iconfont"></i>{{ text }}</span>
  </el-tooltip>
  <el-tooltip v-else-if="text==='满头包'" placement="top">
    <template #content>这场我死最惨</template>
    <span class="tag-n tag-mtb"><i class="iconfont icon-kelian"></i>{{ text }}</span>
  </el-tooltip>
  <el-tooltip v-else-if="text==='挨最毒的打'" placement="top">
    <template #content>妈妈他们都打我</template>
    <span class="tag-n tag-mtb"><i class="iconfont icon-kelian"></i>{{ text }}</span>
  </el-tooltip>
  <span v-else-if="['超硬', '无私奉献', '最强辅助', '解除最多', '无限火力'].includes(text)" class="tag-y tag-mtb">{{ text }}</span>
  <span v-else class="tag-n tag-mtb">{{ text }}</span>
</template>

<script setup>
  defineProps({
    text: {
      type: String,
      default: ''
    }
  })
</script>

<style lang="scss" scoped>
  .tag-y {
    display: inline-block;
    position: relative;
    border: 1px solid #f15f5f;
    color: #ff7322;
    border-radius: 2px;
    margin-right: 4px;
    margin-bottom: 4px;
    padding: 0 2px;
    font-size: 12px;
  }
  .tag-n {
    display: inline-block;
    position: relative;
    border: 1px solid #8b908b;
    color: #8b908b;;
    border-radius: 2px;
    margin-right: 4px;
    margin-bottom: 4px;
    padding: 0 2px;
    font-size: 12px;
  }
  .tag-mvp {
    color: #ff7322;
  }
  .tag-mtb {
    .iconfont {
      position: relative;
      top: 2px;
    }
  }
</style>