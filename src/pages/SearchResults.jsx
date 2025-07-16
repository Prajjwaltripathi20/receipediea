import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { FaSearch, FaFilter, FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';
import RecipeCard from '../components/RecipeCard';
import Footer from '../components/Footer';
import '../styles/SearchResults.css';

const SearchResults = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialQuery = searchParams.get('query') || '';

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    diet: [],
    mealType: [],
    cuisine: [],
    maxReadyTime: 60,
  });

  // Fetch recipes based on search query
  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      
      // Simulate API call with timeout
      setTimeout(() => {
        const mockRecipes = generateMockRecipes(searchQuery, filters);
        setRecipes(mockRecipes);
        setLoading(false);
      }, 1000);
    };

    fetchRecipes();
  }, [searchQuery, filters]);

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

  // Generate mock recipes based on search query and filters
  const generateMockRecipes = (query, filters) => {
    // Base set of mock recipes
    const allRecipes = [
      {
        id: 1,
        title: 'Creamy Garlic Pasta',
        image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        readyInMinutes: 25,
        servings: 4,
        diets: ['vegetarian'],
        cuisines: ['italian'],
        dishTypes: ['lunch', 'dinner', 'main course'],
        summary: 'A delicious creamy garlic pasta that comes together in just 25 minutes. Perfect for a quick weeknight dinner.',
      },
      {
        id: 2,
        title: 'Spicy Chicken Curry',
        image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        readyInMinutes: 45,
        servings: 6,
        diets: [],
        cuisines: ['indian'],
        dishTypes: ['dinner', 'main course'],
        summary: 'A flavorful and aromatic chicken curry with just the right amount of spice. Serve with rice or naan bread.',
      },
      {
        id: 3,
        title: 'Avocado Toast with Poached Egg',
        image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        readyInMinutes: 15,
        servings: 1,
        diets: ['vegetarian'],
        cuisines: ['american'],
        dishTypes: ['breakfast', 'brunch'],
        summary: 'A simple yet nutritious breakfast option featuring creamy avocado and perfectly poached eggs on toasted bread.',
      },
      {
        id: 4,
        title: 'Beef Tacos with Homemade Salsa',
        image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        readyInMinutes: 35,
        servings: 4,
        diets: [],
        cuisines: ['mexican'],
        dishTypes: ['dinner', 'main course'],
        summary: 'Delicious beef tacos with a fresh homemade salsa that brings the perfect balance of flavors.',
      },
      {
        id: 5,
        title: 'Vegan Buddha Bowl',
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        readyInMinutes: 30,
        servings: 2,
        diets: ['vegan', 'vegetarian', 'gluten free'],
        cuisines: ['american'],
        dishTypes: ['lunch', 'dinner', 'main course'],
        summary: 'A nutritious and colorful vegan buddha bowl packed with vegetables, grains, and plant-based protein.',
      },
      {
        id: 6,
        title: 'Chocolate Chip Cookies',
        image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        readyInMinutes: 25,
        servings: 24,
        diets: ['vegetarian'],
        cuisines: ['american'],
        dishTypes: ['dessert', 'snack'],
        summary: 'Classic chocolate chip cookies with a soft center and crispy edges. Perfect for any occasion.',
      },
      {
        id: 7,
        title: 'Grilled Salmon with Lemon Butter',
        image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        readyInMinutes: 20,
        servings: 2,
        diets: ['gluten free', 'pescatarian'],
        cuisines: ['american'],
        dishTypes: ['dinner', 'main course'],
        summary: 'Perfectly grilled salmon topped with a zesty lemon butter sauce. A healthy and delicious dinner option.',
      },
      {
        id: 8,
        title: 'Vegetable Stir Fry',
        image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        readyInMinutes: 20,
        servings: 4,
        diets: ['vegan', 'vegetarian', 'gluten free'],
        cuisines: ['asian', 'chinese'],
        dishTypes: ['lunch', 'dinner', 'main course'],
        summary: 'A quick and healthy vegetable stir fry that can be customized with your favorite vegetables and protein.',
      },
      {
        id: 9,
        title: 'Homemade Margherita Pizza',
        image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        readyInMinutes: 40,
        servings: 4,
        diets: ['vegetarian'],
        cuisines: ['italian'],
        dishTypes: ['lunch', 'dinner', 'main course'],
        summary: 'A classic Margherita pizza with a crispy crust, fresh tomatoes, mozzarella, and basil.',
      },
      {
        id: 10,
        title: 'Chicken Caesar Salad',
        image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        readyInMinutes: 20,
        servings: 2,
        diets: [],
        cuisines: ['american'],
        dishTypes: ['lunch', 'salad', 'starter'],
        summary: 'A refreshing Caesar salad with grilled chicken, crisp romaine lettuce, parmesan cheese, and homemade dressing.',
      },
      {
        id: 11,
        title: 'Butter Chicken',
        image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        readyInMinutes: 50,
        servings: 6,
        diets: [],
        cuisines: ['indian'],
        dishTypes: ['dinner', 'main course'],
        summary: 'Creamy and flavorful butter chicken that will transport you straight to India. Best served with naan and rice.',
      },
      {
        id: 12,
        title: 'Greek Salad',
        image: 'https://images.unsplash.com/photo-1551248429-40975aa4de74?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        readyInMinutes: 15,
        servings: 4,
        diets: ['vegetarian', 'gluten free'],
        cuisines: ['greek', 'mediterranean'],
        dishTypes: ['lunch', 'salad', 'starter'],
        summary: 'A refreshing Greek salad with cucumbers, tomatoes, olives, feta cheese, and a simple olive oil dressing.',
      },
    ];

    // Filter recipes based on search query
    let filteredRecipes = allRecipes;
    
    if (query) {
      const lowerCaseQuery = query.toLowerCase();
      filteredRecipes = filteredRecipes.filter(recipe => 
        recipe.title.toLowerCase().includes(lowerCaseQuery) ||
        recipe.summary.toLowerCase().includes(lowerCaseQuery) ||
        recipe.cuisines.some(cuisine => cuisine.toLowerCase().includes(lowerCaseQuery)) ||
        recipe.dishTypes.some(type => type.toLowerCase().includes(lowerCaseQuery))
      );
    }

    // Apply filters
    if (filters.diet.length > 0) {
      filteredRecipes = filteredRecipes.filter(recipe => 
        filters.diet.some(diet => recipe.diets.includes(diet))
      );
    }

    if (filters.mealType.length > 0) {
      filteredRecipes = filteredRecipes.filter(recipe => 
        filters.mealType.some(type => recipe.dishTypes.includes(type))
      );
    }

    if (filters.cuisine.length > 0) {
      filteredRecipes = filteredRecipes.filter(recipe => 
        filters.cuisine.some(cuisine => recipe.cuisines.includes(cuisine))
      );
    }

    if (filters.maxReadyTime) {
      filteredRecipes = filteredRecipes.filter(recipe => 
        recipe.readyInMinutes <= filters.maxReadyTime
      );
    }

    return filteredRecipes;
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