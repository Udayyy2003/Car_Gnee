import { createContext, useContext, useState, useEffect } from 'react';
import { getAuthStateObserver, getUserData, getUserRole, logout } from '../lib/authService';
import { findClientByAuthUid } from '../lib/firestoreService';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const unsubscribe = getAuthStateObserver(async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        console.log('AUTH UID:', currentUser.uid);
        console.log('AUTH EMAIL:', currentUser.email);

        // First check if it's an admin
        const adminData = await getUserData(currentUser.uid);
        const userRole = await getUserRole(currentUser.uid);

        if (userRole === 'admin') {
          console.log('USER ROLE: admin');
          setUserData(adminData);
          setRole(userRole);
        } else {
          // It's a client, search societies for authUid
          console.log('Searching for client with authUid:', currentUser.uid);
          const clientData = await findClientByAuthUid(currentUser.uid);
          if (clientData) {
            console.log('CLIENT DATA:', clientData);
            setUserData(clientData);
            setRole('client');
          } else {
            console.error('No client or admin found for UID:', currentUser.uid, currentUser.email);
            setUserData(null);
            setRole(null);
          }
        }

      } else {
        setUserData(null);
        setRole(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const value = {
    user,
    userData,
    role,
    loading,
    setUser,
    setUserData,
    setRole,
    logout: handleLogout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
