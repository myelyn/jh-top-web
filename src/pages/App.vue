<template>
  <div class="app-layout">
    <el-container>
      <el-aside width="200px">
        <div class="title"><i class="iconfont icon-shouye"></i>全国江湖职业联赛</div>
        <siderMenu></siderMenu>
        <div class="info">
          <p>本网站内容仅供娱乐</p>
          <p>梦小灭 QQ: 83389650</p>
        </div>
      </el-aside>
      <el-container>
        <el-header>本次赛事由纯阳、听雪楼、纵横（按首字母排序）组成的<b> CTZ战队 </b>，对战由魔教、君临天下、神剑山庄（按首字母排序）组成的<b> MJS战队 </b>。</el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
  import siderMenu from '@/components/siderMenu/index.vue'
</script>

<style scoped lang="scss">
  .app-layout {
    height: calc(100vh);
    .title {
      line-height: 54px;
      font-weight: bold;
      text-align: center;
      color: #333;
      .iconfont {
        font-size: 18px;
        color: #3375b9;
        margin-right: 4px;
      }
    }
    .el-header {
      line-height: 60px;
      color: #999;
      font-size: 12px;
    }
    .el-aside {
      overflow: hidden;
      .info {
        position: absolute;
        width: 200px;
        bottom: 10px;
        color: #67829e;
        font-size: 12px;
        text-align: center;
      }
    }
    .el-main {
      background-color: #fff;
      height: calc(100vh - 60px);
      overflow: auto;
    }
  }
</style>
