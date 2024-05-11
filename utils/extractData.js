const cheerio = require('cheerio')
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
      itemObj[keyArr[type][i]] = $(this).text()
    })
    records.push(itemObj)
  })
  return records
}

module.exports = extractData