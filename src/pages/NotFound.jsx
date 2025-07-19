import React from 'react';
import { Link } from 'react-router-dom';
import { FaExclamationTriangle, FaHome } from 'react-icons/fa';
import '../styles/NotFound.css';

const NotFound = () => (
  <div className="notfound-container">
    <div className="notfound-icon">
      <FaExclamationTriangle size={64} color="#007f4e" />
    </div>
    <h1 className="notfound-title">404 - Page Not Found</h1>
    <p className="notfound-message">Sorry, the page you are looking for does not exist.</p>
    <Link to="/" className="notfound-home-btn">
      <FaHome style={{ marginRight: 8 }} /> Go Home
    </Link>
  </div>
);

export default NotFound; 