import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

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

  // Simulated authentication functions
  const login = async (email, password) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Get stored users from localStorage
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
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Get stored users from localStorage
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    
    // Check if user already exists
    if (storedUsers.find(u => u.email === email)) {
      throw new Error('User already exists with this email');
    }
    
    // Create new user
    const newUser = {
      id: Date.now().toString(),
      email,
      password,
      displayName,
      createdAt: new Date().toISOString()
    };
    
    // Store user
    storedUsers.push(newUser);
    localStorage.setItem('users', JSON.stringify(storedUsers));
    
    // Create user session
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
    localStorage.removeItem('currentUser');
  };

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

  const value = {
    currentUser,
    login,
    register,
    signOut,
    addToFavorites,
    removeFromFavorites,
    getFavorites,
    isFavorite,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}