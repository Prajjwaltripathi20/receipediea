import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaFire, FaLeaf, FaSeedling, FaBreadSlice } from 'react-icons/fa';
import RecipeCard from '../components/RecipeCard';
import Footer from '../components/Footer';
import '../styles/Home.css';

const Home = () => {
  const [featuredRecipes, setFeaturedRecipes] = useState([]);
  const [trendingRecipes, setTrendingRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Mock data for featured recipes
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockFeaturedRecipes = [
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
          }
        ];

        const mockTrendingRecipes = [
          {
            id: 4,
            title: 'Masala Dosa',
            image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
            readyInMinutes: 25,
            servings: 2,
            vegetarian: true,
            vegan: true,
            glutenFree: true
          },
          {
            id: 5,
            title: 'Biryani',
            image: 'https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
            readyInMinutes: 60,
            servings: 4,
            vegetarian: false,
            vegan: false,
            glutenFree: true
          },
          {
            id: 6,
            title: 'Samosa',
            image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
            readyInMinutes: 40,
            servings: 6,
            vegetarian: true,
            vegan: false,
            glutenFree: false
          }
        ];

        setFeaturedRecipes(mockFeaturedRecipes);
        setTrendingRecipes(mockTrendingRecipes);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching recipes:', error);
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  // Function to fetch search suggestions
  const fetchSuggestions = async (query) => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/autocomplete?query=${query}&number=5&apiKey=YOUR_API_KEY`
      );
      const data = await response.json();
      setSuggestions(data);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      // Fallback to mock suggestions if API fails
      const mockSuggestions = [
        { title: 'Pasta Carbonara' },
        { title: 'Pasta Salad' },
        { title: 'Pasta Primavera' },
        { title: 'Pasta with Tomato Sauce' },
        { title: 'Pasta with Pesto' }
      ];
      setSuggestions(mockSuggestions);
    }
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    fetchSuggestions(query);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion.title);
    setShowSuggestions(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Navigate to search results page with the query
    window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
  };

  const handleImageError = (e) => {
    e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80';
  };

  const testimonials = [
    {
      id: 1,
      quote: "Recipedia has transformed my cooking journey! The detailed recipes and step-by-step instructions make it so easy to create restaurant-quality dishes at home.",
      author: "Aryan Bhargava",
      role: "Food Blogger & Chef",
      image: "https://media.licdn.com/dms/image/v2/D5603AQFIfef4GlGi-A/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1725464044698?e=1752105600&v=beta&t=wlGabV8jY9BaQ-gVD9EV4BeFJDYOwQi8v9gKLOpzoFU"
    },
    {
      id: 2,
      quote: "As a working professional, I love how Recipedia helps me plan my meals. The quick and healthy recipes have made my life so much easier!",
      author: "Sanath Waraikar",
      role: "Software Engineer",
      image: "https://media.licdn.com/dms/image/v2/D4D03AQEUbvbX8FxPRg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1726609555300?e=1752105600&v=beta&t=1EfinOZ9LinyvNdm-xjfZx8w4TFWJLtrZzZkSmpGLm8"
    },
    {
      id: 3,
      quote: "The variety of Indian and international recipes on Recipedia is amazing. I've learned so many new cooking techniques and my family loves the results!",
      author: "Mukund Mangla",
      role: "Home Chef",
      image: "https://media.licdn.com/dms/image/v2/D4E03AQFlhrTSVFbBbQ/profile-displayphoto-shrink_400_400/B4EZUU2ybPG0Ag-/0/1739811662052?e=1752105600&v=beta&t=nL3fyHjvl0dQAhefH8wdOgGEGk_2cyctLvYaA3l2SXw"
    }
  ];

  return (
    <div className="home">
      <header className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Discover Amazing Recipes</h1>
          <p className="hero-subtitle">Find and share your favorite recipes with the world</p>
          <form onSubmit={handleSearchSubmit} className="search-container">
            <input
              type="text"
              placeholder="Search for recipes..."
              className="search-input"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button type="submit" className="search-button">
              <FaSearch /> Search
            </button>
          </form>
          {showSuggestions && suggestions.length > 0 && (
            <div className="suggestions-container">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="suggestion-item"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion.title}
                </div>
              ))}
            </div>
          )}
          <div className="quick-filters">
            <button className="filter-btn">
              <FaFire /> Trending
            </button>
            <button className="filter-btn">
              <FaLeaf /> Vegetarian
            </button>
            <button className="filter-btn">
              <FaSeedling /> Vegan
            </button>
            <button className="filter-btn">
              <FaBreadSlice /> Gluten Free
            </button>
          </div>
        </div>
      </header>

      <section className="featured-recipes">
        <div className="container">
          <h2 className="section-title">Featured Recipes</h2>
          {loading ? (
            <div className="loading-spinner">
              <i className="fas fa-spinner fa-spin"></i>
            </div>
          ) : (
            <div className="recipe-grid">
              {featuredRecipes.map(recipe => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="trending-now">
        <div className="container">
          <h2 className="section-title">Trending Now</h2>
          <div className="trending-grid">
            {trendingRecipes.map(recipe => (
              <div key={recipe.id} className="trending-card">
                <img 
                  src={recipe.image} 
                  alt={recipe.title} 
                  className="trending-image"
                  onError={handleImageError}
                />
                <div className="trending-content">
                  <h3>{recipe.title}</h3>
                  <div className="trending-meta">
                    <span><i className="fas fa-clock"></i> {recipe.readyInMinutes} mins</span>
                    <span><i className="fas fa-utensils"></i> {recipe.servings} servings</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="categories">
        <div className="container">
          <h2 className="section-title">Browse by Category</h2>
          <div className="category-grid">
            <Link to="/category/indian" className="category-card">
              <i className="fas fa-pepper-hot"></i>
              <span>Indian</span>
            </Link>
            <Link to="/category/italian" className="category-card">
              <i className="fas fa-pizza-slice"></i>
              <span>Italian</span>
            </Link>
            <Link to="/category/chinese" className="category-card">
              <i className="fas fa-drumstick-bite"></i>
              <span>Chinese</span>
            </Link>
            <Link to="/category/healthy" className="category-card">
              <i className="fas fa-heartbeat"></i>
              <span>Healthy</span>
            </Link>
            <Link to="/category/vegetarian" className="category-card">
              <i className="fas fa-leaf"></i>
              <span>Vegetarian</span>
            </Link>
            <Link to="/category/desserts" className="category-card">
              <i className="fas fa-ice-cream"></i>
              <span>Desserts</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="testimonials">
        <div className="container">
          <h2 className="section-title">What Our Users Say</h2>
          <div className="testimonial-cards">
            {testimonials.map(testimonial => (
              <div key={testimonial.id} className="testimonial-card">
                <div className="testimonial-content">
                  <div className="quote-icon">
                    <i className="fas fa-quote-left"></i>
                  </div>
                  <p>{testimonial.quote}</p>
                  <div className="testimonial-author">
                    <img src={testimonial.image} alt={testimonial.author} className="author-avatar" />
                    <div className="author-info">
                      <h4>{testimonial.author}</h4>
                      <span>{testimonial.role}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home; 