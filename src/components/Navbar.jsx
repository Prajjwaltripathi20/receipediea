import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaSearch, FaHeart, FaUtensils, FaBars, FaTimes, FaHome, FaList, FaInfoCircle, FaEnvelope, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  // Public links available to all users
  const publicLinks = [
    { path: '/', label: 'Home', icon: <FaHome /> },
    { path: '/search', label: 'Search', icon: <FaSearch /> },
    { path: '/categories', label: 'Categories', icon: <FaList /> },
    { path: '/about', label: 'About', icon: <FaInfoCircle /> },
    { path: '/contact', label: 'Contact', icon: <FaEnvelope /> }
  ];
  
  // Links that require authentication
  const authLinks = [
    { path: '/favorites', label: 'Favorites', icon: <FaHeart /> }
  ];
  
  // Authentication links (login/register or profile/logout)
  const authenticationLinks = currentUser
    ? [
        { path: '/profile', label: currentUser.displayName || 'Profile', icon: <FaUser />, onClick: () => navigate('/profile') },
        { path: '#', label: 'Logout', icon: <FaSignOutAlt />, onClick: handleLogout }
      ]
    : [
        { path: '/login', label: 'Login', icon: <FaUser /> },
        { path: '/register', label: 'Register', icon: <FaUser /> }
      ];
  
  // Combine all links
  const navLinks = [...publicLinks, ...(currentUser ? authLinks : []), ...authenticationLinks];

  return (
    <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <FaUtensils className="logo-icon" />
          <span className="logo-text">Recipedia</span>
        </Link>

        <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          {navLinks.map((link) => (
            link.onClick ? (
              <div
                key={link.path}
                className={`nav-item ${location.pathname === link.path ? 'active' : ''}`}
                onClick={() => {
                  link.onClick();
                  setIsMenuOpen(false);
                }}
              >
                <span className="nav-icon">{link.icon}</span>
                <span className="nav-text">{link.label}</span>
              </div>
            ) : (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-item ${location.pathname === link.path ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="nav-icon">{link.icon}</span>
                <span className="nav-text">{link.label}</span>
              </Link>
            )
          ))}
        </div>

        <div className="mobile-menu-icon" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;