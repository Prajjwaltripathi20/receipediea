import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaSearch } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import RecipeCard from '../components/RecipeCard';
import Footer from '../components/Footer';
import '../styles/Favorites.css';

const Favorites = () => {
  const { favorites } = useAuth();
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  useEffect(() => {
    setFavoriteRecipes(favorites);
    setLoading(false);
  }, [favorites]);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredRecipes(favoriteRecipes);
    } else {
      const filtered = favoriteRecipes.filter(recipe =>
        recipe?.title?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredRecipes(filtered);
    }
  }, [favoriteRecipes, searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  return (
    <div className="favorites-page">
      <div className="favorites-container">
        <div className="favorites-header">
          <h1><FaHeart className="heart-icon" /> My Favorite Recipes</h1>
          <p>Your personal collection of delicious recipes</p>
        </div>

        <div className="favorites-search">
          <div className="search-input-container">
            <FaSearch className="search-icon" />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search your favorites..."
              className="search-input"
            />
            {searchQuery && (
              <button className="clear-search" onClick={clearSearch}>
                &times;
              </button>
            )}
          </div>
        </div>

        <div className="favorites-content">
          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Loading your favorite recipes...</p>
            </div>
          ) : filteredRecipes.length > 0 ? (
            <div className="favorites-grid">
              {filteredRecipes.map(recipe => (
                <RecipeCard key={recipe.id} {...recipe} />
              ))}
            </div>
          ) : (
            <div className="no-favorites">
              <img
                src="https://undraw.co/api/illustrations/undraw_cooking_lyxy.svg"
                alt="No favorites"
                style={{ maxWidth: '260px', marginBottom: '1.5rem' }}
              />
              <h2>No saved recipes yet</h2>
              <p>Your favorite recipes will appear here. Start exploring and save your favorites!</p>
              <Link to="/search" className="explore-btn">Explore Recipes</Link>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Favorites;
