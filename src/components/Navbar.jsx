import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaSearch, FaHeart, FaUtensils, FaBars, FaTimes, FaHome, FaList, FaInfoCircle, FaEnvelope, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from './AuthModal';
import '../styles/Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, loading, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    try {
      await signOut();
      setProfileDropdown(false);
      navigate('/');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  const publicLinks = [
    { path: '/', label: 'Home', icon: <FaHome /> },
    { path: '/search', label: 'Search', icon: <FaSearch /> },
    { path: '/categories', label: 'Categories', icon: <FaList /> },
    { path: '/about', label: 'About', icon: <FaInfoCircle /> },
    { path: '/contact', label: 'Contact', icon: <FaEnvelope /> }
  ];
  const authLinks = [
    { path: '/favorites', label: 'Saved', icon: <FaHeart /> }
  ];

  return (
    <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <FaUtensils className="logo-icon" />
          <span className="logo-text">Recipedia</span>
        </Link>
        <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          {[...publicLinks, ...(currentUser ? authLinks : [])].map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-item ${location.pathname === link.path ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="nav-icon">{link.icon}</span>
              <span className="nav-text">{link.label}</span>
            </Link>
          ))}
          {!currentUser && (
            <button className="nav-auth-btn" onClick={() => setShowAuthModal(true)}>
              <FaUser style={{ marginRight: 6 }} /> Sign In
            </button>
          )}
          {currentUser && (
            <div className="nav-profile-wrapper">
              <button className="nav-profile-btn" onClick={() => setProfileDropdown((d) => !d)}>
                <span className="nav-profile-avatar">
                  {currentUser.displayName ? currentUser.displayName[0].toUpperCase() : <FaUser />}
                </span>
                <span className="nav-profile-name">{currentUser.displayName || 'Profile'}</span>
              </button>
              {profileDropdown && (
                <div className="nav-profile-dropdown">
                  <button className="nav-profile-dropdown-item" onClick={handleLogout}>
                    <FaSignOutAlt style={{ marginRight: 8 }} /> Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="mobile-menu-icon" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} initialMode="login" />
    </nav>
  );
};

export default Navbar;