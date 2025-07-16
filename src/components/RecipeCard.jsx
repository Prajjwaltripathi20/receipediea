import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/RecipeCard.css';

const RecipeCard = ({ recipe }) => {
  const {
    id,
    title,
    image,
    readyInMinutes,
    servings,
    vegetarian,
    vegan,
    glutenFree
  } = recipe;

  const handleImageError = (e) => {
    e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80';
  };

  return (
    <div className="recipe-card">
      <div className="recipe-image-container">
        <img 
          src={image} 
          alt={title} 
          className="recipe-image"
          onError={handleImageError}
        />
        <div className="recipe-overlay">
          <div className="recipe-badges">
            {vegetarian && <span className="badge vegetarian">Vegetarian</span>}
            {vegan && <span className="badge vegan">Vegan</span>}
            {glutenFree && <span className="badge gluten-free">Gluten Free</span>}
          </div>
        </div>
      </div>
      <div className="recipe-content">
        <h3 className="recipe-title">{title}</h3>
        <div className="recipe-meta">
          <span className="recipe-time">
            <i className="fas fa-clock"></i> {readyInMinutes} mins
          </span>
          <span className="recipe-servings">
            <i className="fas fa-utensils"></i> {servings} servings
          </span>
        </div>
        <Link to={`/recipe/${id}`} className="recipe-button">
          View Recipe
        </Link>
      </div>
    </div>
  );
};

export default RecipeCard; 