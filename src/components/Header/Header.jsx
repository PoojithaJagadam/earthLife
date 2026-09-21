import React from 'react';
import { Link } from 'react-router-dom';
import { Search, User, ShoppingCart } from 'lucide-react';
import Container from '../UI/Container/Container';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <Container className="header-main">
        <div className="logo">
          <Link to="/">
            <img src="/src/assets/logo.png" alt="EarthLife Co. Logo" style={{ height: '50px' }} />
          </Link>
        </div>
        
        <nav className="nav-links hide-on-mobile">
          <Link to="/" className="active">Home</Link>
          <Link to="/store">Shop</Link>
          {/* <Link to="/store">Collections</Link> */}
          <Link to="/why-natural">Why Natural?</Link>
          <Link to="/about">About Us</Link>
          <Link to="/faqs">FAQs</Link>
          <Link to="/contact">Contact</Link>
        </nav>
        
        <div className="header-actions">
          <button className="icon-btn" aria-label="Search"><Search size={20} /></button>
          <button className="icon-btn" aria-label="Account"><User size={20} /></button>
          <button className="icon-btn cart-btn" aria-label="Cart">
            <ShoppingCart size={20} />
            <span className="cart-badge">0</span>
          </button>
        </div>
      </Container>
    </header>
  );
};

export default Header;
