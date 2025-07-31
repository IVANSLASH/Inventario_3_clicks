import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    tipo: 'sugerencia',
    asunto: '',
    mensaje: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simular envío (aquí puedes integrar con Firebase o un servicio de email)
    try {
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simular delay
      
      // Aquí puedes agregar la lógica para enviar el formulario
      console.log('Datos del formulario:', formData);
      
      setSubmitStatus('success');
      setFormData({
        nombre: '',
        email: '',
        tipo: 'sugerencia',
        asunto: '',
        mensaje: ''
      });
    } catch (error) {
      setSubmitStatus('error');
      console.error('Error al enviar:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-hero">
        <div className="container">
          <h1>Contacto y Sugerencias</h1>
          <p>Tu feedback es valioso para mejorar nuestro sistema</p>
        </div>
      </div>

      <div className="contact-content">
        <div className="container">
          <div className="contact-grid">
            {/* Información de contacto */}
            <div className="contact-info">
              <h2>Información de Contacto</h2>
              
              <div className="contact-item">
                <div className="contact-icon">👨‍💻</div>
                <div className="contact-details">
                  <h3>Desarrollador</h3>
                  <p>Ing. [Tu Nombre Completo]</p>
                  <p>Maestría en Ingeniería de Carreteras y Puentes</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">🏫</div>
                <div className="contact-details">
                  <h3>Institución</h3>
                  <p>Universidad Privada de Bolivia (UPB)</p>
                  <p>Programa de Maestría</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">📧</div>
                <div className="contact-details">
                  <h3>Email</h3>
                  <p>tu.email@upb.edu.bo</p>
                  <p>tu.email.personal@gmail.com</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">📱</div>
                <div className="contact-details">
                  <h3>Teléfono</h3>
                  <p>+591 XXX XXX XXX</p>
                  <p>WhatsApp disponible</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">📍</div>
                <div className="contact-details">
                  <h3>Ubicación</h3>
                  <p>La Paz, Bolivia</p>
                  <p>Universidad Privada de Bolivia</p>
                </div>
              </div>
            </div>

            {/* Formulario */}
            <div className="contact-form-container">
              <div className="contact-form-card">
                <h2>Envíanos tu Mensaje</h2>
                
                {submitStatus === 'success' && (
                  <div className="alert alert-success">
                    ✅ ¡Mensaje enviado exitosamente! Te responderemos pronto.
                  </div>
                )}
                
                {submitStatus === 'error' && (
                  <div className="alert alert-error">
                    ❌ Error al enviar el mensaje. Por favor, intenta nuevamente.
                  </div>
                )}

                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="form-group">
                    <label htmlFor="nombre">Nombre Completo *</label>
                    <input
                      type="text"
                      id="nombre"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      required
                      placeholder="Tu nombre completo"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="tu.email@ejemplo.com"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="tipo">Tipo de Mensaje *</label>
                    <select
                      id="tipo"
                      name="tipo"
                      value={formData.tipo}
                      onChange={handleChange}
                      required
                    >
                      <option value="sugerencia">Sugerencia de Mejora</option>
                      <option value="bug">Reporte de Error</option>
                      <option value="consulta">Consulta Técnica</option>
                      <option value="colaboracion">Propuesta de Colaboración</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="asunto">Asunto *</label>
                    <input
                      type="text"
                      id="asunto"
                      name="asunto"
                      value={formData.asunto}
                      onChange={handleChange}
                      required
                      placeholder="Resumen breve del mensaje"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="mensaje">Mensaje *</label>
                    <textarea
                      id="mensaje"
                      name="mensaje"
                      value={formData.mensaje}
                      onChange={handleChange}
                      required
                      rows="6"
                      placeholder="Describe detalladamente tu sugerencia, consulta o comentario..."
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    className="btn btn-primary submit-btn"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sección de FAQ */}
      <div className="faq-section">
        <div className="container">
          <h2>Preguntas Frecuentes</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h3>¿Cómo puedo reportar un error en el sistema?</h3>
              <p>Utiliza el formulario de contacto seleccionando "Reporte de Error" y describe detalladamente el problema que encontraste.</p>
            </div>
            
            <div className="faq-item">
              <h3>¿Puedo sugerir nuevas funcionalidades?</h3>
              <p>¡Por supuesto! Selecciona "Sugerencia de Mejora" en el formulario y comparte tu idea. Todas las sugerencias son bienvenidas.</p>
            </div>
            
            <div className="faq-item">
              <h3>¿Cuánto tiempo tarda la respuesta?</h3>
              <p>Nos comprometemos a responder en un plazo máximo de 48 horas hábiles.</p>
            </div>
            
            <div className="faq-item">
              <h3>¿Puedo colaborar en el desarrollo?</h3>
              <p>Sí, si eres desarrollador o tienes experiencia técnica, selecciona "Propuesta de Colaboración" y cuéntanos sobre tu experiencia.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Botón de regreso */}
      <div className="back-section">
        <div className="container">
          <Link to="/" className="btn btn-secondary">
            ← Volver al Inicio
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Contact; 