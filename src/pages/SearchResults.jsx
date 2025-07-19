import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { FaSearch, FaFilter, FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';
import RecipeCard from '../components/RecipeCard';
import Footer from '../components/Footer';
import recipeService from '../services/RecipeService';
import '../styles/SearchResults.css';

const SearchResults = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialQuery = searchParams.get('query') || '';

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    diet: [],
    mealType: [],
    cuisine: [],
    maxReadyTime: 60,
  });
  const [categoryInfo, setCategoryInfo] = useState(null);

  // Fetch recipes based on search query and URL parameters
  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      setError(null);

      try {
        // Get URL parameters for category-based searches
        const urlParams = new URLSearchParams(location.search);
        const cuisine = urlParams.get('cuisine');
        const diet = urlParams.get('diet');
        const type = urlParams.get('type');
        const intolerances = urlParams.get('intolerances');
        const maxReadyTime = urlParams.get('maxReadyTime');

        // Check if this is a category-based search from Categories page
        if (location.state?.categoryName) {
          setCategoryInfo({
            name: location.state.categoryName,
            description: location.state.categoryDescription
          });
        }

        // Build search options
        const searchOptions = {
          number: 12,
          addRecipeInformation: true,
          fillIngredients: true
        };

        // Add URL parameters to search options
        if (cuisine) searchOptions.cuisine = cuisine;
        if (diet) searchOptions.diet = diet;
        if (type) searchOptions.type = type;
        if (intolerances) searchOptions.intolerances = intolerances;
        if (maxReadyTime) searchOptions.maxReadyTime = parseInt(maxReadyTime);

        // Add current filters to search options
        if (filters.diet.length > 0) {
          searchOptions.diet = filters.diet.join(',');
        }
        if (filters.cuisine.length > 0) {
          searchOptions.cuisine = filters.cuisine.join(',');
        }
        if (filters.mealType.length > 0) {
          searchOptions.type = filters.mealType.join(',');
        }
        if (filters.maxReadyTime !== 60) {
          searchOptions.maxReadyTime = filters.maxReadyTime;
        }

        let data;
        if (searchQuery) {
          // Text-based search
          searchOptions.query = searchQuery;
          data = await recipeService.complexSearch(searchOptions);
          setRecipes(data.results || []);
        } else if (cuisine || diet || type || intolerances || Object.values(filters).some(f => Array.isArray(f) ? f.length > 0 : f !== 60)) {
          // Category or filter-based search
          data = await recipeService.complexSearch(searchOptions);
          setRecipes(data.results || []);
        } else {
          // No search criteria, show random recipes
          data = await recipeService.getRandomRecipes({ number: 12 });
          setRecipes(data.recipes || []);
        }

      } catch (err) {
        console.error('Error fetching recipes:', err);
        setError(err.message || 'Failed to fetch recipes. Please try again.');
        setRecipes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [searchQuery, filters, location.search, location.state]);

  // Handle search form submission
  const handleSearch = (e) => {
    e.preventDefault();
    // Update URL with new search query
    const newSearchParams = new URLSearchParams();
    newSearchParams.set('query', searchQuery);
    window.history.pushState({}, '', `${window.location.pathname}?${newSearchParams.toString()}`);
  };

  // Toggle filter selection
  const toggleFilter = (type, value) => {
    setFilters(prevFilters => {
      const updatedFilters = { ...prevFilters };
      
      if (type === 'maxReadyTime') {
        updatedFilters.maxReadyTime = value;
        return updatedFilters;
      }
      
      if (updatedFilters[type].includes(value)) {
        updatedFilters[type] = updatedFilters[type].filter(item => item !== value);
      } else {
        updatedFilters[type] = [...updatedFilters[type], value];
      }
      
      return updatedFilters;
    });
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      diet: [],
      mealType: [],
      cuisine: [],
      maxReadyTime: 60,
    });
  };



  return (
    <div className="search-results-page">
      <div className="search-results-container">
        <div className="search-header">
          <h1>Search Results {searchQuery && <span>for "{searchQuery}"</span>}</h1>
          <form onSubmit={handleSearch} className="search-form">
            <div className="search-input-container">
              <FaSearch className="search-icon" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search recipes..."
                className="search-input"
              />
              {searchQuery && (
                <button 
                  type="button" 
                  className="clear-search" 
                  onClick={() => setSearchQuery('')}
                >
                  <FaTimes />
                </button>
              )}
            </div>
            <button type="submit" className="search-button">Search</button>
            <button 
              type="button" 
              className={`filter-toggle ${showFilters ? 'active' : ''}`}
              onClick={() => setShowFilters(!showFilters)}
            >
              <FaFilter /> Filters
            </button>
          </form>
        </div>

        {/* Filters Section */}
        {showFilters && (
          <motion.div 
            className="filters-section"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="filters-container">
              <div className="filter-group">
                <h3>Diet</h3>
                <div className="filter-options">
                  {['vegetarian', 'vegan', 'gluten free', 'pescatarian'].map(diet => (
                    <label key={diet} className="filter-option">
                      <input
                        type="checkbox"
                        checked={filters.diet.includes(diet)}
                        onChange={() => toggleFilter('diet', diet)}
                      />
                      <span className="filter-checkbox"></span>
                      {diet.charAt(0).toUpperCase() + diet.slice(1)}
                    </label>
                  ))}
                </div>
              </div>

              <div className="filter-group">
                <h3>Meal Type</h3>
                <div className="filter-options">
                  {['breakfast', 'lunch', 'dinner', 'dessert', 'snack'].map(type => (
                    <label key={type} className="filter-option">
                      <input
                        type="checkbox"
                        checked={filters.mealType.includes(type)}
                        onChange={() => toggleFilter('mealType', type)}
                      />
                      <span className="filter-checkbox"></span>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </label>
                  ))}
                </div>
              </div>

              <div className="filter-group">
                <h3>Cuisine</h3>
                <div className="filter-options">
                  {['american', 'italian', 'mexican', 'indian', 'chinese', 'greek'].map(cuisine => (
                    <label key={cuisine} className="filter-option">
                      <input
                        type="checkbox"
                        checked={filters.cuisine.includes(cuisine)}
                        onChange={() => toggleFilter('cuisine', cuisine)}
                      />
                      <span className="filter-checkbox"></span>
                      {cuisine.charAt(0).toUpperCase() + cuisine.slice(1)}
                    </label>
                  ))}
                </div>
              </div>

              <div className="filter-group">
                <h3>Ready In (minutes)</h3>
                <div className="range-slider-container">
                  <input
                    type="range"
                    min="15"
                    max="120"
                    step="5"
                    value={filters.maxReadyTime}
                    onChange={(e) => toggleFilter('maxReadyTime', parseInt(e.target.value))}
                    className="range-slider"
                  />
                  <span className="range-value">{filters.maxReadyTime} min</span>
                </div>
              </div>
            </div>
            
            <div className="filter-actions">
              <button className="clear-filters" onClick={clearFilters}>
                Clear All Filters
              </button>
              <button className="apply-filters" onClick={() => setShowFilters(false)}>
                Apply Filters
              </button>
            </div>
          </motion.div>
        )}

        {/* Results Section */}
        <div className="search-results-content">
          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Searching for recipes...</p>
            </div>
          ) : recipes.length > 0 ? (
            <>
              <div className="results-info">
                <p>Found {recipes.length} recipe{recipes.length !== 1 ? 's' : ''}</p>
              </div>
              <div className="recipes-grid">
                {recipes.map(recipe => (
                  <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
              </div>
            </>
          ) : (
            <div className="no-results">
              <h2>No recipes found</h2>
              <p>Try adjusting your search terms or filters</p>
              {(searchQuery || Object.values(filters).some(f => Array.isArray(f) ? f.length > 0 : f !== 60)) && (
                <div className="no-results-actions">
                  {searchQuery && (
                    <button onClick={() => setSearchQuery('')} className="clear-search-btn">
                      Clear Search
                    </button>
                  )}
                  {Object.values(filters).some(f => Array.isArray(f) ? f.length > 0 : f !== 60) && (
                    <button onClick={clearFilters} className="clear-filters-btn">
                      Clear Filters
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SearchResults;