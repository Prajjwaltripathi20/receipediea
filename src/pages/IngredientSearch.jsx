import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus, FaTimes, FaSearch, FaUtensils, FaClock } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from '../components/Footer';
import '../styles/IngredientSearch.css';

const IngredientSearch = () => {
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

  // Search for recipes based on ingredients and filters
  const searchRecipes = async () => {
    if (ingredients.length === 0) {
      setError('Please add at least one ingredient');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // In a real app, you would call an API like Spoonacular
      // const response = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients.join(',+')}&number=12&apiKey=YOUR_API_KEY`);
      // const data = await response.json();
      
      // Mock data for demonstration
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate mock recipes based on ingredients
      const mockRecipes = generateMockRecipes(ingredients, selectedFilters);
      setRecipes(mockRecipes);
    } catch (err) {
      console.error('Error searching recipes:', err);
      setError('Failed to search recipes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Generate mock recipes based on ingredients and filters
  const generateMockRecipes = (ingredientList, filters) => {
    // Base set of mock recipes
    const allMockRecipes = [
      {
        id: 1,
        title: 'Pasta with Tomato Sauce',
        image: 'https://images.unsplash.com/photo-1598866594230-a7c12756260f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1008&q=80',
        usedIngredientCount: 2,
        missedIngredientCount: 3,
        likes: 1024,
        readyInMinutes: 25,
        servings: 4,
        vegetarian: true,
        vegan: false,
        glutenFree: false,
        dairyFree: true,
        relevantIngredients: ['pasta', 'tomatoes', 'garlic', 'olive oil', 'onions'],
        mealType: ['Main Course', 'Dinner']
      },
      {
        id: 2,
        title: 'Chicken Stir Fry',
        image: 'https://images.unsplash.com/photo-1603356033288-acfcb54801e6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
        usedIngredientCount: 3,
        missedIngredientCount: 2,
        likes: 856,
        readyInMinutes: 30,
        servings: 3,
        vegetarian: false,
        vegan: false,
        glutenFree: true,
        dairyFree: true,
        relevantIngredients: ['chicken', 'bell peppers', 'onions', 'garlic', 'soy sauce'],
        mealType: ['Main Course', 'Dinner']
      },
      {
        id: 3,
        title: 'Vegetable Soup',
        image: 'https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
        usedIngredientCount: 4,
        missedIngredientCount: 1,
        likes: 712,
        readyInMinutes: 45,
        servings: 6,
        vegetarian: true,
        vegan: true,
        glutenFree: true,
        dairyFree: true,
        relevantIngredients: ['carrots', 'onions', 'garlic', 'potatoes', 'tomatoes'],
        mealType: ['Soup', 'Lunch', 'Dinner']
      },
      {
        id: 4,
        title: 'Scrambled Eggs with Vegetables',
        image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
        usedIngredientCount: 3,
        missedIngredientCount: 1,
        likes: 532,
        readyInMinutes: 15,
        servings: 2,
        vegetarian: true,
        vegan: false,
        glutenFree: true,
        dairyFree: false,
        relevantIngredients: ['eggs', 'bell peppers', 'onions', 'cheese'],
        mealType: ['Breakfast']
      },
      {
        id: 5,
        title: 'Beef Stew',
        image: 'https://images.unsplash.com/photo-1608835291093-394b0c943a75?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
        usedIngredientCount: 3,
        missedIngredientCount: 3,
        likes: 621,
        readyInMinutes: 60,
        servings: 4,
        vegetarian: false,
        vegan: false,
        glutenFree: true,
        dairyFree: true,
        relevantIngredients: ['beef', 'carrots', 'potatoes', 'onions', 'garlic', 'tomatoes'],
        mealType: ['Main Course', 'Dinner']
      },
      {
        id: 6,
        title: 'Greek Salad',
        image: 'https://images.unsplash.com/photo-1551248429-40975aa4de74?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
        usedIngredientCount: 2,
        missedIngredientCount: 3,
        likes: 487,
        readyInMinutes: 15,
        servings: 2,
        vegetarian: true,
        vegan: false,
        glutenFree: true,
        dairyFree: false,
        relevantIngredients: ['tomatoes', 'olive oil', 'cheese', 'lemon', 'onions'],
        mealType: ['Salad', 'Side Dish', 'Lunch']
      },
      {
        id: 7,
        title: 'Tofu Stir Fry',
        image: 'https://images.unsplash.com/photo-1546554137-f86b9593a222?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
        usedIngredientCount: 3,
        missedIngredientCount: 2,
        likes: 392,
        readyInMinutes: 25,
        servings: 3,
        vegetarian: true,
        vegan: true,
        glutenFree: true,
        dairyFree: true,
        relevantIngredients: ['tofu', 'bell peppers', 'onions', 'garlic', 'soy sauce'],
        mealType: ['Main Course', 'Dinner']
      },
      {
        id: 8,
        title: 'Salmon with Lemon Butter',
        image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
        usedIngredientCount: 2,
        missedIngredientCount: 1,
        likes: 743,
        readyInMinutes: 30,
        servings: 2,
        vegetarian: false,
        vegan: false,
        glutenFree: true,
        dairyFree: false,
        relevantIngredients: ['salmon', 'lemon', 'butter'],
        mealType: ['Main Course', 'Dinner']
      },
      {
        id: 9,
        title: 'Quinoa Salad',
        image: 'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
        usedIngredientCount: 2,
        missedIngredientCount: 3,
        likes: 512,
        readyInMinutes: 20,
        servings: 4,
        vegetarian: true,
        vegan: true,
        glutenFree: true,
        dairyFree: true,
        relevantIngredients: ['quinoa', 'tomatoes', 'bell peppers', 'olive oil', 'lemon'],
        mealType: ['Salad', 'Side Dish', 'Lunch']
      },
      {
        id: 10,
        title: 'Garlic Butter Shrimp Pasta',
        image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
        usedIngredientCount: 4,
        missedIngredientCount: 1,
        likes: 876,
        readyInMinutes: 25,
        servings: 3,
        vegetarian: false,
        vegan: false,
        glutenFree: false,
        dairyFree: false,
        relevantIngredients: ['pasta', 'shrimp', 'garlic', 'butter', 'lemon'],
        mealType: ['Main Course', 'Dinner']
      },
      {
        id: 11,
        title: 'Vegetable Stir Fry with Rice',
        image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
        usedIngredientCount: 3,
        missedIngredientCount: 2,
        likes: 423,
        readyInMinutes: 30,
        servings: 4,
        vegetarian: true,
        vegan: true,
        glutenFree: true,
        dairyFree: true,
        relevantIngredients: ['rice', 'bell peppers', 'broccoli', 'carrots', 'soy sauce'],
        mealType: ['Main Course', 'Dinner']
      },
      {
        id: 12,
        title: 'Spinach and Cheese Omelette',
        image: 'https://images.unsplash.com/photo-1510693206972-df098062cb71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
        usedIngredientCount: 2,
        missedIngredientCount: 1,
        likes: 367,
        readyInMinutes: 15,
        servings: 1,
        vegetarian: true,
        vegan: false,
        glutenFree: true,
        dairyFree: false,
        relevantIngredients: ['eggs', 'spinach', 'cheese'],
        mealType: ['Breakfast']
      }
    ];

    // Filter recipes based on ingredients
    let filteredRecipes = allMockRecipes.filter(recipe => {
      // Check if recipe contains at least one of the user's ingredients
      return ingredientList.some(ingredient => 
        recipe.relevantIngredients.includes(ingredient)
      );
    });

    // Apply dietary filters
    if (filters.diet.length > 0) {
      filteredRecipes = filteredRecipes.filter(recipe => {
        if (filters.diet.includes('Vegetarian') && !recipe.vegetarian) return false;
        if (filters.diet.includes('Vegan') && !recipe.vegan) return false;
        if (filters.diet.includes('Gluten Free') && !recipe.glutenFree) return false;
        return true;
      });
    }

    // Apply meal type filters
    if (filters.mealType.length > 0) {
      filteredRecipes = filteredRecipes.filter(recipe => {
        return filters.mealType.some(type => recipe.mealType.includes(type));
      });
    }

    // Apply max ready time filter
    if (filters.maxReadyTime) {
      filteredRecipes = filteredRecipes.filter(recipe => {
        return recipe.readyInMinutes <= filters.maxReadyTime;
      });
    }

    // Sort recipes by number of matching ingredients (descending)
    filteredRecipes.sort((a, b) => {
      const aMatches = ingredientList.filter(ingredient => 
        a.relevantIngredients.includes(ingredient)
      ).length;
      
      const bMatches = ingredientList.filter(ingredient => 
        b.relevantIngredients.includes(ingredient)
      ).length;
      
      return bMatches - aMatches;
    });

    // Update used and missed ingredient counts based on user's ingredients
    filteredRecipes = filteredRecipes.map(recipe => {
      const usedIngredients = ingredientList.filter(ingredient => 
        recipe.relevantIngredients.includes(ingredient)
      );
      
      const missedIngredients = recipe.relevantIngredients.filter(ingredient => 
        !ingredientList.includes(ingredient)
      );
      
      return {
        ...recipe,
        usedIngredientCount: usedIngredients.length,
        missedIngredientCount: missedIngredients.length
      };
    });

    return filteredRecipes;
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