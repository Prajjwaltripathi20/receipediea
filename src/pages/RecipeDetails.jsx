import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaClock, FaUtensils, FaWeight, FaHeart, FaShare, FaPrint, FaArrowLeft } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from '../components/AuthModal';
import Footer from '../components/Footer';
import recipeService from '../services/RecipeService';
import '../styles/RecipeDetails.css';

const RecipeDetails = () => {
  const { id } = useParams();
  const { currentUser, addToFavorites, removeFromFavorites, isFavorite } = useAuth();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('ingredients');
  const [isRecipeFavorite, setIsRecipeFavorite] = useState(false);
  const [similarRecipes, setSimilarRecipes] = useState([]);
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Use Spoonacular API to get recipe details
        const recipeData = await recipeService.getRecipeDetails(id);
        
        setRecipe(recipeData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching recipe details:', error);
        setError(error.message || 'Failed to load recipe details');
        setLoading(false);
      }
    };

    // Check if recipe is in favorites
    const checkFavorite = () => {
      if (currentUser) {
        setIsRecipeFavorite(isFavorite(parseInt(id)));
      }
    };

    fetchRecipeDetails();
    checkFavorite();
    
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [id, currentUser, isFavorite]);

  const toggleFavorite = () => {
    if (!currentUser) {
      setShowAuthModal(true);
      return;
    }

    if (isRecipeFavorite) {
      removeFromFavorites(parseInt(id));
    } else {
      addToFavorites(parseInt(id));
    }
    setIsRecipeFavorite(!isRecipeFavorite);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: recipe.title,
        text: `Check out this delicious ${recipe.title} recipe!`,
        url: window.location.href
      })
      .catch(error => console.log('Error sharing:', error));
    } else {
      // Fallback for browsers that don't support navigator.share
      navigator.clipboard.writeText(window.location.href)
        .then(() => alert('Link copied to clipboard!'))
        .catch(err => console.error('Could not copy text: ', err));
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading recipe details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error Loading Recipe</h2>
        <p>{error}</p>
        <Link to="/" className="back-button">
          <FaArrowLeft /> Back to Home
        </Link>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="error-container">
        <h2>Recipe Not Found</h2>
        <p>Sorry, we couldn't find the recipe you're looking for.</p>
        <Link to="/" className="back-button">
          <FaArrowLeft /> Back to Home
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="recipe-details-page">
        <div className="recipe-details-container">
          <div className="recipe-header">
            <Link to="/" className="back-button">
              <FaArrowLeft /> Back
            </Link>
            <div className="recipe-actions">
              <button 
                className={`action-button favorite-button ${isRecipeFavorite ? 'active' : ''}`}
                onClick={toggleFavorite}
                aria-label={isRecipeFavorite ? 'Remove from favorites' : 'Add to favorites'}
              >
                <FaHeart /> {isRecipeFavorite ? 'Saved' : 'Save'}
              </button>
              <button className="action-button" onClick={handleShare} aria-label="Share recipe">
                <FaShare /> Share
              </button>
              <button className="action-button" onClick={handlePrint} aria-label="Print recipe">
                <FaPrint /> Print
              </button>
            </div>
          </div>

          <motion.div 
            className="recipe-hero"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="recipe-image-container">
              <img 
                src={recipe.image} 
                alt={recipe.title}
                className="recipe-hero-image"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80';
                }}
              />
            </div>
            
            <div className="recipe-info">
              <h1 className="recipe-title">{recipe.title}</h1>
              
              {recipe.summary && (
                <div 
                  className="recipe-summary"
                  dangerouslySetInnerHTML={{ __html: recipe.summary }}
                />
              )}
              
              <div className="recipe-stats">
                <div className="stat">
                  <FaClock />
                  <span>{recipe.readyInMinutes} mins</span>
                </div>
                <div className="stat">
                  <FaUtensils />
                  <span>{recipe.servings} servings</span>
                </div>
                {recipe.nutrition?.nutrients && (
                  <div className="stat">
                    <FaWeight />
                    <span>{Math.round(recipe.nutrition.nutrients.find(n => n.name === 'Calories')?.amount || 0)} cal</span>
                  </div>
                )}
              </div>
              
              <div className="recipe-badges">
                {recipe.vegetarian && <span className="badge vegetarian">Vegetarian</span>}
                {recipe.vegan && <span className="badge vegan">Vegan</span>}
                {recipe.glutenFree && <span className="badge gluten-free">Gluten Free</span>}
                {recipe.dairyFree && <span className="badge dairy-free">Dairy Free</span>}
              </div>
            </div>
          </motion.div>

          <div className="recipe-content">
            <div className="recipe-tabs">
              <button 
                className={`tab ${activeTab === 'ingredients' ? 'active' : ''}`}
                onClick={() => setActiveTab('ingredients')}
              >
                Ingredients
              </button>
              <button 
                className={`tab ${activeTab === 'instructions' ? 'active' : ''}`}
                onClick={() => setActiveTab('instructions')}
              >
                Instructions
              </button>
              {recipe.nutrition && (
                <button 
                  className={`tab ${activeTab === 'nutrition' ? 'active' : ''}`}
                  onClick={() => setActiveTab('nutrition')}
                >
                  Nutrition
                </button>
              )}
            </div>

            <div className="tab-content">
              {activeTab === 'ingredients' && (
                <div className="ingredients-section">
                  <h3>Ingredients</h3>
                  <ul className="ingredients-list">
                    {recipe.extendedIngredients?.map((ingredient, index) => (
                      <li key={index} className="ingredient-item">
                        <span className="ingredient-amount">
                          {ingredient.amount} {ingredient.unit}
                        </span>
                        <span className="ingredient-name">{ingredient.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === 'instructions' && (
                <div className="instructions-section">
                  <h3>Instructions</h3>
                  {recipe.analyzedInstructions?.[0]?.steps ? (
                    <ol className="instructions-list">
                      {recipe.analyzedInstructions[0].steps.map((step, index) => (
                        <li key={index} className="instruction-step">
                          <span className="step-number">{step.number}</span>
                          <p className="step-text">{step.step}</p>
                        </li>
                      ))}
                    </ol>
                  ) : recipe.instructions ? (
                    <div 
                      className="instructions-text"
                      dangerouslySetInnerHTML={{ __html: recipe.instructions }}
                    />
                  ) : (
                    <p>No instructions available for this recipe.</p>
                  )}
                </div>
              )}

              {activeTab === 'nutrition' && recipe.nutrition && (
                <div className="nutrition-section">
                  <h3>Nutrition Information</h3>
                  <div className="nutrition-grid">
                    {recipe.nutrition.nutrients?.slice(0, 8).map((nutrient, index) => (
                      <div key={index} className="nutrition-item">
                        <span className="nutrient-name">{nutrient.name}</span>
                        <span className="nutrient-amount">
                          {Math.round(nutrient.amount)}{nutrient.unit}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <Footer />
      </div>

      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode="login"
      />
    </>
  );
};

export default RecipeDetails;