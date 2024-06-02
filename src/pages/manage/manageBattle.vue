<template>
  <div class="create-battle-wrapper">
    <div class="type-title">创建战斗</div>
    <div class="type-content">
      <div class="time-form-item">
        <span class="time-form-title">开始时间：</span>
        <el-date-picker
          v-model="startTime"
          @change="handleChange"
          :disabled-date="getDisabled"
          type="datetime"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          format="YYYY-MM-DD HH:mm:ss"
          value-format="YYYY-MM-DD HH:mm:ss"
          date-format="YYYY-MM-DD"
          time-format="HH:mm:ss"
        />
      </div>
      <div class="time-form-item">
        <span class="time-form-title">结束时间：</span>
        <el-date-picker
          v-model="endTime"
          @change="handleChange"
          type="datetime"
          :disabled-date="getDisabled"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          format="YYYY-MM-DD HH:mm:ss"
          value-format="YYYY-MM-DD HH:mm:ss"
          date-format="YYYY-MM-DD"
          time-format="HH:mm:ss"
        />
      </div>
      <el-button @click="create" :loading="createLoading" type="primary">生成战斗数据</el-button>
    </div>
    

    <div class="type-title">删除战斗</div>
    <div class="type-content">
      <div style="margin-bottom: 12px;">
        <el-input v-model="delId" placeholder="请输入要删除的战斗ID" style="width: 220px"></el-input>
      </div>
      <div><el-button :loading="deleteLoading" @click="deleteBattle" type="primary">删除战斗</el-button></div>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import { ElMessage } from 'element-plus'
  import io from '@/utils/request'
  import dayjs from 'dayjs'
  const startTime = ref('')
  const endTime = ref('')
  const delId = ref('')
  const getDisabled = (d) => {
    
    return dayjs(d) < dayjs('2024-05-04') || dayjs(d) > dayjs(new Date())
  }

  const createLoading = ref(false)
  const deleteLoading = ref(false)
  const create = () => {
    if (!startTime.value || !endTime.value) {
      ElMessage({
        message: '请填写开始和结束时间',
        type: 'error'
      })
      return 
    }
    if (dayjs(startTime.value) > dayjs(endTime.value)) {
      ElMessage({
        message: '开始时间必须小于结束时间',
        type: 'error'
      })
      return 
    }
    createLoading.value = true
    io.post('/battle/add', {
      startTime: startTime.value,
      endTime: endTime.value
    }).then(() => {
      ElMessage('添加成功，请刷新列表查看')
      createLoading.value = false
    }).catch(() => {
      ElMessage({
        message: '网络错误',
        type: 'error'
      })
      createLoading.value = false
    })
  }

  const deleteBattle = () => {
    if (isNaN(Number(delId.value))) {
      ElMessage({
        message: '请输入数字ID',
        type: 'error'
      })
      return
    }
    deleteLoading.value = true
    io.post('/battle/delete', {
      battleId: delId.value
    }).then(() => {
      ElMessage('删除成功')
      deleteLoading.value = false
    }).catch(() => {
      ElMessage({
        message: '网络错误',
        type: 'error'
      })
      deleteLoading.value = false
    })
  }
  
</script>

<style lang="scss" scoped>
  .create-battle-wrapper {
    .type-title {
      font-size: 14px;
      font-weight: bold;
      color: #333;
      margin-bottom: 12px;
    }
    .type-content {
      margin-bottom: 30px;
    }
    .time-form-item {
      margin-bottom: 12px;
      .time-form-title {
        color: #999;
        font-size: 14px;
      }
    }
  }
</style>