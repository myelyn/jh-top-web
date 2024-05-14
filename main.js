const schedule = require('node-schedule')
const extractData = require('./utils/extractData')
const getTotalPage = require('./utils/getTotalPage')
const fetchData = require('./utils/fetchData')
const asyncLoop = require('./utils/asyncLoop')
const { bulkCreateKillRecord, getKillRecord } = require('./service/killrecord.service')
const { bulkCreateOperationRecord, getOperationRecord } = require('./service/operation.service')

const delay = 5000
const [JLTYPE, KPTYPE] = ['jl', 'kp']
const fnMap = {
  [JLTYPE]: {
    create: bulkCreateKillRecord,
    get: getKillRecord
  },
  [KPTYPE]: {
    create: bulkCreateOperationRecord,
    get: getOperationRecord
  }
}

// 全量写入方式(旧)
const writeAll = async (type) => {
  // 获取总页数
  const totalPage = await getTotalPage(`http://www.zuijh.net/jl/${type}.html`)

  // 需要查询的接口列表
  const urls = new Array(totalPage).fill(0).map((v, i) => `http://www.zuijh.net/jl/${type}_${totalPage - i}.html`)

  const task = async (url) => {
    // 爬取html
    const htmlResult = await fetchData(url)
    // 从html中提取需要写入数据库的数据，转为数组
    const { arrResult } = extractData(htmlResult, type)
    // 写入数据库
    type === JLTYPE ? await bulkCreateKillRecord(arrResult) : await bulkCreateOperationRecord(arrResult)
  }

  // 异步循环,该网站限制页面请求间隔为5秒
  asyncLoop(urls, task, delay)
}

// 定时写入新增，也可用于全量写入
const writeNew = async () => {
  let type = JLTYPE
  let current = 1
  const task = async () => {
    // 爬取html
    await new Promise(resolve => setTimeout(resolve, delay))
    const htmlResult = await fetchData(`http://www.zuijh.net/jl/${type}_${current}.html`)
    // 从html中提取需要写入数据库的数据，转为数组
    const { arrResult, lastResult } = extractData(htmlResult, type)
    // 判断是否重复，如果该页的最后一条数据已存在，则本页写入后不再读取下一页
    const isDulpicate = await fnMap[type]['get'](lastResult)
    // 写入数据库
    await fnMap[type]['create'](arrResult)

    if (isDulpicate && type === KPTYPE) {
      return
    }
    if (isDulpicate && type === JLTYPE) {
      type = KPTYPE
      current = 1
      task()
      return
    }
    current++
    task()
  }
  task()
}

// 设定定时任务规则：每5分钟执行一次
const rule = new schedule.RecurrenceRule()
rule.minute = new Array(12).fill(0).map((v, i) => i * 5)

const doJob = () => {
  schedule.scheduleJob(rule, async () => {
    writeNew()
  })
}
doJob()


