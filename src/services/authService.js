import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  updateProfile,
  sendPasswordResetEmail, 
  GoogleAuthProvider, 
  signInWithPopup 
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebase';

// Crear un nuevo usuario
export const registerUser = async (email, password, userData) => {
  try {
    // Crear usuario en Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Actualizar el perfil del usuario
    await updateProfile(user, {
      displayName: userData.nombre
    });

    // Crear documento de usuario en Firestore
    const userDoc = {
      uid: user.uid,
      email: user.email,
      nombre: userData.nombre,
      tipoUsuario: userData.tipoUsuario || 'C', // Por defecto Técnico Operativo
      institucion: userData.institucion || '',
      telefono: userData.telefono || '',
      fechaRegistro: new Date().toISOString(),
      activo: true
    };

    await setDoc(doc(db, 'usuarios', user.uid), userDoc);

    return { success: true, user };
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    throw error;
  }
};

// Iniciar sesión con Google
export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  
  // Configurar scopes y parámetros adicionales
  provider.addScope('email');
  provider.addScope('profile');
  
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Verificar si el usuario ya existe en Firestore
    const userDocRef = doc(db, 'usuarios', user.uid);
    const userDocSnap = await getDoc(userDocRef);
    if (!userDocSnap.exists()) {
      // Crear documento de usuario si es nuevo
      const userDoc = {
        uid: user.uid,
        email: user.email,
        nombre: user.displayName || '',
        tipoUsuario: 'C', // Por defecto Técnico Operativo
        institucion: '',
        telefono: user.phoneNumber || '',
        fechaRegistro: new Date().toISOString(),
        activo: true
      };
      await setDoc(userDocRef, userDoc);
    }
    return { success: true, user };
  } catch (error) {
    console.error('Error al iniciar sesión con Google:', error);
    
    // Manejo de errores más específico
    let errorMessage = 'Error al registrarse/iniciar sesión con Google.';
    
    switch (error.code) {
      case 'auth/popup-closed-by-user':
        errorMessage = 'La ventana de autenticación fue cerrada. Inténtalo de nuevo.';
        break;
      case 'auth/popup-blocked':
        errorMessage = 'El navegador bloqueó la ventana emergente. Permite ventanas emergentes para este sitio.';
        break;
      case 'auth/cancelled-popup-request':
        errorMessage = 'Solo se puede tener una ventana de autenticación abierta a la vez.';
        break;
      case 'auth/operation-not-allowed':
        errorMessage = 'La autenticación con Google no está habilitada en este proyecto.';
        break;
      case 'auth/network-request-failed':
        errorMessage = 'Error de conexión. Verifica tu conexión a internet.';
        break;
      case 'auth/too-many-requests':
        errorMessage = 'Demasiados intentos. Espera un momento e inténtalo de nuevo.';
        break;
      case 'auth/user-disabled':
        errorMessage = 'Esta cuenta ha sido deshabilitada.';
        break;
      default:
        errorMessage = `Error: ${error.message}`;
    }
    
    throw new Error(errorMessage);
  }
};

// Iniciar sesión
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    throw error;
  }
};

// Obtener perfil de usuario
export const getUserProfile = async (uid) => {
  try {
    const userDoc = await getDoc(doc(db, 'usuarios', uid));
    if (userDoc.exists()) {
      return userDoc.data();
    }
    return null;
  } catch (error) {
    console.error('Error al obtener perfil:', error);
    throw error;
  }
};

// Restablecer contraseña
export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true };
  } catch (error) {
    console.error('Error al restablecer contraseña:', error);
    throw error;
  }
};

// Crear usuario de prueba (solo para desarrollo)
export const createTestUser = async () => {
  const testUserData = {
    email: 'admin@test.com',
    password: 'admin123',
    nombre: 'Administrador de Prueba',
    tipoUsuario: 'A', // Supervisor
    institucion: 'UPB - Universidad Privada de Bolivia',
    telefono: '+591 123456789'
  };

  try {
    const result = await registerUser(
      testUserData.email, 
      testUserData.password, 
      testUserData
    );
    console.log('✅ Usuario de prueba creado exitosamente:', testUserData.email);
    return result;
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      console.log('ℹ️ El usuario de prueba ya existe');
      return { success: true, message: 'Usuario ya existe' };
    }
    console.error('❌ Error al crear usuario de prueba:', error);
    throw error;
  }
};

// Verificar si existe un usuario de prueba
export const checkTestUser = async () => {
  try {
    const testEmail = 'admin@test.com';
    const userDoc = await getDoc(doc(db, 'usuarios', testEmail));
    return userDoc.exists();
  } catch (error) {
    console.error('Error al verificar usuario de prueba:', error);
    return false;
  }
};