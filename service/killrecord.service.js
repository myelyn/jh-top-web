const KillRecordModel = require('../model/killrecord.model')

class KillRecordService {
  async bulkCreateKillRecord(arr) {
    const res = await KillRecordModel.bulkCreate(arr, {ignoreDuplicates: true})
    return res.length
  }
}

module.exports = new KillRecordService()