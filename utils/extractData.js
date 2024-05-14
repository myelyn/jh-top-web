const cheerio = require('cheerio')
const dayjs = require('dayjs')
const { keyArr } = require('./constants')

const extractData = (html, type) => {
  const $ = cheerio.load(html)
  const targetTable = $('table:eq(1)')
  const allTrs = targetTable.find('tr')
  const targetTrs = allTrs.slice(1, allTrs.length-2)
  const records = []
  targetTrs.each(function () {
    const itemObj = {}
    $(this).find('td').each(function(i) {
      itemObj[keyArr[type][i]] = i===1 ? dayjs($(this).text()).valueOf() : $(this).text()
    })
    records.push(itemObj)
  })
  const len = records.length
  return {
    arrResult: records,
    lastResult: len > 0 ? records[len - 1] : null,
  }
}

module.exports = extractData