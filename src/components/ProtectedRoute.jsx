import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children, requiredRole = null }) => {
  const { currentUser, userProfile, loading } = useAuth();

  if (loading) {
    // Muestra un estado de carga mientras se verifica la autenticación
    return <div>Cargando...</div>;
  }

  if (!currentUser) {
    // Si no hay usuario, redirige a la página de login
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && userProfile?.tipoUsuario !== requiredRole) {
    // Si se requiere un rol específico y el usuario no lo tiene, redirige al dashboard
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;
