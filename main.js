const extractData = require('./utils/extractData')
const getTotalPage = require('./utils/getTotalPage')
const fetchData = require('./utils/fetchData')
const asyncLoop = require('./utils/asyncLoop')
const { bulkCreateKillRecord } = require('./service/killrecord.service')
const { bulkCreateOperationRecord } = require('./service/operation.service')

// 全量写入
const writeAllRecord = async (type) => {
  // 获取总页数
  const totalPage = await getTotalPage(`http://www.zuijh.net/jl/${type}.html`)

  // 需要查询的接口列表
  const urls = new Array(totalPage).fill(0).map((v, i) => `http://www.zuijh.net/jl/${type}_${totalPage - i}.html`)

  // 具体任务
  const task = async (url) => {
    // 爬取html
    const htmlResult = await fetchData(url)
    // 从html中提取需要写入数据库的数据，转为数组
    const arrResult = extractData(htmlResult, type)
    // 写入数据库
    await type==='jl' ? bulkCreateKillRecord(arrResult) : bulkCreateOperationRecord(arrResult)
  }

  // 异步循环,该网站限制页面请求间隔为5秒
  asyncLoop(urls, task, 5000)
}

const schedule = async () => {
  await writeAllRecord('jl')
  await writeAllRecord('kp')
}
schedule()