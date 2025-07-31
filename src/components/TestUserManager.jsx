import React, { useState } from 'react';
import { createTestUser } from '../services/authService';

const TestUserManager = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [message, setMessage] = useState('');

  const handleCreateTestUser = async () => {
    setIsCreating(true);
    setMessage('');
    
    try {
      await createTestUser();
      setMessage('✅ Usuario de prueba creado exitosamente');
    } catch (error) {
      setMessage(`❌ Error: ${error.message}`);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div style={{
      background: '#f8f9fa',
      border: '2px dashed #dee2e6',
      borderRadius: '8px',
      padding: '20px',
      margin: '20px',
      textAlign: 'center'
    }}>
      <h3 style={{ color: '#6c757d', marginBottom: '15px' }}>
        🛠️ Gestión de Usuarios de Prueba
      </h3>
      
      <div style={{ marginBottom: '15px' }}>
        <p style={{ color: '#6c757d', fontSize: '14px', marginBottom: '10px' }}>
          <strong>Usuario de Prueba:</strong><br />
          Email: <code>admin@test.com</code><br />
          Contraseña: <code>admin123</code>
        </p>
      </div>

      <button
        onClick={handleCreateTestUser}
        disabled={isCreating}
        style={{
          background: '#28a745',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '6px',
          cursor: isCreating ? 'not-allowed' : 'pointer',
          opacity: isCreating ? 0.6 : 1
        }}
      >
        {isCreating ? 'Creando...' : 'Crear Usuario de Prueba'}
      </button>

      {message && (
        <div style={{
          marginTop: '15px',
          padding: '10px',
          borderRadius: '6px',
          fontSize: '14px',
          fontWeight: '500'
        }}>
          {message}
        </div>
      )}

      <div style={{
        marginTop: '15px',
        fontSize: '12px',
        color: '#6c757d'
      }}>
        <p><strong>Nota:</strong> Este componente solo debe estar visible en desarrollo.</p>
        <p>Recuerda configurar Firebase antes de crear usuarios.</p>
      </div>
    </div>
  );
};

export default TestUserManager; 