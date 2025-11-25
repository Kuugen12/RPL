const jwt = require('jsonwebtoken');
const { User } = require('../models');

// Protect routes - memerlukan authentication
exports.protect = async (req, res, next) => {
  let token;

  // Cek apakah ada Authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Extract token dari header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user dari database (tanpa password)
      req.user = await User.findByPk(decoded.id, {
        attributes: { exclude: ['password'] }
      });

      if (!req.user) {
        return res.status(401).json({ message: 'User tidak ditemukan' });
      }

      next();
    } catch (error) {
      console.error('Auth middleware error:', error);
      return res.status(401).json({ message: 'Token tidak valid atau expired' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Tidak ada token, akses ditolak' });
  }
};

// Admin only middleware
exports.adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Akses ditolak. Hanya admin yang diizinkan.' });
  }
};

// Optional auth - tidak wajib login tapi kalau ada token akan di-load user
exports.optionalAuth = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findByPk(decoded.id, {
        attributes: { exclude: ['password'] }
      });
    } catch (error) {
      // Ignore error, just continue without user
      req.user = null;
    }
  }

  next();
};
