import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaHistory } from 'react-icons/fa';
import recipeService from '../services/RecipeService';
import '../styles/RecipeSearch.css';

const RecipeSearch = ({ placeholder = "Search recipes by ingredients...", showButton = true }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const wrapperRef = useRef(null);
  const navigate = useNavigate();

  // Close suggestions when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [wrapperRef]);

  // Fetch suggestions
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (searchQuery.trim().length >= 2) {
        try {
          const results = await recipeService.getAutocomplete(searchQuery);
          // Format results - could be from mock or API
          const formatted = Array.isArray(results) ? results : [];
          setSuggestions(formatted);
          setShowSuggestions(formatted.length > 0);
        } catch (err) {
          console.warn(err);
        }
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 300); // 300ms debounce
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const ingredients = searchQuery.split(',').map(ingredient => ingredient.trim());
      navigate('/ingredients', { state: { prefilledIngredients: ingredients } });
      setShowSuggestions(false);
    }
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSuggestionClick = (title) => {
    setSearchQuery(title);
    setShowSuggestions(false);
    // Optional: Auto-submit on click
    // const ingredients = title.split(',').map(i => i.trim());
    // navigate('/ingredients', { state: { prefilledIngredients: ingredients } });
  };

  return (
    <form onSubmit={handleSubmit} className="recipe-search-form" ref={wrapperRef}>
      <div className="search-input-container">
        <input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="search-input"
          onFocus={() => searchQuery.length >= 2 && setShowSuggestions(true)}
        />
        {showButton && (
          <button type="submit" className="search-button" disabled={!searchQuery.trim()}>
            <FaSearch />
            <span>Search</span>
          </button>
        )}

        {/* Suggestions Dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="search-suggestions">
            {suggestions.map((item, index) => (
              <div
                key={item.id || index}
                className="suggestion-item"
                onClick={() => handleSuggestionClick(item.title)}
              >
                <FaHistory className="suggestion-icon" />
                <span>{item.title}</span>
              </div>
            ))}
          </div>
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