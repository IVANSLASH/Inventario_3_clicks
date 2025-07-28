import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Header.css';

const Header = () => {
  const { currentUser, userProfile, logout, error } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const getUserTypeLabel = (tipo) => {
    switch(tipo) {
      case 'A': return 'Supervisor';
      case 'B': return 'Técnico Senior';
      case 'C': return 'Técnico Operativo';
      default: return '';
    }
  };

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  // Si hay un error de Firebase, mostrar un mensaje
  if (error) {
    return (
      <header className="header">
        <div className="header-content">
          <div className="header-left">
            <Link to="/" className="logo">
              <h1>Inventario 3 Clicks</h1>
            </Link>
          </div>
          <div className="header-right">
            <div className="error-message">
              ⚠️ Error de configuración. Revisa la consola para más detalles.
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <Link to="/" className="logo">
            <h1>Inventario 3 Clicks</h1>
          </Link>
        </div>

        {currentUser && (
          <>
            <nav className="header-nav">
              <Link 
                to="/dashboard" 
                className={`nav-link ${isActiveRoute('/dashboard') ? 'active' : ''}`}
              >
                Dashboard
              </Link>
              <Link 
                to="/registrar-puente" 
                className={`nav-link ${isActiveRoute('/registrar-puente') ? 'active' : ''}`}
              >
                Registrar Puente
              </Link>
              <Link 
                to="/mapa" 
                className={`nav-link ${isActiveRoute('/mapa') ? 'active' : ''}`}
              >
                Mapa
              </Link>
              {userProfile?.tipoUsuario === 'A' && (
                <Link 
                  to="/admin" 
                  className={`nav-link ${isActiveRoute('/admin') ? 'active' : ''}`}
                >
                  Administración
                </Link>
              )}
            </nav>

            <div className="header-right">
              <div className="user-info">
                <span className="user-name">{userProfile?.nombre || currentUser.email}</span>
                {userProfile?.tipoUsuario && (
                  <span className="user-type">{getUserTypeLabel(userProfile.tipoUsuario)}</span>
                )}
                {userProfile?.institucion && (
                  <span className="user-institution">{userProfile.institucion}</span>
                )}
              </div>
              <button onClick={handleLogout} className="logout-btn">
                Cerrar Sesión
              </button>
            </div>
          </>
        )}

        {!currentUser && (
          <>
            <nav className="header-nav">
              <Link 
                to="/" 
                className={`nav-link ${isActiveRoute('/') ? 'active' : ''}`}
              >
                Inicio
              </Link>
              <Link 
                to="/contact" 
                className={`nav-link ${isActiveRoute('/contact') ? 'active' : ''}`}
              >
                Contacto
              </Link>
            </nav>
            <div className="header-right">
              <Link to="/login" className="nav-link">Iniciar Sesión</Link>
              <Link to="/register" className="btn btn-primary">Registrarse</Link>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;