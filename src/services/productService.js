import { db, storage } from '../firebase/firebaseConfig';
import {
  collection, addDoc, getDocs, getDoc,
  doc, updateDoc, deleteDoc, query, orderBy
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

const COL = 'products';

export const getProducts = async () => {
  const q = query(collection(db, COL), orderBy('createdAt', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};

export const getProduct = async (id) => {
  const snap = await getDoc(doc(db, COL, id));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
};

// Tek görsel yükle, URL döndür
const uploadImage = async (file) => {
  const storageRef = ref(storage, `products/${Date.now()}_${file.name}`);
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
};

export const addProduct = async (data, imageFiles = []) => {
  const urls = await Promise.all(imageFiles.map(uploadImage));
  return addDoc(collection(db, COL), {
    ...data,
    imageUrl: urls[0] || '',      // ana görsel (kart için)
    images: urls,                  // tüm görseller (detay için)
    createdAt: new Date(),
  });
};

export const updateProduct = async (id, data, newImageFiles = []) => {
  let images = data.images || (data.imageUrl ? [data.imageUrl] : []);
  if (newImageFiles.length > 0) {
    const newUrls = await Promise.all(newImageFiles.map(uploadImage));
    images = [...images, ...newUrls];
  }
  return updateDoc(doc(db, COL, id), {
    ...data,
    imageUrl: images[0] || '',
    images,
    updatedAt: new Date(),
  });
};

export const deleteProduct = async (id, images = []) => {
  for (const url of images) {
    try { await deleteObject(ref(storage, url)); } catch (_) {}
  }
  return deleteDoc(doc(db, COL, id));
};

export const removeProductImage = async (id, urlToRemove, currentImages) => {
  try { await deleteObject(ref(storage, urlToRemove)); } catch (_) {}
  const images = currentImages.filter(u => u !== urlToRemove);
  return updateDoc(doc(db, COL, id), {
    images,
    imageUrl: images[0] || '',
  });
};
