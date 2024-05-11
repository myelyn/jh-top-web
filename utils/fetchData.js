const axios = require('axios')

async function getHtml(url) {
  let res = await axios({
    url,
    responseType: "arraybuffer",
    responseEncoding: "utf8",
  })
  let { data } = res
  let utf8decoder = new TextDecoder("GBK")
  let html = utf8decoder.decode(data)
  return html
}

module.exports = getHtml