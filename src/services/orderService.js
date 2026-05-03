import { db } from '../firebase/firebaseConfig';
import {
  collection, addDoc, getDocs, getDoc,
  doc, updateDoc, query, orderBy
} from 'firebase/firestore';

const COL = 'orders';

export const getOrders = async () => {
  const q = query(collection(db, COL), orderBy('createdAt', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};

export const getOrder = async (id) => {
  const snap = await getDoc(doc(db, COL, id));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
};

export const addOrder = async (data) => {
  return addDoc(collection(db, COL), { ...data, createdAt: new Date(), status: 'pending' });
};

export const updateOrderStatus = async (id, status) => {
  return updateDoc(doc(db, COL, id), { status, updatedAt: new Date() });
};
