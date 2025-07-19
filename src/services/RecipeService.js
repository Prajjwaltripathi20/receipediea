// API Error class for better error handling
class APIError extends Error {
  constructor(message, status, endpoint) {
    super(message);
    this.name = 'APIError';
    this.status = status;
    this.endpoint = endpoint;
  }
}

// Utility function to handle API errors
const handleAPIError = (error, fallbackMessage) => {
  if (error.status === 402) {
    return "API quota exceeded. Please try again later.";
  }
  if (error.status >= 500) {
    return "Server error. Please try again later.";
  }
  if (error.status === 404) {
    return "Recipe not found.";
  }
  return fallbackMessage || "Something went wrong. Please try again.";
};

// Debounce utility for search requests
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

class RecipeService {
  constructor() {
    this.baseURL = process.env.REACT_APP_API_BASE_URL || 'https://api.spoonacular.com';
    this.apiKey = process.env.REACT_APP_SPOONACULAR_API_KEY;
    this.cache = new Map();
    this.cacheTimeout = 5 * 60 * 1000; // 5 minutes
  }

  // Generic API request method
  async makeRequest(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const params = new URLSearchParams({
      apiKey: this.apiKey,
      ...options
    });

    try {
      const response = await fetch(`${url}?${params}`);
      
      if (!response.ok) {
        throw new APIError(
          `API request failed: ${response.statusText}`,
          response.status,
          endpoint
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof APIError) {
        throw error;
      }
      throw new APIError(
        'Network error occurred',
        0,
        endpoint
      );
    }
  }

  // Cache management
  getCachedData(key) {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      return cached.data;
    }
    return null;
  }

  setCachedData(key, data) {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
  }

  // Search recipes by ingredients
  async searchByIngredients(ingredients, options = {}) {
    const ingredientString = Array.isArray(ingredients) 
      ? ingredients.join(',') 
      : ingredients;

    const cacheKey = `ingredients_${ingredientString}_${JSON.stringify(options)}`;
    const cached = this.getCachedData(cacheKey);
    if (cached) return cached;

    try {
      const params = {
        ingredients: ingredientString,
        number: options.number || 12,
        ranking: options.ranking || 1,
        ignorePantry: options.ignorePantry || true,
        ...options
      };

      const data = await this.makeRequest('/recipes/findByIngredients', params);
      this.setCachedData(cacheKey, data);
      return data;
    } catch (error) {
      throw new Error(handleAPIError(error, 'Failed to search recipes by ingredients'));
    }
  }

  // Get detailed recipe information
  async getRecipeDetails(recipeId) {
    const cacheKey = `recipe_${recipeId}`;
    const cached = this.getCachedData(cacheKey);
    if (cached) return cached;

    try {
      const data = await this.makeRequest(`/recipes/${recipeId}/information`, {
        includeNutrition: true
      });
      this.setCachedData(cacheKey, data);
      return data;
    } catch (error) {
      throw new Error(handleAPIError(error, 'Failed to get recipe details'));
    }
  }

  // Search recipes by category/cuisine
  async searchByCategory(category, options = {}) {
    const cacheKey = `category_${category}_${JSON.stringify(options)}`;
    const cached = this.getCachedData(cacheKey);
    if (cached) return cached;

    try {
      const params = {
        cuisine: category,
        number: options.number || 12,
        sort: options.sort || 'popularity',
        ...options
      };

      const data = await this.makeRequest('/recipes/complexSearch', params);
      this.setCachedData(cacheKey, data);
      return data;
    } catch (error) {
      throw new Error(handleAPIError(error, 'Failed to search recipes by category'));
    }
  }

  // Complex search with multiple filters
  async complexSearch(options = {}) {
    const cacheKey = `complex_${JSON.stringify(options)}`;
    const cached = this.getCachedData(cacheKey);
    if (cached) return cached;

    try {
      const params = {
        number: options.number || 12,
        offset: options.offset || 0,
        query: options.query || '',
        cuisine: options.cuisine || '',
        diet: options.diet || '',
        intolerances: options.intolerances || '',
        type: options.type || '',
        sort: options.sort || 'popularity',
        addRecipeInformation: true,
        fillIngredients: true,
        ...options
      };

      const data = await this.makeRequest('/recipes/complexSearch', params);
      this.setCachedData(cacheKey, data);
      return data;
    } catch (error) {
      throw new Error(handleAPIError(error, 'Failed to search recipes'));
    }
  }

  // Get recipe nutrition information
  async getRecipeNutrition(recipeId) {
    const cacheKey = `nutrition_${recipeId}`;
    const cached = this.getCachedData(cacheKey);
    if (cached) return cached;

    try {
      const data = await this.makeRequest(`/recipes/${recipeId}/nutritionWidget.json`);
      this.setCachedData(cacheKey, data);
      return data;
    } catch (error) {
      throw new Error(handleAPIError(error, 'Failed to get recipe nutrition'));
    }
  }

  // Get random recipes
  async getRandomRecipes(options = {}) {
    try {
      const params = {
        number: options.number || 6,
        tags: options.tags || '',
        ...options
      };

      const data = await this.makeRequest('/recipes/random', params);
      return data;
    } catch (error) {
      throw new Error(handleAPIError(error, 'Failed to get random recipes'));
    }
  }

  // Get recipe equipment
  async getRecipeEquipment(recipeId) {
    const cacheKey = `equipment_${recipeId}`;
    const cached = this.getCachedData(cacheKey);
    if (cached) return cached;

    try {
      const data = await this.makeRequest(`/recipes/${recipeId}/equipmentWidget.json`);
      this.setCachedData(cacheKey, data);
      return data;
    } catch (error) {
      throw new Error(handleAPIError(error, 'Failed to get recipe equipment'));
    }
  }

  // Debounced search for real-time search inputs
  createDebouncedSearch(delay = 300) {
    return debounce(async (query, callback) => {
      try {
        const results = await this.complexSearch({ query, number: 8 });
        callback(results, null);
      } catch (error) {
        callback(null, error);
      }
    }, delay);
  }

  // Clear cache
  clearCache() {
    this.cache.clear();
  }

  // Get cache size for debugging
  getCacheSize() {
    return this.cache.size;
  }
}

// Create and export a singleton instance
const recipeService = new RecipeService();
export default recipeService;