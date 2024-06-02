<template>
  <div class="dashboard-detail">
    <div class="hd">
      <span class="back" @click="back"><i class="iconfont icon-fanhui"></i></span>
      <span class="title"><span class="camp-name">CTZ战队</span> - <span class="camp-name">MJS战队</span> 对战详情</span>
      <span class="time" v-if="overviewData">（{{ overviewData.startTime }} - {{ overviewData.endTime }}）</span>
    </div>
    <ul class="view-tab">
      <li class="tab-item" 
        v-for="item in [{label: '对战总览', id: '1'}, {label: '选手排名', id: '2'}]"
        @click="viewTab = item.id"
        :class="item.id===viewTab && 'active'">{{ item.label }}
      </li>
    </ul>
    <div class="md">
      <overview v-show="viewTab==='1'" :datas="overviewData"></overview>
      <playerlist v-show="viewTab==='2'" :datas="rankData"></playerlist>
    </div>
  </div>
</template>

<script setup>
  import { onMounted, ref, onActivated, nextTick, onUnmounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router'
  import { find, orderBy } from 'lodash'
  import io from '@/utils/request'
  import overview from './_source/overview.vue'
  import playerlist from './_source/playerlist.vue'

  const route = useRoute()
  const router = useRouter()
  const overviewData = ref({})
  const rankData = ref([])
  const viewTab = ref('1')

  const back = () => {
    router.push({
      name: 'dashboardIndex'
    })
  }
  const battleId = ref()

  const init = () => {
    battleId.value = route.params.id
    if (battleId.value) {
      io.get('/battle/list').then(res => {
        overviewData.value = find(res.result, o => o.id == battleId.value)
      })
      io.get(`/battlerank?battleId=${battleId.value}`).then(res => {
        rankData.value = orderBy(res.result, ['score'], ['desc'])
      })
    }
  }

  onMounted(() => {
    init()
  })

</script>

<script>
  import { useKeepPageStore } from '@/stores/useKeepPageStore'
  const keepPageStore = useKeepPageStore()
  
  export default {
    name: 'rankDetailVue',
    beforeRouteEnter(to, from) {
      keepPageStore.addInclude('rankDetailVue')
    },
    beforeRouteLeave(to, from) {
      if (to.name !== 'playerDetail') {
        keepPageStore.removeInclude('rankDetailVue')
      }
    }
  }
</script>

<style lang="scss">
.dashboard-detail {
  display: flex;
  flex-direction: column;
  .hd {
    height: 20px;
    line-height: 20px;
    margin-bottom: 12px;
    .iconfont {
      font-size: 20px;
      color: #999;
      cursor: pointer;
      position: relative;
      top: 2px;
      margin-right: 8px;
    }
    .title {
      font-size: 12px;
      color: #333;
      .camp-name {
        display: inline-block;
        border: 1px solid #3375b9;
        padding: 0 4px;
        border-radius: 2px;
        font-size: 12px;
        color: #3375b9;
        line-height: 16px;
      }
    }
    .time {
      color: #999;
      font-size: 12px;
    }
  }
  .view-tab {
    width: 100%;
    border-bottom: 1px solid #EAF0F3;
    padding-top: 12px;
    height: 46px;
    display: inline-flex;
    position: relative;
    padding-left: 24px;
    font-size: 12px;
    margin-bottom: 0;
    .tab-item {
      position: relative;
      bottom: -2px;
      width: 96px;
      height: 32px;
      border: 1px solid #E2E2E2;
      list-style: none;
      text-align: center;
      line-height: 30px;
      cursor: pointer;
      &:not(:last-child) {
        border-right: none;
      }
      &.active {
        border-bottom: 1px solid #fff;
        border-top: 3px solid #3375b9;
        color: #3375b9;
      }
    }
  }
  .md {
    flex: 1;
  }
}
  
</style>