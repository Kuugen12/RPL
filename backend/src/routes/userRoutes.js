const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middleware/authMiddleware');

// Admin only - kelola user
router.get('/', protect, adminOnly, (req, res) => {
  res.json({ message: 'Get all users - Coming soon' });
});

module.exports = router;
