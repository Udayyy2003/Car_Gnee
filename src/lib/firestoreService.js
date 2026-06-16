import { db } from './firebase.js';
import {
  collection, doc, addDoc, getDoc, getDocs, updateDoc, deleteDoc, serverTimestamp, query, orderBy, where, setDoc
} from 'firebase/firestore';

// ==================================================
// SOCIETIES
// ==================================================
export const createSociety = async (data) => {
  const ref = await addDoc(collection(db, 'societies'), {
    ...data,
    createdAt: serverTimestamp()
  });
  return { id: ref.id, ...data };
};

export const updateSociety = async (id, data) => {
  await updateDoc(doc(db, 'societies', id), data);
};

export const deleteSociety = async (id) => {
  await deleteDoc(doc(db, 'societies', id));
};

export const getSocieties = async () => {
  const snapshot = await getDocs(collection(db, 'societies'));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getSociety = async (id) => {
  const docSnap = await getDoc(doc(db, 'societies', id));
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  }
  return null;
};

// ==================================================
// CLIENTS (under societies)
// ==================================================
export const createSocietyClient = async (societyId, data) => {
  console.log('createSocietyClient societyId:', societyId);
  console.log('createSocietyClient data:', data);

  const ref = await addDoc(
    collection(db, 'societies', societyId, 'clients'),
    {
      ...data,
      createdAt: serverTimestamp()
    }
  );

  return { id: ref.id, ...data };
};

export const updateSocietyClient = async (societyId, clientId, data) => {
  await updateDoc(doc(db, 'societies', societyId, 'clients', clientId), data);
};

export const deleteSocietyClient = async (societyId, clientId) => {
  await deleteDoc(doc(db, 'societies', societyId, 'clients', clientId));
};

