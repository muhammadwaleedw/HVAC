import { 
  collection, 
  onSnapshot, 
  query, 
  orderBy, 
  doc, 
  setDoc, 
  addDoc, 
  deleteDoc, 
  getDoc 
} from 'firebase/firestore';
import { db } from '../firebase';
import { 
  SiteSettings, 
  Service, 
  Project, 
  Testimonial, 
  BlogPost, 
  PartnerLogo, 
  Location 
} from '../types';

// Generic subscription helper
export function subscribeToCollection<T>(
  collectionName: string, 
  callback: (data: T[]) => void,
  sortField: string = 'order'
) {
  const q = query(collection(db, collectionName), orderBy(sortField, 'asc'));
  return onSnapshot(q, (snapshot) => {
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as T));
    callback(data);
  }, (error) => {
    console.error(`Error subscribing to ${collectionName}:`, error);
  });
}

// Site Settings
export function subscribeToSettings(callback: (data: SiteSettings | null) => void) {
  return onSnapshot(doc(db, 'settings', 'site'), (doc) => {
    if (doc.exists()) {
      callback(doc.data() as SiteSettings);
    } else {
      callback(null);
    }
  }, (error) => {
    console.error('Error subscribing to settings:', error);
    callback(null);
  });
}

export async function updateSettings(data: SiteSettings) {
  await setDoc(doc(db, 'settings', 'site'), data);
}

// Generic CRUD
export async function addItem(collectionName: string, data: any) {
  return await addDoc(collection(db, collectionName), data);
}

export async function updateItem(collectionName: string, id: string, data: any) {
  await setDoc(doc(db, collectionName, id), data, { merge: true });
}

export async function deleteItem(collectionName: string, id: string) {
  await deleteDoc(doc(db, collectionName, id));
}
