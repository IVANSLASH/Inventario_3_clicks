import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  updateProfile,
  sendPasswordResetEmail 
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