const schedule = require('node-schedule')
const extractData = require('./utils/extractData')
const getTotalPage = require('./utils/getTotalPage')
const fetchData = require('./utils/fetchData')
const asyncLoop = require('./utils/asyncLoop')
const { bulkCreateKillRecord } = require('./service/killrecord.service')
const { bulkCreateOperationRecord } = require('./service/operation.service')

const delay = 5000
const writeRecord = async (type, total) => {
  // 传入新增写入的页数，或者获取总页数全量写入
  const totalPage = total || await getTotalPage(`http://www.zuijh.net/jl/${type}.html`)

  // 需要查询的接口列表
  const urls = new Array(totalPage).fill(0).map((v, i) => `http://www.zuijh.net/jl/${type}_${totalPage - i}.html`)

  // 具体任务
  const task = async (url) => {
    // 爬取html
    const htmlResult = await fetchData(url)
    // 从html中提取需要写入数据库的数据，转为数组
    const arrResult = extractData(htmlResult, type)
    // 写入数据库
    await type === 'jl' ? bulkCreateKillRecord(arrResult) : bulkCreateOperationRecord(arrResult)
  }

  // 异步循环,该网站限制页面请求间隔为5秒
  asyncLoop(urls, task, delay)
}

// 设定定时任务规则：每5分钟执行一次
const rule = new schedule.RecurrenceRule()
rule.minute = new Array(12).fill(0).map((v, i) => (i + 1) * 5)

const doJob = () => {
  // 每次执行任务爬取1页大事记录和10页操作记录
  schedule.scheduleJob(rule, async () => {
    writeRecord('jl', 1)
    await new Promise(resolve => setTimeout(resolve, delay))
    writeRecord('kp', 10)
  })
}

doJob()

