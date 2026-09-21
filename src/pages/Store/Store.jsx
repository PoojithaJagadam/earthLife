import React from 'react';
import EcwidStore from '../../ecwid/storefront/EcwidStore';
import heroImg from '../../assets/hero_bg.png';
import './Store.css';

const Store = () => {
  return (
    <div className="store-page" style={{ backgroundColor: 'var(--color-bg)', paddingBottom: '4rem' }}>
      <div className="store-hero-section">
        <div className="container store-hero-grid">
          <div className="store-hero-content">
            <div className="breadcrumbs">Home &gt; Store</div>
            <h1>Shop Natural<br/>Everyday Essentials</h1>
            <p className="subtitle">
              Thoughtfully crafted from Neem wood, Bamboo and Coconut Coir.<br />
              Natural choices for modern homes, made with care in India.
            </p>
            <div className="hero-badges">
              <div className="badge"><span className="icon">🍃</span> <span>Natural Materials<br/><small>Better for you, better for the planet.</small></span></div>
              <div className="badge"><span className="icon">🤍</span> <span>Everyday Essentials<br/><small>For happier, healthier homes.</small></span></div>
              <div className="badge"><span className="icon">♻️</span> <span>Made in India<br/><small>Supporting local, reducing plastic.</small></span></div>
            </div>
          </div>
          <div className="store-hero-image">
            <img src={heroImg} alt="EarthLife Products" />
          </div>
        </div>
      </div>
      <div className="container ecwid-custom-container">
        <EcwidStore />
      </div>
    </div>
  );
};

export default Store;
