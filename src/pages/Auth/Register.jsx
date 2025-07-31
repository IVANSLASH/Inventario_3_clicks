import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { registerUser, signInWithGoogle } from '../../services/authService';
import '../../styles/Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmPassword: '',
    institucion: '',
    tipoUsuario: 'C'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      navigate('/dashboard');
    }
  }, [currentUser, navigate]);

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      await signInWithGoogle();
      // La redirección se maneja con el useEffect
    } catch (error) {
      setError('Error al registrarse/iniciar sesión con Google.');
      console.error('Error:', error);
      setLoading(false);
    }
  };

  const instituciones = [
    'Gobierno Municipal',
    'Gobierno Departamental',
    'Consultora Privada',
    'Empresa Constructora',
    'Entidad Pública',
    'Universidad',
    'Otro'
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      setLoading(false);
      return;
    }

    try {
      await registerUser(formData.email, formData.password, {
        nombre: formData.nombre,
        email: formData.email,
        institucion: formData.institucion,
        tipoUsuario: formData.tipoUsuario
      });
      // La redirección se maneja con el useEffect
    } catch (error) {
      setError('Error al crear la cuenta. Intenta nuevamente.');
      console.error('Error:', error);
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Inventario 3 Clicks</h1>
        <h2>Crear Cuenta</h2>
        
        {error && <div className="error-message">{error}</div>}

        <button
          type="button"
          className="google-button"
          onClick={handleGoogleLogin}
          disabled={loading}
          style={{ marginBottom: '1rem', width: '100%' }}
        >
          <span className="google-icon" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
            <svg width="22" height="22" viewBox="0 0 48 48"><g><path fill="#4285F4" d="M24 9.5c3.54 0 6.7 1.22 9.18 3.6l6.84-6.84C36.68 2.64 30.88 0 24 0 14.82 0 6.72 5.4 2.7 13.32l7.98 6.2C12.18 13.12 17.62 9.5 24 9.5z"/><path fill="#34A853" d="M46.1 24.5c0-1.64-.14-3.22-.39-4.73H24v9.02h12.44c-.54 2.84-2.16 5.24-4.6 6.84l7.1 5.52C43.98 37.12 46.1 31.34 46.1 24.5z"/><path fill="#FBBC05" d="M10.68 28.02A14.5 14.5 0 019.5 24c0-1.38.22-2.72.62-3.98l-7.98-6.2A23.92 23.92 0 000 24c0 3.8.92 7.38 2.54 10.54l8.14-6.52z"/><path fill="#EA4335" d="M24 48c6.48 0 11.92-2.14 15.9-5.84l-7.1-5.52C30.92 38.28 27.7 39.5 24 39.5c-6.38 0-11.82-3.62-14.32-8.98l-8.14 6.52C6.72 42.6 14.82 48 24 48z"/></g></svg>
          </span>
          {loading ? 'Cargando...' : 'Registrarse / Iniciar sesión con Google'}
        </button>

        <div style={{ textAlign: 'center', margin: '1rem 0', color: '#888' }}>
          o
        </div>
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="nombre">Nombre Completo</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="institucion">Institución</label>
            <select
              id="institucion"
              name="institucion"
              value={formData.institucion}
              onChange={handleChange}
              required
            >
              <option value="">Selecciona tu institución</option>
              {instituciones.map((inst, index) => (
                <option key={index} value={inst}>{inst}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmar Contraseña</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
          </button>
        </form>

        <p className="auth-switch">
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
