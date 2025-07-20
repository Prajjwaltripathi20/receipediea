import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaSearch } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import RecipeCard from '../components/RecipeCard';
import Footer from '../components/Footer';
import recipeService from '../services/RecipeService';
import '../styles/Favorites.css';

const Favorites = () => {
  const { favorites } = useAuth();
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  useEffect(() => {
    const fetchFavoriteRecipes = async () => {
      setLoading(true);
      try {
        console.log('DEBUG: Favorites from context:', favorites);
        console.log('DEBUG: Favorites length:', favorites.length);
        if (favorites.length === 0) {
          console.log('DEBUG: No favorites found, setting empty arrays');
          setFavoriteRecipes([]);
          setFilteredRecipes([]);
        } else {
          // Fetch actual recipe details from API
          const recipePromises = favorites.map(async (recipeId) => {
            try {
              // Try to fetch from API first
              const recipeDetails = await recipeService.getRecipeDetails(recipeId);
              return recipeDetails;
            } catch (error) {
              console.warn(`Failed to fetch recipe ${recipeId} from API, using mock data:`, error);
              // Fallback to mock data if API fails
              const mockRecipes = generateMockRecipes([recipeId]);
              return mockRecipes[0] || null;
            }
          });

          const recipeResults = await Promise.all(recipePromises);
          const validRecipes = recipeResults.filter(recipe => recipe !== null);
          
          console.log('DEBUG: Fetched recipes:', validRecipes);
          console.log('DEBUG: Valid recipes length:', validRecipes.length);
          setFavoriteRecipes(validRecipes);
          setFilteredRecipes(validRecipes);
        }
      } catch (error) {
        console.error('Error fetching favorite recipes:', error);
        // Fallback to mock data on error
        const mockRecipes = generateMockRecipes(favorites);
        setFavoriteRecipes(mockRecipes);
        setFilteredRecipes(mockRecipes);
      } finally {
        setLoading(false);
      }
    };
    fetchFavoriteRecipes();
  }, [favorites]);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredRecipes(favoriteRecipes);
    } else {
      const filtered = favoriteRecipes.filter(recipe =>
        recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredRecipes(filtered);
    }
  }, [favoriteRecipes, searchQuery]);

  useEffect(() => {
    setSearchQuery('');
  }, [favorites]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setFilteredRecipes(favoriteRecipes);
  };

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

    return allMockRecipes.filter(recipe => {
      const recipeId = recipe.id;
      return ids.some(id => {
        // Handle both string and number comparisons
        return String(id) === String(recipeId) || Number(id) === Number(recipeId);
      });
    });
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
                <RecipeCard key={recipe.id} recipe={recipe} />
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
