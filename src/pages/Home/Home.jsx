import React from 'react';
import { Link } from 'react-router-dom';
import TrustBar from '../../components/TrustBar/TrustBar';
import Container from '../../components/UI/Container/Container';
import Button from '../../components/UI/Button/Button';
import SectionHeading from '../../components/UI/SectionHeading/SectionHeading';
import EcwidStore from '../../ecwid/storefront/EcwidStore';
import heroImg from '../../assets/hero_bg.png';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero" style={{ backgroundImage: `url(${heroImg})` }}>
        <Container className="hero-content">
          <p className="hero-subtitle">NATURAL EVERYDAY ESSENTIALS</p>
          <h1>Where Natural<br />Materials Meet<br />Everyday Elegance.</h1>
          <p className="hero-desc">
            Premium everyday essentials crafted from Neem wood, bamboo and coconut coir. 
            Thoughtfully designed for modern homes, beautifully packaged, and delivered across India.
          </p>
          <Link to="/store" style={{ display: 'inline-block' }}>
            <Button variant="primary" className="hero-btn">Shop All Products →</Button>
          </Link>
          
          <div className="hero-badges">
            <div className="badge"><span className="icon">🍃</span> <span>Natural Materials<br/><small>Better for you, better for the planet.</small></span></div>
            <div className="badge"><span className="icon">🤍</span> <span>Thoughtful Design<br/><small>For everyday Indian homes.</small></span></div>
            <div className="badge"><span className="icon">♻️</span> <span>Made in India<br/><small>Supporting local, reducing plastic.</small></span></div>
          </div>
        </Container>
      </section>

      {/* Trust Bar is now in App.jsx */}

      {/* Categories */}
      <section className="categories-section">
        <Container>
          <SectionHeading 
            title="Shop by Category" 
            subtitle="Explore our natural and sustainable collections" 
            align="center" 
          />
          <div className="category-grid">
            <div className="category-card" style={{backgroundColor: '#F5E6D3'}}>
              <img src="https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=400&q=80" alt="Neem Products" className="cat-img" />
              <div className="cat-content">
                <h3>Neem Products</h3>
                <p>Combs, toothbrushes and more</p>
                <Link to="/store#!/~/category/id=206710677" className="cat-link">Shop Now →</Link>
              </div>
            </div>
            <div className="category-card" style={{backgroundColor: '#E6EFE6'}}>
              <img src="https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&w=400&q=80" alt="Bamboo Products" className="cat-img" />
              <div className="cat-content">
                <h3>Bamboo Products</h3>
                <p>Toothbrushes, facial tissues and more</p>
                <Link to="/store#!/~/category/id=206706898" className="cat-link">Shop Now →</Link>
              </div>
            </div>
            <div className="category-card" style={{backgroundColor: '#F5ECE4'}}>
              <img src="https://images.unsplash.com/photo-1618142894380-49272314d334?auto=format&fit=crop&w=400&q=80" alt="Coconut Coir Products" className="cat-img" />
              <div className="cat-content">
                <h3>Coconut Coir Products</h3>
                <p>Scrub pads and more</p>
                <Link to="/store#!/~/category/id=206708145" className="cat-link">Shop Now →</Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Bestsellers via Ecwid */}
      <section className="bestsellers-section">
        <Container>
          <SectionHeading 
            title="Bestselling Products" 
            subtitle="Customer favourites, chosen for a cleaner and greener tomorrow." 
            align="center" 
          />
          <div className="ecwid-wrapper">
            <EcwidStore />
          </div>
        </Container>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <Container>
          <div className="flex-between mb-3">
            <div>
              <h2>What Our Customers Say</h2>
              <p>Real people. Real experiences. A cleaner and greener tomorrow.</p>
            </div>
            <Link to="/about">
              <Button variant="secondary">View More in About →</Button>
            </Link>
          </div>
          <div className="testimonial-grid">
            <div className="testimonial-card">
              <div className="test-header">
                <div className="avatar">M</div>
                <div>
                  <h4>Monika N.</h4>
                  <div className="stars">★★★★★</div>
                </div>
              </div>
              <p>"Nice product, very good quality and eco-friendly. Highly recommended!"</p>
            </div>
            <div className="testimonial-card">
              <div className="test-header">
                <div className="avatar">U</div>
                <div>
                  <h4>Uma M.</h4>
                  <div className="stars">★★★★★</div>
                </div>
              </div>
              <p>"Good product. Using it daily and really happy with the quality."</p>
            </div>
            <div className="testimonial-card">
              <div className="test-header">
                <div className="avatar">P</div>
                <div>
                  <h4>Priya S.</h4>
                  <div className="stars">★★★★★</div>
                </div>
              </div>
              <p>"Great quality and feels premium. Happy to support such sustainable products!"</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Why Natural CTA */}
      <section className="cta-section">
        <Container className="cta-container-split">
          <div className="cta-image">
            <img src="https://images.unsplash.com/photo-1473663385731-50e50bb5bf69?auto=format&fit=crop&w=800&q=80" alt="Planting in hands" className="cta-img-hand" />
            <div className="cta-image-text">
              Good<br/>For You.<br/>Good for<br/>the Planet.
            </div>
          </div>
          <div className="cta-content-wrapper">
            <div className="cta-content">
              <p className="hero-subtitle">WHY NATURAL?</p>
              <h2>Small Choices. A Bigger Tomorrow.</h2>
              <p>Natural materials like Neem, Bamboo and Coconut have always been better for our homes and our planet. Discover why they matter.</p>
              <Link to="/why-natural" className="mt-2" style={{ display: 'inline-block' }}>
                <Button variant="primary">Learn More →</Button>
              </Link>
            </div>
            <div className="cta-features-row mt-3">
              <div className="cta-feat"><span className="icon">🍃</span> <span>Less Plastic<br/>Waste</span></div>
              <div className="cta-feat"><span className="icon">🤍</span> <span>Safer for<br/>Your Family</span></div>
              <div className="cta-feat"><span className="icon">🌐</span> <span>A Healthier<br/>Planet</span></div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default Home;
