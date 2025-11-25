import React, { useState, useEffect, useCallback } from 'react';
import monitoringService from '../services/monitoringService';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import jsPDF from 'jspdf';

const Monitoring = () => {
  const [bedengs, setBedengs] = useState([]);
  const [selectedBedeng, setSelectedBedeng] = useState(null);
  const [sensorData, setSensorData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newBedeng, setNewBedeng] = useState({
    nama_bedeng: '',
    lokasi: '',
    luas: '',
    deskripsi: ''
  });

  const loadSensorData = useCallback(async (bedengId) => {
    try {
      const response = await monitoringService.getSensorData(bedengId, null, null, 20);
      setSensorData(response.data.reverse());
    } catch (err) {
      console.error('Error loading sensor data:', err);
    }
  }, []);

  const loadBedengs = useCallback(async () => {
    try {
      setLoading(true);
      const response = await monitoringService.getBedengs();
      setBedengs(response.data);
      if (response.data.length > 0 && !selectedBedeng) {
        setSelectedBedeng(response.data[0]);
      }
    } catch (err) {
      setError(err.message || 'Gagal memuat data bedeng');
    } finally {
      setLoading(false);
    }
  }, [selectedBedeng]);

  useEffect(() => {
    loadBedengs();
  }, [loadBedengs]);

  useEffect(() => {
    if (selectedBedeng) {
      loadSensorData(selectedBedeng.id);
    }
  }, [selectedBedeng, loadSensorData]);

  const handleAddBedeng = async (e) => {
    e.preventDefault();
    try {
      await monitoringService.createBedeng(newBedeng);
      setShowAddForm(false);
      setNewBedeng({ nama_bedeng: '', lokasi: '', luas: '', deskripsi: '' });
      loadBedengs();
    } catch (err) {
      alert(err.message || 'Gagal menambah bedeng');
    }
  };

  const handleDeleteBedeng = async (id) => {
    if (window.confirm('Yakin ingin menghapus bedeng ini?')) {
      try {
        await monitoringService.deleteBedeng(id);
        loadBedengs();
        setSelectedBedeng(null);
      } catch (err) {
        alert(err.message || 'Gagal menghapus bedeng');
      }
    }
  };

  const generateDummyData = async () => {
    if (!selectedBedeng) {
      alert('Pilih bedeng terlebih dahulu');
      return;
    }
    try {
      const dummyData = {
        bedeng_id: selectedBedeng.id,
        suhu: (20 + Math.random() * 15).toFixed(1),
        kelembapan: (40 + Math.random() * 40).toFixed(1),
        intensitas_cahaya: (100 + Math.random() * 900).toFixed(0)
      };
      await monitoringService.createSensorData(dummyData);
      loadSensorData(selectedBedeng.id);
    } catch (err) {
      alert(err.message || 'Gagal menambah data sensor');
    }
  };

  // ========== DOWNLOAD FUNCTIONS ==========
  const downloadAsCSV = () => {
    if (sensorData.length === 0) {
      alert('Tidak ada data untuk diunduh');
      return;
    }
    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += 'Waktu,Suhu (°C),Kelembapan (%),Cahaya (lux)\n';
    sensorData.slice().reverse().forEach(item => {
      const date = new Date(item.waktu).toLocaleString('id-ID');
      csvContent += `"${date}",${item.suhu},${item.kelembapan},${item.intensitas_cahaya}\n`;
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `sensor_${selectedBedeng.nama_bedeng}_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadAsPDF = () => {
    if (sensorData.length === 0) {
      alert('Tidak ada data untuk diunduh');
      return;
    }
    
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    let yPosition = 20;

    // Header
    doc.setFontSize(18);
    doc.setFont(undefined, 'bold');
    doc.text('LAPORAN DATA SENSOR', pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 15;

    // Info Bedeng
    doc.setFontSize(11);
    doc.setFont(undefined, 'normal');
    doc.text(`Bedeng: ${selectedBedeng.nama_bedeng}`, 20, yPosition);
    yPosition += 7;
    doc.text(`Lokasi: ${selectedBedeng.lokasi || '-'}`, 20, yPosition);
    yPosition += 7;
    doc.text(`Luas: ${selectedBedeng.luas ? `${selectedBedeng.luas} m²` : '-'}`, 20, yPosition);
    yPosition += 7;
    doc.text(`Tanggal: ${new Date().toLocaleDateString('id-ID')}`, 20, yPosition);
    yPosition += 15;

    // Table Header
    doc.setFontSize(10);
    doc.setFont(undefined, 'bold');
    doc.setFillColor(45, 122, 62);
    doc.setTextColor(255, 255, 255);
    doc.rect(20, yPosition, pageWidth - 40, 8, 'F');
    doc.text('No', 25, yPosition + 5);
    doc.text('Waktu', 40, yPosition + 5);
    doc.text('Suhu', 100, yPosition + 5);
    doc.text('Kelembapan', 130, yPosition + 5);
    doc.text('Cahaya', 170, yPosition + 5);
    yPosition += 10;

    // Table Data
    doc.setFont(undefined, 'normal');
    doc.setTextColor(0, 0, 0);
    
    sensorData.slice().reverse().forEach((item, index) => {
      if (yPosition > pageHeight - 20) {
        doc.addPage();
        yPosition = 20;
      }

      const waktu = new Date(item.waktu).toLocaleTimeString('id-ID', { 
        hour: '2-digit', 
        minute: '2-digit' 
      });

      doc.text(String(index + 1), 25, yPosition);
      doc.text(String(waktu), 40, yPosition);
      doc.text(String(item.suhu) + ' C', 100, yPosition);
      doc.text(String(item.kelembapan) + '%', 130, yPosition);
      doc.text(String(item.intensitas_cahaya), 170, yPosition);
      
      yPosition += 7;
    });

    // Footer
    doc.setFontSize(9);
    doc.setTextColor(128, 128, 128);
    doc.text('Generated by TimuNova', pageWidth / 2, pageHeight - 10, { align: 'center' });

    doc.save(`sensor_${selectedBedeng.nama_bedeng}_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  const downloadAsTXT = () => {
    if (sensorData.length === 0) {
      alert('Tidak ada data untuk diunduh');
      return;
    }
    let txtContent = `====================================\n`;
    txtContent += `  LAPORAN DATA SENSOR TIMUNOVA\n`;
    txtContent += `====================================\n\n`;
    txtContent += `Bedeng: ${selectedBedeng.nama_bedeng}\n`;
    txtContent += `Lokasi: ${selectedBedeng.lokasi || '-'}\n`;
    txtContent += `Luas: ${selectedBedeng.luas ? `${selectedBedeng.luas} m²` : '-'}\n`;
    txtContent += `Tanggal: ${new Date().toLocaleDateString('id-ID')}\n\n`;
    txtContent += `====================================\n\n`;
    sensorData.slice().reverse().forEach((item, index) => {
      const date = new Date(item.waktu).toLocaleString('id-ID');
      txtContent += `[${index + 1}] ${date}\n`;
      txtContent += `    Suhu: ${item.suhu}°C\n`;
      txtContent += `    Kelembapan: ${item.kelembapan}%\n`;
      txtContent += `    Cahaya: ${item.intensitas_cahaya} lux\n\n`;
    });
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(txtContent));
    element.setAttribute('download', `sensor_${selectedBedeng.nama_bedeng}_${new Date().toISOString().split('T')[0]}.txt`);
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const downloadAsJSON = () => {
    if (sensorData.length === 0) {
      alert('Tidak ada data untuk diunduh');
      return;
    }
    const jsonData = {
      bedeng: {
        nama: selectedBedeng.nama_bedeng,
        lokasi: selectedBedeng.lokasi,
        luas: selectedBedeng.luas,
        deskripsi: selectedBedeng.deskripsi
      },
      laporan: {
        tanggal: new Date().toISOString(),
        total_data: sensorData.length
      },
      data: sensorData.slice().reverse().map(item => ({
        waktu: item.waktu,
        suhu: parseFloat(item.suhu),
        kelembapan: parseFloat(item.kelembapan),
        intensitas_cahaya: parseFloat(item.intensitas_cahaya)
      }))
    };
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(jsonData, null, 2)));
    element.setAttribute('download', `sensor_${selectedBedeng.nama_bedeng}_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const chartData = sensorData.map(item => ({
    waktu: new Date(item.waktu).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
    suhu: parseFloat(item.suhu),
    kelembapan: parseFloat(item.kelembapan),
    cahaya: parseFloat(item.intensitas_cahaya)
  }));

  if (loading) {
    return <div style={styles.loading}>Loading...</div>;
  }

  return (
    <div 
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(rgba(255, 255, 255, 0.70), rgba(255, 255, 255, 0.70)), url(/images/home-background.jpg) center/cover no-repeat fixed'
      }}
    >
      <div style={styles.container}>
        <div style={styles.header}>
          <h1>📊 Monitoring Dashboard</h1>
          <button onClick={() => setShowAddForm(!showAddForm)} style={styles.addButton}>
            {showAddForm ? 'Batal' : '+ Tambah Bedeng'}
          </button>
        </div>

        {error && <div style={styles.error}>{error}</div>}

        {showAddForm && (
          <div style={styles.formCard}>
            <h3>Tambah Bedeng Baru</h3>
            <form onSubmit={handleAddBedeng} style={styles.form}>
              <input
                type="text"
                placeholder="Nama Bedeng"
                value={newBedeng.nama_bedeng}
                onChange={(e) => setNewBedeng({...newBedeng, nama_bedeng: e.target.value})}
                style={styles.input}
                required
              />
              <input
                type="text"
                placeholder="Lokasi"
                value={newBedeng.lokasi}
                onChange={(e) => setNewBedeng({...newBedeng, lokasi: e.target.value})}
                style={styles.input}
              />
              <input
                type="number"
                placeholder="Luas (m²)"
                value={newBedeng.luas}
                onChange={(e) => setNewBedeng({...newBedeng, luas: e.target.value})}
                style={styles.input}
              />
              <textarea
                placeholder="Deskripsi"
                value={newBedeng.deskripsi}
                onChange={(e) => setNewBedeng({...newBedeng, deskripsi: e.target.value})}
                style={styles.textarea}
              />
              <button type="submit" style={styles.submitButton}>Simpan</button>
            </form>
          </div>
        )}

        <div style={styles.bedengList}>
          {bedengs.length === 0 ? (
            <div style={styles.emptyState}>
              <p>Belum ada bedeng. Klik "Tambah Bedeng" untuk memulai.</p>
            </div>
          ) : (
            bedengs.map(bedeng => (
              <div
                key={bedeng.id}
                style={{
                  ...styles.bedengCard,
                  ...(selectedBedeng?.id === bedeng.id ? styles.bedengCardActive : {})
                }}
                onClick={() => setSelectedBedeng(bedeng)}
              >
                <h4>{bedeng.nama_bedeng}</h4>
                <p>Lokasi: {bedeng.lokasi || '-'}</p>
                <p>Luas: {bedeng.luas ? `${bedeng.luas} m²` : '-'}</p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteBedeng(bedeng.id);
                  }}
                  style={styles.deleteButton}
                >
                  Hapus
                </button>
              </div>
            ))
          )}
        </div>

        {selectedBedeng && (
          <div style={styles.dataSection}>
            <div style={styles.dataHeader}>
              <h2>Data Sensor - {selectedBedeng.nama_bedeng}</h2>
              <button onClick={generateDummyData} style={styles.generateButton}>
                + Generate Data Test
              </button>
            </div>

            {sensorData.length === 0 ? (
              <div style={styles.emptyState}>
                <p>Belum ada data sensor. Klik "Generate Data Test" untuk membuat data dummy.</p>
              </div>
            ) : (
              <>
                {/* Download Section */}
                <div style={styles.downloadCard}>
                  <h3>📥 Download Data Sensor</h3>
                  <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '1rem' }}>
                    Export data dalam berbagai format
                  </p>
                  <div style={styles.downloadButtons}>
                    <button onClick={downloadAsCSV} style={{...styles.downloadBtn, background: '#FF6B6B'}}>
                      📄 CSV
                    </button>
                    <button onClick={downloadAsPDF} style={{...styles.downloadBtn, background: '#DC3545'}}>
                      📋 PDF
                    </button>
                    <button onClick={downloadAsTXT} style={{...styles.downloadBtn, background: '#868E96'}}>
                      📝 TXT
                    </button>
                    <button onClick={downloadAsJSON} style={{...styles.downloadBtn, background: '#4C6EF5'}}>
                      ✨ JSON
                    </button>
                  </div>
                </div>

                {/* Charts */}
                <div style={styles.chartsContainer}>
                  <div style={styles.chartCard}>
                    <h3>Suhu & Kelembapan</h3>
                    <ResponsiveContainer width="100%" height={250}>
                      <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="waktu" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="suhu" stroke="#e74c3c" name="Suhu (°C)" />
                        <Line type="monotone" dataKey="kelembapan" stroke="#3498db" name="Kelembapan (%)" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  <div style={styles.chartCard}>
                    <h3>Intensitas Cahaya</h3>
                    <ResponsiveContainer width="100%" height={250}>
                      <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="waktu" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="cahaya" fill="#f39c12" name="Cahaya (lux)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Data Table */}
                <div style={styles.tableCard}>
                  <h3>Riwayat Data</h3>
                  <div style={styles.tableContainer}>
                    <table style={styles.table}>
                      <thead>
                        <tr>
                          <th>Waktu</th>
                          <th>Suhu (°C)</th>
                          <th>Kelembapan (%)</th>
                          <th>Cahaya (lux)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sensorData.slice().reverse().map((item, index) => (
                          <tr key={index}>
                            <td>{new Date(item.waktu).toLocaleString('id-ID')}</td>
                            <td>{item.suhu}</td>
                            <td>{item.kelembapan}</td>
                            <td>{item.intensitas_cahaya}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    maxWidth: '1400px',
    margin: '0 auto'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem'
  },
  addButton: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#667eea',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'background 0.3s'
  },
  formCard: {
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    marginBottom: '2rem'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginTop: '1rem'
  },
  input: {
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem'
  },
  textarea: {
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem',
    minHeight: '80px'
  },
  submitButton: {
    padding: '0.75rem',
    backgroundColor: '#27ae60',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem'
  },
  bedengList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '1rem',
    marginBottom: '2rem'
  },
  bedengCard: {
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s'
  },
  bedengCardActive: {
    border: '2px solid #667eea',
    backgroundColor: '#f0f4ff'
  },
  deleteButton: {
    marginTop: '1rem',
    padding: '0.5rem 1rem',
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.9rem'
  },
  dataSection: {
    marginTop: '2rem'
  },
  dataHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem'
  },
  generateButton: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#27ae60',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer'
  },
  downloadCard: {
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    marginBottom: '2rem'
  },
  downloadButtons: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
    gap: '1rem'
  },
  downloadBtn: {
    padding: '0.75rem 1rem',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.95rem',
    fontWeight: '500',
    transition: 'transform 0.2s, box-shadow 0.2s',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  chartsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
    gap: '1.5rem',
    marginBottom: '2rem'
  },
  chartCard: {
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },
  tableCard: {
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },
  tableContainer: {
    overflowX: 'auto'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '1rem'
  },
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '400px',
    fontSize: '1.5rem'
  },
  error: {
    backgroundColor: '#e74c3c',
    color: 'white',
    padding: '1rem',
    borderRadius: '6px',
    marginBottom: '1rem'
  },
  emptyState: {
    textAlign: 'center',
    padding: '3rem',
    color: '#666'
  }
};

const tableStyles = `
  table th, table td {
    padding: 0.75rem;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }
  table th {
    background-color: #f8f9fa;
    font-weight: 600;
  }
  table tbody tr:hover {
    background-color: #f8f9fa;
  }
`;

const styleSheet = document.createElement("style");
styleSheet.innerText = tableStyles;
document.head.appendChild(styleSheet);

export default Monitoring;
