import api from './api';

const monitoringService = {
  // ===== BEDENG MANAGEMENT =====
  
  // Get all bedengs
  getBedengs: async () => {
    try {
      const response = await api.get('/monitoring/bedengs');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Server error' };
    }
  },

  // Get single bedeng
  getBedeng: async (id) => {
    try {
      const response = await api.get(`/monitoring/bedengs/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Server error' };
    }
  },

  // Create new bedeng
  createBedeng: async (bedengData) => {
    try {
      const response = await api.post('/monitoring/bedengs', bedengData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Server error' };
    }
  },

  // Update bedeng
  updateBedeng: async (id, bedengData) => {
    try {
      const response = await api.put(`/monitoring/bedengs/${id}`, bedengData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Server error' };
    }
  },

  // Delete bedeng
  deleteBedeng: async (id) => {
    try {
      const response = await api.delete(`/monitoring/bedengs/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Server error' };
    }
  },

  // ===== SENSOR DATA =====
  
  // Get sensor data with filters
  getSensorData: async (bedengId, startDate = null, endDate = null, limit = 100) => {
    try {
      const params = { bedeng_id: bedengId, limit };
      if (startDate) params.start_date = startDate;
      if (endDate) params.end_date = endDate;

      const response = await api.get('/monitoring/sensor-data', { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Server error' };
    }
  },

  // Create sensor data (for testing/IoT)
  createSensorData: async (sensorData) => {
    try {
      const response = await api.post('/monitoring/sensor-data', sensorData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Server error' };
    }
  },

  // Get latest sensor data for all bedengs
  getLatestSensorData: async () => {
    try {
      const response = await api.get('/monitoring/sensor-data/latest');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Server error' };
    }
  }
};

export default monitoringService;
