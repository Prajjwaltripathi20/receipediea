import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaSearch } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import RecipeCard from '../components/RecipeCard';
import Footer from '../components/Footer';
import '../styles/Favorites.css';

const Favorites = () => {
  const { currentUser, getFavorites } = useAuth();
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  useEffect(() => {
    const fetchFavoriteRecipes = async () => {
      setLoading(true);
      try {
        // Get favorite recipe IDs from localStorage
        const favoriteIds = getFavorites();
        
        if (favoriteIds.length === 0) {
          setFavoriteRecipes([]);
          setFilteredRecipes([]);
          setLoading(false);
          return;
        }

        // In a real app, you would fetch recipe details from an API
        // const promises = favoriteIds.map(id => 
        //   fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=YOUR_API_KEY`)
        //     .then(res => res.json())
        // );
        // const recipes = await Promise.all(promises);
        
        // Mock data for demonstration
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Generate mock recipes based on IDs
        const mockRecipes = generateMockRecipes(favoriteIds);
        setFavoriteRecipes(mockRecipes);
        setFilteredRecipes(mockRecipes);
      } catch (error) {
        console.error('Error fetching favorite recipes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavoriteRecipes();
  }, [getFavorites]);

  // Generate mock recipes based on IDs
  const generateMockRecipes = (ids) => {
    const allMockRecipes = [
      {
        id: 1,
        title: 'Butter Chicken',
        image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
        readyInMinutes: 45,
        servings: 4,
        vegetarian: false,
        vegan: false,
        glutenFree: true
      },
      {
        id: 2,
        title: 'Paneer Tikka Masala',
        image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
        readyInMinutes: 35,
        servings: 3,
        vegetarian: true,
        vegan: false,
        glutenFree: true
      },
      {
        id: 3,
        title: 'Gulab Jamun',
        image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
        readyInMinutes: 30,
        servings: 6,
        vegetarian: true,
        vegan: false,
        glutenFree: false
      },
      {
        id: 4,
        title: 'Vegetable Biryani',
        image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
        readyInMinutes: 50,
        servings: 4,
        vegetarian: true,
        vegan: true,
        glutenFree: true
      },
      {
        id: 5,
        title: 'Chicken Tikka',
        image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
        readyInMinutes: 40,
        servings: 3,
        vegetarian: false,
        vegan: false,
        glutenFree: true
      },
      {
        id: 6,
        title: 'Masala Dosa',
        image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
        readyInMinutes: 30,
        servings: 2,
        vegetarian: true,
        vegan: true,
        glutenFree: false
      },
      {
        id: 7,
        title: 'Aloo Gobi',
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
        readyInMinutes: 25,
        servings: 4,
        vegetarian: true,
        vegan: true,
        glutenFree: true
      },
      {
        id: 8,
        title: 'Chicken Curry',
        image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
        readyInMinutes: 40,
        servings: 4,
        vegetarian: false,
        vegan: false,
        glutenFree: true
      },
      {
        id: 9,
        title: 'Samosas',
        image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
        readyInMinutes: 35,
        servings: 6,
        vegetarian: true,
        vegan: false,
        glutenFree: false
      },
      {
        id: 10,
        title: 'Tandoori Chicken',
        image: 'https://images.unsplash.com/photo-1610057099431-d73a1c9d2f2f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
        readyInMinutes: 45,
        servings: 4,
        vegetarian: false,
        vegan: false,
        glutenFree: true
      },
      {
        id: 11,
        title: 'Palak Paneer',
        image: 'https://images.unsplash.com/photo-1596797038530-2c107aa8e1fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
        readyInMinutes: 30,
        servings: 3,
        vegetarian: true,
        vegan: false,
        glutenFree: true
      },
      {
        id: 12,
        title: 'Naan Bread',
        image: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
        readyInMinutes: 20,
        servings: 4,
        vegetarian: true,
        vegan: false,
        glutenFree: false
      }
    ];

    // Filter recipes based on IDs
    return allMockRecipes.filter(recipe => ids.includes(recipe.id));
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    
    if (query.trim() === '') {
      setFilteredRecipes(favoriteRecipes);
    } else {
      const filtered = favoriteRecipes.filter(recipe => 
        recipe.title.toLowerCase().includes(query)
      );
      setFilteredRecipes(filtered);
    }
  };

  // Clear search
  const clearSearch = () => {
    setSearchQuery('');
    setFilteredRecipes(favoriteRecipes);
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
              {searchQuery ? (
                <>
                  <h2>No matching recipes found</h2>
                  <p>Try a different search term or clear your search</p>
                  <button className="clear-search-btn" onClick={clearSearch}>
                    Clear Search
                  </button>
                </>
              ) : (
                <>
                  <h2>You haven't saved any favorites yet</h2>
                  <p>Start exploring recipes and save your favorites</p>
                  <Link to="/" className="explore-btn">
                    Explore Recipes
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Favorites;