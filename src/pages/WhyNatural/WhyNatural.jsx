import React from 'react';
import { Link } from 'react-router-dom';
import './WhyNatural.css';

const WhyNatural = () => {
  return (
    <div className="why-natural-page">
      {/* Hero Section */}
      <section className="why-hero">
        <div className="container why-hero-content">
          <div>
            <h1>Why Natural?</h1>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 500, marginBottom: '1rem' }}>
              Everyday choices for a cleaner, happier tomorrow.
            </h2>
            <p>
              At EarthLife Co., we believe natural essentials shouldn't feel exclusive. We create thoughtfully designed everyday products using natural materials, timeless design and a premium experience — at prices that fit everyday homes.
            </p>
            <Link to="/store" className="btn btn-primary" style={{ marginTop: '1rem' }}>Shop Natural Products →</Link>
          </div>
          <div>
            <img src="https://images.unsplash.com/photo-1610486706915-d72b2609ebfc?auto=format&fit=crop&w=800&q=80" alt="Natural Toothbrushes" className="why-hero-img" />
          </div>
        </div>
      </section>

      {/* Materials Section */}
      <section className="materials-section container">
        <p className="about-hero-subtitle" style={{color: 'var(--color-primary)'}}>NATURAL MATERIALS, THOUGHTFULLY CHOSEN</p>
        <h2>Good Materials Make a Difference.</h2>
        <p>We use simple, natural materials to create products for your everyday life.</p>
        
        <div className="materials-grid">
          <div className="material-card">
            <div className="material-img" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1590159763121-7c9faacf3a7e?auto=format&fit=crop&w=600&q=80)' }}></div>
            <div className="material-content">
              <h3>Neem Wood</h3>
              <p>Neem wood is a traditional, natural material we use to create everyday essentials like combs that are simple, durable and better for your daily routine.</p>
            </div>
          </div>
          <div className="material-card">
            <div className="material-img" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1577717903517-56ebbb0299f1?auto=format&fit=crop&w=600&q=80)' }}></div>
            <div className="material-content">
              <h3>Bamboo</h3>
              <p>Bamboo is a fast-growing, versatile plant that's widely used for everyday products. Our bamboo essentials, like toothbrushes, bring you a simple, natural alternative for modern living.</p>
            </div>
          </div>
          <div className="material-card">
            <div className="material-img" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1620916297397-a4a5402a3c6c?auto=format&fit=crop&w=600&q=80)' }}></div>
            <div className="material-content">
              <h3>Coconut Coir</h3>
              <p>Coconut coir is a natural fibre derived from coconut husks. We use it to create scrub pads that are tough on everyday cleaning needs, yet a more natural choice for your home.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Small Choices Section */}
      <section className="small-choices-section">
        <div className="container small-choices-container">
          <div>
            <img src="https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=800&q=80" alt="Planting in soil" className="small-choices-img" />
          </div>
          <div>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Small Choices. A Bigger Tomorrow.</h2>
            <p style={{ fontSize: '1.1rem', marginBottom: '2rem', lineHeight: 1.6 }}>
              Choosing natural, sustainable products is a simple way to make everyday living a little more natural — for cleaner homes, happier families and a brighter tomorrow.
            </p>
            <Link to="/store" className="btn btn-primary">Explore Our Store →</Link>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="mission-vision-section container">
        <div className="mv-grid">
          <div className="mv-card">
            <div className="mv-icon">🍃</div>
            <div className="mv-content">
              <p className="about-hero-subtitle">OUR MISSION</p>
              <h3>Making Natural Living More Accessible</h3>
              <p>
                Our mission is to make thoughtfully designed everyday products more accessible, combining carefully selected natural materials, timeless design, and a premium experience at prices that fit everyday homes.
              </p>
            </div>
          </div>
          <div className="mv-card">
            <div className="mv-icon">🍃</div>
            <div className="mv-content">
              <p className="about-hero-subtitle">OUR VISION</p>
              <h3>A Natural Choice for Every Home</h3>
              <p>
                Our vision is for thoughtfully made everyday essentials to become a natural choice for every home, combining quality, timeless design and carefully selected natural materials.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhyNatural;
