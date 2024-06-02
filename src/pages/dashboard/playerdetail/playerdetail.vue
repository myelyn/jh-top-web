<template>
  <div class="dashboard-detail">
    <div class="header">
      <span  @click="back" class="back"><i class="iconfont icon-fanhui"></i></span>
      <span class="username">{{ datas.name }}</span>
      <span class="title">本场数据</span>
      <span class="time">（{{ datas.startTime }} - {{ datas.endTime }}）</span>
    </div>
    <div class="md">
      <div class="number-table">
        <div class="item" v-for="item in table1">
          <div class="tit">{{ item.label }}</div>
          <div class="cnt">{{ datas[item.key] }}</div>
        </div>
      </div>
      <div class="detail-table">
        <div class="long-item" v-for="item in table2">
          <div class="tit">{{ item.label }}</div>
          <div class="cnt" v-html="formatItem(datas[item.key])"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { onMounted, ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router'
  import { orderBy } from 'lodash'
  import io from '@/utils/request'

  const route = useRoute()
  const router = useRouter()

  const battleId = ref()
  const playerId = ref()
  const datas = ref({})

  const back = () => {
    router.push({
      name: 'rankDetail',
      params: {
        id: battleId.value
      }
    })
  }

  const formatItem = (obj) => {
    if (!obj) {
      return
    }
    let str = ''
    const arr = []
    Object.keys(obj).forEach(key => {
      arr.push({
        name: key,
        value: obj[key]
      })
    })
    orderBy(arr, ['value'], ['desc']).forEach(item => {
      str += `<span style="margin-right: 10px;">${item.name}: ${item.value}</span>`
    })
    return str
  }

  const table1 = ref([{
    label: '杀人总数',
    key: 'k'
  },{
    label: '死亡总数',
    key: 'd'
  },{
    label: '助攻总数',
    key: 'a'
  },{
    label: '承伤总数',
    key: 's'
  },{
    label: '综合评分',
    key: 'score'
  },{
    label: 'KDA',
    key: 'kda'
  },{
    label: '每死承伤',
    key: 'mscs'
  },{
    label: '招杀人数',
    key: 'k_zs'
  },{
    label: '毒杀人数',
    key: 'k_ds'
  },{
    label: '法器杀人数',
    key: 'k_fq'
  },{
    label: '小孩杀人数',
    key: 'k_xh'
  },{
    label: '用解除数',
    key: 'a_jc'
  },{
    label: '用陷害数',
    key: 'a_xh'
  },{
    label: '用吸血数',
    key: 'a_xx'
  },{
    label: '用死神数',
    key: 'a_ss'
  },{
    label: '用霹雳数',
    key: 'a_pl'
  },{
    label: '用法器数',
    key: 'a_fq'
  },{
    label: '自杀',
    key: 'suicide'
  }])

  const table2 = ref([
  {
    label: '我杀的人明细',
    key: 'killNames'
  },{
    label: '杀我的人明细',
    key: 'killByNames'
  },{
    label: '我用卡片/配药/法器的人明细',
    key: 'operationNames'
  },{
    label: '对我用卡片/配药/法器的人明细',
    key: 'operationByNames'
  }
  ])

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

<script>
  import { useKeepPageStore } from '@/stores/useKeepPageStore'
  const keepPageStore = useKeepPageStore()
  export default {
    beforeRouteLeave(to, from) {
      if (to.name !== 'rankDetail') {
        keepPageStore.removeInclude('rankDetailVue')
      }
    }
  }
</script>

<style lang="scss" scoped>
.dashboard-detail {
  .header {
    height: 20px;
    line-height: 20px;
    padding-bottom: 12px;
    font-size: 12px;
    .iconfont {
      font-size: 20px;
      color: #999;
      cursor: pointer;
    }
    .time {
      color: #999;
    }
    .username {
      color: #3375b9;
      font-size: 14px;
      font-weight: bold;
      margin-left: 10px;
      margin-right: 4px;
    }
    .title {
      color:  #333;
    }
  }
  .md {
    padding: 24px 16px;
    line-height: 26px;
    .item, .long-item {
      display: inline-flex;
      .tit {
        width: 100px;
        font-size: 12px;
        line-height: 20px;
        color: #999;
      }

      .cnt {
        flex: 1;
        padding-left: 20px;
        color: #333;
        font-size: 12px;
      }
    }
    
    .number-table {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      >.item {
        width: 33%;
        .cnt {
          font-weight: bold;
          color: #3375b9;
        }
      }
    }
    .detail-table {
      >.long-item {
        width: 100%;
      }
    }
  }
}
</style>