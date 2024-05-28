<template>
  <div class="dashboard-main">
    <el-row :gutter="10">
      <el-col v-for="item in list" :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
        <div class="grid-content">
          <div class="title">CTZ - MJS</div>
          <div class="result">
            <span :class="item.ctz.k > item.mjs.k ? 'red' : 'blue'">{{ item.ctz.k }}</span> : 
            <span :class="item.ctz.k < item.mjs.k ? 'red' : 'blue'">{{item.mjs.k }}</span></div>
            <div class="time">开始时间：{{ item.startTime }}</div>
            <div class="time">结束时间：{{ item.endTime}}</div>
            <div class="link"><a @click="goDetail(item.id)">>详细数据</a></div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'dashboardRankIndex'
  }
</script>
<script setup>
import { onMounted, ref } from 'vue';
import { orderBy } from 'lodash'
import { useRouter } from 'vue-router'
import io from '@/utils/request'

const router = useRouter()

const list = ref([])

const goDetail = (id) => {
  router.push({
    name: 'dashboardRank',
    params: {
      id
    }
  })
}

onMounted(() => {
  io.get('/battle/list').then(res => {
    list.value = orderBy(res.result, ['endTime'], ['desc'])
  })
})
</script>

<style lang="scss">
.dashboard-main {
  .grid-content {
    background: #eef3f8;
    border-radius: 6px;
    min-height: 36px;
    font-size: 12px;
    padding: 12px;
    text-align: center;
    position: relative;
    margin-bottom: 10px;
    .title {
      line-height: 20px;
      font-weight: bold;
      font-size: 14px;
    }

    .result {
      line-height: 40px;
      font-weight: bold;
      font-size: 24px;

      .red {
        color: red;
      }

      .blue {
        color: blue;
      }
    }

    .time {
      color: #999;
    }

    .link {
      position: absolute;
      top: 12px;
      right: 12px;
      color: #6E94F5;
      cursor: pointer;
    }
  }
}
</style>