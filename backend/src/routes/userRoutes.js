const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middleware/authMiddleware');
const userController = require('../controllers/userController');

// Admin only - Get all users
router.get('/', protect, adminOnly, userController.getAllUsers);

// Admin only - Delete user by ID
router.delete('/:id', protect, adminOnly, userController.deleteUser);

// Admin only - Get riwayat akses by userId
router.get('/:userId/riwayat', protect, adminOnly, userController.getUserRiwayat);

module.exports = router;
