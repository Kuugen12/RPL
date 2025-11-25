const { Bedeng, SensorData, User } = require('../models');
const { Op } = require('sequelize');

// @desc    Get all bedengs milik user yang login
// @route   GET /api/monitoring/bedengs
// @access  Private
exports.getUserBedengs = async (req, res) => {
  try {
   const bedengs = await Bedeng.findAll({
  where: { user_id: req.user.id },
  order: [['createdAt', 'DESC']]
});


    res.json({
      success: true,
      count: bedengs.length,
      data: bedengs
    });
  } catch (error) {
    console.error('Get bedengs error:', error);
    res.status(500).json({ 
      message: 'Server error', 
      error: error.message 
    });
  }
};

// @desc    Get single bedeng by ID
// @route   GET /api/monitoring/bedengs/:id
// @access  Private
exports.getBedengById = async (req, res) => {
  try {
    const bedeng = await Bedeng.findOne({
      where: { 
        id: req.params.id,
        user_id: req.user.id // Pastikan bedeng milik user yang login
      }
    });

    if (!bedeng) {
      return res.status(404).json({ message: 'Bedeng tidak ditemukan' });
    }

    res.json({
      success: true,
      data: bedeng
    });
  } catch (error) {
    console.error('Get bedeng error:', error);
    res.status(500).json({ 
      message: 'Server error', 
      error: error.message 
    });
  }
};

// @desc    Create new bedeng
// @route   POST /api/monitoring/bedengs
// @access  Private
exports.createBedeng = async (req, res) => {
  try {
    const { nama_bedeng, lokasi, luas, deskripsi } = req.body;

    // Validasi
    if (!nama_bedeng) {
      return res.status(400).json({ message: 'Nama bedeng harus diisi' });
    }

    const bedeng = await Bedeng.create({
      nama_bedeng,
      lokasi,
      luas,
      deskripsi,
      user_id: req.user.id
    });

    res.status(201).json({
      success: true,
      message: 'Bedeng berhasil dibuat',
      data: bedeng
    });
  } catch (error) {
    console.error('Create bedeng error:', error);
    res.status(500).json({ 
      message: 'Server error', 
      error: error.message 
    });
  }
};

// @desc    Update bedeng
// @route   PUT /api/monitoring/bedengs/:id
// @access  Private
exports.updateBedeng = async (req, res) => {
  try {
    const { nama_bedeng, lokasi, luas, deskripsi } = req.body;

    const bedeng = await Bedeng.findOne({
      where: { 
        id: req.params.id,
        user_id: req.user.id
      }
    });

    if (!bedeng) {
      return res.status(404).json({ message: 'Bedeng tidak ditemukan' });
    }

    // Update fields
    if (nama_bedeng !== undefined) bedeng.nama_bedeng = nama_bedeng;
    if (lokasi !== undefined) bedeng.lokasi = lokasi;
    if (luas !== undefined) bedeng.luas = luas;
    if (deskripsi !== undefined) bedeng.deskripsi = deskripsi;

    await bedeng.save();

    res.json({
      success: true,
      message: 'Bedeng berhasil diupdate',
      data: bedeng
    });
  } catch (error) {
    console.error('Update bedeng error:', error);
    res.status(500).json({ 
      message: 'Server error', 
      error: error.message 
    });
  }
};

// @desc    Delete bedeng
// @route   DELETE /api/monitoring/bedengs/:id
// @access  Private
exports.deleteBedeng = async (req, res) => {
  try {
    const bedeng = await Bedeng.findOne({
      where: { 
        id: req.params.id,
        user_id: req.user.id
      }
    });

    if (!bedeng) {
      return res.status(404).json({ message: 'Bedeng tidak ditemukan' });
    }

    await bedeng.destroy();

    res.json({
      success: true,
      message: 'Bedeng berhasil dihapus'
    });
  } catch (error) {
    console.error('Delete bedeng error:', error);
    res.status(500).json({ 
      message: 'Server error', 
      error: error.message 
    });
  }
};

// @desc    Get sensor data dengan filter
// @route   GET /api/monitoring/sensor-data
// @access  Private
exports.getSensorData = async (req, res) => {
  try {
    const { bedeng_id, start_date, end_date, limit = 100 } = req.query;

    // Build where clause
    const where = {};

    // Filter by bedeng_id (wajib)
    if (!bedeng_id) {
      return res.status(400).json({ message: 'bedeng_id harus diisi' });
    }

    // Pastikan bedeng milik user yang login
    const bedeng = await Bedeng.findOne({
      where: { 
        id: bedeng_id,
        user_id: req.user.id
      }
    });

    if (!bedeng) {
      return res.status(404).json({ message: 'Bedeng tidak ditemukan' });
    }

    where.bedeng_id = bedeng_id;

    // Filter by date range
    if (start_date && end_date) {
      where.waktu = {
        [Op.between]: [new Date(start_date), new Date(end_date)]
      };
    }

    const sensorData = await SensorData.findAll({
      where,
      order: [['waktu', 'DESC']],
      limit: parseInt(limit)
    });

    res.json({
      success: true,
      count: sensorData.length,
      data: sensorData
    });
  } catch (error) {
    console.error('Get sensor data error:', error);
    res.status(500).json({ 
      message: 'Server error', 
      error: error.message 
    });
  }
};

// @desc    Create sensor data (untuk IoT device atau testing)
// @route   POST /api/monitoring/sensor-data
// @access  Private
exports.createSensorData = async (req, res) => {
  try {
    const { bedeng_id, suhu, kelembapan, intensitas_cahaya } = req.body;

    // Validasi
    if (!bedeng_id || suhu === undefined || kelembapan === undefined || intensitas_cahaya === undefined) {
      return res.status(400).json({ message: 'Semua field harus diisi' });
    }

    // Pastikan bedeng milik user yang login
    const bedeng = await Bedeng.findOne({
      where: { 
        id: bedeng_id,
        user_id: req.user.id
      }
    });

    if (!bedeng) {
      return res.status(404).json({ message: 'Bedeng tidak ditemukan' });
    }

    const sensorData = await SensorData.create({
      bedeng_id,
      suhu,
      kelembapan,
      intensitas_cahaya
    });

    res.status(201).json({
      success: true,
      message: 'Data sensor berhasil disimpan',
      data: sensorData
    });
  } catch (error) {
    console.error('Create sensor data error:', error);
    res.status(500).json({ 
      message: 'Server error', 
      error: error.message 
    });
  }
};

// @desc    Get latest sensor data untuk semua bedeng user
// @route   GET /api/monitoring/sensor-data/latest
// @access  Private
exports.getLatestSensorData = async (req, res) => {
  try {
    const bedengs = await Bedeng.findAll({
      where: { user_id: req.user.id },
      include: [{
        model: SensorData,
        as: 'sensorData',
        limit: 1,
        order: [['waktu', 'DESC']]
      }]
    });

    res.json({
      success: true,
      count: bedengs.length,
      data: bedengs
    });
  } catch (error) {
    console.error('Get latest sensor data error:', error);
    res.status(500).json({ 
      message: 'Server error', 
      error: error.message 
    });
  }
};
