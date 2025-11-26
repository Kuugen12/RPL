import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Monitoring from './pages/Monitoring';
import Profil from './pages/Profil';
import Panduan from './pages/Panduan';
import Controlling from './pages/Controlling';
import PrivateRoute from './components/PrivateRoute';
import UsersAdmin from './pages/UsersAdmin';

const HomeRedirect = () => {
  const { user, loading } = React.useContext(AuthContext);
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  return <Navigate to={user ? "/home" : "/login"} replace />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Navbar />
          <div className="main-content">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route 
                path="/home" 
                element={
                  <PrivateRoute>
                    <Home />
                  </PrivateRoute>
                }
              />
              <Route 
                path="/monitoring" 
                element={
                  <PrivateRoute>
                    <Monitoring />
                  </PrivateRoute>
                }
              />
              <Route 
                path="/kelola-user"
                element={
                  <PrivateRoute>
                    <UsersAdmin />
                  </PrivateRoute>
                }
              />
              <Route 
                path="/panduan"
                element={
                  <PrivateRoute>
                    <Panduan />
                  </PrivateRoute>
                }
              />
              <Route 
                path="/profil"
                element={
                  <PrivateRoute>
                    <Profil />
                  </PrivateRoute>
                }
              />
              <Route 
                path="/controlling"
                element={
                  <PrivateRoute>
                    <Controlling />
                  </PrivateRoute>
                }
              />
              <Route path="/" element={<HomeRedirect />} />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
