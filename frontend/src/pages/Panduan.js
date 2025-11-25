import React, { useState } from 'react';

const Panduan = () => {
  const [activeSection, setActiveSection] = useState('tentang');

  const sections = [
    { id: 'tentang', title: 'Tentang TimuNova' },
    { id: 'arsitektur', title: 'Arsitektur Sistem' },
    { id: 'fitur', title: 'Fitur Utama' },
    { id: 'monitoring', title: 'Monitoring' },
    { id: 'controlling', title: 'Controlling' },
    { id: 'detection', title: 'ML Detection' }
  ];

  return (
    <div 
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(rgba(255, 255, 255, 0.70), rgba(255, 255, 255, 0.70)), url(/images/home-background.jpg) center/cover no-repeat fixed'
      }}
    >
      <div className="container py-5">
        {/* Header */}
        <div className="row mb-5">
          <div className="col-md-12">
            <h1 className="mb-3">Panduan TimuNova</h1>
            <p className="lead text-muted">
              Dokumentasi lengkap sistem pertanian cerdas berbasis IoT dan Machine Learning
            </p>
          </div>
        </div>

        <div className="row">
          {/* Sidebar Navigation */}
          <div className="col-md-3 mb-4">
            <div className="card shadow-sm sticky-top" style={{ top: '20px' }}>
              <div className="card-header bg-primary text-white">
                <h5 className="mb-0">Daftar Isi</h5>
              </div>
              <div className="list-group list-group-flush">
                {sections.map(section => (
                  <button
                    key={section.id}
                    className={`list-group-item list-group-item-action ${activeSection === section.id ? 'active' : ''}`}
                    onClick={() => setActiveSection(section.id)}
                  >
                    {section.title}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-md-9">
            {/* Tentang TimuNova */}
            {activeSection === 'tentang' && (
              <div className="card shadow-sm mb-4">
                <div className="card-body">
                  <h2 className="card-title mb-4">Tentang TimuNova</h2>
                  
                  <div className="alert alert-success">
                    <h5 className="alert-heading">Smart Farming Solution</h5>
                    <p className="mb-0">
                      TimuNova adalah sistem pertanian cerdas yang dirancang untuk membantu petani dalam 
                      penyiraman pestisida, pengendalian hama ulat buah, serta pemantauan kualitas tanaman 
                      mentimun secara otomatis.
                    </p>
                  </div>

                  <h4 className="mt-4 mb-3">Tujuan Sistem</h4>
                  <ul>
                    <li>Mewujudkan konsep Smart Farming di Indonesia</li>
                    <li>Meningkatkan efisiensi pengendalian hama</li>
                    <li>Akurasi pemantauan tanaman mentimun real-time</li>
                    <li>Otomasi penyiraman pestisida berbasis kondisi tanaman</li>
                  </ul>

                  <h4 className="mt-4 mb-3">Teknologi yang Digunakan</h4>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <div className="card bg-light">
                        <div className="card-body">
                          <h6 className="card-title">IoT (Internet of Things)</h6>
                          <p className="card-text small mb-0">
                            Koneksi sensor dan aktuator ke internet untuk monitoring dan kontrol jarak jauh
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <div className="card bg-light">
                        <div className="card-body">
                          <h6 className="card-title">Machine Learning (KNN)</h6>
                          <p className="card-text small mb-0">
                            Algoritma K-Nearest Neighbors untuk deteksi kondisi daun dan buah mentimun
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <div className="card bg-light">
                        <div className="card-body">
                          <h6 className="card-title">ESP32-CAM</h6>
                          <p className="card-text small mb-0">
                            Kamera mikrokontroler untuk capture dan analisis visual tanaman
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <div className="card bg-light">
                        <div className="card-body">
                          <h6 className="card-title">Sensor DHT</h6>
                          <p className="card-text small mb-0">
                            Sensor suhu dan kelembapan untuk monitoring kondisi lingkungan
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Arsitektur Sistem */}
            {activeSection === 'arsitektur' && (
              <div className="card shadow-sm mb-4">
                <div className="card-body">
                  <h2 className="card-title mb-4">Arsitektur Sistem</h2>

                  <div className="alert alert-info">
                    <strong>Pola Arsitektur:</strong> Client-Server terintegrasi dengan Embedded System
                  </div>

                  <h4 className="mt-4 mb-3">Komponen Sistem</h4>
                  
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <div className="card border-primary">
                        <div className="card-header bg-primary text-white">
                          <h5 className="mb-0">Client (Alat TimuNova)</h5>
                        </div>
                        <div className="card-body">
                          <ul className="mb-0">
                            <li>Mikrokontroler ESP32</li>
                            <li>Kamera ESP32-CAM</li>
                            <li>Sensor suhu dan kelembapan</li>
                            <li>Pompa pestisida</li>
                            <li>Motor penggerak</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6 mb-3">
                      <div className="card border-success">
                        <div className="card-header bg-success text-white">
                          <h5 className="mb-0">Server (Website TimuNova)</h5>
                        </div>
                        <div className="card-body">
                          <ul className="mb-0">
                            <li>Web server (Node.js/Express)</li>
                            <li>Database (MongoDB)</li>
                            <li>Dashboard monitoring</li>
                            <li>ML Processing Engine</li>
                            <li>API endpoints</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h4 className="mt-4 mb-3">Alur Kerja Sistem</h4>
                  <ol>
                    <li className="mb-2">ESP32 membaca data dari sensor suhu dan kelembapan</li>
                    <li className="mb-2">ESP32-CAM mengambil gambar daun atau buah mentimun</li>
                    <li className="mb-2">Data sensor dan gambar dikirim ke web server via HTTP/MQTT</li>
                    <li className="mb-2">Server memproses gambar dengan algoritma KNN</li>
                    <li className="mb-2">Hasil analisis ditampilkan di dashboard website</li>
                    <li className="mb-2">User dapat mengendalikan pompa dan motor melalui web interface</li>
                  </ol>
                </div>
              </div>
            )}

            {/* Fitur Utama */}
            {activeSection === 'fitur' && (
              <div className="card shadow-sm mb-4">
                <div className="card-body">
                  <h2 className="card-title mb-4">Fitur Utama TimuNova</h2>

                  <div className="accordion" id="fiturAccordion">
                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#fitur1">
                          Monitoring Real-time
                        </button>
                      </h2>
                      <div id="fitur1" className="accordion-collapse collapse show" data-bs-parent="#fiturAccordion">
                        <div className="accordion-body">
                          <ul>
                            <li>Suhu lingkungan kebun</li>
                            <li>Kelembapan udara</li>
                            <li>Status pompa pestisida</li>
                            <li>Status motor penggerak</li>
                            <li>Grafik historis data sensor</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#fitur2">
                          Controlling Otomatis
                        </button>
                      </h2>
                      <div id="fitur2" className="accordion-collapse collapse" data-bs-parent="#fiturAccordion">
                        <div className="accordion-body">
                          <ul>
                            <li>Aktifkan/matikan pompa pestisida</li>
                            <li>Kontrol motor penggerak</li>
                            <li>Penjadwalan otomatis penyiraman</li>
                            <li>Remote control via web interface</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#fitur3">
                          ML Detection
                        </button>
                      </h2>
                      <div id="fitur3" className="accordion-collapse collapse" data-bs-parent="#fiturAccordion">
                        <div className="accordion-body">
                          <ul>
                            <li>Deteksi kondisi daun mentimun (sehat/sakit)</li>
                            <li>Identifikasi hama ulat buah</li>
                            <li>Analisis kualitas buah</li>
                            <li>Rekomendasi tindakan perawatan</li>
                            <li>Akurasi tinggi dengan algoritma KNN</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Monitoring Guide */}
            {activeSection === 'monitoring' && (
              <div className="card shadow-sm mb-4">
                <div className="card-body">
                  <h2 className="card-title mb-4">Cara Menggunakan Monitoring</h2>

                  <div className="alert alert-primary">
                    Halaman Monitoring menampilkan data sensor real-time dari kebun Anda
                  </div>

                  <h4 className="mt-4 mb-3">Langkah-langkah:</h4>
                  
                  <div className="card mb-3 bg-light">
                    <div className="card-body">
                      <h6 className="card-title">1. Akses Halaman Monitoring</h6>
                      <p className="card-text mb-0">Klik menu "Monitoring" di navbar untuk membuka dashboard</p>
                    </div>
                  </div>

                  <div className="card mb-3 bg-light">
                    <div className="card-body">
                      <h6 className="card-title">2. Lihat Data Real-time</h6>
                      <p className="card-text mb-0">Dashboard menampilkan suhu, kelembapan, dan status alat secara langsung</p>
                    </div>
                  </div>

                  <div className="card mb-3 bg-light">
                    <div className="card-body">
                      <h6 className="card-title">3. Analisis Grafik</h6>
                      <p className="card-text mb-0">Grafik menunjukkan tren data dalam periode waktu tertentu</p>
                    </div>
                  </div>

                  <div className="card mb-3 bg-light">
                    <div className="card-body">
                      <h6 className="card-title">4. Set Alert</h6>
                      <p className="card-text mb-0">Atur notifikasi jika kondisi melewati batas normal</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Controlling Guide */}
            {activeSection === 'controlling' && (
              <div className="card shadow-sm mb-4">
                <div className="card-body">
                  <h2 className="card-title mb-4">Cara Menggunakan Controlling</h2>

                  <div className="alert alert-warning">
                    <strong>Perhatian:</strong> Pastikan perangkat ESP32 sudah terhubung ke internet sebelum menggunakan fitur controlling
                  </div>

                  <h4 className="mt-4 mb-3">Metode Controlling:</h4>
                  
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <div className="card border-primary h-100">
                        <div className="card-header bg-primary text-white">
                          Kontrol Manual
                        </div>
                        <div className="card-body">
                          <ol className="mb-0">
                            <li>Buka halaman Controlling</li>
                            <li>Pilih perangkat yang ingin dikontrol</li>
                            <li>Klik tombol ON/OFF</li>
                            <li>Status akan update real-time</li>
                          </ol>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6 mb-3">
                      <div className="card border-success h-100">
                        <div className="card-header bg-success text-white">
                          Mode Otomatis
                        </div>
                        <div className="card-body">
                          <ol className="mb-0">
                            <li>Aktifkan mode Auto</li>
                            <li>Set kondisi trigger (suhu/kelembapan)</li>
                            <li>Sistem akan aktif otomatis</li>
                            <li>Notifikasi dikirim saat aktif</li>
                          </ol>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ML Detection Guide */}
            {activeSection === 'detection' && (
              <div className="card shadow-sm mb-4">
                <div className="card-body">
                  <h2 className="card-title mb-4">ML Detection - Deteksi Kondisi Tanaman</h2>

                  <div className="alert alert-info">
                    <strong>Algoritma:</strong> K-Nearest Neighbors (KNN) untuk klasifikasi kondisi daun dan buah
                  </div>

                  <h4 className="mt-4 mb-3">Cara Menggunakan:</h4>
                  
                  <div className="card mb-3 bg-light">
                    <div className="card-body">
                      <h6 className="card-title">1. Aktifkan Kamera</h6>
                      <p className="card-text mb-0">Klik tombol "Aktifkan Kamera" di halaman Controlling</p>
                    </div>
                  </div>

                  <div className="card mb-3 bg-light">
                    <div className="card-body">
                      <h6 className="card-title">2. Arahkan ke Tanaman</h6>
                      <p className="card-text mb-0">Posisikan kamera pada daun atau buah yang ingin dianalisis</p>
                    </div>
                  </div>

                  <div className="card mb-3 bg-light">
                    <div className="card-body">
                      <h6 className="card-title">3. Capture Gambar</h6>
                      <p className="card-text mb-0">Klik tombol "Capture" untuk mengambil snapshot</p>
                    </div>
                  </div>

                  <div className="card mb-3 bg-light">
                    <div className="card-body">
                      <h6 className="card-title">4. Proses dengan ML</h6>
                      <p className="card-text mb-0">Klik "Proses dengan ML" untuk mendapat hasil deteksi</p>
                    </div>
                  </div>

                  <div className="card mb-3 bg-light">
                    <div className="card-body">
                      <h6 className="card-title">5. Lihat Hasil dan Rekomendasi</h6>
                      <p className="card-text mb-0">Sistem menampilkan kondisi tanaman dan rekomendasi perawatan</p>
                    </div>
                  </div>

                  <h4 className="mt-4 mb-3">Klasifikasi Hasil:</h4>
                  <div className="table-responsive">
                    <table className="table table-bordered">
                      <thead className="table-success">
                        <tr>
                          <th>Kondisi</th>
                          <th>Deskripsi</th>
                          <th>Tindakan</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td><span className="badge bg-success">Sehat</span></td>
                          <td>Daun hijau segar, tidak ada bercak</td>
                          <td>Pertahankan perawatan rutin</td>
                        </tr>
                        <tr>
                          <td><span className="badge bg-warning text-dark">Terinfeksi Ringan</span></td>
                          <td>Ada bercak kuning pada daun</td>
                          <td>Semprot pestisida organik</td>
                        </tr>
                        <tr>
                          <td><span className="badge bg-danger">Terinfeksi Berat</span></td>
                          <td>Daun layu, bercak coklat luas</td>
                          <td>Buang daun terinfeksi, semprot pestisida</td>
                        </tr>
                        <tr>
                          <td><span className="badge bg-info text-dark">Hama Ulat</span></td>
                          <td>Terdeteksi ulat buah pada tanaman</td>
                          <td>Aktifkan penyemprotan otomatis</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Panduan;
