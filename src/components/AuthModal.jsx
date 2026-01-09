import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import '../styles/AuthModal.css';

const AuthModal = ({ isOpen, onClose, initialMode = 'login' }) => {
  const [mode, setMode] = useState(initialMode);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    displayName: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { login, register } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    // Register-specific validation
    if (mode === 'register') {
      if (!formData.displayName) {
        newErrors.displayName = 'Name is required';
      }
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      if (mode === 'login') {
        await login(formData.email, formData.password);
      } else {
        await register(formData.email, formData.password, formData.displayName);
      }
      onClose();
      resetForm();
    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      email: '',
      password: '',
      displayName: '',
      confirmPassword: ''
    });
    setErrors({});
  };

  const switchMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
    resetForm();
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
      resetForm();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="auth-drawer-backdrop" onClick={handleBackdropClick}>
      <div className="auth-drawer">
        {/* Header */}
        <div className="auth-drawer-header">
          <div className="drawer-branding">
            <div className="drawer-logo-icon">
              <i className="fas fa-utensils"></i>
            </div>
            <div className="drawer-logo-text">
              <h3>Recipedia</h3>
              <span>Your digital cookbook</span>
            </div>
          </div>
          <button className="auth-drawer-close" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="auth-drawer-content">
          <div className="drawer-title-section">
            <h2>{mode === 'login' ? 'Welcome Back' : 'Create Account'}</h2>
            <p>
              {mode === 'login'
                ? 'Log in to access your saved recipes and meal plans.'
                : 'Join us to save recipes and create meal plans.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="auth-drawer-form">
            {mode === 'register' && (
              <div className="drawer-form-group">
                <label htmlFor="displayName">Full Name</label>
                <input
                  type="text"
                  id="displayName"
                  name="displayName"
                  value={formData.displayName}
                  onChange={handleInputChange}
                  className={errors.displayName ? 'error' : ''}
                  placeholder="e.g. Jamie Oliver"
                />
                {errors.displayName && <span className="drawer-error">{errors.displayName}</span>}
              </div>
            )}

            <div className="drawer-form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={errors.email ? 'error' : ''}
                placeholder="e.g. jamie@example.com"
              />
              {errors.email && <span className="drawer-error">{errors.email}</span>}
            </div>

            <div className="drawer-form-group">
              <div className="password-label-row">
                <label htmlFor="password">Password</label>
                {mode === 'login' && (
                  <button type="button" className="forgot-password-link">Forgot password?</button>
                )}
              </div>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={errors.password ? 'error' : ''}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <i className={`far fa-eye${showPassword ? '-slash' : ''}`}></i>
                </button>
              </div>
              {errors.password && <span className="drawer-error">{errors.password}</span>}
            </div>

            {mode === 'register' && (
              <div className="drawer-form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <div className="password-input-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={errors.confirmPassword ? 'error' : ''}
                    placeholder="Confirm your password"
                  />
                </div>
                {errors.confirmPassword && <span className="drawer-error">{errors.confirmPassword}</span>}
              </div>
            )}

            {errors.submit && <div className="drawer-error submit-error">{errors.submit}</div>}

            <button type="submit" className="drawer-submit-btn" disabled={loading}>
              {loading ? (
                <span><i className="fas fa-spinner fa-spin"></i> Processing...</span>
              ) : (
                <>
                  {mode === 'login' ? 'Login to Account' : 'Create Account'}
                  <i className="fas fa-arrow-right"></i>
                </>
              )}
            </button>
          </form>

          <div className="drawer-divider">
            <span>OR CONTINUE WITH</span>
          </div>

          <div className="social-login-buttons">
            <button type="button" className="social-btn google">
              <i className="fab fa-google"></i> Google
            </button>
            <button type="button" className="social-btn apple">
              <i className="fab fa-apple"></i> Apple
            </button>
          </div>

          <div className="drawer-footer">
            <p>
              {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
              <button type="button" onClick={switchMode} className="drawer-switch-link">
                {mode === 'login' ? 'Sign up for free' : 'Log in'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;