const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Bedeng = sequelize.define('Bedeng', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nama_bedeng: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  }
}, {
  tableName: 'bedeng',
  timestamps: true
});

module.exports = Bedeng;
