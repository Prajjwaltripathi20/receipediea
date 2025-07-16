import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, onAuthStateChanged, signOut as firebaseSignOut } from '../firebase/firebase';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Store user's favorite recipes in localStorage
  const addToFavorites = (recipeId) => {
    if (!currentUser) return;
    
    const userId = currentUser.uid;
    const favorites = JSON.parse(localStorage.getItem(`favorites_${userId}`)) || [];
    
    if (!favorites.includes(recipeId)) {
      const newFavorites = [...favorites, recipeId];
      localStorage.setItem(`favorites_${userId}`, JSON.stringify(newFavorites));
    }
  };

  const removeFromFavorites = (recipeId) => {
    if (!currentUser) return;
    
    const userId = currentUser.uid;
    const favorites = JSON.parse(localStorage.getItem(`favorites_${userId}`)) || [];
    
    const newFavorites = favorites.filter(id => id !== recipeId);
    localStorage.setItem(`favorites_${userId}`, JSON.stringify(newFavorites));
  };

  const getFavorites = () => {
    if (!currentUser) return [];
    
    const userId = currentUser.uid;
    return JSON.parse(localStorage.getItem(`favorites_${userId}`)) || [];
  };

  const isFavorite = (recipeId) => {
    if (!currentUser) return false;
    
    const favorites = getFavorites();
    return favorites.includes(recipeId);
  };

  // Sign out function
  const signOut = async () => {
    return firebaseSignOut(auth);
  };

  const value = {
    currentUser,
    addToFavorites,
    removeFromFavorites,
    getFavorites,
    isFavorite,
    loading,
    signOut
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}