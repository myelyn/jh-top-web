const OperationRecordModel = require('../model/operation.model')

class OperationRecordService {
  async bulkCreateOperationRecord(arr) {
    const res = await OperationRecordModel.bulkCreate(arr, {ignoreDuplicates: true})
    return res.length
  }
}

module.exports = new OperationRecordService()