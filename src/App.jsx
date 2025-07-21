import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Categories from './pages/Categories';
import Favorites from './pages/Favorites';
import SearchResults from './pages/SearchResults';
import RecipeDetails from './pages/RecipeDetails';
import IngredientSearch from './pages/IngredientSearch';
import NotFound from './pages/NotFound';
import PrivateRoute from './components/PrivateRoute';
import ClerkTest from './components/ClerkTest';
import { AuthProvider } from './contexts/AuthContext';
// import './App.css';

function App() {
  // Get the publishable key from environment variables
  const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;
  
  if (!clerkPubKey) {
    console.error("Missing Clerk publishable key. Set REACT_APP_CLERK_PUBLISHABLE_KEY in your .env file");
  }

  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <AuthProvider>
        <Router>
          <div className="app">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/recipe/:id" element={<RecipeDetails />} />
              <Route path="/ingredients" element={<IngredientSearch />} />
              <Route path="/favorites" element={
                <PrivateRoute>
                  <Favorites />
                </PrivateRoute>
              } />
              <Route path="/clerk-test" element={<ClerkTest />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ClerkProvider>
  );
}

export default App;