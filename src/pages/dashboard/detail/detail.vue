<template>
  <div class="dashboard-detail">
    <div class="header">
      <span  @click="back" class="back"><i class="iconfont icon-fanhui"></i></span>
      
    </div>
  </div>
</template>

<script setup>
  import { onMounted, ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router'
  import io from '@/utils/request'

  const route = useRoute()
  const router = useRouter()

  const battleId = ref()
  const playerId = ref()
  const datas = ref({})

  const back = () => {
    router.push({
      name: 'dashboardRank',
      params: {
        id: battleId.value
      }
    })
  }

  onMounted(() => {
    if (route.params.battleId) {
      battleId.value = route.params.battleId
      playerId.value = route.params.playerId
      io.get(`/battleplayer?battleId=${battleId.value}&playerId=${playerId.value}`).then(res => {
        datas.value = res.result || []
      })
    }
  })
</script>

<style lang="scss">
  .header {
    height: 20px;
    line-height: 20px;
    padding-bottom: 12px;
    .iconfont {
      font-size: 20px;
      color: #999;
      cursor: pointer;
    }
  }
</style>