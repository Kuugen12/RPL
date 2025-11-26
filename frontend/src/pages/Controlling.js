import React, { useState, useRef, useEffect } from 'react';

const Controlling = () => {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [mlResult, setMlResult] = useState(null);
  const [error, setError] = useState('');
  
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  // Start camera
  const startCamera = async () => {
    try {
      setError('');
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'environment' // Use back camera on mobile
        } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setIsCameraActive(true);
      }
    } catch (err) {
      console.error('Camera error:', err);
      setError('Tidak dapat mengakses kamera. Pastikan izin kamera sudah diberikan.');
    }
  };

  // Stop camera
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
      setIsCameraActive(false);
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    }
  };

  // Capture image from video
  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      const imageData = canvas.toDataURL('image/jpeg', 0.8);
      setCapturedImage(imageData);
    }
  };

  // Send to ML backend (placeholder - sesuaikan dengan API backend Anda)
  const processWithML = async () => {
    if (!capturedImage) {
      setError('Tidak ada gambar yang di-capture!');
      return;
    }

    setIsProcessing(true);
    setError('');
    setMlResult(null);

    try {
      // PLACEHOLDER - Ganti dengan API endpoint backend ML Anda
      // const response = await fetch('http://localhost:5000/api/ml/detect', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     image: capturedImage,
      //     userId: user.id
      //   })
      // });
      // const data = await response.json();

      // SIMULATION - Hapus ini setelah API ready
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const conditions = [
        { deteksi: '🥒 Timun Sehat', confidence: 95.5, kondisi: 'Sangat Baik', rekomendasi: 'Pertahankan kondisi perawatan saat ini. Tanaman dalam kondisi optimal.', color: 'success' },
        { deteksi: '⚠️ Daun Kuning', confidence: 87.2, kondisi: 'Perlu Perhatian', rekomendasi: 'Periksa nutrisi tanaman. Kemungkinan kekurangan nitrogen. Aplikasikan pupuk NPK.', color: 'warning' },
        { deteksi: '🐛 Hama Ulat Terdeteksi', confidence: 92.8, kondisi: 'Waspada', rekomendasi: 'Segera lakukan penyemprotan pestisida organik. Monitor setiap hari.', color: 'danger' },
        { deteksi: '✅ Buah Siap Panen', confidence: 89.3, kondisi: 'Optimal', rekomendasi: 'Timun sudah mencapai ukuran ideal untuk dipanen. Panen dalam 1-2 hari.', color: 'info' }
      ];
      
      const simulatedResult = conditions[Math.floor(Math.random() * conditions.length)];

      setMlResult(simulatedResult);
    } catch (err) {
      console.error('ML processing error:', err);
      setError('Gagal memproses gambar. Coba lagi.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div 
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(rgba(255, 255, 255, 0.70), rgba(255, 255, 255, 0.70)), url(/images/home-background.jpg) center/cover no-repeat fixed'
      }}
    >
      <div className="container py-5">
        {/* Header */}
        <div className="row mb-4">
          <div className="col-md-12">
            <h1 className="mb-2"> Controlling & ML Detection</h1>
            <p className="text-muted">
              Sistem kontrol dan deteksi kondisi tanaman timun menggunakan Machine Learning
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="row mb-4">
          <div className="col-md-3 mb-3">
            <div className="card shadow-sm border-primary">
              <div className="card-body text-center">
                <div className="text-primary fs-1 mb-2"></div>
                <h6 className="text-muted">Status Kamera</h6>
                <h5 className={isCameraActive ? 'text-success' : 'text-secondary'}>
                  {isCameraActive ? 'Aktif' : 'Tidak Aktif'}
                </h5>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <div className="card shadow-sm border-success">
              <div className="card-body text-center">
                <div className="text-success fs-1 mb-2"></div>
                <h6 className="text-muted">Gambar Captured</h6>
                <h5>{capturedImage ? '1' : '0'}</h5>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <div className="card shadow-sm border-info">
              <div className="card-body text-center">
                <div className="text-info fs-1 mb-2"></div>
                <h6 className="text-muted">ML Status</h6>
                <h5>{isProcessing ? '⏳ Processing' : mlResult ? '✓ Done' : 'Standby'}</h5>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <div className="card shadow-sm border-warning">
              <div className="card-body text-center">
                <div className="text-warning fs-1 mb-2"></div>
                <h6 className="text-muted">Accuracy</h6>
                <h5>{mlResult ? `${mlResult.confidence}%` : '-'}</h5>
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="alert alert-danger alert-dismissible fade show" role="alert">
            <strong>⚠️ Error:</strong> {error}
            <button 
              type="button" 
              className="btn-close" 
              onClick={() => setError('')}
            ></button>
          </div>
        )}

        <div className="row">
          {/* Camera Section */}
          <div className="col-lg-6 mb-4">
            <div className="card shadow-sm h-100">
              <div className="card-header bg-primary text-white">
                <h5 className="mb-0"> Camera Feed</h5>
              </div>
              <div className="card-body">
                {/* Video Preview */}
                <div 
                  className="position-relative mb-3 rounded overflow-hidden" 
                  style={{ 
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
                    minHeight: '350px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-100"
                    style={{ 
                      display: isCameraActive ? 'block' : 'none',
                      maxHeight: '450px',
                      objectFit: 'cover'
                    }}
                  />
                  {!isCameraActive && (
                    <div className="text-center text-white">
                      <div className="mb-3" style={{ fontSize: '5rem', opacity: 0.3 }}>📷</div>
                      <h5>Kamera Belum Aktif</h5>
                      <p className="small">Klik tombol di bawah untuk mengaktifkan</p>
                    </div>
                  )}
                </div>

                {/* Camera Controls */}
                <div className="d-grid gap-2">
                  {!isCameraActive ? (
                    <button 
                      className="btn btn-success btn-lg"
                      onClick={startCamera}
                    >
                      <i className="bi bi-camera-video me-2"></i>
                      🎥 Aktifkan Kamera
                    </button>
                  ) : (
                    <div className="row g-2">
                      <div className="col-6">
                        <button 
                          className="btn btn-primary w-100"
                          onClick={captureImage}
                        >
                           Capture
                        </button>
                      </div>
                      <div className="col-6">
                        <button 
                          className="btn btn-danger w-100"
                          onClick={stopCamera}
                        >
                          ⏹️ Stop
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Hidden canvas for capture */}
                <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
              </div>
            </div>
          </div>

          {/* Result Section */}
          <div className="col-lg-6 mb-4">
            <div className="card shadow-sm h-100">
              <div className="card-header bg-success text-white">
                <h5 className="mb-0"> ML Detection Result</h5>
              </div>
              <div className="card-body">
                {/* Captured Image Preview */}
                {capturedImage ? (
                  <>
                    <div className="mb-3 rounded overflow-hidden" style={{ background: '#000' }}>
                      <img 
                        src={capturedImage} 
                        alt="Captured" 
                        className="img-fluid"
                        style={{ maxHeight: '350px', objectFit: 'contain', width: '100%' }}
                      />
                    </div>
                    
                    <div className="d-grid gap-2 mb-3">
                      <button 
                        className="btn btn-primary btn-lg"
                        onClick={processWithML}
                        disabled={isProcessing}
                      >
                        {isProcessing ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2"></span>
                             Memproses...
                          </>
                        ) : (
                          <>
                             Proses dengan ML
                          </>
                        )}
                      </button>
                      <button 
                        className="btn btn-outline-secondary"
                        onClick={() => {
                          setCapturedImage(null);
                          setMlResult(null);
                        }}
                      >
                        🗑️ Clear
                      </button>
                    </div>

                    {/* ML Result Display */}
                    {mlResult && (
                      <div className={`alert alert-${mlResult.color} border-start border-5`}>
                        <h5 className="alert-heading mb-3">
                          <strong>Hasil Deteksi ML</strong>
                        </h5>
                        <hr />
                        <div className="mb-2">
                          <strong> Deteksi:</strong>
                          <div className="fs-5 mt-1">{mlResult.deteksi}</div>
                        </div>
                        <div className="mb-2">
                          <strong> Confidence:</strong>
                          <div className="progress mt-1" style={{ height: '25px' }}>
                            <div 
                              className={`progress-bar bg-${mlResult.color}`}
                              style={{ width: `${mlResult.confidence}%` }}
                            >
                              {mlResult.confidence}%
                            </div>
                          </div>
                        </div>
                        <div className="mb-2">
                          <strong> Kondisi:</strong>
                          <span className={`badge bg-${mlResult.color} ms-2`}>{mlResult.kondisi}</span>
                        </div>
                        <div className="mb-0">
                          <strong> Rekomendasi:</strong>
                          <div className="mt-1">{mlResult.rekomendasi}</div>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center text-muted py-5">
                    <div style={{ fontSize: '5rem', opacity: 0.3 }}></div>
                    <h5 className="mt-3">Belum Ada Gambar</h5>
                    <p className="small">Capture gambar dari kamera untuk memulai deteksi ML</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="row mt-4">
          <div className="col-md-12">
            <div className="card shadow-sm">
              <div className="card-header bg-light">
                <h5 className="mb-0"> Panduan Penggunaan</h5>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <h6 className="text-primary mb-3">Langkah-langkah:</h6>
                    <ol className="mb-3">
                      <li className="mb-2">Klik tombol <strong>"Aktifkan Kamera"</strong> untuk mengakses kamera perangkat</li>
                      <li className="mb-2">Arahkan kamera ke tanaman timun yang ingin dideteksi</li>
                      <li className="mb-2">Klik tombol <strong>"Capture"</strong> untuk mengambil snapshot</li>
                      <li className="mb-2">Klik <strong>"Proses dengan ML"</strong> untuk mendeteksi kondisi tanaman</li>
                      <li className="mb-2">Lihat hasil deteksi dan ikuti rekomendasi perawatan</li>
                    </ol>
                  </div>
                  <div className="col-md-6">
                    <h6 className="text-success mb-3">Tips Penggunaan:</h6>
                    <ul className="mb-3">
                      <li className="mb-2"> Pastikan pencahayaan cukup terang</li>
                      <li className="mb-2"> Fokuskan kamera pada daun atau buah</li>
                      <li className="mb-2"> Jarak ideal: 20-30 cm dari tanaman</li>
                      <li className="mb-2"> Hindari gambar blur atau goyang</li>
                      <li className="mb-2"> Izinkan akses kamera pada browser</li>
                    </ul>
                  </div>
                </div>
                <div className="alert alert-info mb-0">
                  <strong>ℹ️ Catatan:</strong> Hasil deteksi saat ini menggunakan simulasi AI. 
                  Integrasikan dengan backend ML (Python/TensorFlow) untuk hasil deteksi real-time yang akurat.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Controlling;
