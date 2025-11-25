const sequelize = require('../config/database');
const User = require('./User');
const Bedeng = require('./Bedeng');
const SensorData = require('./SensorData');

// Define relationships
User.hasMany(Bedeng, {
  foreignKey: 'user_id',
  as: 'bedengs'
});

Bedeng.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user'
});

Bedeng.hasMany(SensorData, {
  foreignKey: 'bedeng_id',
  as: 'sensorData'
});

SensorData.belongsTo(Bedeng, {
  foreignKey: 'bedeng_id',
  as: 'bedeng'
});

// Sync models (untuk development)
const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true }); // alter: true untuk update tabel otomatis
    console.log('✅ Database tables synced successfully');
  } catch (error) {
    console.error('❌ Error syncing database:', error);
  }
};

module.exports = {
  sequelize,
  User,
  Bedeng,
  SensorData,
  syncDatabase
};
