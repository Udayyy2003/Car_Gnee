import { auth, db, clientCreationAuth } from './firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { createUserDocument, createSocietyClient } from './firestoreService';

// Register a user (for initial setup or self-service)
export const registerUser = async (fullName, email, password, phone, address) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;
  
  // Check if user document already exists (created by admin)
  const existingUserDoc = await getUserData(user.uid);
  
  if (!existingUserDoc) {
    await createUserDocument(user.uid, {
      uid: user.uid,
      email,
      fullName,
      phone,
      address,
      role: 'client',
      societyId: null,
      clientId: null
    });
  }

  return user;
};

// Create a client account (admin-only) - creates Firebase auth AND Firestore client doc
export const createClientAccount = async (societyId, fullName, email, password, phone, address) => {
  // 1. Create Firebase Auth user using SECONDARY app (won't affect admin session!)
  const userCredential = await createUserWithEmailAndPassword(clientCreationAuth, email, password);
  const authUid = userCredential.user.uid;

  // 2. Sign out the temporary user from the secondary app
  await signOut(clientCreationAuth);
  
  // 3. Create Firestore client doc under society
  const clientDoc = await createSocietyClient(societyId, {
    fullName,
    email,
    phone,
    address,
    authUid // Link to Firebase auth
  });

  return { authUid, clientDoc };
};

export const login = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

export const logout = async () => {
  await signOut(auth);
};

export const getUserRole = async (uid) => {
  const docRef = doc(db, 'users', uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data().role;
  }
  return null;
};

export const getUserData = async (uid) => {
  const docRef = doc(db, 'users', uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  }
  return null;
};

export const getAuthStateObserver = (callback) => {
  return onAuthStateChanged(auth, callback);
};
