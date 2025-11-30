const { User } = require('../models');

// Get all users (admin only)
exports.getAllUsers = async (req, res) => {
  try {
    console.log('📡 getAllUsers called by:', req.user?.email);
    
    const users = await User.findAll({
      attributes: { exclude: ['password'] }, // Jangan kirim password
      order: [['createdAt', 'DESC']]
    });
    
    console.log(`✅ Found ${users.length} users`);
    
    res.status(200).json({
      success: true,
      data: users
    });
  } catch (error) {
    console.error('❌ Error getting users:', error);
    res.status(500).json({
      success: false,
      message: 'Gagal mengambil data users',
      error: error.message
    });
  }
};

// Delete user by ID (admin only)
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    
    console.log(`🗑️ Deleting user ID: ${id}`);
    
    // Cek apakah user ada
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User tidak ditemukan'
      });
    }

    // Proteksi: tidak bisa hapus diri sendiri
    if (user.id === req.user.id) {
      return res.status(400).json({
        success: false,
        message: 'Tidak dapat menghapus akun sendiri'
      });
    }

    await user.destroy();
    
    console.log(`✅ User deleted: ${user.email}`);
    
    res.status(200).json({
      success: true,
      message: 'User berhasil dihapus'
    });
  } catch (error) {
    console.error('❌ Error deleting user:', error);
    res.status(500).json({
      success: false,
      message: 'Gagal menghapus user',
      error: error.message
    });
  }
};

// Get riwayat akses by userId (admin only)
exports.getUserRiwayat = async (req, res) => {
  try {
    const { userId } = req.params;
    
    console.log(`📜 Getting riwayat for user ID: ${userId}`);
    
    // Cek apakah user ada
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User tidak ditemukan'
      });
    }

    // Ambil riwayat (jika model Riwayat ada)
    try {
      const { Riwayat } = require('../models');
      
      if (!Riwayat) {
        return res.status(200).json({
          success: true,
          data: []
        });
      }

      const riwayat = await Riwayat.findAll({
        where: { userId },
        order: [['timestamp', 'DESC']],
        limit: 100
      });
      
      console.log(`✅ Found ${riwayat.length} riwayat records`);
      
      res.status(200).json({
        success: true,
        data: riwayat
      });
    } catch (err) {
      // Jika model Riwayat belum ada, return empty array
      console.log('⚠️ Riwayat model not found, returning empty array');
      res.status(200).json({
        success: true,
        data: []
      });
    }
  } catch (error) {
    console.error('❌ Error getting riwayat:', error);
    res.status(200).json({
      success: true,
      data: [] // Return empty array jika error
    });
  }
};
