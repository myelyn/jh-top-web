const cheerio = require('cheerio')
const fetchData = require('./fetchData')

const getTotalPage = async (url) => {
  const pageHtml = await fetchData(url)
  const $ = cheerio.load(pageHtml)
  const targetTable = $('table:eq(1)')
  const allTrs = targetTable.find('tr')
  const trText = allTrs.slice(allTrs.length-2, allTrs.length-1).text()
  const matchText = trText.match(/共(\S*)页/)
  return Number(matchText[1])
}

module.exports = getTotalPage