import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaClock, FaUtensils, FaHeart } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from './AuthModal';
import '../styles/RecipeCard.css';

const RecipeCard = ({ recipe, showSaveButton = true }) => {
  const { currentUser, addToFavorites, removeFromFavorites, isFavorite, favorites } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const {
    id = '',
    title = 'Untitled',
    image = '',
    readyInMinutes = 0,
    servings = 0,
    vegetarian = false,
    vegan = false,
    glutenFree = false,
    usedIngredientCount,
    missedIngredientCount
  } = recipe || {};

  // Use context favorites for real-time updates
  const isRecipeFavorite = id ? isFavorite(id) : false;

  const handleImageError = (e) => {
    e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80';
  };

  const handleSaveClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!currentUser) {
      setShowAuthModal(true);
      return;
    }
    // Ensure consistent ID type handling
    const recipeId = typeof id === 'string' ? parseInt(id) || id : id;
    if (isRecipeFavorite) {
      removeFromFavorites(recipeId);
    } else {
      addToFavorites(recipeId);
    }
  };

  if (!id) return null;

  return (
    <>
      <div className="recipe-card">
        <div className="recipe-image-container">
          <img 
            src={image || 'https://via.placeholder.com/300x200?text=No+Image'} 
            alt={title} 
            className="recipe-image"
            onError={handleImageError}
            loading="lazy"
          />
          <div className="recipe-overlay">
            <div className="recipe-badges">
              {vegetarian && <span className="badge vegetarian">Vegetarian</span>}
              {vegan && <span className="badge vegan">Vegan</span>}
              {glutenFree && <span className="badge gluten-free">Gluten Free</span>}
            </div>
            {showSaveButton && (
              <button 
                className={`save-button ${isRecipeFavorite ? 'saved' : ''}`}
                onClick={handleSaveClick}
                aria-label={isRecipeFavorite ? 'Remove from favorites' : 'Add to favorites'}
              >
                <FaHeart />
              </button>
            )}
          </div>
          {(usedIngredientCount !== undefined && missedIngredientCount !== undefined) && (
            <div className="recipe-match-info">
              <span className="match-count">
                {usedIngredientCount} of {usedIngredientCount + missedIngredientCount} ingredients
              </span>
            </div>
          )}
        </div>
        <div className="recipe-content">
          <h3 className="recipe-title">{title}</h3>
          <div className="recipe-meta">
            <span className="recipe-time">
              <FaClock /> {readyInMinutes} mins
            </span>
            <span className="recipe-servings">
              <FaUtensils /> {servings} servings
            </span>
          </div>
          <Link to={`/recipe/${id}`} className="recipe-button">
            View Recipe
          </Link>
        </div>
      </div>
      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode="login"
      />
    </>
  );
};

export default RecipeCard;
