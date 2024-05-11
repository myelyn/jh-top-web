const { DataTypes } = require('sequelize');
const seq = require('../db/seq')

const operationRecord = seq.define('jh_operation_record', {
  jh_operation_by: {
    type: DataTypes.STRING,
    allowNull: false
  },
  jh_operation_to: {
    type: DataTypes.STRING,
    allowNull: false
  },
  jh_operation_time: {
    type: DataTypes.STRING,
    allowNull: false
  },
  jh_operation_detail: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  indexes: [{
    unique: true,
    name: 'uni_key',
    fields: ['jh_operation_by', 'jh_operation_to', 'jh_operation_time']
  }]
})

operationRecord.sync()
module.exports = operationRecord