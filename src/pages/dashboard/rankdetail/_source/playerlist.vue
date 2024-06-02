<template>
  <div class="playerlist-wrapper">
    <el-radio-group v-model="showType">
      <el-radio-button value="all">全部</el-radio-button>
      <el-radio-button value="1">只看CTZ</el-radio-button>
      <el-radio-button value="2">只看MJS</el-radio-button>
    </el-radio-group>
    <div class="overview-table">
      <el-table :data="showType==='all' ? datas : datas.filter(d => d.camp===showType)" height="calc(100vh - 200px)" style="width: 100%">
        <el-table-column fixed prop="id" label="" width="30">
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
        <el-table-column prop="score" label="战队" width="52">
          <template #default="scope">
            <span class="ctz-name" v-if="scope.row.camp==='1'">CTZ</span>
            <span class="mjs-name" v-else>MJS</span>
          </template>
        </el-table-column>
        <el-table-column prop="score" label="评分" sortable min-width="60"/>
        <el-table-column prop="kda" label="KDA" sortable min-width="64">
          <template #default="scope">
            <span>{{ scope.row.kda.toFixed(2) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="k" label="总杀人" sortable min-width="72"/>
        <el-table-column prop="d" label="总死亡" sortable min-width="72"/>
        <el-table-column prop="a" label="总助攻" sortable min-width="72"/>
        <el-table-column prop="s" label="总承伤" sortable min-width="72"/>
        <el-table-column prop="mscs" label="每死承伤" sortable min-width="84">
          <template #default="scope">
            <span>{{ scope.row.mscs.toFixed(2) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="k_zs" label="招杀" sortable min-width="60"/>
        <el-table-column prop="k_ds" label="毒杀" sortable min-width="60"/>
        <el-table-column prop="k_fq" label="法器杀" sortable min-width="72"/>
        <el-table-column prop="k_xh" label="小孩杀" sortable min-width="72"/>
        <el-table-column prop="a_jc" label="解除" sortable min-width="60"/>
        <el-table-column prop="a_xh" label="陷害" sortable min-width="60"/>
        <el-table-column prop="a_xx" label="吸血" sortable min-width="60"/>
        <el-table-column prop="a_ss" label="死神" sortable min-width="60"/>
        <el-table-column prop="a_pl" label="霹雳" sortable min-width="60"/>
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
  import { ref } from 'vue'
  import tags from './tags.vue'
  import { useRouter } from 'vue-router'
  const router = useRouter()

  const showType = ref('all')

  defineProps({
    datas: {
      type: Object,
      default: () => []
    }
  })

  const showPlayerDetail = (battleId, playerId) => {
    router.push({
      name: 'playerDetail',
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
    padding: 8px 0 0;
    .overview-table {
      max-height: calc(100vh - 180px);
    }
    .el-table .cell {
      line-height: 20px;
      padding: 0 6px;
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
    .el-radio-group {
      margin-left: 24px;
      margin-bottom: 8px;
      .el-radio-button {
        .el-radio-button__inner {
          font-size: 12px;
          font-weight: normal;
          padding: 4px 8px;
        }
      }
    }
  }
</style>