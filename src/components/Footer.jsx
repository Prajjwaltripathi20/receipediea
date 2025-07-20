import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Recipedia</h3>
          <p>Your go-to destination for discovering delicious recipes</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/categories">Categories</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Connect With Us</h4>
          <div className="social-links">
            <button className="social-link" aria-label="Facebook" onClick={() => window.open('https://facebook.com', '_blank')}><FaFacebookF /></button>
            <button className="social-link" aria-label="Twitter" onClick={() => window.open('https://twitter.com', '_blank')}><FaTwitter /></button>
            <button className="social-link" aria-label="Instagram" onClick={() => window.open('https://instagram.com', '_blank')}><FaInstagram /></button>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Recipedia. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer; 