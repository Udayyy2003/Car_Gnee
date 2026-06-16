import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// NOTE: User will need to add their Firebase config here
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
// Secondary app for client creation (won't affect admin auth state)
const clientCreationApp = initializeApp(firebaseConfig, "clientCreationApp");

console.log("Firebase Project:", firebaseConfig.projectId);

export const auth = getAuth(app);
export const clientCreationAuth = getAuth(clientCreationApp);
export const db = getFirestore(app);
