const express = require('express');
const router = express.Router();
const { 
  getUserBedengs,
  getBedengById,
  createBedeng,
  updateBedeng,
  deleteBedeng,
  getSensorData,
  createSensorData,
  getLatestSensorData
} = require('../controllers/monitoringController');
const { protect } = require('../middleware/authMiddleware');

// Semua route butuh authentication
router.use(protect);

// Bedeng routes
router.get('/bedengs', getUserBedengs);
router.get('/bedengs/:id', getBedengById);
router.post('/bedengs', createBedeng);
router.put('/bedengs/:id', updateBedeng);
router.delete('/bedengs/:id', deleteBedeng);

// Sensor data routes
router.get('/sensor-data', getSensorData);
router.post('/sensor-data', createSensorData);
router.get('/sensor-data/latest', getLatestSensorData);

module.exports = router;
