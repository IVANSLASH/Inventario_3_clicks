# Sistema de Inventario de Puentes "3 Clicks"

## 📋 Descripción

Sistema integral para la gestión y monitoreo de infraestructura vial, desarrollado como parte de la tesis de Maestría en Ingeniería de Carreteras y Puentes de la Universidad Privada de Bolivia (UPB).

## 🚀 Características Principales

- **Geolocalización**: Ubicación precisa de puentes con mapas interactivos
- **Reportes Automatizados**: Generación de informes en PDF y Excel
- **Acceso Móvil**: Interfaz responsive para dispositivos móviles
- **Seguridad**: Autenticación y autorización por roles
- **Gestión de Usuarios**: Sistema de roles (Supervisor, Técnico Senior, Técnico Operativo)

## 🛠️ Tecnologías Utilizadas

- **Frontend**: React 18, Vite
- **Backend**: Firebase (Auth, Firestore, Storage)
- **Mapas**: Leaflet, React-Leaflet
- **Reportes**: jsPDF, xlsx
- **Estilos**: CSS3 con variables CSS

## 📦 Instalación

### Prerrequisitos

- Node.js (versión 16 o superior)
- npm o yarn
- Cuenta de Firebase

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone [URL_DEL_REPOSITORIO]
   cd Inventario_3_clicks
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar Firebase**

   a. Crear un proyecto en [Firebase Console](https://console.firebase.google.com/)
   
   b. Habilitar Authentication con Email/Password
   
   c. Crear una base de datos Firestore
   
   d. Obtener las credenciales de configuración

4. **Configurar variables de entorno**
   
   Crear un archivo `.env` en la raíz del proyecto:
   ```env
   VITE_FIREBASE_API_KEY=tu-api-key-aqui
   VITE_FIREBASE_AUTH_DOMAIN=tu-proyecto.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=tu-proyecto-id
   VITE_FIREBASE_STORAGE_BUCKET=tu-proyecto.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
   VITE_FIREBASE_APP_ID=1:123456789:web:abc123def456
   ```

5. **Ejecutar el proyecto**
   ```bash
   npm run dev
   ```

## 👤 Usuario de Prueba

Para facilitar las pruebas, el sistema incluye un gestor de usuarios de prueba:

- **Email**: `admin@test.com`
- **Contraseña**: `admin123`
- **Rol**: Supervisor (A)

### Crear Usuario de Prueba

1. Ejecutar el proyecto en modo desarrollo
2. En la página principal, aparecerá un panel "Gestión de Usuarios de Prueba"
3. Hacer clic en "Crear Usuario de Prueba"
4. Usar las credenciales para iniciar sesión

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── Header.jsx      # Navegación principal
│   ├── ProtectedRoute.jsx # Protección de rutas
│   └── TestUserManager.jsx # Gestión de usuarios de prueba
├── contexts/           # Contextos de React
│   └── AuthContext.jsx # Contexto de autenticación
├── pages/              # Páginas de la aplicación
│   ├── Home.jsx        # Página principal
│   ├── Contact.jsx     # Página de contacto
│   ├── Auth/           # Páginas de autenticación
│   └── AppPages/       # Páginas de la aplicación
├── services/           # Servicios y APIs
│   ├── firebase.js     # Configuración de Firebase
│   ├── authService.js  # Servicios de autenticación
│   └── puenteService.js # Servicios de puentes
├── styles/             # Archivos CSS
└── utils/              # Utilidades y helpers
```

## 🔐 Sistema de Autenticación

### Roles de Usuario

- **A - Supervisor**: Acceso completo, gestión de usuarios
- **B - Técnico Senior**: Registro de puentes, generación de reportes
- **C - Técnico Operativo**: Registro básico de puentes

### Funcionalidades por Rol

| Funcionalidad | Supervisor | Técnico Senior | Técnico Operativo |
|---------------|------------|----------------|-------------------|
| Dashboard | ✅ | ✅ | ✅ |
| Registrar Puente | ✅ | ✅ | ✅ |
| Ver Mapa | ✅ | ✅ | ✅ |
| Generar Reportes | ✅ | ✅ | ❌ |
| Administración | ✅ | ❌ | ❌ |

## 📱 Páginas Principales

### 1. Página Principal (Home)
- Información del proyecto
- Datos del desarrollador
- Logotipos de la UPB
- Enlaces a autenticación

### 2. Página de Contacto
- Formulario de sugerencias
- Información de contacto
- Preguntas frecuentes

### 3. Dashboard
- Resumen de estadísticas
- Acciones rápidas
- Actividad reciente

## 🔧 Configuración de Firebase

### 1. Authentication
- Habilitar Email/Password
- Configurar reglas de seguridad

### 2. Firestore Database
- Crear colección `usuarios`
- Configurar reglas de seguridad

### 3. Storage (opcional)
- Para almacenamiento de imágenes
- Configurar reglas de acceso

### Reglas de Firestore (ejemplo)
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /usuarios/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /puentes/{puenteId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## 🚀 Despliegue

### Build de Producción
```bash
npm run build
```

### Preview del Build
```bash
npm run preview
```

### Despliegue en Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

## 🐛 Solución de Problemas

### Página en Blanco
- Verificar configuración de Firebase
- Revisar variables de entorno
- Comprobar conexión a internet

### Errores de Autenticación
- Verificar credenciales de Firebase
- Comprobar reglas de Firestore
- Revisar configuración de Authentication

### Errores de Compilación
- Verificar versiones de Node.js y npm
- Limpiar cache: `npm cache clean --force`
- Reinstalar dependencias: `rm -rf node_modules && npm install`

## 📞 Contacto

- **Desarrollador**: Ing. [Tu Nombre Completo]
- **Institución**: Universidad Privada de Bolivia (UPB)
- **Programa**: Maestría en Ingeniería de Carreteras y Puentes
- **Email**: tu.email@upb.edu.bo

## 📄 Licencia

Este proyecto es parte de una tesis de maestría académica. Todos los derechos reservados.

## 🤝 Contribuciones

Para sugerencias o reportes de errores, utiliza la página de contacto del sistema o crea un issue en el repositorio.

---

**Desarrollado con ❤️ para la Universidad Privada de Bolivia**