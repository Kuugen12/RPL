const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

// Submit laporan
router.post('/', protect, (req, res) => {
  res.json({ message: 'Submit laporan - Coming soon' });
});

module.exports = router;
