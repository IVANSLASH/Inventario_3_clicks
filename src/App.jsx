import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Contact from './pages/Contact';
import Dashboard from './pages/AppPages/Dashboard';
import RegistrarPuente from './pages/AppPages/RegistrarPuente';
import './styles/App.css';

const AppRoutes = () => {
  const { loading } = useAuth();

  if (loading) {
    return <div>Cargando aplicación...</div>; // O un spinner/logo más elegante
  }

  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/contact" element={<Contact />} />
      
      {/* Rutas protegidas */}
      <Route 
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      
      <Route 
        path="/registrar-puente"
        element={
          <ProtectedRoute>
            <RegistrarPuente />
          </ProtectedRoute>
        }
      />
      
      {/* Ruta por defecto para usuarios autenticados y rutas no encontradas */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="app">
          <Header />
          <main className="main-content">
            <AppRoutes />
          </main>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