export const getSocietyClients = async (societyId) => {
  const snapshot = await getDocs(collection(db, 'societies', societyId, 'clients'));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getSocietyClient = async (societyId, clientId) => {
  console.log("READING CLIENT:");
  console.log("societyId:", JSON.stringify(societyId));
  console.log("clientId:", JSON.stringify(clientId));
  console.log("societyId length:", societyId?.length);
  console.log("clientId length:", clientId?.length);


  const cleanSocietyId = societyId?.trim();
  const cleanClientId = clientId?.trim();

  console.log("cleanSocietyId:", cleanSocietyId);
  console.log("cleanClientId:", cleanClientId);

  const ref = doc(
    db,
    'societies',
    cleanSocietyId,
    'clients',
    cleanClientId
  );

console.log("DOC REF:", ref.path);
console.log("PROJECT ID:", db.app.options.projectId);
console.log("DATABASE ID:", db._databaseId?.database);

const clientsSnapshot = await getDocs(
  collection(
    db,
    'societies',
    cleanSocietyId,
    'clients'
  )
);

console.log(
  "ALL CLIENT IDS:",
  clientsSnapshot.docs.map(d => d.id)
);


clientsSnapshot.docs.forEach(d => {
  console.log("CLIENT DOC:", d.id, d.data());
});


const docSnap = await getDoc(ref);

console.log("DOC ID FOUND:", docSnap.id);
console.log("DOC EXISTS:", docSnap.exists());

if (docSnap.exists()) {
  console.log("DOC DATA:", docSnap.data());
}
  console.log("RAW SNAPSHOT:", docSnap);
  console.log("SNAPSHOT ID:", docSnap.id);
  console.log("SNAPSHOT EXISTS:", docSnap.exists());
  console.log("EXISTS:", docSnap.exists());

  if (docSnap.exists()) {
    console.log("DATA:", docSnap.data());

    return {
      id: docSnap.id,
      ...docSnap.data()
    };
  }

  return null;
};

// ==================================================
// VEHICLES (under clients)
// ==================================================
//Add console logs for createClientVehicle function parameters for debugging purposes
export const createClientVehicle = async (societyId, clientId, data) => {
  console.log('createClientVehicle societyId:', societyId);
  console.log('createClientVehicle clientId:', clientId);
  console.log('createClientVehicle data:', data);

  const ref = await addDoc(
    collection(db, 'societies', societyId, 'clients', clientId, 'vehicles'),
    {
      ...data,
      createdAt: serverTimestamp()
    }
  );
  return { id: ref.id, ...data };
};

export const updateClientVehicle = async (societyId, clientId, vehicleId, data) => {
  await updateDoc(doc(db, 'societies', societyId, 'clients', clientId, 'vehicles', vehicleId), data);
};

export const deleteClientVehicle = async (societyId, clientId, vehicleId) => {
  await deleteDoc(doc(db, 'societies', societyId, 'clients', clientId, 'vehicles', vehicleId));
};

export const getClientVehicles = async (societyId, clientId) => {
  const snapshot = await getDocs(collection(db, 'societies', societyId, 'clients', clientId, 'vehicles'));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// ==================================================
// PAYMENTS (under clients)
// ==================================================
//Add console logs for createClientPayment function parameters for debugging purposes
export const createClientPayment = async (societyId, clientId, data) => {
  console.log('createClientPayment societyId:', societyId);
  console.log('createClientPayment clientId:', clientId);
  console.log('createClientPayment data:', data);

  const ref = await addDoc(
    collection(db, 'societies', societyId, 'clients', clientId, 'payments'),
    {
      ...data,
      createdAt: serverTimestamp()
    }
  );
  return { id: ref.id, ...data };
};

export const updateClientPayment = async (societyId, clientId, paymentId, data) => {
  await updateDoc(doc(db, 'societies', societyId, 'clients', clientId, 'payments', paymentId), data);
};

export const deleteClientPayment = async (societyId, clientId, paymentId) => {
  await deleteDoc(doc(db, 'societies', societyId, 'clients', clientId, 'payments', paymentId));
};

export const getClientPayments = async (societyId, clientId) => {
  const q = query(
    collection(db, 'societies', societyId, 'clients', clientId, 'payments'),
    orderBy('createdAt', 'desc')
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// ==================================================
// CLEANING LOGS (under clients)
// ==================================================
export const createClientCleaningLog = async (societyId, clientId, data) => {
  const ref = await addDoc(collection(db, 'societies', societyId, 'clients', clientId, 'cleaningLogs'), {
    ...data,
    createdAt: serverTimestamp()
  });
  return { id: ref.id, ...data };
};

export const updateClientCleaningLog = async (societyId, clientId, logId, data) => {
  await updateDoc(doc(db, 'societies', societyId, 'clients', clientId, 'cleaningLogs', logId), data);
};

export const deleteClientCleaningLog = async (societyId, clientId, logId) => {
  await deleteDoc(doc(db, 'societies', societyId, 'clients', clientId, 'cleaningLogs', logId));
};

export const getClientCleaningLogs = async (societyId, clientId) => {
  const q = query(
    collection(db, 'societies', societyId, 'clients', clientId, 'cleaningLogs'),
    orderBy('date', 'desc')
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getClientCleaningLogsByMonth = async (societyId, clientId, year, month) => {
  const startDate = `${year}-${String(month).padStart(2, '0')}-01`;
  const endDate = `${year}-${String(month).padStart(2, '0')}-31`;
  const q = query(
    collection(db, 'societies', societyId, 'clients', clientId, 'cleaningLogs'),
    where('date', '>=', startDate),
    where('date', '<=', endDate),
    orderBy('date')
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getCleaningLogByDate = async (societyId, clientId, date) => {
  const q = query(
    collection(db, 'societies', societyId, 'clients', clientId, 'cleaningLogs'),
    where('date', '==', date)
  );
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;
  return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
};

// ==================================================
// USERS (top level)
// ==================================================
export const createUserDocument = async (uid, data) => {
  await setDoc(doc(db, 'users', uid), {
    ...data,
    createdAt: serverTimestamp()
  });
};

export const updateUserDocument = async (uid, data) => {
  await updateDoc(doc(db, 'users', uid), data);
};

export const getUserDocument = async (uid) => {
  const docSnap = await getDoc(doc(db, 'users', uid));
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  }
  return null;
};

// Search all societies for a client with given authUid
export const findClientByAuthUid = async (authUid) => {
  const societiesSnapshot = await getDocs(collection(db, 'societies'));
  for (const societyDoc of societiesSnapshot.docs) {
    const societyId = societyDoc.id;
    const clientsSnapshot = await getDocs(
      query(
        collection(db, 'societies', societyId, 'clients'),
        where('authUid', '==', authUid)
      )
    );
    if (!clientsSnapshot.empty) {
      const clientDoc = clientsSnapshot.docs[0];
      return {
        societyId,
        clientId: clientDoc.id,
        ...clientDoc.data()
      };
    }
  }
  return null;
};
