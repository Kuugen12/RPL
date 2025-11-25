import React, { useContext } from 'react';
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

// Component untuk smart redirect
const HomeRedirect = () => {
  const { user, loading } = useContext(AuthContext);
  
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
          <div className="main-content">  {/* Tambah className ini */}
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Protected Routes */}
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
              
              {/* Default Route */}
              <Route path="/" element={<HomeRedirect />} />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}



export default App;
