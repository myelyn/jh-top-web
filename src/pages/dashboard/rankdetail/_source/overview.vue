<template>
  <div class="overview-wrapper">
    <div class="overview-table">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="label" label="">
          <template #default="scope">
            <span :class="['k', 'a', 'd', 's', 'cost'].includes(scope.row.key) && 'highlight'">{{scope.row.label}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="ctz" label="CTZ战队">
          <template #default="scope">
            <span :class="scope.row.ctz===scope.row.max && 'red'">{{ scope.row.ctz }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="mjs" label="MJS战队">
          <template #default="scope">
            <span :class="scope.row.mjs===scope.row.max && 'red'">{{ scope.row.mjs}}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="overview-chart" ref="echartRef"></div>
  </div>
</template>

<script setup>
  import { ref, watch, onMounted } from 'vue'
  import { pick, values, reverse } from 'lodash'
  import useEcharts from "@/utils/echarts/useEchart"

  let setOptions
  const echartRef = ref(null)
  onMounted(() => {
    setOptions = useEcharts(echartRef.value).setOptions
    renderChart()
    renderTable(props.datas)
  })

  const props = defineProps({
    datas: {
      type: Object,
      default: () => {}
    }
  })

  const tableData = ref([])
  const renderChart = () => {
    if (!props.datas) {
      return
    }
    let seriesDataCtz1 = new Array(6).fill(0)
    let seriesDataMjs1 = new Array(6).fill(0)
    let seriesDataCtz2 = new Array(6).fill(0)
    let seriesDataMjs2 = new Array(6).fill(0)
    const axisData1 = reverse(['总杀人', '总招杀', '总毒杀', '总法器杀', '总小孩杀', '总死亡'])
    const axisData2 = reverse(['总助攻', '总解除', '总陷害', '总吸血', '总承伤', '平均评分'])
    if (props.datas.ctz) {
      seriesDataCtz1 = reverse(values(pick(props.datas.ctz, ['k', 'k_zs', 'k_ds', 'k_fq', 'k_xh', 'd'])))
      seriesDataCtz2 = reverse(values(pick(props.datas.ctz, ['a', 'a_jc', 'a_xh', 'a_xx', 's', 'avgscore'])))
    }
    if (props.datas.mjs) {
      seriesDataMjs1 = reverse(values(pick(props.datas.mjs, ['k', 'k_zs', 'k_ds', 'k_fq', 'k_xh', 'd'])))
      seriesDataMjs2 = reverse(values(pick(props.datas.mjs, ['a', 'a_jc', 'a_xh', 'a_xx', 's', 'avgscore'])))
    }

    const option = {
      color: ['#c964dd', '#5ed8f2'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: [{
        left: '3%',
        right: '5%',
        top: '5%',
        bottom: '50%',
        containLabel: true
      }, {
        left: '3%',
        right: '5%',
        top: '53%',
        bottom: '3%',
        containLabel: true
      }],
      xAxis: [{
        type: 'value'
      }, {
        type: 'value',
        gridIndex: 1
      }],
      legend: {},
      yAxis: [{
        type: 'category',
        data: axisData1,
        axisLabel: {
          color: '#333',
          fontSize: 12
        },
        axisLine: {
          lineStyle: {
            color: '#D9D9DA'
          }
        },
        axisTick: {
          show: false
        }
      }, {
        type: 'category',
        data: axisData2,
        gridIndex: 1,
        axisLabel: {
          color: '#333',
          fontSize: 12
        },
        axisLine: {
          lineStyle: {
            color: '#D9D9DA'
          }
        },
        axisTick: {
          show: false
        }
      }],
      series: [
        {
          name: 'CTZ',
          type: 'bar',
          data: seriesDataCtz1
        },
        {
          name: 'MJS',
          type: 'bar',
          data: seriesDataMjs1
        },
        {
          name: 'CTZ',
          type: 'bar',
          xAxisIndex: 1,
          yAxisIndex: 1,
          data: seriesDataCtz2
        },
        {
          name: 'MJS',
          type: 'bar',
          xAxisIndex: 1,
          yAxisIndex: 1,
          data: seriesDataMjs2
        }
      ]
    }
    setOptions(option)
  }

  const renderTable = (d) => {
    if (!d || !d.ctz) {
      return
    }
    const dataMap = [
      {label: '参战人数', key: 'totalplayer', type: 'y'},
      {label: '总杀人', key: 'k', type: 'y'}, 
      {label: '总招杀', key: 'k_zs', type: 'y'}, 
      {label: '总毒杀', key: 'k_ds', type: 'y'}, 
      {label: '总法器杀人', key: 'k_fq', type: 'y'}, 
      {label: '总小孩杀人', key: 'k_xh', type: 'y'}, 
      {label: '总助攻', key: 'a', type: 'y'},
      {label: '总解除', key: 'a_jc', type: 'y'}, 
      {label: '总陷害', key: 'a_xh', type: 'y'}, 
      {label: '总吸血', key: 'a_xx', type: 'y'}, 
      {label: '总法器失败', key: 'a_fq', type: 'y'}, 
      {label: '总霹雳', key: 'a_pl', type: 'y'}, 
      {label: '总死神', key: 'a_ss', type: 'y'}, 
      {label: '总死亡', key: 'd', type: 'n'}, 
      {label: '总承伤', key: 's', type: 'n'}, 
      {label: '平均评分', key: 'avgscore', type: 'y'}, 
      {label: '平均每死承伤', key: 'avgmscs', type: 'y'},
      {label: '总花费金币(估算)', key: 'cost', type: 'n'}
    ]
    dataMap.forEach(item => {
      tableData.value.push({
        ctz: d.ctz[item['key']] ? parseInt(d.ctz[item['key']]) : 0,
        mjs: d.mjs[item['key']] ? parseInt(d.mjs[item['key']]) : 0,
        key: item.key,
        label: item.label,
        max: Math.max(d.ctz[item['key']], d.mjs[item['key']])
      })
    })
  }

  watch(() => props.datas, (d) => {
    
    renderTable(d)
    renderChart()
  })
</script>

<style lang="scss">
  .overview-wrapper {
    padding: 12px 0 0;
    height: 100%;
    display: flex;
    justify-content: space-between;
    .overview-table, .overview-chart {
      width: calc(50% - 6px);
      height: 720px;
      .red {
        color: red;
        font-weight: bold;
      }
      .highlight {
        color: #3375b9;
        font-weight: bold;
      }
    }
  }
  @media screen and (max-width: 780px) {
    .overview-wrapper {
      flex-wrap: wrap;
        .overview-table, .overview-chart {
          width: 100%;
        }
      }
    }
</style>