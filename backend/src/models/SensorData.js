const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const SensorData = sequelize.define('SensorData', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  bedeng_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'bedeng',
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  suhu: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      min: -50,
      max: 100
    },
    comment: 'Suhu dalam Celsius'
  },
  kelembapan: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      min: 0,
      max: 100
    },
    comment: 'Kelembapan dalam %'
  },
  intensitas_cahaya: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      min: 0
    },
    comment: 'Intensitas cahaya dalam lux'
  },
  waktu: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'sensor_data',
  timestamps: false,
  indexes: [
    {
      fields: ['bedeng_id', 'waktu']
    }
  ]
});

module.exports = SensorData;
