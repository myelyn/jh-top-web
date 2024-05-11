const asyncLoop = async (array, task, delay) => {
  for(let item of array) {
    await task(item)
    await new Promise(resolve => setTimeout(resolve, delay))
  }
}

module.exports = asyncLoop