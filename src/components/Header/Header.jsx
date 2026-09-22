import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Search, User, ShoppingCart } from 'lucide-react';
import Container from '../UI/Container/Container';
import logoImg from '../../assets/logo.png';
import { useCart } from '../../context/CartContext';
import './Header.css';

const Header = () => {
  const { cartCount } = useCart();

  return (
    <header className="header">
      <Container className="header-main">
        <div className="logo">
          <Link to="/">
            <img src={logoImg} alt="EarthLife Co. Logo" style={{ height: '50px' }} />
          </Link>
        </div>
        
        <nav className="nav-links hide-on-mobile">
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
            Home
          </NavLink>
          <NavLink to="/store" className={({ isActive }) => (isActive ? 'active' : '')}>
            Store
          </NavLink>
          <NavLink to="/why-natural" className={({ isActive }) => (isActive ? 'active' : '')}>
            Why Natural?
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => (isActive ? 'active' : '')}>
            About EarthLife Co.
          </NavLink>
          <NavLink to="/faqs" className={({ isActive }) => (isActive ? 'active' : '')}>
            FAQs
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => (isActive ? 'active' : '')}>
            Contact
          </NavLink>
        </nav>
        
        <div className="header-actions">
          <Link to="/store#!/~/search" className="icon-btn" aria-label="Search"><Search size={20} /></Link>
          <Link to="/account" className="icon-btn" aria-label="Account"><User size={20} /></Link>
          <Link to="/cart" className="icon-btn cart-btn" aria-label="Cart" id="header-cart-btn">
            <ShoppingCart size={20} />
            <span className="cart-badge">{cartCount}</span>
          </Link>
        </div>
      </Container>
    </header>
  );
};

export default Header;
