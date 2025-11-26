import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';


const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div className="container-fluid">
        <NavLink className="navbar-brand fw-bold" to="/home">
          TimuNova
        </NavLink>
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
              <NavLink 
                className={({ isActive }) => `nav-link${isActive ? ' active fw-bold' : ''}`}
                to="/home"
                end
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                className={({ isActive }) => `nav-link${isActive ? ' active fw-bold' : ''}`}
                to="/monitoring"
              >
                Monitoring
              </NavLink>
            </li>
            {user.role === 'admin' && (
              <li className="nav-item">
                <NavLink
                  to="/kelola-user"
                  className={({ isActive }) => `nav-link${isActive ? ' active fw-bold' : ''}`}
                >
                  Kelola User
                </NavLink>
              </li>
            )}
            <li className="nav-item">
              <NavLink 
                className={({ isActive }) => `nav-link${isActive ? ' active fw-bold' : ''}`}
                to="/panduan"
              >
                Panduan
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                className={({ isActive }) => `nav-link${isActive ? ' active fw-bold' : ''}`}
                to="/profil"
              >
                Profil
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                className={({ isActive }) => `nav-link${isActive ? ' active fw-bold' : ''}`}
                to="/controlling"
              >
                Controlling
              </NavLink>
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
