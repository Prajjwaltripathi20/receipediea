import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaFire, FaLeaf, FaSeedling, FaBreadSlice } from 'react-icons/fa';
import { motion } from 'framer-motion';
import RecipeCard from '../components/RecipeCard';
import SkeletonCard from '../components/SkeletonCard';
import Footer from '../components/Footer';
import recipeService from '../services/RecipeService';
import '../styles/Home.css';

const Home = () => {
  const [featuredRecipes, setFeaturedRecipes] = useState([]);
  const [trendingRecipes, setTrendingRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const trendRef = useRef(null);

  // Mock data for featured recipes
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));

        const mockFeaturedRecipes = [
          {
            id: 1,
            title: 'Mix Veg Curry',
            image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
            readyInMinutes: 45,
            servings: 4,
            vegetarian: false,
            vegan: false,
            glutenFree: true
          },
          {
            id: 2,
            title: 'Samosa',
            image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
            readyInMinutes: 35,
            servings: 3,
            vegetarian: true,
            vegan: false,
            glutenFree: true
          },
          {
            id: 3,
            title: 'Cold Coffee',
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
            image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
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
            title: 'Spicy Samosa',
            image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
            readyInMinutes: 40,
            servings: 6,
            vegetarian: true,
            vegan: false,
            glutenFree: false
          },
          {
            id: 7,
            title: 'Avocado Salad',
            image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
            readyInMinutes: 15,
            servings: 2,
            vegetarian: true,
            vegan: true,
            glutenFree: true
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

  const fetchSuggestions = async (query) => {
    try {
      const results = await recipeService.getAutocomplete(query);
      const formatted = Array.isArray(results) ? results : [];
      setSuggestions(formatted);
    } catch (error) {
      console.warn(error);
      setSuggestions([]);
    }
  };

  const scrollToTrend = () => {
    if (trendRef.current) {
      trendRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.length >= 2) {
      fetchSuggestions(query);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion.title);
    setShowSuggestions(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
  };

  const testimonials = [
    {
      id: 1,
      quote: "Recipedia has transformed my cooking journey! The detailed recipes and step-by-step instructions make it so easy to create restaurant-quality dishes at home.",
      author: "Aryan Bhargava",
      role: "Food Blogger & Chef",
      image: "https://media.licdn.com/dms/image/v2/D5603AQFIfef4GlGi-A/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1725464044705?e=1755734400&v=beta&t=4AxkWbG1UBTwnGdNop4dZfzGBy9GaQmtn4OL5fc0w4U"
    },
    {
      id: 2,
      quote: "As a working professional, I love how Recipedia helps me plan my meals. The quick and healthy recipes have made my life so much easier!",
      author: "Sanath Waraikar",
      role: "Software Engineer",
      image: "https://media.licdn.com/dms/image/v2/D4D35AQExqLl4LNdd5Q/profile-framedphoto-shrink_800_800/B4DZdek2AAGYAg-/0/1749638406515?e=1753596000&v=beta&t=_zuJ0DC_fBEdd_QMfyQZy9RPvz6y499FfOFOEkaJRpk"
    },
    {
      id: 3,
      quote: "The variety of Indian and international recipes on Recipedia is amazing. I've learned so many new cooking techniques and my family loves the results!",
      author: "Vedant Satbhai",
      role: "Home Chef",
      image: "https://media.licdn.com/dms/image/v2/D5603AQGCZArH_StnqQ/profile-displayphoto-shrink_800_800/B56ZUUzihvGsAc-/0/1739810810752?e=1755734400&v=beta&t=XPMaO7x1j8k15D92suqFGExLQ9NHz3Q91bxdmhcds1E"
    }
  ];

  return (
    <div className="home">
      <header className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Find your next <span className="italic-accent">favorite</span> meal.</h1>
          <p className="hero-subtitle">Discover curated recipes for every occasion, from quick weeknight dinners to gourmet celebrations.</p>
          <form onSubmit={handleSearchSubmit} className="search-container">
            <input
              type="text"
              placeholder="Search for recipes..."
              className="search-input"
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={() => searchQuery.length >= 2 && setShowSuggestions(true)}
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
            <button className="filter-btn" onClick={scrollToTrend}>
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
            <div className="recipe-grid">
              {[1, 2, 3, 4].map(n => <SkeletonCard key={n} />)}
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

      <section className="trending-now" ref={trendRef}>
        <div className="container">
          <h2 className="section-title">Trending Now</h2>
          {loading ? (
            <div className="recipe-grid">
              {[1, 2, 3, 4].map(n => <SkeletonCard key={n} />)}
            </div>
          ) : (
            <div className="trending-grid">
              {trendingRecipes.map(recipe => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          )}
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