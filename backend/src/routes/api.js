const express = require('express');
const router = express.Router();

// Import routes
const authRoutes = require('./authRoutes');
const monitoringRoutes = require('./monitoringRoutes');
const userRoutes = require('./userRoutes');

// Register routes
router.use('/auth', authRoutes);
router.use('/monitoring', monitoringRoutes);
router.use('/users', userRoutes);  // ✅ Penting ini ada!

module.exports = router;
