import React, { createContext, useContext, useState, useEffect } from 'react';
import { useUser, useAuth as useClerkAuth } from '@clerk/clerk-react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const { user, isLoaded: clerkLoaded } = useUser();
  const { isSignedIn } = useClerkAuth();
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);

  // Update currentUser when Clerk user changes
  useEffect(() => {
    if (clerkLoaded) {
      if (isSignedIn && user) {
        // Map Clerk user to our app's user format
        const userSession = {
          uid: user.id,
          email: user.primaryEmailAddress?.emailAddress,
          displayName: user.fullName || user.firstName || user.username,
          isAuthenticated: true
        };
        setCurrentUser(userSession);
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    }
  }, [user, isSignedIn, clerkLoaded]);

  // Load favorites from localStorage when user changes
  useEffect(() => {
    if (currentUser) {
      const userId = currentUser.uid;
      const favs = JSON.parse(localStorage.getItem(`favorites_${userId}`)) || [];
      setFavorites(favs);
    } else {
      setFavorites([]);
    }
  }, [currentUser]);

  // These functions are no longer needed as Clerk handles authentication
  // But we keep them as no-ops for compatibility
  const login = async () => {
    console.warn('Using Clerk for authentication - login() is deprecated');
    return null;
  };

  const register = async () => {
    console.warn('Using Clerk for authentication - register() is deprecated');
    return null;
  };

  const signOut = async () => {
    // Clerk handles the actual sign out
    // We just clear our local state
    setFavorites([]);
  };

  // Store user's favorite recipes in localStorage and state
  const addToFavorites = (recipeId) => {
    if (!currentUser) return;
    const userId = currentUser.uid;
    console.log('DEBUG: Adding to favorites - recipeId:', recipeId, 'type:', typeof recipeId);
    console.log('DEBUG: Current favorites before adding:', favorites);

    // Ensure consistent ID format (convert to number if possible, otherwise keep as string)
    const normalizedId = typeof recipeId === 'string' && !isNaN(recipeId) ? parseInt(recipeId) : recipeId;

    if (!favorites.some(id => String(id) === String(normalizedId))) {
      const newFavorites = [...favorites, normalizedId];
      setFavorites(newFavorites);
      localStorage.setItem(`favorites_${userId}`, JSON.stringify(newFavorites));
      console.log('DEBUG: New favorites after adding:', newFavorites);
      console.log('DEBUG: Stored in localStorage for user:', userId);
    } else {
      console.log('DEBUG: Recipe already in favorites');
    }
  };

  const removeFromFavorites = (recipeId) => {
    if (!currentUser) return;
    const userId = currentUser.uid;
    const normalizedId = typeof recipeId === 'string' && !isNaN(recipeId) ? parseInt(recipeId) : recipeId;
    const newFavorites = favorites.filter(id => String(id) !== String(normalizedId));
    setFavorites(newFavorites);
    localStorage.setItem(`favorites_${userId}`, JSON.stringify(newFavorites));
  };

  const getFavorites = () => {
    return favorites;
  };

  const isFavorite = (recipeId) => {
    const normalizedId = typeof recipeId === 'string' && !isNaN(recipeId) ? parseInt(recipeId) : recipeId;
    return favorites.some(id => String(id) === String(normalizedId));
  };

  const value = {
    currentUser,
    login,
    register,
    signOut,
    addToFavorites,
    removeFromFavorites,
    getFavorites,
    isFavorite,
    favorites,
    setFavorites,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}