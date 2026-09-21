import React from 'react';
import { Link } from 'react-router-dom';
import Container from '../UI/Container/Container';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <Container className="footer-grid">
        <div className="footer-col-brand">
          <div className="footer-logo">
            <h2>EarthLife co.</h2>
            <p>Eco-Friendly | Sustainable Living</p>
            <p className="live-naturally">Live Naturally 🍃</p>
          </div>
          <div className="social-icons">
            <a href="#" aria-label="Instagram">📷</a>
            <a href="#" aria-label="Facebook">f</a>
            <a href="#" aria-label="YouTube">▶</a>
            <a href="#" aria-label="Pinterest">P</a>
          </div>
        </div>
        
        <div className="footer-col">
          <h3>Shop</h3>
          <Link to="/store">All Products</Link>
          <Link to="/store#!/~/category/id=206710677">Neem Products</Link>
          <Link to="/store#!/~/category/id=206706898">Bamboo Products</Link>
          <Link to="/store#!/~/category/id=206708145">Coconut Coir Products</Link>
          <Link to="/store">Gift Sets</Link>
        </div>
        
        <div className="footer-col">
          <h3>Customer Care</h3>
          <Link to="/store#!/~/account">My Account</Link>
          <Link to="/store#!/~/account/orders">Track Order</Link>
          <Link to="/cancellation-request">Returns & Refunds</Link>
          <Link to="/faqs">Shipping Information</Link>
          <Link to="/faqs">FAQs</Link>
          <Link to="/contact">Contact Us</Link>
        </div>
        
        <div className="footer-col">
          <h3>Our Story</h3>
          <Link to="/about">About EarthLife Co.</Link>
          <Link to="/why-natural">Why Natural?</Link>
          <Link to="/store#!/~/search">Reviews</Link>
          <Link to="/">Blog</Link>
        </div>

        <div className="footer-col footer-col-subscribe">
          <h3>Subscribe to our newsletter</h3>
          <p>Get updates on new products, offers and sustainable living tips.</p>
          <form className="newsletter-form">
            <input type="email" placeholder="Enter your email address" required />
            <button type="submit" className="btn btn-secondary">Subscribe</button>
          </form>
          
          <div className="need-help-section mt-3">
            <h3>Need Help?</h3>
            <div className="help-item">
              <span className="icon">✉️</span> support@earthlifeco.com
            </div>
            <div className="help-item">
              <span className="icon">🚚</span> Made in India — Shipping Across India
            </div>
            <div className="help-item">
              <span className="icon">📦</span> Easy Returns within 7 Days
            </div>
          </div>
        </div>
      </Container>
      
      <div className="footer-bottom">
        <Container className="bottom-flex">
          <p>© 2026 EarthLife Co. All rights reserved.</p>
          <div className="footer-legal">
            <Link to="/contact">Privacy Policy</Link>
            <span className="divider">|</span>
            <Link to="/contact">Terms & Conditions</Link>
            <span className="divider">|</span>
            <Link to="/contact">Shipping Policy</Link>
            <span className="divider">|</span>
            <Link to="/contact">Contact Us</Link>
          </div>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
