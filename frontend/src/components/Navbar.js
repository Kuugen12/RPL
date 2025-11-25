import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  // Check active link
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/home">
          TimuNova
        </Link>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link 
                className={`nav-link ${isActive('/home') ? 'active fw-bold' : ''}`}
                to="/home"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${isActive('/monitoring') ? 'active fw-bold' : ''}`}
                to="/monitoring"
              >
                Monitoring
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${isActive('/panduan') ? 'active fw-bold' : ''}`}
                to="/panduan"
              >
                Panduan
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${isActive('/profil') ? 'active fw-bold' : ''}`}
                to="/profil"
              >
                Profil
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${isActive('/controlling') ? 'active fw-bold' : ''}`}
                to="/controlling"
              >
                Controlling
              </Link>
            </li>
            <li className="nav-item">
              <button 
                className="btn btn-outline-light ms-2" 
                onClick={handleLogout}
              >
                Keluar
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
