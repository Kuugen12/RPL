const { User, Riwayat } = require('../models');

// Get riwayat akses by userId (admin only)
exports.getByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Cek apakah user ada
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User tidak ditemukan'
      });
    }

    // Ambil riwayat user
    const riwayat = await Riwayat.findAll({
      where: { userId },
      order: [['timestamp', 'DESC']],
      limit: 100
    });
    
    res.status(200).json({
      success: true,
      data: riwayat
    });
  } catch (error) {
    console.error('Error getting riwayat:', error);
    res.status(500).json({
      success: false,
      message: 'Gagal mengambil riwayat',
      error: error.message
    });
  }
};

// Get all riwayat (admin only, opsional)
exports.getAll = async (req, res) => {
  try {
    const riwayat = await Riwayat.findAll({
      include: [
        {
          model: User,
          attributes: ['username', 'email']
        }
      ],
      order: [['timestamp', 'DESC']],
      limit: 200
    });
    
    res.status(200).json({
      success: true,
      data: riwayat
    });
  } catch (error) {
    console.error('Error getting all riwayat:', error);
    res.status(500).json({
      success: false,
      message: 'Gagal mengambil riwayat',
      error: error.message
    });
  }
};

// Create riwayat (dipanggil saat user login/akses tertentu)
exports.create = async (req, res) => {
  try {
    const { userId, activity, ipAddress } = req.body;
    
    const riwayat = await Riwayat.create({
      userId,
      activity,
      ipAddress,
      timestamp: new Date()
    });
    
    res.status(201).json({
      success: true,
      data: riwayat
    });
  } catch (error) {
    console.error('Error creating riwayat:', error);
    res.status(500).json({
      success: false,
      message: 'Gagal membuat riwayat',
      error: error.message
    });
  }
};

// Delete riwayat by ID (admin only, opsional)
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    
    const riwayat = await Riwayat.findByPk(id);
    if (!riwayat) {
      return res.status(404).json({
        success: false,
        message: 'Riwayat tidak ditemukan'
      });
    }
    
    await riwayat.destroy();
    
    res.status(200).json({
      success: true,
      message: 'Riwayat berhasil dihapus'
    });
  } catch (error) {
    console.error('Error deleting riwayat:', error);
    res.status(500).json({
      success: false,
      message: 'Gagal menghapus riwayat',
      error: error.message
    });
  }
};
