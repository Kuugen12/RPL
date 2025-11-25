import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!username || !email || !password || !password2) {
      setError('Semua field harus diisi');
      return;
    }

    if (password !== password2) {
      setError('Password tidak cocok');
      return;
    }

    setLoading(true);

    try {
      const result = await register(username, email, password);
      if (result.success) {
        navigate('/login');
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('Terjadi kesalahan. Coba lagi.');
    } finally {
      setLoading(false);
    }
  };

 return (
  <>
    <style>{`
      .register-page {
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
                    url('/images/farm-background.jpg') center/cover no-repeat fixed;
        padding: 2rem 1rem;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 10;
      }

      .register-card {
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
        border-radius: 16px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        max-width: 450px;
        width: 100%;
        margin: 0 auto;
        position: relative;
        z-index: 20;
      }
    `}</style>

      <div className="register-page">
        <div className="register-card">
          <div className="card-body p-5">
            <h2 className="text-center mb-4 fw-bold">Daftar</h2>
            
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={loading}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="contoh@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  required
                />
              </div>
              
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Masukkan password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Konfirmasi Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Konfirmasi password"
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                  disabled={loading}
                  required
                />
              </div>
              
              <button 
                type="submit" 
                className="btn btn-primary w-100"
                disabled={loading}
              >
                {loading ? 'Memproses...' : 'Daftar'}
              </button>
            </form>
            
            <div className="text-center mt-3">
              <p>Sudah punya akun? <Link to="/login">Login di sini</Link></p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
