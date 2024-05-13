const OperationRecordModel = require('../model/operation.model')

class OperationRecordService {
  async bulkCreateOperationRecord(arr) {
    const res = await OperationRecordModel.bulkCreate(arr, {ignoreDuplicates: true})
    return res.length
  }
  async getOperationRecord(obj) {
    const res = await OperationRecordModel.findOne({
      where: obj
    })
    return res
  }
}

module.exports = new OperationRecordService()