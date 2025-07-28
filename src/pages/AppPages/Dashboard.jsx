import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import '../../styles/Dashboard.css';

const Dashboard = () => {
  const { userProfile } = useAuth();

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Dashboard - Gestión de Puentes</h2>
        <p>Bienvenido, {userProfile?.nombre}</p>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>0</h3>
          <p>Puentes Registrados</p>
        </div>
        <div className="stat-card">
          <h3>0</h3>
          <p>Inspecciones Realizadas</p>
        </div>
        <div className="stat-card">
          <h3>0</h3>
          <p>Puentes en Buen Estado</p>
        </div>
        <div className="stat-card">
          <h3>0</h3>
          <p>Puentes Requieren Atención</p>
        </div>
      </div>

      <div className="dashboard-actions">
        <div className="action-card">
          <h3>Registrar Nuevo Puente</h3>
          <p>Registra un nuevo puente en el sistema</p>
          <button className="action-btn">Registrar Puente</button>
        </div>
        <div className="action-card">
          <h3>Ver Mapa</h3>
          <p>Visualiza todos los puentes en el mapa</p>
          <button className="action-btn">Ver Mapa</button>
        </div>
        <div className="action-card">
          <h3>Generar Reportes</h3>
          <p>Exporta datos en diferentes formatos</p>
          <button className="action-btn">Generar Reporte</button>
        </div>
      </div>

      <div className="recent-activity">
        <h3>Actividad Reciente</h3>
        <div className="activity-list">
          <p>No hay actividad reciente</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;