import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaPlus, FaTimes, FaSearch, FaUtensils, FaClock } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from '../components/Footer';
import recipeService from '../services/RecipeService';
import '../styles/IngredientSearch.css';

const IngredientSearch = () => {
  const location = useLocation();
  const [ingredients, setIngredients] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState({
    diet: [],
    intolerances: [],
    mealType: [],
    maxReadyTime: null
  });
  const [showFilters, setShowFilters] = useState(false);

  // Handle pre-filled ingredients from navigation state
  useEffect(() => {
    if (location.state?.prefilledIngredients) {
      const prefilledIngredients = location.state.prefilledIngredients
        .filter(ingredient => ingredient.trim() !== '')
        .map(ingredient => ingredient.toLowerCase().trim());
      
      setIngredients(prefilledIngredients);
      
      // Auto-search if ingredients are pre-filled
      if (prefilledIngredients.length > 0) {
        // Small delay to ensure state is updated
        setTimeout(() => {
          searchRecipesWithIngredients(prefilledIngredients);
        }, 100);
      }
    }
  }, [location.state]);

  // Common ingredients for suggestions
  const commonIngredients = [
    'chicken', 'beef', 'pork', 'salmon', 'shrimp', 'tofu',
    'rice', 'pasta', 'potatoes', 'bread', 'quinoa',
    'tomatoes', 'onions', 'garlic', 'bell peppers', 'carrots', 'spinach', 'broccoli',
    'cheese', 'milk', 'yogurt', 'eggs', 'butter',
    'olive oil', 'soy sauce', 'vinegar', 'lemon', 'lime'
  ];

  // Filter options
  const filterOptions = {
    diet: ['Vegetarian', 'Vegan', 'Gluten Free', 'Ketogenic', 'Paleo'],
    intolerances: ['Dairy', 'Egg', 'Gluten', 'Grain', 'Peanut', 'Seafood', 'Sesame', 'Shellfish', 'Soy', 'Tree Nut', 'Wheat'],
    mealType: ['Breakfast', 'Main Course', 'Side Dish', 'Salad', 'Soup', 'Snack', 'Dessert'],
    maxReadyTime: [15, 30, 45, 60]
  };

  // Handle input change for ingredient search
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.trim().length > 1) {
      // Filter common ingredients based on input
      const filtered = commonIngredients.filter(ingredient =>
        ingredient.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  // Add ingredient to the list
  const addIngredient = (ingredient) => {
    if (
      ingredient.trim() !== '' &&
      !ingredients.includes(ingredient.toLowerCase().trim())
    ) {
      setIngredients([...ingredients, ingredient.toLowerCase().trim()]);
      setInputValue('');
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  // Remove ingredient from the list
  const removeIngredient = (index) => {
    const newIngredients = [...ingredients];
    newIngredients.splice(index, 1);
    setIngredients(newIngredients);
  };

  // Handle key press in input field
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addIngredient(inputValue);
    }
  };

  // Toggle filter selection
  const toggleFilter = (category, value) => {
    setSelectedFilters(prev => {
      const updated = { ...prev };
      
      if (category === 'maxReadyTime') {
        // For maxReadyTime, just set the value directly
        updated.maxReadyTime = updated.maxReadyTime === value ? null : value;
      } else {
        // For arrays (diet, intolerances, mealType)
        if (updated[category].includes(value)) {
          updated[category] = updated[category].filter(item => item !== value);
        } else {
          updated[category] = [...updated[category], value];
        }
      }
      
      return updated;
    });
  };

  // Search for recipes with specific ingredients (used for pre-filled search)
  const searchRecipesWithIngredients = async (ingredientList) => {
    if (ingredientList.length === 0) {
      setError('Please add at least one ingredient');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Use Spoonacular API to search by ingredients
      const data = await recipeService.searchByIngredients(ingredientList, {
        number: 12,
        ranking: 1,
        ignorePantry: true
      });
      
      // Transform the API response to match our component's expected format
      const transformedRecipes = data.map(recipe => ({
        id: recipe.id,
        title: recipe.title,
        image: recipe.image,
        usedIngredientCount: recipe.usedIngredientCount,
        missedIngredientCount: recipe.missedIngredientCount,
        likes: recipe.likes || 0,
        // Note: Basic ingredient search doesn't include detailed info
        // We'll need to fetch details separately if needed
        readyInMinutes: 30, // Default value
        servings: 4, // Default value
        vegetarian: false, // Default value
        vegan: false, // Default value
        glutenFree: false, // Default value
        dairyFree: false, // Default value
      }));

      setRecipes(transformedRecipes);
    } catch (err) {
      console.error('Error searching recipes:', err);
      setError(err.message || 'Failed to search recipes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Search for recipes based on ingredients and filters
  const searchRecipes = async () => {
    await searchRecipesWithIngredients(ingredients);
  };



  // Clear all ingredients
  const clearIngredients = () => {
    setIngredients([]);
  };

  // Reset all filters
  const resetFilters = () => {
    setSelectedFilters({
      diet: [],
      intolerances: [],
      mealType: [],
      maxReadyTime: null
    });
  };

  return (
    <div className="ingredient-search-page">
      <div className="ingredient-search-container">
        <div className="page-header">
          <h1>Find Recipes by Ingredients</h1>
          <p>Enter ingredients you have on hand and discover recipes you can make</p>
        </div>

        <div className="search-section">
          <div className="ingredients-input-container">
            <div className="input-wrapper">
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder="Enter an ingredient..."
                className="ingredient-input"
              />
              <button 
                className="add-ingredient-btn"
                onClick={() => addIngredient(inputValue)}
                disabled={inputValue.trim() === ''}
              >
                <FaPlus />
              </button>
            </div>

            {showSuggestions && suggestions.length > 0 && (
              <ul className="suggestions-list">
                {suggestions.map((suggestion, index) => (
                  <li 
                    key={index} 
                    onClick={() => addIngredient(suggestion)}
                    className="suggestion-item"
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="ingredients-list-container">
            {ingredients.length > 0 ? (
              <>
                <div className="ingredients-header">
                  <h3>Your Ingredients:</h3>
                  <button className="clear-all-btn" onClick={clearIngredients}>
                    Clear All
                  </button>
                </div>
                <ul className="selected-ingredients">
                  {ingredients.map((ingredient, index) => (
                    <motion.li 
                      key={index}
                      className="ingredient-tag"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.2 }}
                    >
                      {ingredient}
                      <button 
                        className="remove-ingredient-btn"
                        onClick={() => removeIngredient(index)}
                      >
                        <FaTimes />
                      </button>
                    </motion.li>
                  ))}
                </ul>
              </>
            ) : (
              <div className="no-ingredients-message">
                <p>Add some ingredients to get started</p>
              </div>
            )}
          </div>

          <div className="search-controls">
            <button 
              className="filter-toggle-btn"
              onClick={() => setShowFilters(!showFilters)}
            >
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
            <button 
              className="search-btn"
              onClick={searchRecipes}
              disabled={ingredients.length === 0}
            >
              <FaSearch /> Find Recipes
            </button>
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div 
                className="filters-container"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="filters-header">
                  <h3>Filter Results</h3>
                  <button className="reset-filters-btn" onClick={resetFilters}>
                    Reset Filters
                  </button>
                </div>

                <div className="filters-grid">
                  <div className="filter-group">
                    <h4>Diet</h4>
                    <div className="filter-options">
                      {filterOptions.diet.map((diet, index) => (
                        <button
                          key={index}
                          className={`filter-option ${selectedFilters.diet.includes(diet) ? 'active' : ''}`}
                          onClick={() => toggleFilter('diet', diet)}
                        >
                          {diet}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="filter-group">
                    <h4>Meal Type</h4>
                    <div className="filter-options">
                      {filterOptions.mealType.map((type, index) => (
                        <button
                          key={index}
                          className={`filter-option ${selectedFilters.mealType.includes(type) ? 'active' : ''}`}
                          onClick={() => toggleFilter('mealType', type)}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="filter-group">
                    <h4>Max Ready Time</h4>
                    <div className="filter-options">
                      {filterOptions.maxReadyTime.map((time, index) => (
                        <button
                          key={index}
                          className={`filter-option ${selectedFilters.maxReadyTime === time ? 'active' : ''}`}
                          onClick={() => toggleFilter('maxReadyTime', time)}
                        >
                          {time} mins
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}

        <div className="results-section">
          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Searching for recipes...</p>
            </div>
          ) : recipes.length > 0 ? (
            <>
              <h2>Recipe Suggestions ({recipes.length})</h2>
              <div className="recipes-grid">
                {recipes.map(recipe => (
                  <Link to={`/recipe/${recipe.id}`} key={recipe.id} className="recipe-card">
                    <div className="recipe-image-container">
                      <img src={recipe.image} alt={recipe.title} className="recipe-image" />
                      <div className="recipe-match-info">
                        <span className="match-count">
                          {recipe.usedIngredientCount} of {recipe.usedIngredientCount + recipe.missedIngredientCount} ingredients
                        </span>
                      </div>
                    </div>
                    <div className="recipe-content">
                      <h3 className="recipe-title">{recipe.title}</h3>
                      <div className="recipe-meta">
                        <span><FaClock /> {recipe.readyInMinutes} mins</span>
                        <span><FaUtensils /> {recipe.servings} servings</span>
                      </div>
                      <div className="recipe-badges">
                        {recipe.vegetarian && <span className="badge vegetarian">Vegetarian</span>}
                        {recipe.vegan && <span className="badge vegan">Vegan</span>}
                        {recipe.glutenFree && <span className="badge gluten-free">Gluten Free</span>}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          ) : ingredients.length > 0 && !loading ? (
            <div className="no-results-message">
              <h2>No Recipes Found</h2>
              <p>Try adding different ingredients or adjusting your filters</p>
            </div>
          ) : null}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default IngredientSearch;