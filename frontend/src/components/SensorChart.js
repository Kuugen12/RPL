import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const SensorChart = ({ data }) => {
  // Format data untuk chart
  const chartData = data.map(item => ({
    waktu: new Date(item.waktu).toLocaleTimeString('id-ID', { 
      hour: '2-digit', 
      minute: '2-digit' 
    }),
    suhu: item.suhu,
    kelembapan: item.kelembapan,
    cahaya: item.intensitas_cahaya
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="waktu" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="suhu" stroke="#ff6b6b" name="Suhu (°C)" />
        <Line type="monotone" dataKey="kelembapan" stroke="#4ecdc4" name="Kelembapan (%)" />
        <Line type="monotone" dataKey="cahaya" stroke="#ffe66d" name="Cahaya (lux)" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default SensorChart;
