import { db } from '../firebase/firebaseConfig';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';

const COL = 'categories';

export const getCategories = async () => {
  const snap = await getDocs(collection(db, COL));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};

export const addCategory = async (name) => {
  return addDoc(collection(db, COL), { name, createdAt: new Date() });
};

export const deleteCategory = async (id) => {
  return deleteDoc(doc(db, COL, id));
};
