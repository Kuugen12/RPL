import React from 'react';
import { useAuth } from '../hooks/useAuth';

const Profil = () => {
  const { user } = useAuth();

  if (!user) return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center' 
    }}>
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );

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
            <h1 className="mb-2">👤 Profil Pengguna</h1>
            <p className="text-muted">Kelola informasi akun Anda</p>
          </div>
        </div>

        <div className="row">
          {/* Main Profile Card */}
          <div className="col-lg-8 mb-4">
            <div className="card shadow-sm">
              <div className="card-header bg-primary text-white">
                <h5 className="mb-0">Informasi Akun</h5>
              </div>
              <div className="card-body">
                <div className="row mb-3">
                  <div className="col-md-4">
                    <label className="text-muted fw-bold">Username</label>
                  </div>
                  <div className="col-md-8">
                    <p className="mb-0">{user.username}</p>
                  </div>
                </div>
                <hr />

                <div className="row mb-3">
                  <div className="col-md-4">
                    <label className="text-muted fw-bold">Email</label>
                  </div>
                  <div className="col-md-8">
                    <p className="mb-0">{user.email}</p>
                  </div>
                </div>
                <hr />

                <div className="row mb-3">
                  <div className="col-md-4">
                    <label className="text-muted fw-bold">Role</label>
                  </div>
                  <div className="col-md-8">
                    <span className={`badge ${user.role === 'admin' ? 'bg-danger' : 'bg-primary'}`}>
                      {user.role === 'admin' ? '🛡️ Admin' : '👤 User'}
                    </span>
                  </div>
                </div>
                <hr />

                <div className="row mb-0">
                  <div className="col-md-4">
                    <label className="text-muted fw-bold">Member sejak</label>
                  </div>
                  <div className="col-md-8">
                    <p className="mb-0">
                      📅 {new Date(user.createdAt).toLocaleDateString('id-ID', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Sidebar */}
          <div className="col-lg-4 mb-4">
            {/* Account Status */}
            <div className="card shadow-sm mb-3">
              <div className="card-body text-center">
                <div className="mb-3">
                  <div style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #2d7a3e 0%, #4caf50 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto',
                    fontSize: '2rem'
                  }}>
                    {user.username.charAt(0).toUpperCase()}
                  </div>
                </div>
                <h5 className="mb-1">{user.username}</h5>
                <p className="text-muted mb-2">{user.email}</p>
                <span className={`badge ${user.role === 'admin' ? 'bg-danger' : 'bg-success'}`}>
                  Status: Aktif
                </span>
              </div>
            </div>

            {/* Account Stats */}
            <div className="card shadow-sm">
              <div className="card-header bg-light">
                <h6 className="mb-0">Statistik Akun</h6>
              </div>
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div>
                    <small className="text-muted">Lama Bergabung</small>
                    <h6 className="mb-0">
                      {Math.floor((new Date() - new Date(user.createdAt)) / (1000 * 60 * 60 * 24))} Hari
                    </h6>
                  </div>
                  <div className="text-primary fs-4">📊</div>
                </div>
                <hr />
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div>
                    <small className="text-muted">Akses Terakhir</small>
                    <h6 className="mb-0">Hari ini</h6>
                  </div>
                  <div className="text-success fs-4">✅</div>
                </div>
                <hr />
                <div className="d-flex justify-content-between align-items-center mb-0">
                  <div>
                    <small className="text-muted">Tingkat Akun</small>
                    <h6 className="mb-0">{user.role === 'admin' ? 'Administrator' : 'Pengguna Standar'}</h6>
                  </div>
                  <div className="text-warning fs-4">⭐</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="row">
          <div className="col-md-12">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title mb-3">Pengaturan Akun</h5>
                <div className="d-flex flex-wrap gap-2">
                  <button className="btn btn-primary" disabled>
                    ✏️ Edit Profil
                  </button>
                  <button className="btn btn-outline-secondary" disabled>
                    🔒 Ubah Password
                  </button>
                  <button className="btn btn-outline-danger" disabled>
                    🗑️ Hapus Akun
                  </button>
                </div>
                <small className="text-muted d-block mt-2">
                  ⓘ Fitur pengaturan akan segera tersedia
                </small>
              </div>
            </div>
          </div>
        </div>

        {/* Activity Timeline */}
        <div className="row mt-4">
          <div className="col-md-12">
            <div className="card shadow-sm">
              <div className="card-header bg-light">
                <h5 className="mb-0">🕐 Aktivitas Terkini</h5>
              </div>
              <div className="card-body">
                <div className="timeline">
                  <div className="d-flex mb-3">
                    <div className="flex-shrink-0">
                      <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        background: '#4caf50',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white'
                      }}>
                        ✓
                      </div>
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <h6 className="mb-1">Login Berhasil</h6>
                      <p className="text-muted mb-0 small">
                        {new Date().toLocaleString('id-ID')}
                      </p>
                    </div>
                  </div>

                  <div className="d-flex mb-3">
                    <div className="flex-shrink-0">
                      <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        background: '#3498db',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white'
                      }}>
                        👤
                      </div>
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <h6 className="mb-1">Profil Dikunjungi</h6>
                      <p className="text-muted mb-0 small">Sekarang</p>
                    </div>
                  </div>

                  <div className="d-flex">
                    <div className="flex-shrink-0">
                      <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        background: '#95a5a6',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white'
                      }}>
                        🎉
                      </div>
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <h6 className="mb-1">Akun Dibuat</h6>
                      <p className="text-muted mb-0 small">
                        {new Date(user.createdAt).toLocaleDateString('id-ID')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profil;
