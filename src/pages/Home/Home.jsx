import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import { 
  Leaf, 
  Heart, 
  RotateCw, 
  ArrowRight, 
  Truck, 
  Users, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';
import Container from '../../components/UI/Container/Container';
import Button from '../../components/UI/Button/Button';
import SectionHeading from '../../components/UI/SectionHeading/SectionHeading';
import heroLeafImg from '../../assets/hero_leaf_transparent.png';
import heroProductsMobileImg from '../../assets/hero_products_mobile.png';
import { BESTSELLING_PRODUCTS, CATEGORIES } from '../../data/products';
import { useCart } from '../../context/CartContext';
import './Home.css';

const Home = () => {
  const shouldReduceMotion = useReducedMotion();
  const navigate = useNavigate();
  const { toggleWishlist, isWishlisted } = useCart();
  const [activeSlide, setActiveSlide] = useState(0);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const nextSlide = () => {
    setActiveSlide(prev => (prev + 1) % BESTSELLING_PRODUCTS.length);
  };

  const prevSlide = () => {
    setActiveSlide(prev => (prev - 1 + BESTSELLING_PRODUCTS.length) % BESTSELLING_PRODUCTS.length);
  };

  return (
    <div className="home-page">
      {/* Hero Section: Fitted background image with products seamlessly integrated */}
      <section className="hero" id="hero-section">
        {/* Subtle decorative leaf accent */}
        <img 
          src={heroLeafImg} 
          alt="" 
          aria-hidden="true" 
          className="hero-leaf-bg" 
        />

        <div className="hero-grid-container">
          {/* Left Column: Editorial Content */}
          <motion.div 
            className="hero-content"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <motion.p 
              className="hero-eyebrow"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
            >
              NATURAL EVERYDAY ESSENTIALS
            </motion.p>

            <motion.h1 
              className="hero-headline"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.12 }}
            >
              Where Natural<br />
              <span className="hero-headline-accent">Materials Meet</span><br />
              Everyday Elegance.
            </motion.h1>

            <motion.p 
              className="hero-desc"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Premium everyday essentials crafted from Neem wood, bamboo and coconut coir. 
              Thoughtfully designed for modern homes, beautifully packaged, and delivered across India.
            </motion.p>

            <motion.div 
              className="hero-cta-wrap"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.28 }}
            >
              <Link to="/store" className="hero-primary-cta" id="hero-cta-button">
                <span>Shop All Products</span>
                <ArrowRight size={18} className="cta-arrow" aria-hidden="true" />
              </Link>
            </motion.div>

            {/* Supporting Benefits Row */}
            <motion.div 
              className="hero-benefits"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.36 }}
            >
              <div className="hero-benefit-item">
                <div className="benefit-icon" aria-hidden="true">
                  <Leaf size={18} strokeWidth={2} />
                </div>
                <div className="benefit-text">
                  <strong>Natural Materials</strong>
                  <small>Better for you, better for the planet.</small>
                </div>
              </div>

              <div className="hero-benefit-item">
                <div className="benefit-icon" aria-hidden="true">
                  <Heart size={18} strokeWidth={2} />
                </div>
                <div className="benefit-text">
                  <strong>Thoughtful Design</strong>
                  <small>For everyday Indian homes.</small>
                </div>
              </div>

              <div className="hero-benefit-item">
                <div className="benefit-icon" aria-hidden="true">
                  <RotateCw size={18} strokeWidth={2} />
                </div>
                <div className="benefit-text">
                  <strong>Made in India</strong>
                  <small>Supporting local, reducing plastic.</small>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Natural Stage with floating handwritten script note */}
          <div className="hero-visual-stage">
            <div className="hero-product-frame">
              <img 
                src={heroProductsMobileImg} 
                alt="EarthLife Co. Handcrafted Neem, Bamboo and Coconut Essentials" 
                className="hero-products-responsive-img"
              />
              <motion.div 
                className="hero-handwritten-note"
                initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.85, rotate: -8 }}
                animate={{ opacity: 1, scale: 1, rotate: -5 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                aria-hidden="true"
              >
                <span className="note-line">Small</span>
                <span className="note-line">Choices</span>
                <span className="note-line highlight">Big Change</span>
                <span className="note-leaf">🍃</span>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Proof Strip directly below Hero */}
      <section className="proof-strip" aria-label="EarthLife Trust Proof">
        <Container className="proof-strip-inner">
          <div className="proof-item">
            <span className="proof-icon" aria-hidden="true"><Truck size={22} strokeWidth={1.8} /></span>
            <div className="proof-content">
              <span className="proof-stat">200+</span>
              <span className="proof-label">Orders Delivered</span>
            </div>
          </div>

          <div className="proof-divider" aria-hidden="true" />

          <div className="proof-item">
            <span className="meesho-tag" aria-hidden="true">m</span>
            <div className="proof-content">
              <div className="proof-meesho-header">
                <span className="proof-stat">4.6</span>
                <span className="proof-stars" aria-label="5 stars">★★★★★</span>
              </div>
              <span className="proof-label">Seller Rating on Meesho</span>
            </div>
          </div>

          <div className="proof-divider" aria-hidden="true" />

          <div className="proof-item">
            <span className="proof-icon" aria-hidden="true"><Users size={22} strokeWidth={1.8} /></span>
            <div className="proof-content">
              <span className="proof-stat">Loved by</span>
              <span className="proof-label">Happy Customers</span>
            </div>
          </div>

          <div className="proof-divider" aria-hidden="true" />

          <div className="proof-item">
            <span className="proof-icon proof-leaf" aria-hidden="true"><Leaf size={22} strokeWidth={1.8} /></span>
            <div className="proof-content">
              <span className="proof-stat">Sustainable</span>
              <span className="proof-label">For a Greener Tomorrow</span>
            </div>
          </div>
        </Container>
      </section>

      {/* Shop by Category: Horizontal cards matching uploaded UI design */}
      <section className="categories-section">
        <Container>
          <SectionHeading 
            title="Shop by Category" 
            subtitle="Explore our natural and sustainable collections" 
            align="center" 
          />
          <div className="category-grid">
            {CATEGORIES.map((cat) => (
              <div 
                key={cat.id} 
                className="category-card-horizontal" 
                style={{ backgroundColor: cat.bgColor }}
                onClick={() => navigate(cat.link)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    navigate(cat.link);
                  }
                }}
              >
                <div className="cat-img-wrap">
                  <img src={cat.image} alt={cat.title} className="cat-img-thumb" />
                </div>
                <div className="cat-content">
                  <h3 className="cat-title">{cat.title}</h3>
                  <p className="cat-subtitle">{cat.subtitle}</p>
                  <Link to={cat.link} className="cat-link" onClick={(e) => e.stopPropagation()}>
                    <span>Shop Now</span>
                    <span className="cat-arrow">→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Bestselling Products: ONLY products visible, clicking navigates to Product Details */}
      <section className="bestsellers-section" id="bestsellers-section">
        <Container>
          <div className="bestsellers-header-row">
            <div className="bestsellers-titles">
              <h2 className="bestsellers-main-title">Bestselling Products</h2>
              <p className="bestsellers-sub-title">Customer favourites, chosen for a cleaner and greener tomorrow.</p>
            </div>
            <Link to="/store" className="bestsellers-view-all">
              <span>View All</span>
              <span className="view-all-arrow">→</span>
            </Link>
          </div>

          {/* Products Grid / Slider */}
          <div className="bestsellers-carousel-wrapper">
            <button 
              className="carousel-nav-btn prev-btn" 
              onClick={prevSlide}
              aria-label="Previous products"
            >
              <ChevronLeft size={22} />
            </button>

            <div className="products-showcase-grid">
              {BESTSELLING_PRODUCTS.map((product) => {
                const wishlisted = isWishlisted(product.id);

                return (
                  <div 
                    key={product.id}
                    className="product-card"
                    onClick={() => handleProductClick(product.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleProductClick(product.id);
                    }}
                  >
                    {/* Top Badges and Wishlist */}
                    <div className="product-card-top">
                      {product.badge && (
                        <span className="product-bestseller-badge">
                          {product.badge}
                        </span>
                      )}
                      <button 
                        className={`product-wishlist-toggle ${wishlisted ? 'active' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWishlist(product.id);
                        }}
                        aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                      >
                        <Heart 
                          size={18} 
                          fill={wishlisted ? '#E63946' : 'none'} 
                          color={wishlisted ? '#E63946' : '#2C4A3B'} 
                        />
                      </button>
                    </div>

                    {/* Product Image */}
                    <div className="product-img-holder">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="product-card-img"
                        loading="lazy"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="product-info-wrapper">
                      <h3 className="product-card-name">{product.name}</h3>
                      <div className="product-card-price">₹{product.price}</div>

                      <button 
                        className="product-add-cart-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleProductClick(product.id);
                        }}
                        aria-label={`View ${product.name}`}
                      >
                        <span>View Product</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <button 
              className="carousel-nav-btn next-btn" 
              onClick={nextSlide}
              aria-label="Next products"
            >
              <ChevronRight size={22} />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="carousel-dots-row" aria-hidden="true">
            {BESTSELLING_PRODUCTS.map((_, idx) => (
              <button 
                key={idx}
                className={`carousel-dot ${activeSlide === idx ? 'active' : ''}`}
                onClick={() => setActiveSlide(idx)}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <Container>
          <div className="testimonials-header-bar">
            <div>
              <h2 className="testimonials-heading">What Our Customers Say</h2>
              <p className="testimonials-subheading">Real people. Real experiences. A cleaner and greener tomorrow.</p>
            </div>
            <Link to="/about" className="view-more-about-btn">
              View More in About →
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

      {/* Why Natural CTA Banner */}
      <section className="cta-section">
        <Container className="cta-container-split">
          <div className="cta-image">
            <img 
              src="https://images.unsplash.com/photo-1473663385731-50e50bb5bf69?auto=format&fit=crop&w=800&q=80" 
              alt="Planting in hands" 
              className="cta-img-hand" 
            />
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
