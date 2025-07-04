import React, { createContext, useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [crew, setCrew] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userType, setUserType] = useState(null); // 'admin' or 'crew'

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Check if user is admin (Firebase Auth user)
        setUser(firebaseUser);
        setUserType('admin');
        setCrew(null);
      } else {
        setUser(null);
        setCrew(null);
        setUserType(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Function to set crew member after successful crew login
  const setCrewMember = (crewData) => {
    setCrew(crewData);
    setUser(null);
    setUserType('crew');
  };

  // Function to logout crew member
  const logoutCrew = () => {
    setCrew(null);
    setUserType(null);
  };

  if (loading) return null; // Optionally show a loading spinner

  return (
    <UserContext.Provider value={{ 
      user, 
      setUser, 
      crew, 
      setCrewMember, 
      logoutCrew, 
      userType 
    }}>
      {children}
    </UserContext.Provider>
  );
} 