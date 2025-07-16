import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaClock, FaUtensils, FaWeight, FaHeart, FaShare, FaPrint, FaArrowLeft } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';
import '../styles/RecipeDetails.css';

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('ingredients');
  const [isFavorite, setIsFavorite] = useState(false);
  const [similarRecipes, setSimilarRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        setLoading(true);
        // In a real app, you would fetch from an API
        // const response = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=YOUR_API_KEY&includeNutrition=true`);
        // const data = await response.json();
        
        // Mock data for demonstration
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock recipe data
        const mockRecipe = {
          id: parseInt(id),
          title: 'Butter Chicken',
          image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
          readyInMinutes: 45,
          servings: 4,
          vegetarian: false,
          vegan: false,
          glutenFree: true,
          dairyFree: false,
          veryHealthy: false,
          cheap: false,
          veryPopular: true,
          sustainable: false,
          lowFodmap: false,
          weightWatcherSmartPoints: 12,
          gaps: 'no',
          preparationMinutes: 15,
          cookingMinutes: 30,
          sourceUrl: 'https://www.example.com/butter-chicken',
          spoonacularSourceUrl: 'https://spoonacular.com/butter-chicken-123456',
          aggregateLikes: 9876,
          healthScore: 32,
          creditsText: 'Example Food Blog',
          sourceName: 'Example Food Blog',
          pricePerServing: 163.15,
          summary: 'Butter Chicken is a popular Indian dish that consists of chicken marinated in a spiced yogurt mixture, then cooked in a tomato-based sauce with butter and cream. It\'s known for its rich, creamy texture and complex flavor profile that balances tangy, sweet, and spicy elements.',
          cuisines: ['Indian', 'Asian'],
          dishTypes: ['lunch', 'main course', 'main dish', 'dinner'],
          diets: ['gluten free'],
          occasions: ['weeknight dinner', 'date night'],
          instructions: 'Marinate the chicken: In a bowl, mix yogurt, lemon juice, turmeric, garam masala, cumin, and salt. Add chicken pieces and coat well. Cover and refrigerate for at least 1 hour, preferably overnight.\n\nPrepare the sauce: Heat butter in a large skillet over medium heat. Add onions and cook until soft, about 3 minutes. Add garlic and ginger, cook for 1 minute. Add tomato puree, chili powder, and salt. Simmer for 10-15 minutes.\n\nCook the chicken: In a separate pan, heat oil over medium-high heat. Add marinated chicken and cook until browned, about 4-5 minutes per side.\n\nCombine: Add the chicken to the sauce. Simmer for 10-15 minutes until chicken is cooked through. Stir in cream and cook for another 5 minutes.\n\nServe: Garnish with fresh cilantro and serve hot with naan bread or rice.',
          analyzedInstructions: [
            {
              name: '',
              steps: [
                {
                  number: 1,
                  step: 'Marinate the chicken: In a bowl, mix yogurt, lemon juice, turmeric, garam masala, cumin, and salt. Add chicken pieces and coat well. Cover and refrigerate for at least 1 hour, preferably overnight.',
                  ingredients: [
                    { id: 1001, name: 'butter', localizedName: 'butter', image: 'butter-sliced.jpg' },
                    { id: 5006, name: 'chicken', localizedName: 'chicken', image: 'chicken-pieces.jpg' },
                    { id: 93663, name: 'garam masala', localizedName: 'garam masala', image: 'garam-masala.jpg' },
                    { id: 9152, name: 'lemon juice', localizedName: 'lemon juice', image: 'lemon-juice.jpg' },
                    { id: 1116, name: 'yogurt', localizedName: 'yogurt', image: 'plain-yogurt.jpg' },
                    { id: 2043, name: 'turmeric', localizedName: 'turmeric', image: 'turmeric.jpg' },
                    { id: 1002014, name: 'cumin', localizedName: 'cumin', image: 'ground-cumin.jpg' },
                    { id: 2047, name: 'salt', localizedName: 'salt', image: 'salt.jpg' }
                  ],
                  equipment: [
                    { id: 404783, name: 'bowl', localizedName: 'bowl', image: 'bowl.jpg' }
                  ],
                  length: { number: 60, unit: 'minutes' }
                },
                {
                  number: 2,
                  step: 'Prepare the sauce: Heat butter in a large skillet over medium heat. Add onions and cook until soft, about 3 minutes. Add garlic and ginger, cook for 1 minute. Add tomato puree, chili powder, and salt. Simmer for 10-15 minutes.',
                  ingredients: [
                    { id: 1001, name: 'butter', localizedName: 'butter', image: 'butter-sliced.jpg' },
                    { id: 2009, name: 'chili powder', localizedName: 'chili powder', image: 'chili-powder.jpg' },
                    { id: 11215, name: 'garlic', localizedName: 'garlic', image: 'garlic.png' },
                    { id: 11216, name: 'ginger', localizedName: 'ginger', image: 'ginger.png' },
                    { id: 11282, name: 'onion', localizedName: 'onion', image: 'brown-onion.png' },
                    { id: 11887, name: 'tomato puree', localizedName: 'tomato puree', image: 'tomato-paste.jpg' },
                    { id: 2047, name: 'salt', localizedName: 'salt', image: 'salt.jpg' }
                  ],
                  equipment: [
                    { id: 404645, name: 'frying pan', localizedName: 'frying pan', image: 'pan.png' }
                  ],
                  length: { number: 15, unit: 'minutes' }
                },
                {
                  number: 3,
                  step: 'Cook the chicken: In a separate pan, heat oil over medium-high heat. Add marinated chicken and cook until browned, about 4-5 minutes per side.',
                  ingredients: [
                    { id: 5006, name: 'chicken', localizedName: 'chicken', image: 'chicken-pieces.jpg' },
                    { id: 4582, name: 'cooking oil', localizedName: 'cooking oil', image: 'vegetable-oil.jpg' }
                  ],
                  equipment: [
                    { id: 404645, name: 'frying pan', localizedName: 'frying pan', image: 'pan.png' }
                  ],
                  length: { number: 10, unit: 'minutes' }
                },
                {
                  number: 4,
                  step: 'Combine: Add the chicken to the sauce. Simmer for 10-15 minutes until chicken is cooked through. Stir in cream and cook for another 5 minutes.',
                  ingredients: [
                    { id: 5006, name: 'chicken', localizedName: 'chicken', image: 'chicken-pieces.jpg' },
                    { id: 1053, name: 'cream', localizedName: 'cream', image: 'fluid-cream.jpg' }
                  ],
                  equipment: [],
                  length: { number: 20, unit: 'minutes' }
                },
                {
                  number: 5,
                  step: 'Serve: Garnish with fresh cilantro and serve hot with naan bread or rice.',
                  ingredients: [
                    { id: 11165, name: 'cilantro', localizedName: 'cilantro', image: 'cilantro.png' },
                    { id: 93723, name: 'naan', localizedName: 'naan', image: 'naan.png' },
                    { id: 20444, name: 'rice', localizedName: 'rice', image: 'uncooked-white-rice.png' }
                  ],
                  equipment: []
                }
              ]
            }
          ],
          extendedIngredients: [
            {
              id: 5006,
              aisle: 'Meat',
              image: 'chicken-pieces.jpg',
              consistency: 'solid',
              name: 'chicken',
              nameClean: 'chicken',
              original: '1.5 pounds boneless, skinless chicken thighs, cut into bite-sized pieces',
              originalName: 'boneless, skinless chicken thighs, cut into bite-sized pieces',
              amount: 1.5,
              unit: 'pounds',
              meta: ['boneless', 'skinless', 'cut into bite-sized pieces'],
              measures: {
                us: { amount: 1.5, unitShort: 'lb', unitLong: 'pounds' },
                metric: { amount: 680.389, unitShort: 'g', unitLong: 'grams' }
              }
            },
            {
              id: 1116,
              aisle: 'Milk, Eggs, Other Dairy',
              image: 'plain-yogurt.jpg',
              consistency: 'liquid',
              name: 'yogurt',
              nameClean: 'yogurt',
              original: '1/2 cup plain yogurt',
              originalName: 'plain yogurt',
              amount: 0.5,
              unit: 'cup',
              meta: ['plain'],
              measures: {
                us: { amount: 0.5, unitShort: 'cups', unitLong: 'cups' },
                metric: { amount: 122.5, unitShort: 'ml', unitLong: 'milliliters' }
              }
            },
            {
              id: 9152,
              aisle: 'Produce',
              image: 'lemon-juice.jpg',
              consistency: 'liquid',
              name: 'lemon juice',
              nameClean: 'lemon juice',
              original: '2 tablespoons lemon juice',
              originalName: 'lemon juice',
              amount: 2,
              unit: 'tablespoons',
              meta: [],
              measures: {
                us: { amount: 2, unitShort: 'Tbsps', unitLong: 'Tbsps' },
                metric: { amount: 2, unitShort: 'Tbsps', unitLong: 'Tbsps' }
              }
            },
            {
              id: 2043,
              aisle: 'Spices and Seasonings',
              image: 'turmeric.jpg',
              consistency: 'solid',
              name: 'turmeric',
              nameClean: 'turmeric',
              original: '1 teaspoon turmeric',
              originalName: 'turmeric',
              amount: 1,
              unit: 'teaspoon',
              meta: [],
              measures: {
                us: { amount: 1, unitShort: 'tsp', unitLong: 'teaspoon' },
                metric: { amount: 1, unitShort: 'tsp', unitLong: 'teaspoon' }
              }
            },
            {
              id: 93663,
              aisle: 'Spices and Seasonings',
              image: 'garam-masala.jpg',
              consistency: 'solid',
              name: 'garam masala',
              nameClean: 'garam masala',
              original: '2 teaspoons garam masala',
              originalName: 'garam masala',
              amount: 2,
              unit: 'teaspoons',
              meta: [],
              measures: {
                us: { amount: 2, unitShort: 'tsps', unitLong: 'teaspoons' },
                metric: { amount: 2, unitShort: 'tsps', unitLong: 'teaspoons' }
              }
            },
            {
              id: 1002014,
              aisle: 'Spices and Seasonings',
              image: 'ground-cumin.jpg',
              consistency: 'solid',
              name: 'cumin',
              nameClean: 'cumin',
              original: '1 teaspoon cumin',
              originalName: 'cumin',
              amount: 1,
              unit: 'teaspoon',
              meta: [],
              measures: {
                us: { amount: 1, unitShort: 'tsp', unitLong: 'teaspoon' },
                metric: { amount: 1, unitShort: 'tsp', unitLong: 'teaspoon' }
              }
            },
            {
              id: 2047,
              aisle: 'Spices and Seasonings',
              image: 'salt.jpg',
              consistency: 'solid',
              name: 'salt',
              nameClean: 'salt',
              original: '1 teaspoon salt, plus more to taste',
              originalName: 'salt, plus more to taste',
              amount: 1,
              unit: 'teaspoon',
              meta: ['to taste', 'plus more'],
              measures: {
                us: { amount: 1, unitShort: 'tsp', unitLong: 'teaspoon' },
                metric: { amount: 1, unitShort: 'tsp', unitLong: 'teaspoon' }
              }
            },
            {
              id: 1001,
              aisle: 'Milk, Eggs, Other Dairy',
              image: 'butter-sliced.jpg',
              consistency: 'solid',
              name: 'butter',
              nameClean: 'butter',
              original: '4 tablespoons butter',
              originalName: 'butter',
              amount: 4,
              unit: 'tablespoons',
              meta: [],
              measures: {
                us: { amount: 4, unitShort: 'Tbsps', unitLong: 'Tbsps' },
                metric: { amount: 4, unitShort: 'Tbsps', unitLong: 'Tbsps' }
              }
            },
            {
              id: 11282,
              aisle: 'Produce',
              image: 'brown-onion.png',
              consistency: 'solid',
              name: 'onion',
              nameClean: 'onion',
              original: '1 large onion, finely chopped',
              originalName: 'onion, finely chopped',
              amount: 1,
              unit: 'large',
              meta: ['finely chopped'],
              measures: {
                us: { amount: 1, unitShort: 'large', unitLong: 'large' },
                metric: { amount: 1, unitShort: 'large', unitLong: 'large' }
              }
            },
            {
              id: 11215,
              aisle: 'Produce',
              image: 'garlic.png',
              consistency: 'solid',
              name: 'garlic',
              nameClean: 'garlic',
              original: '4 cloves garlic, minced',
              originalName: 'garlic, minced',
              amount: 4,
              unit: 'cloves',
              meta: ['minced'],
              measures: {
                us: { amount: 4, unitShort: 'cloves', unitLong: 'cloves' },
                metric: { amount: 4, unitShort: 'cloves', unitLong: 'cloves' }
              }
            },
            {
              id: 11216,
              aisle: 'Produce',
              image: 'ginger.png',
              consistency: 'solid',
              name: 'ginger',
              nameClean: 'ginger',
              original: '1 tablespoon ginger, grated',
              originalName: 'ginger, grated',
              amount: 1,
              unit: 'tablespoon',
              meta: ['grated'],
              measures: {
                us: { amount: 1, unitShort: 'Tbsp', unitLong: 'Tbsp' },
                metric: { amount: 1, unitShort: 'Tbsp', unitLong: 'Tbsp' }
              }
            },
            {
              id: 11887,
              aisle: 'Pasta and Rice',
              image: 'tomato-paste.jpg',
              consistency: 'solid',
              name: 'tomato puree',
              nameClean: 'tomato puree',
              original: '2 cups tomato puree',
              originalName: 'tomato puree',
              amount: 2,
              unit: 'cups',
              meta: [],
              measures: {
                us: { amount: 2, unitShort: 'cups', unitLong: 'cups' },
                metric: { amount: 490, unitShort: 'ml', unitLong: 'milliliters' }
              }
            },
            {
              id: 2009,
              aisle: 'Spices and Seasonings',
              image: 'chili-powder.jpg',
              consistency: 'solid',
              name: 'chili powder',
              nameClean: 'chili powder',
              original: '1 teaspoon chili powder (adjust to taste)',
              originalName: 'chili powder (adjust to taste)',
              amount: 1,
              unit: 'teaspoon',
              meta: ['to taste', '(adjust )'],
              measures: {
                us: { amount: 1, unitShort: 'tsp', unitLong: 'teaspoon' },
                metric: { amount: 1, unitShort: 'tsp', unitLong: 'teaspoon' }
              }
            },
            {
              id: 4582,
              aisle: 'Oil, Vinegar, Salad Dressing',
              image: 'vegetable-oil.jpg',
              consistency: 'liquid',
              name: 'cooking oil',
              nameClean: 'cooking oil',
              original: '2 tablespoons cooking oil',
              originalName: 'cooking oil',
              amount: 2,
              unit: 'tablespoons',
              meta: [],
              measures: {
                us: { amount: 2, unitShort: 'Tbsps', unitLong: 'Tbsps' },
                metric: { amount: 2, unitShort: 'Tbsps', unitLong: 'Tbsps' }
              }
            },
            {
              id: 1053,
              aisle: 'Milk, Eggs, Other Dairy',
              image: 'fluid-cream.jpg',
              consistency: 'liquid',
              name: 'cream',
              nameClean: 'cream',
              original: '1/2 cup heavy cream',
              originalName: 'heavy cream',
              amount: 0.5,
              unit: 'cup',
              meta: ['heavy'],
              measures: {
                us: { amount: 0.5, unitShort: 'cups', unitLong: 'cups' },
                metric: { amount: 122.5, unitShort: 'ml', unitLong: 'milliliters' }
              }
            },
            {
              id: 11165,
              aisle: 'Produce',
              image: 'cilantro.png',
              consistency: 'solid',
              name: 'cilantro',
              nameClean: 'cilantro',
              original: 'Fresh cilantro for garnish',
              originalName: 'Fresh cilantro for garnish',
              amount: 2,
              unit: 'servings',
              meta: ['fresh', 'for garnish'],
              measures: {
                us: { amount: 2, unitShort: 'servings', unitLong: 'servings' },
                metric: { amount: 2, unitShort: 'servings', unitLong: 'servings' }
              }
            },
            {
              id: 93723,
              aisle: 'Bakery/Bread',
              image: 'naan.png',
              consistency: 'solid',
              name: 'naan bread',
              nameClean: 'naan',
              original: 'Naan bread or rice for serving',
              originalName: 'Naan bread or rice for serving',
              amount: 4,
              unit: 'servings',
              meta: ['for serving'],
              measures: {
                us: { amount: 4, unitShort: 'servings', unitLong: 'servings' },
                metric: { amount: 4, unitShort: 'servings', unitLong: 'servings' }
              }
            }
          ],
          nutrition: {
            nutrients: [
              {
                name: 'Calories',
                amount: 542.17,
                unit: 'kcal',
                percentOfDailyNeeds: 27.11
              },
              {
                name: 'Fat',
                amount: 38.29,
                unit: 'g',
                percentOfDailyNeeds: 58.91
              },
              {
                name: 'Saturated Fat',
                amount: 18.54,
                unit: 'g',
                percentOfDailyNeeds: 115.86
              },
              {
                name: 'Carbohydrates',
                amount: 14.83,
                unit: 'g',
                percentOfDailyNeeds: 4.94
              },
              {
                name: 'Net Carbohydrates',
                amount: 12.11,
                unit: 'g',
                percentOfDailyNeeds: 4.4
              },
              {
                name: 'Sugar',
                amount: 7.97,
                unit: 'g',
                percentOfDailyNeeds: 8.86
              },
              {
                name: 'Cholesterol',
                amount: 219.57,
                unit: 'mg',
                percentOfDailyNeeds: 73.19
              },
              {
                name: 'Sodium',
                amount: 1230.08,
                unit: 'mg',
                percentOfDailyNeeds: 53.48
              },
              {
                name: 'Protein',
                amount: 35.22,
                unit: 'g',
                percentOfDailyNeeds: 70.44
              },
              {
                name: 'Vitamin A',
                amount: 1234.56,
                unit: 'IU',
                percentOfDailyNeeds: 24.69
              },
              {
                name: 'Vitamin C',
                amount: 27.45,
                unit: 'mg',
                percentOfDailyNeeds: 33.27
              },
              {
                name: 'Iron',
                amount: 3.21,
                unit: 'mg',
                percentOfDailyNeeds: 17.83
              },
              {
                name: 'Calcium',
                amount: 123.45,
                unit: 'mg',
                percentOfDailyNeeds: 12.35
              },
              {
                name: 'Potassium',
                amount: 789.01,
                unit: 'mg',
                percentOfDailyNeeds: 22.54
              },
              {
                name: 'Fiber',
                amount: 2.72,
                unit: 'g',
                percentOfDailyNeeds: 10.88
              }
            ],
            properties: [
              {
                name: 'Glycemic Index',
                amount: 45.0,
                unit: ''
              },
              {
                name: 'Glycemic Load',
                amount: 5.45,
                unit: ''
              },
              {
                name: 'Nutrition Score',
                amount: 32.0,
                unit: '%'
              }
            ],
            flavonoids: [
              {
                name: 'Cyanidin',
                amount: 0.0,
                unit: 'mg'
              },
              {
                name: 'Petunidin',
                amount: 0.0,
                unit: 'mg'
              },
              {
                name: 'Delphinidin',
                amount: 0.0,
                unit: 'mg'
              },
              {
                name: 'Malvidin',
                amount: 0.0,
                unit: 'mg'
              },
              {
                name: 'Pelargonidin',
                amount: 0.0,
                unit: 'mg'
              },
              {
                name: 'Peonidin',
                amount: 0.0,
                unit: 'mg'
              },
              {
                name: 'Catechin',
                amount: 0.0,
                unit: 'mg'
              },
              {
                name: 'Epigallocatechin',
                amount: 0.0,
                unit: 'mg'
              },
              {
                name: 'Epicatechin',
                amount: 0.0,
                unit: 'mg'
              },
              {
                name: 'Epicatechin 3-gallate',
                amount: 0.0,
                unit: 'mg'
              },
              {
                name: 'Epigallocatechin 3-gallate',
                amount: 0.0,
                unit: 'mg'
              },
              {
                name: 'Theaflavin',
                amount: 0.0,
                unit: 'mg'
              },
              {
                name: 'Thearubigins',
                amount: 0.0,
                unit: 'mg'
              },
              {
                name: 'Eriodictyol',
                amount: 0.0,
                unit: 'mg'
              },
              {
                name: 'Hesperetin',
                amount: 0.0,
                unit: 'mg'
              },
              {
                name: 'Naringenin',
                amount: 0.0,
                unit: 'mg'
              },
              {
                name: 'Apigenin',
                amount: 0.0,
                unit: 'mg'
              },
              {
                name: 'Luteolin',
                amount: 0.0,
                unit: 'mg'
              },
              {
                name: 'Isorhamnetin',
                amount: 0.0,
                unit: 'mg'
              },
              {
                name: 'Kaempferol',
                amount: 0.0,
                unit: 'mg'
              },
              {
                name: 'Myricetin',
                amount: 0.0,
                unit: 'mg'
              },
              {
                name: 'Quercetin',
                amount: 0.0,
                unit: 'mg'
              },
              {
                name: 'Theaflavin-3,3\'-digallate',
                amount: 0.0,
                unit: 'mg'
              },
              {
                name: 'Theaflavin-3\'-gallate',
                amount: 0.0,
                unit: 'mg'
              },
              {
                name: 'Theaflavin-3-gallate',
                amount: 0.0,
                unit: 'mg'
              },
              {
                name: 'Gallocatechin',
                amount: 0.0,
                unit: 'mg'
              }
            ],
            caloricBreakdown: {
              percentProtein: 26.0,
              percentFat: 63.5,
              percentCarbs: 10.5
            },
            weightPerServing: {
              amount: 354,
              unit: 'g'
            }
          }
        };

        // Mock similar recipes
        const mockSimilarRecipes = [
          {
            id: 101,
            title: 'Chicken Tikka Masala',
            image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
            readyInMinutes: 50,
            servings: 4
          },
          {
            id: 102,
            title: 'Chicken Curry',
            image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
            readyInMinutes: 40,
            servings: 4
          },
          {
            id: 103,
            title: 'Tandoori Chicken',
            image: 'https://images.unsplash.com/photo-1610057099431-d73a1c9d2f2f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
            readyInMinutes: 55,
            servings: 4
          }
        ];

        setRecipe(mockRecipe);
        setSimilarRecipes(mockSimilarRecipes);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching recipe details:', error);
        setLoading(false);
      }
    };

    // Check if recipe is in favorites
    const checkFavorite = () => {
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      setIsFavorite(favorites.some(fav => fav.id === parseInt(id)));
    };

    fetchRecipeDetails();
    checkFavorite();
    
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [id]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    
    if (isFavorite) {
      // Remove from favorites
      const updatedFavorites = favorites.filter(fav => fav.id !== recipe.id);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } else {
      // Add to favorites
      const recipeToSave = {
        id: recipe.id,
        title: recipe.title,
        image: recipe.image,
        readyInMinutes: recipe.readyInMinutes,
        servings: recipe.servings
      };
      localStorage.setItem('favorites', JSON.stringify([...favorites, recipeToSave]));
    }
    
    setIsFavorite(!isFavorite);
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
    <div className="recipe-details-page">
      <div className="recipe-details-container">
        <div className="recipe-header">
          <Link to="/" className="back-button">
            <FaArrowLeft /> Back
          </Link>
          <div className="recipe-actions">
            <button 
              className={`action-button favorite-button ${isFavorite ? 'active' : ''}`}
              onClick={toggleFavorite}
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <FaHeart /> {isFavorite ? 'Saved' : 'Save'}
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
            <img src={recipe.image} alt={recipe.title} className="recipe-image" />
            <div className="recipe-badges">
              {recipe.vegetarian && <span className="badge vegetarian">Vegetarian</span>}
              {recipe.vegan && <span className="badge vegan">Vegan</span>}
              {recipe.glutenFree && <span className="badge gluten-free">Gluten Free</span>}
              {recipe.dairyFree && <span className="badge dairy-free">Dairy Free</span>}
            </div>
          </div>
          <div className="recipe-info">
            <h1 className="recipe-title">{recipe.title}</h1>
            <div className="recipe-meta">
              <div className="meta-item">
                <FaClock />
                <span>{recipe.readyInMinutes} mins</span>
              </div>
              <div className="meta-item">
                <FaUtensils />
                <span>{recipe.servings} servings</span>
              </div>
              <div className="meta-item">
                <FaWeight />
                <span>{recipe.nutrition?.weightPerServing?.amount || 0} {recipe.nutrition?.weightPerServing?.unit || 'g'}/serving</span>
              </div>
            </div>
            <div className="recipe-summary" dangerouslySetInnerHTML={{ __html: recipe.summary }}></div>
          </div>
        </motion.div>

        <div className="recipe-tabs">
          <button 
            className={`tab-button ${activeTab === 'ingredients' ? 'active' : ''}`}
            onClick={() => setActiveTab('ingredients')}
          >
            Ingredients
          </button>
          <button 
            className={`tab-button ${activeTab === 'instructions' ? 'active' : ''}`}
            onClick={() => setActiveTab('instructions')}
          >
            Instructions
          </button>
          <button 
            className={`tab-button ${activeTab === 'nutrition' ? 'active' : ''}`}
            onClick={() => setActiveTab('nutrition')}
          >
            Nutrition
          </button>
        </div>

        <div className="recipe-content">
          {activeTab === 'ingredients' && (
            <motion.div 
              className="ingredients-section"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h2>Ingredients</h2>
              <p className="servings-info">Ingredients for {recipe.servings} servings</p>
              <ul className="ingredients-list">
                {recipe.extendedIngredients.map((ingredient, index) => (
                  <li key={index} className="ingredient-item">
                    <div className="ingredient-amount">
                      {ingredient.measures.us.amount} {ingredient.measures.us.unitLong}
                    </div>
                    <div className="ingredient-name">{ingredient.original}</div>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}

          {activeTab === 'instructions' && (
            <motion.div 
              className="instructions-section"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h2>Instructions</h2>
              <ol className="instructions-list">
                {recipe.analyzedInstructions[0]?.steps.map((step, index) => (
                  <li key={index} className="instruction-step">
                    <div className="step-number">{step.number}</div>
                    <div className="step-content">
                      <p>{step.step}</p>
                      {step.ingredients.length > 0 && (
                        <div className="step-ingredients">
                          <span>Ingredients: </span>
                          {step.ingredients.map((ingredient, i) => (
                            <span key={i} className="step-ingredient">
                              {ingredient.name}{i < step.ingredients.length - 1 ? ', ' : ''}
                            </span>
                          ))}
                        </div>
                      )}
                      {step.equipment.length > 0 && (
                        <div className="step-equipment">
                          <span>Equipment: </span>
                          {step.equipment.map((item, i) => (
                            <span key={i} className="step-equipment-item">
                              {item.name}{i < step.equipment.length - 1 ? ', ' : ''}
                            </span>
                          ))}
                        </div>
                      )}
                      {step.length && (
                        <div className="step-time">
                          <FaClock /> {step.length.number} {step.length.unit}
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            </motion.div>
          )}

          {activeTab === 'nutrition' && (
            <motion.div 
              className="nutrition-section"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h2>Nutrition Information</h2>
              <p className="nutrition-info">Per serving ({recipe.nutrition?.weightPerServing?.amount || 0} {recipe.nutrition?.weightPerServing?.unit || 'g'})</p>
              
              <div className="nutrition-summary">
                <div className="nutrition-macros">
                  <div className="macro-chart">
                    <div className="macro-chart-inner">
                      <div 
                        className="macro-segment protein"
                        style={{ 
                          transform: `rotate(0deg) skew(${90 - (recipe.nutrition?.caloricBreakdown?.percentProtein || 0) * 3.6}deg)` 
                        }}
                      ></div>
                      <div 
                        className="macro-segment carbs"
                        style={{ 
                          transform: `rotate(${(recipe.nutrition?.caloricBreakdown?.percentProtein || 0) * 3.6}deg) skew(${90 - (recipe.nutrition?.caloricBreakdown?.percentCarbs || 0) * 3.6}deg)` 
                        }}
                      ></div>
                      <div 
                        className="macro-segment fat"
                        style={{ 
                          transform: `rotate(${((recipe.nutrition?.caloricBreakdown?.percentProtein || 0) + (recipe.nutrition?.caloricBreakdown?.percentCarbs || 0)) * 3.6}deg) skew(${90 - (recipe.nutrition?.caloricBreakdown?.percentFat || 0) * 3.6}deg)` 
                        }}
                      ></div>
                      <div className="macro-chart-center">
                        <span className="calories-value">{Math.round(recipe.nutrition?.nutrients[0]?.amount || 0)}</span>
                        <span className="calories-label">kcal</span>
                      </div>
                    </div>
                  </div>
                  <div className="macro-legend">
                    <div className="macro-legend-item">
                      <span className="legend-color protein"></span>
                      <span className="legend-label">Protein</span>
                      <span className="legend-value">{Math.round(recipe.nutrition?.caloricBreakdown?.percentProtein || 0)}%</span>
                    </div>
                    <div className="macro-legend-item">
                      <span className="legend-color carbs"></span>
                      <span className="legend-label">Carbs</span>
                      <span className="legend-value">{Math.round(recipe.nutrition?.caloricBreakdown?.percentCarbs || 0)}%</span>
                    </div>
                    <div className="macro-legend-item">
                      <span className="legend-color fat"></span>
                      <span className="legend-label">Fat</span>
                      <span className="legend-value">{Math.round(recipe.nutrition?.caloricBreakdown?.percentFat || 0)}%</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="nutrition-details">
                <h3>Detailed Nutrition Facts</h3>
                <div className="nutrition-table">
                  {recipe.nutrition?.nutrients.map((nutrient, index) => (
                    <div key={index} className="nutrition-row">
                      <div className="nutrition-name">{nutrient.name}</div>
                      <div className="nutrition-amount">
                        {Math.round(nutrient.amount * 10) / 10} {nutrient.unit}
                      </div>
                      <div className="nutrition-percent">
                        {nutrient.percentOfDailyNeeds ? (
                          <div className="percent-bar">
                            <div 
                              className="percent-fill"
                              style={{ width: `${Math.min(nutrient.percentOfDailyNeeds, 100)}%` }}
                            ></div>
                            <span>{Math.round(nutrient.percentOfDailyNeeds)}%</span>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {similarRecipes.length > 0 && (
          <div className="similar-recipes">
            <h2>You Might Also Like</h2>
            <div className="similar-recipes-grid">
              {similarRecipes.map(recipe => (
                <Link to={`/recipe/${recipe.id}`} key={recipe.id} className="similar-recipe-card">
                  <div className="similar-recipe-image">
                    <img src={recipe.image} alt={recipe.title} />
                  </div>
                  <div className="similar-recipe-content">
                    <h3>{recipe.title}</h3>
                    <div className="similar-recipe-meta">
                      <span><FaClock /> {recipe.readyInMinutes} mins</span>
                      <span><FaUtensils /> {recipe.servings} servings</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default RecipeDetails;