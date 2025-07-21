import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { SignIn, SignUp, useClerk } from '@clerk/clerk-react';
import '../styles/AuthModal.css';

const AuthModal = ({ isOpen, onClose, initialMode = 'login' }) => {
  const [mode, setMode] = useState(initialMode);
  const { openSignIn, openSignUp } = useClerk();

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSignIn = () => {
    onClose();
    openSignIn();
  };

  const handleSignUp = () => {
    onClose();
    openSignUp();
  };

  if (!isOpen) return null;

  return (
    <div className="auth-modal-backdrop" onClick={handleBackdropClick}>
      <div className="auth-modal">
        <button className="auth-modal-close" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>
        
        <div className="auth-modal-header">
          <h2>{mode === 'login' ? 'Welcome Back' : 'Create Account'}</h2>
          <p>
            {mode === 'login' 
              ? 'Sign in to save your favorite recipes' 
              : 'Join us to start saving recipes'
            }
          </p>
        </div>

        <div className="auth-buttons">
          {mode === 'login' ? (
            <button 
              className="auth-submit-btn" 
              onClick={handleSignIn}
            >
              Sign In with Clerk
            </button>
          ) : (
            <button 
              className="auth-submit-btn" 
              onClick={handleSignUp}
            >
              Sign Up with Clerk
            </button>
          )}
        </div>

        <div className="auth-switch">
          <p>
            {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
            <button type="button" onClick={() => setMode(mode === 'login' ? 'register' : 'login')} className="auth-switch-btn">
              {mode === 'login' ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;