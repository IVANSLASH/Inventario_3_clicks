import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { db, storage } from '../../services/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import '../../styles/Form.css';

const RegistrarPuente = () => {
  const { userProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    nombre: '',
    ubicacion: {
      departamento: '',
      municipio: '',
      localidad: '',
      latitud: '',
      longitud: ''
    },
    redVial: '',
    tipoVia: '',
    propietario: '',
    responsable: '',
    tipoPuente: '',
    anoConstruction: '',
    descripcion: ''
  });

  const [foto, setFoto] = useState(null);

  const departamentos = [
    'La Paz', 'Cochabamba', 'Santa Cruz', 'Oruro', 'Potosí', 
    'Chuquisaca', 'Tarija', 'Beni', 'Pando'
  ];

  const redesViales = [
    'Red Fundamental',
    'Red Departamental', 
    'Red Municipal',
    'Camino Vecinal'
  ];

  const tiposVia = [
    'Carretera Asfaltada',
    'Carretera Ripiada',
    'Camino de Tierra',
    'Sendero Peatonal'
  ];

  const tiposPuente = [
    'Puente de Hormigón Armado',
    'Puente Metálico',
    'Puente de Madera',
    'Puente Mixto',
    'Alcantarilla',
    'Vado'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFoto(e.target.files[0]);
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData(prev => ({
            ...prev,
            ubicacion: {
              ...prev.ubicacion,
              latitud: position.coords.latitude.toString(),
              longitud: position.coords.longitude.toString()
            }
          }));
        },
        (error) => {
          setError('No se pudo obtener la ubicación actual');
        }
      );
    } else {
      setError('La geolocalización no es compatible con este navegador');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      let fotoURL = '';

      if (foto) {
        const fotoRef = ref(storage, `puentes/${Date.now()}_${foto.name}`);
        const snapshot = await uploadBytes(fotoRef, foto);
        fotoURL = await getDownloadURL(snapshot.ref);
      }

      const puenteData = {
        ...formData,
        fotoURL,
        fechaRegistro: new Date(),
        registradoPor: userProfile.nombre,
        institucion: userProfile.institucion,
        estado: 'registrado',
        activo: true
      };

      await addDoc(collection(db, 'puentes'), puenteData);

      setSuccess('Puente registrado exitosamente');
      
      setFormData({
        nombre: '',
        ubicacion: {
          departamento: '',
          municipio: '',
          localidad: '',
          latitud: '',
          longitud: ''
        },
        redVial: '',
        tipoVia: '',
        propietario: '',
        responsable: '',
        tipoPuente: '',
        anoConstruction: '',
        descripcion: ''
      });
      setFoto(null);

    } catch (error) {
      setError('Error al registrar el puente');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <h2>Registrar Nuevo Puente</h2>
        <p>Registra un puente de forma remota sin necesidad de estar in situ</p>
      </div>

      {success && <div className="success-message">{success}</div>}
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="puente-form">
        <div className="form-section">
          <h3>Información Básica</h3>
          
          <div className="form-group">
            <label htmlFor="nombre">Nombre del Puente *</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
              required
              placeholder="Ej: Puente San Martín"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="tipoPuente">Tipo de Puente *</label>
              <select
                id="tipoPuente"
                name="tipoPuente"
                value={formData.tipoPuente}
                onChange={handleInputChange}
                required
              >
                <option value="">Seleccionar tipo</option>
                {tiposPuente.map((tipo, index) => (
                  <option key={index} value={tipo}>{tipo}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="anoConstruction">Año de Construcción</label>
              <input
                type="number"
                id="anoConstruction"
                name="anoConstruction"
                value={formData.anoConstruction}
                onChange={handleInputChange}
                min="1900"
                max={new Date().getFullYear()}
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Ubicación</h3>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="ubicacion.departamento">Departamento *</label>
              <select
                id="ubicacion.departamento"
                name="ubicacion.departamento"
                value={formData.ubicacion.departamento}
                onChange={handleInputChange}
                required
              >
                <option value="">Seleccionar departamento</option>
                {departamentos.map((dept, index) => (
                  <option key={index} value={dept}>{dept}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="ubicacion.municipio">Municipio *</label>
              <input
                type="text"
                id="ubicacion.municipio"
                name="ubicacion.municipio"
                value={formData.ubicacion.municipio}
                onChange={handleInputChange}
                required
                placeholder="Nombre del municipio"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="ubicacion.localidad">Localidad/Comunidad</label>
            <input
              type="text"
              id="ubicacion.localidad"
              name="ubicacion.localidad"
              value={formData.ubicacion.localidad}
              onChange={handleInputChange}
              placeholder="Nombre de la localidad o comunidad"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="ubicacion.latitud">Latitud</label>
              <input
                type="number"
                step="any"
                id="ubicacion.latitud"
                name="ubicacion.latitud"
                value={formData.ubicacion.latitud}
                onChange={handleInputChange}
                placeholder="-16.5000"
              />
            </div>

            <div className="form-group">
              <label htmlFor="ubicacion.longitud">Longitud</label>
              <input
                type="number"
                step="any"
                id="ubicacion.longitud"
                name="ubicacion.longitud"
                value={formData.ubicacion.longitud}
                onChange={handleInputChange}
                placeholder="-68.1500"
              />
            </div>

            <button
              type="button"
              onClick={getCurrentLocation}
              className="location-btn"
            >
              Obtener Ubicación
            </button>
          </div>
        </div>

        <div className="form-section">
          <h3>Características de la Vía</h3>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="redVial">Red Vial *</label>
              <select
                id="redVial"
                name="redVial"
                value={formData.redVial}
                onChange={handleInputChange}
                required
              >
                <option value="">Seleccionar red vial</option>
                {redesViales.map((red, index) => (
                  <option key={index} value={red}>{red}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="tipoVia">Tipo de Vía *</label>
              <select
                id="tipoVia"
                name="tipoVia"
                value={formData.tipoVia}
                onChange={handleInputChange}
                required
              >
                <option value="">Seleccionar tipo de vía</option>
                {tiposVia.map((tipo, index) => (
                  <option key={index} value={tipo}>{tipo}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="propietario">Propietario</label>
              <input
                type="text"
                id="propietario"
                name="propietario"
                value={formData.propietario}
                onChange={handleInputChange}
                placeholder="Ej: ABC - Administradora Boliviana de Carreteras"
              />
            </div>

            <div className="form-group">
              <label htmlFor="responsable">Responsable de Mantenimiento</label>
              <input
                type="text"
                id="responsable"
                name="responsable"
                value={formData.responsable}
                onChange={handleInputChange}
                placeholder="Ej: Gobierno Municipal de La Paz"
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Fotografía</h3>
          
          <div className="form-group">
            <label htmlFor="foto">Subir Fotografía del Puente</label>
            <input
              type="file"
              id="foto"
              accept="image/*"
              onChange={handleFileChange}
              className="file-input"
            />
            <small>Formato: JPG, PNG. Tamaño máximo: 5MB</small>
          </div>
        </div>

        <div className="form-section">
          <div className="form-group">
            <label htmlFor="descripcion">Descripción Adicional</label>
            <textarea
              id="descripcion"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleInputChange}
              rows="4"
              placeholder="Información adicional sobre el puente..."
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="cancel-btn">
            Cancelar
          </button>
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Registrando...' : 'Registrar Puente'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegistrarPuente;