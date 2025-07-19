import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaClock, FaUtensils, FaHeart } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from './AuthModal';
import '../styles/RecipeCard.css';

const RecipeCard = ({ recipe, showSaveButton = true }) => {
  const {
    id,
    title,
    image,
    readyInMinutes,
    servings,
    vegetarian,
    vegan,
    glutenFree,
    usedIngredientCount,
    missedIngredientCount
  } = recipe;

  const { currentUser, addToFavorites, removeFromFavorites, isFavorite } = useAuth();
  const [isRecipeFavorite, setIsRecipeFavorite] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setIsRecipeFavorite(isFavorite(id));
    }
  }, [currentUser, id, isFavorite]);

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

    if (isRecipeFavorite) {
      removeFromFavorites(id);
    } else {
      addToFavorites(id);
    }
    setIsRecipeFavorite(!isRecipeFavorite);
  };

  return (
    <>
      <div className="recipe-card">
        <div className="recipe-image-container">
          <img 
            src={image} 
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