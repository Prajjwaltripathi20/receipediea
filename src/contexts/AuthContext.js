import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Check for existing user session in localStorage
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('currentUser');
      }
    }
    setLoading(false);
  }, []);

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

  // Simulated authentication functions
  const login = async (email, password) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const user = storedUsers.find(u => u.email === email && u.password === password);
    if (!user) {
      throw new Error('Invalid email or password');
    }
    const userSession = {
      uid: user.id,
      email: user.email,
      displayName: user.displayName,
      isAuthenticated: true
    };
    setCurrentUser(userSession);
    localStorage.setItem('currentUser', JSON.stringify(userSession));
    return userSession;
  };

  const register = async (email, password, displayName) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    if (storedUsers.find(u => u.email === email)) {
      throw new Error('User already exists with this email');
    }
    const newUser = {
      id: Date.now().toString(),
      email,
      password,
      displayName,
      createdAt: new Date().toISOString()
    };
    storedUsers.push(newUser);
    localStorage.setItem('users', JSON.stringify(storedUsers));
    const userSession = {
      uid: newUser.id,
      email: newUser.email,
      displayName: newUser.displayName,
      isAuthenticated: true
    };
    setCurrentUser(userSession);
    localStorage.setItem('currentUser', JSON.stringify(userSession));
    return userSession;
  };

  const signOut = async () => {
    setCurrentUser(null);
    setFavorites([]);
    localStorage.removeItem('currentUser');
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