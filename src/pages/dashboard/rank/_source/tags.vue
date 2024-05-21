<template>
  <el-tooltip v-if="text==='MVP'" placement="top" :hide-after="0">
    <template #content>{{tagMap[text]}}</template>
    <span class="tag tag-mvp"><i class="iconfont icon-MVP1"></i>{{ text }}</span>
  </el-tooltip>
  <el-tooltip v-else-if="text==='杀人王'" placement="top" :hide-after="0">
    <template #content>{{tagMap[text]}}</template>
    <span class="tag tag-mvp"><i class="iconfont"></i>{{ text }}</span>
  </el-tooltip>
  <el-tooltip v-else-if="text==='满头包'" placement="top" :hide-after="0">
    <template #content>{{tagMap[text]}}</template>
    <span class="tag tag-mtb"><i class="iconfont icon-kelian"></i>{{ text }}</span>
  </el-tooltip>
  <el-tooltip v-else-if="text==='挨最毒的打'" placement="top" :hide-after="0">
    <template #content>{{tagMap[text]}}</template>
    <span class="tag tag-mtb"><i class="iconfont icon-kelian"></i>{{ text }}</span>
  </el-tooltip>
  <el-tooltip v-else-if="text.endsWith('这场克我')" placement="top" :hide-after="0">
    <template #content>{{tagMap['这场克我']}}</template>
    <span class="tag">{{ text }}</span>
  </el-tooltip>
  <el-tooltip v-else-if="text.endsWith('相爱相杀')" placement="top" :hide-after="0">
    <template #content>{{tagMap['相爱相杀']}}</template>
    <span class="tag">{{ text }}</span>
  </el-tooltip>
  <el-tooltip v-else-if="text.endsWith('杀手')" placement="top" :hide-after="0">
    <template #content>{{tagMap['杀手']}}</template>
    <span class="tag">{{ text }}</span>
  </el-tooltip>
  <el-tooltip v-else-if="text.endsWith('追着打')" placement="top" :hide-after="0">
    <template #content>{{tagMap['追着打']}}</template>
    <span class="tag">{{ text }}</span>
  </el-tooltip>
  <el-tooltip v-else-if="['超硬', '无私奉献', '最强辅助', '解除最多', '无限火力'].includes(text)" placement="top" :hide-after="1">
    <template #content>{{tagMap[text]}}</template>
    <span class="tag tag-yx">{{ text }}</span>
  </el-tooltip>
  <el-tooltip v-else placement="top" :hide-after="0">
    <template #content>{{tagMap[text]}}</template>
    <span class="tag">{{ text }}</span>
  </el-tooltip>
</template>

<script setup>
  import { reactive } from 'vue'
  const tagMap = reactive({
    '这场克我': '这场被某某杀的比例最高',
    '相爱相杀': '这场对某某用卡/配药/法器比较最高',
    '杀手': '这场杀某某次数占自己杀人数的比例有点高哦',
    '追着打': '这场某某打我最多，记小本本上了',
    'MVP': '综合得分最高，斩获全场MVP',
    '杀人王': '杀人数全场第一',
    '满头包': '死亡数全场第一，下次跑快点哦',
    '挨最毒的打': '承受的伤害和被杀综合系数全场第一，下次躲起来吧',
    '仇恨拉满': '承受卡片/配药/法器伤害全场第一，下次小心点哦',
    '拼命三郎': '拼命招杀比例超高',
    '擅长用毒': '用毒杀人比例超高',
    '法器专家': '法器杀人超过自己总人头的一半',
    '生了个主力': '小孩杀人超过一定数量',
    '控制型选手': '本场助攻数据不错，且使用解除卡比例很高',
    '陷害型选手': '本场助攻数据不错，且使用陷害卡比例很高',
    '法器选手': '比较喜欢法器攻击',
    '吸血鬼': '用吸血虫比例很高',
    '派发死神': '对别人下过死神',
    '霹雳啪啦': '对别人下过霹雳卡',
    '死神降临': '被下过死神卡',
    '挨霹倒霉蛋': '被用过霹雳卡',
    '狠起来连自己都杀': '杀过自己的号',
    '我信佛哦': '本场没杀人，但下一场不一定哦',
    '打了个酱油': '没用过卡片/配药/法器',
    '广结善缘': '没被别人过卡片/配药/法器',
    '天秀': 'kda超高且杀人很多，不容易获得哦',
    '超硬': '每次死亡承受的卡片/配药/法器伤害特别高，想杀我很难',
    '很硬': '每次死亡承受的卡片/配药/法器伤害很高，不容易死',
    '有点硬': '每次死亡承受的卡片/配药/法器伤害比较高',
    '无私奉献': '使用的卡片/配药/法器全场最高',
    '最强辅助': '使用的卡片/配药/法器很高但人头相对较少',
    '控制拉满': '使用解除卡次数全场第一',
    '无限火力': '使用陷害卡次数全场第一',
    '嗜血成性': '使用吸血虫数量全场第一',
    '毒王': '用毒杀人数全场第一',
    '武林高手': '招杀敌人数量全场第一'
  })

  defineProps({
    text: {
      type: String,
      default: ''
    }
  })
</script>

<style lang="scss" scoped>
  .tag {
    display: inline-block;
    position: relative;
    border-radius: 2px;
    margin-right: 4px;
    margin-bottom: 4px;
    padding: 0 2px;
    font-size: 12px;
    border: 1px solid #80abd6;
    color: #80abd6;
    .iconfont {
      font-size: 16px;
      line-height: 16px;
    }
  }
  .tag-mvp {
    background-color: #ff7322;
    border: none;
    color: #fff;
    padding: 0 4px;
    .iconfont {
      position: relative;
      top: 1px;
    }
  }
  .tag-yx {
    border: 1px solid #ff7322;
    color: #ff7322;
  }
  .tag-mtb {
    border: 1px solid #022202;
    color: #022202;
    .iconfont {
      position: relative;
      top: 2px;
    }
  }
</style>