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
      try {
        const storedFavs = JSON.parse(localStorage.getItem(`favorites_${userId}`)) || [];
        // Filter out legacy IDs (numbers/strings) and keep only valid recipe objects
        const validFavs = storedFavs.filter(item =>
          typeof item === 'object' && item !== null && item.id
        );

        // Update storage if we filtered out bad data
        if (validFavs.length !== storedFavs.length) {
          localStorage.setItem(`favorites_${userId}`, JSON.stringify(validFavs));
        }

        setFavorites(validFavs);
      } catch (err) {
        console.error("Error loading favorites:", err);
        setFavorites([]);
      }
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
  const addToFavorites = (recipe) => {
    if (!currentUser) return;
    const userId = currentUser.uid;
    const newFavorites = [...favorites];

    // Check if recipe is already in favorites prevents duplicates
    if (!favorites.some(fav => fav.id === recipe.id)) {
      newFavorites.push(recipe);
      setFavorites(newFavorites);
      localStorage.setItem(`favorites_${userId}`, JSON.stringify(newFavorites));
    }
  };

  const removeFromFavorites = (recipeId) => {
    if (!currentUser) return;
    const userId = currentUser.uid;
    // Filter out the recipe with the matching ID
    const newFavorites = favorites.filter(recipe => recipe.id !== recipeId);
    setFavorites(newFavorites);
    localStorage.setItem(`favorites_${userId}`, JSON.stringify(newFavorites));
  };

  const getFavorites = () => {
    return favorites;
  };

  const isFavorite = (recipeId) => {
    // Check if any recipe in the array has the matching ID
    // Ensure both IDs are compared as the same type (strings usually safe)
    return favorites.some(recipe => String(recipe.id) === String(recipeId));
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