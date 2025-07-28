import React from 'react';

const TestComponent = () => {
  return (
    <div style={{ 
      padding: '20px', 
      textAlign: 'center', 
      backgroundColor: '#f0f0f0', 
      margin: '20px',
      borderRadius: '8px'
    }}>
      <h2>✅ Componente de Prueba Funcionando</h2>
      <p>Si puedes ver este mensaje, React está funcionando correctamente.</p>
      <p>Fecha y hora actual: {new Date().toLocaleString('es-ES')}</p>
    </div>
  );
};

export default TestComponent; 