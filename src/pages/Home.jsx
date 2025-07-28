import React from 'react';
import { Link } from 'react-router-dom';
import TestUserManager from '../components/TestUserManager';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Sistema de Inventario de Puentes</h1>
            <h2>"3 Clicks"</h2>
            <p className="hero-subtitle">
              Plataforma integral para la gestión y monitoreo de infraestructura vial en Bolivia
            </p>
            <div className="hero-buttons">
              <Link to="/login" className="btn btn-primary">Iniciar Sesión</Link>
              <Link to="/register" className="btn btn-secondary">Registrarse</Link>
            </div>
          </div>
          <div className="hero-image">
            <div className="bridge-illustration">
              <div className="bridge"></div>
              <div className="water"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Test User Manager - Solo visible en desarrollo */}
      {import.meta.env.DEV && <TestUserManager />}

      {/* Project Info Section */}
      <section className="project-info">
        <div className="container">
          <div className="upb-logos">
            <div className="logo-container">
              <div className="upb-logo">
                <span className="logo-text">UPB</span>
                <span className="logo-subtitle">Universidad Privada de Bolivia</span>
              </div>
            </div>
          </div>
          
          <div className="project-details">
            <h2>Acerca del Proyecto</h2>
            <div className="project-grid">
              <div className="project-card">
                <h3>🎓 Tesis de Maestría</h3>
                <p>Este proyecto forma parte de la tesis de Maestría en Ingeniería de Carreteras y Puentes de la Universidad Privada de Bolivia (UPB).</p>
              </div>
              
              <div className="project-card">
                <h3>🏗️ Gestión de Infraestructura</h3>
                <p>Sistema innovador para el inventario, inspección y mantenimiento de puentes con tecnología de geolocalización y reportes automatizados.</p>
              </div>
              
              <div className="project-card">
                <h3>📱 Interfaz Intuitiva</h3>
                <p>Diseñado para ser utilizado por técnicos e ingenieros con una interfaz simple y eficiente que permite completar inspecciones en pocos clics.</p>
              </div>
              
              <div className="project-card">
                <h3>🌐 Tecnología Moderna</h3>
                <p>Desarrollado con React, Firebase y tecnologías web modernas para garantizar escalabilidad y mantenimiento.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Puentes de Bolivia Section */}
      <section className="bolivia-bridges">
        <div className="container">
          <h2>Puentes Emblemáticos de Bolivia</h2>
          <p className="section-subtitle">Infraestructura que conecta nuestro país</p>
          
          <div className="bridges-grid">
            <div className="bridge-card">
              <div className="bridge-image">
                <img 
                  src="https://images.unsplash.com/photo-1545558014-8692077e9b5c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                  alt="Puente sobre el río Beni"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                <div className="image-placeholder" style={{display: 'none'}}>
                  <span>🌉</span>
                  <p>Puente sobre el río Beni</p>
                </div>
              </div>
              <div className="bridge-info">
                <h3>Puente sobre el río Beni</h3>
                <p>Conecta las regiones del norte de Bolivia, facilitando el transporte de mercancías y pasajeros.</p>
                <div className="bridge-details">
                  <span className="detail">📍 Norte de Bolivia</span>
                  <span className="detail">🏗️ Estructura metálica</span>
                </div>
              </div>
            </div>

            <div className="bridge-card">
              <div className="bridge-image">
                <img 
                  src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                  alt="Puente de la Amistad"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                <div className="image-placeholder" style={{display: 'none'}}>
                  <span>🌉</span>
                  <p>Puente de la Amistad</p>
                </div>
              </div>
              <div className="bridge-info">
                <h3>Puente de la Amistad</h3>
                <p>Conecta Bolivia con Brasil, siendo un punto estratégico para el comercio internacional.</p>
                <div className="bridge-details">
                  <span className="detail">📍 Frontera Bolivia-Brasil</span>
                  <span className="detail">🌍 Comercio internacional</span>
                </div>
              </div>
            </div>

            <div className="bridge-card">
              <div className="bridge-image">
                <img 
                  src="https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                  alt="Puente sobre el río Mamoré"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                <div className="image-placeholder" style={{display: 'none'}}>
                  <span>🌉</span>
                  <p>Puente sobre el río Mamoré</p>
                </div>
              </div>
              <div className="bridge-info">
                <h3>Puente sobre el río Mamoré</h3>
                <p>Infraestructura vital para el desarrollo de la región del Beni y la integración nacional.</p>
                <div className="bridge-details">
                  <span className="detail">📍 Departamento del Beni</span>
                  <span className="detail">🚛 Transporte de carga</span>
                </div>
              </div>
            </div>

            <div className="bridge-card">
              <div className="bridge-image">
                <img 
                  src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                  alt="Puente en La Paz"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                <div className="image-placeholder" style={{display: 'none'}}>
                  <span>🌉</span>
                  <p>Puente en La Paz</p>
                </div>
              </div>
              <div className="bridge-info">
                <h3>Puente en La Paz</h3>
                <p>Conecta diferentes zonas de la ciudad de La Paz, facilitando la movilidad urbana.</p>
                <div className="bridge-details">
                  <span className="detail">📍 La Paz</span>
                  <span className="detail">🏙️ Movilidad urbana</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Developer Info Section */}
      <section className="developer-info">
        <div className="container">
          <h2>Desarrollador</h2>
          <div className="developer-card">
            <div className="developer-avatar">
              <div className="avatar-placeholder">
                <span>👨‍💻</span>
              </div>
            </div>
            <div className="developer-details">
              <h3>Ing. [Tu Nombre Completo]</h3>
              <p className="developer-title">Desarrollador Full Stack & Ingeniero Civil</p>
              <div className="developer-info-grid">
                <div className="info-item">
                  <strong>Especialidad:</strong> Ingeniería de Carreteras y Puentes
                </div>
                <div className="info-item">
                  <strong>Institución:</strong> Universidad Privada de Bolivia (UPB)
                </div>
                <div className="info-item">
                  <strong>Programa:</strong> Maestría en Ingeniería de Carreteras y Puentes
                </div>
                <div className="info-item">
                  <strong>Área de Investigación:</strong> Gestión de Infraestructura Vial
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2>Características Principales</h2>
          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon">🗺️</div>
              <h3>Geolocalización</h3>
              <p>Ubicación precisa de puentes con mapas interactivos de Bolivia</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">📊</div>
              <h3>Reportes Automatizados</h3>
              <p>Generación de informes en PDF y Excel para autoridades</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">📱</div>
              <h3>Acceso Móvil</h3>
              <p>Interfaz responsive para inspecciones en campo</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">🔒</div>
              <h3>Seguridad</h3>
              <p>Autenticación y autorización por roles de usuario</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <div className="container">
          <h2>¿Tienes Sugerencias?</h2>
          <p>Tu feedback es importante para mejorar nuestro sistema</p>
          <Link to="/contact" className="btn btn-primary">Enviar Sugerencias</Link>
        </div>
      </section>
    </div>
  );
};

export default Home; 