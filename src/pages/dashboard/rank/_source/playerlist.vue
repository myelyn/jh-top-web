<template>
  <div class="playerlist-wrapper">
    <div class="overview-table">
      <el-table :data="datas" height="calc(100vh - 200px)" style="width: 100%">
        <el-table-column fixed prop="id" label="序号" width="56">
          <template #default="scope">
            {{scope.$index + 1}}
          </template>
        </el-table-column>
        <el-table-column prop="name" label="侠客姓名" min-width="220">
          <template #default="scope">
            <span class="jhname">{{scope.row.name}}</span><br/>
            <span class="rolename">{{scope.row.roles.join('/')}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="tags" label="本场称号" min-width="200">
          <template #default="scope">
            <template v-for="item in scope.row.tags">
              <tags :text="item"></tags>
            </template>
          </template>
        </el-table-column>
        <el-table-column prop="score" label="战队" width="70">
          <template #default="scope">
            <span class="ctz-name" v-if="scope.row.camp==='1'">CTZ</span>
            <span class="mjs-name" v-else>MJS</span>
          </template>
        </el-table-column>
        <el-table-column prop="score" label="评分" min-width="60"/>
        <el-table-column prop="kda" label="KDA" min-width="60">
          <template #default="scope">
            <span>{{ scope.row.kda.toFixed(2) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="k" label="杀人" min-width="60"/>
        <el-table-column prop="d" label="死亡" min-width="60"/>
        <el-table-column prop="a" label="助攻" min-width="60"/>
        <el-table-column prop="a_jc" label="解除" min-width="60"/>
        <el-table-column prop="s" label="承伤" min-width="60"/>
        <el-table-column prop="mscs" label="每死承伤" min-width="80">
          <template #default="scope">
            <span>{{ scope.row.mscs.toFixed(2) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="suicide" label="自杀" min-width="60"/>
        <el-table-column prop="operation" label="操作" min-width="100">
          <template #default="scope">
            <span class="link" @click="showPlayerDetail(scope.row.battleId, scope.row.playerId)">查看选手数据</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup>
  import tags from './tags.vue'
  import { useRouter } from 'vue-router'
  const router = useRouter()

  defineProps({
    datas: {
      type: Object,
      default: () => []
    }
  })

  const showPlayerDetail = (battleId, playerId) => {
    router.push({
      name: 'dashboardDetail',
      params: {
        battleId,
        playerId
      }
    })
  }
</script>

<style lang="scss">
  .playerlist-wrapper {
    width: 100%;
    padding: 12px 0 0;
    .overview-table {
      max-height: calc(100vh - 180px);
    }
    .el-table .cell {
      line-height: 20px;
    }
    .rolename {
      font-size: 12px;
      color: #999;
      line-height: 14px;
    }
    .ctz-name {
      color: #dd4ff9;
      font-weight: bold;
    }
    .mjs-name {
      color:rgb(14, 239, 239);
      font-weight: bold;
    }
    .link {
      color: #6E94F5;
      cursor: pointer;
    }
  }
</style>