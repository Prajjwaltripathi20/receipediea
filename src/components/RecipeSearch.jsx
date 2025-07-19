import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import '../styles/RecipeSearch.css';

const RecipeSearch = ({ placeholder = "Search recipes by ingredients...", showButton = true }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to ingredient search page with pre-filled ingredients
      const ingredients = searchQuery.split(',').map(ingredient => ingredient.trim());
      navigate('/ingredients', { state: { prefilledIngredients: ingredients } });
    }
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="recipe-search-form">
      <div className="search-input-container">
        <input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="search-input"
        />
        {showButton && (
          <button type="submit" className="search-button" disabled={!searchQuery.trim()}>
            <FaSearch />
            <span>Search</span>
          </button>
        )}
      </div>
      {!showButton && (
        <button type="submit" className="search-button-full" disabled={!searchQuery.trim()}>
          <FaSearch />
          Search Recipes
        </button>
      )}
    </form>
  );
};

export default RecipeSearch;