import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUtensils, FaSearch } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';
import '../styles/Categories.css';

const Categories = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [showAllCategories, setShowAllCategories] = useState(true);

  // Categories data
  const categories = [
    {
      id: 'cuisine-italian',
      name: 'Italian',
      type: 'cuisine',
      image: 'https://images.unsplash.com/photo-1595295333158-4742f28fbd85?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      description: 'Classic pasta dishes, pizzas, risottos, and more',
      recipeCount: 42
    },
    {
      id: 'cuisine-indian',
      name: 'Indian',
      type: 'cuisine',
      image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      description: 'Flavorful curries, tandoori specialties, and aromatic rice dishes',
      recipeCount: 38
    },
    {
      id: 'cuisine-mexican',
      name: 'Mexican',
      type: 'cuisine',
      image: 'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      description: 'Tacos, enchiladas, salsas, and other vibrant dishes',
      recipeCount: 31
    },
    {
      id: 'cuisine-chinese',
      name: 'Chinese',
      type: 'cuisine',
      image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      description: 'Stir-fries, dumplings, noodle dishes, and regional specialties',
      recipeCount: 35
    },
    {
      id: 'cuisine-japanese',
      name: 'Japanese',
      type: 'cuisine',
      image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      description: 'Sushi, ramen, teriyaki, and other Japanese favorites',
      recipeCount: 29
    },
    {
      id: 'cuisine-thai',
      name: 'Thai',
      type: 'cuisine',
      image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      description: 'Aromatic curries, noodle dishes, and fresh salads',
      recipeCount: 26
    },
    {
      id: 'meal-breakfast',
      name: 'Breakfast',
      type: 'meal',
      image: 'https://images.unsplash.com/photo-1533089860892-a9b9ac6cd6b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      description: 'Start your day with these delicious breakfast recipes',
      recipeCount: 45
    },
    {
      id: 'meal-lunch',
      name: 'Lunch',
      type: 'meal',
      image: 'https://images.unsplash.com/photo-1547496502-affa22d38842?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      description: 'Quick and satisfying midday meal ideas',
      recipeCount: 38
    },
    {
      id: 'meal-dinner',
      name: 'Dinner',
      type: 'meal',
      image: 'https://images.unsplash.com/photo-1576402187878-974f70c890a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      description: 'Hearty and delicious dinner recipes for the whole family',
      recipeCount: 52
    },
    {
      id: 'meal-dessert',
      name: 'Dessert',
      type: 'meal',
      image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      description: 'Sweet treats to satisfy your cravings',
      recipeCount: 40
    },
    {
      id: 'diet-vegetarian',
      name: 'Vegetarian',
      type: 'diet',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      description: 'Delicious meat-free recipes packed with flavor',
      recipeCount: 48
    },
    {
      id: 'diet-vegan',
      name: 'Vegan',
      type: 'diet',
      image: 'https://images.unsplash.com/photo-1540914124281-342587941389?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      description: 'Plant-based recipes without animal products',
      recipeCount: 36
    },
    {
      id: 'diet-gluten-free',
      name: 'Gluten Free',
      type: 'diet',
      image: 'https://images.unsplash.com/photo-1546548970-71785318a17b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      description: 'Recipes without gluten for those with sensitivities',
      recipeCount: 32
    },
    {
      id: 'diet-keto',
      name: 'Keto',
      type: 'diet',
      image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      description: 'Low-carb, high-fat recipes for the ketogenic diet',
      recipeCount: 28
    },
    {
      id: 'time-quick',
      name: 'Quick & Easy',
      type: 'time',
      image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      description: 'Recipes ready in 30 minutes or less',
      recipeCount: 50
    },
    {
      id: 'time-slow-cooker',
      name: 'Slow Cooker',
      type: 'time',
      image: 'https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      description: 'Set it and forget it slow cooker recipes',
      recipeCount: 25
    }
  ];

  // Filter types for category filtering
  const filterTypes = [
    { id: 'all', name: 'All Categories' },
    { id: 'cuisine', name: 'Cuisines' },
    { id: 'meal', name: 'Meal Types' },
    { id: 'diet', name: 'Dietary' },
    { id: 'time', name: 'Time-Based' }
  ];

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    
    if (query.trim() === '') {
      setFilteredCategories([]);
      setShowAllCategories(true);
    } else {
      const filtered = categories.filter(category => 
        category.name.toLowerCase().includes(query) ||
        category.description.toLowerCase().includes(query)
      );
      setFilteredCategories(filtered);
      setShowAllCategories(false);
    }
  };

  // Clear search
  const clearSearch = () => {
    setSearchQuery('');
    setFilteredCategories([]);
    setShowAllCategories(true);
  };

  // Filter categories by type
  const filterByType = (type) => {
    if (type === 'all') {
      setFilteredCategories([]);
      setShowAllCategories(true);
    } else {
      const filtered = categories.filter(category => category.type === type);
      setFilteredCategories(filtered);
      setShowAllCategories(false);
    }
    setSearchQuery('');
  };

  // Get categories to display based on search/filter state
  const displayCategories = showAllCategories ? categories : filteredCategories;

  return (
    <div className="categories-page">
      <div className="categories-container">
        <div className="categories-header">
          <h1><FaUtensils className="utensils-icon" /> Browse Recipe Categories</h1>
          <p>Explore recipes by cuisine, meal type, dietary preferences, and more</p>
        </div>

        <div className="categories-search-filter">
          <div className="search-input-container">
            <FaSearch className="search-icon" />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search categories..."
              className="search-input"
            />
            {searchQuery && (
              <button className="clear-search" onClick={clearSearch}>
                &times;
              </button>
            )}
          </div>

          <div className="filter-buttons">
            {filterTypes.map(type => (
              <button
                key={type.id}
                className={`filter-button ${(showAllCategories && type.id === 'all') || (!showAllCategories && filteredCategories.length > 0 && filteredCategories[0].type === type.id) ? 'active' : ''}`}
                onClick={() => filterByType(type.id)}
              >
                {type.name}
              </button>
            ))}
          </div>
        </div>

        <div className="categories-content">
          {displayCategories.length > 0 ? (
            <div className="categories-grid">
              {displayCategories.map(category => (
                <motion.div
                  key={category.id}
                  className="category-card"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link to={`/category/${category.id}`} className="category-link">
                    <div className="category-image-container">
                      <img src={category.image} alt={category.name} className="category-image" />
                      <div className="category-overlay">
                        <span className="recipe-count">{category.recipeCount} Recipes</span>
                      </div>
                    </div>
                    <div className="category-content">
                      <h3 className="category-title">{category.name}</h3>
                      <p className="category-description">{category.description}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="no-categories">
              <h2>No matching categories found</h2>
              <p>Try a different search term or browse all categories</p>
              <button className="clear-search-btn" onClick={clearSearch}>
                View All Categories
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Categories;