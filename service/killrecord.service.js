const KillRecordModel = require('../model/killrecord.model')

class KillRecordService {
  async bulkCreateKillRecord(arr) {
    const res = await KillRecordModel.bulkCreate(arr, {
      ignoreDuplicates: true
    })
    return res.length
  }
  async getKillRecord(obj) {
    const res = await KillRecordModel.findOne({
      where: obj
    })
    return res
  }
}

module.exports = new KillRecordService()