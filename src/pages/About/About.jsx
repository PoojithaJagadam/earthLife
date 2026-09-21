import React from 'react';
import { Link } from 'react-router-dom';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container about-hero-content">
          <div>
            <p className="about-hero-subtitle">ABOUT EARTHLIFE CO.</p>
            <h1>Everyday Essentials.<br />A Kinder Tomorrow.</h1>
            <p>We're a homegrown brand creating simple, natural alternatives for modern Indian homes — good for you, good for the planet.</p>
          </div>
          <div className="image-stack">
            {/* Placeholder for Kanpur image */}
            <div className="img-kanpur" style={{ 
              height: '300px', 
              background: '#D4A373', 
              backgroundImage: 'url(https://images.unsplash.com/photo-1588626601614-c188b39d1b09?auto=format&fit=crop&w=800&q=80)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}></div>
            <div className="kanpur-label">It started in Kanpur ♡</div>
          </div>
        </div>
      </section>

      {/* Purpose Section */}
      <section className="purpose-section container">
        <p className="about-hero-subtitle" style={{color: 'var(--color-primary)'}}>OUR STORY</p>
        <h2>A Simple Question. A Greater Purpose.</h2>
        <p>
          EarthLife Co. was born in Kanpur from a simple question — why are Indian families still using plastic toothbrushes, synthetic combs, and chemical-laden tissues when Bamboo, Neem, and Coconut have always been better?
        </p>
        <p>
          That question led us to create EarthLife Co. — a brand that brings together nature, simplicity, and everyday elegance. We design thoughtful, natural essentials for modern homes, at prices that fit everyday lives.
        </p>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="container team-container">
          <div className="team-content">
            <p className="about-hero-subtitle">OUR FAMILY</p>
            <h2>A Small Team,<br />A Big Thank You.</h2>
            <p>
              We're a small team of nature-lovers, working every day to bring better, more sustainable choices to your home. Every order is packed with care, and every message is answered personally — because you're not just a customer, you're part of our journey.
            </p>
          </div>
          <div className="team-image-container">
            {/* Placeholder for team image */}
            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80" alt="EarthLife Team" />
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section container">
        <div className="text-center">
          <p className="about-hero-subtitle">OUR PROMISE</p>
          <h2>Values That Guide Us.</h2>
        </div>
        <div className="values-grid">
          <div className="value-card">
            <div className="value-icon">🍃</div>
            <h4>Natural Materials</h4>
            <p>Thoughtfully chosen from nature.</p>
          </div>
          <div className="value-card">
            <div className="value-icon">🇮🇳</div>
            <h4>Proudly Made in India</h4>
            <p>Supporting local communities.</p>
          </div>
          <div className="value-card">
            <div className="value-icon">🤍</div>
            <h4>Designed with Less Plastic</h4>
            <p>Cleaner choices for a healthier planet.</p>
          </div>
          <div className="value-card">
            <div className="value-icon">🏡</div>
            <h4>Made for Everyday Homes</h4>
            <p>Simple, useful and built for real life.</p>
          </div>
          <div className="value-card">
            <div className="value-icon">₹</div>
            <h4>Premium Feel & Honest Pricing</h4>
            <p>High-quality essentials at fair prices.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta">
        <div className="container">
          <div className="about-cta-content">
            <div>
              <p className="about-hero-subtitle">READY FOR A GREENER TOMORROW?</p>
              <h2>Choose natural. Support a healthier planet.</h2>
            </div>
            <Link to="/store" className="btn btn-primary">Shop Now →</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
