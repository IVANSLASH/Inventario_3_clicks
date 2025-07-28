import { db } from './firebase';
import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  getDoc, 
  updateDoc, 
  query, 
  where, 
  orderBy 
} from 'firebase/firestore';

export const crearPuente = async (datosParaente) => {
  try {
    const docRef = await addDoc(collection(db, 'puentes'), {
      ...datosParaente,
      fechaCreacion: new Date(),
      activo: true
    });
    return docRef.id;
  } catch (error) {
    console.error('Error al crear puente:', error);
    throw error;
  }
};

export const obtenerPuentesPorInstitucion = async (institucion) => {
  try {
    const q = query(
      collection(db, 'puentes'),
      where('institucion', '==', institucion),
      where('activo', '==', true),
      orderBy('fechaCreacion', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const puentes = [];
    
    querySnapshot.forEach((doc) => {
      puentes.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return puentes;
  } catch (error) {
    console.error('Error al obtener puentes:', error);
    throw error;
  }
};

export const obtenerPuente = async (id) => {
  try {
    const docRef = doc(db, 'puentes', id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      };
    } else {
      throw new Error('Puente no encontrado');
    }
  } catch (error) {
    console.error('Error al obtener puente:', error);
    throw error;
  }
};

export const actualizarPuente = async (id, datos) => {
  try {
    const docRef = doc(db, 'puentes', id);
    await updateDoc(docRef, {
      ...datos,
      fechaActualizacion: new Date()
    });
  } catch (error) {
    console.error('Error al actualizar puente:', error);
    throw error;
  }
};