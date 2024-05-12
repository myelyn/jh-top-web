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
      itemObj[keyArr[type][i]] = i===1 ? dayjs($(this).text()).format('YYYY-MM-DD HH:mm:ss') : $(this).text()
    })
    records.unshift(itemObj)
  })
  return records
}

module.exports = extractData