import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Heart, 
  ChevronLeft, 
  ChevronRight, 
  ChevronDown, 
  ChevronUp, 
  Plus, 
  Minus, 
  Maximize2, 
  ShoppingBag, 
  Check, 
  X,
  Leaf,
  Recycle,
  Sparkles
} from 'lucide-react';
import Container from '../../components/UI/Container/Container';
import { ALL_PRODUCTS, findProductById } from '../../data/products';
import { useCart } from '../../context/CartContext';
import './ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, isWishlisted } = useCart();

  // Find product by id, slug, or Ecwid ID
  const product = useMemo(() => {
    return findProductById(id);
  }, [id]);

  // Related products hook unconditionally at top level
  const relatedProducts = useMemo(() => {
    const currentId = product ? product.id : '';
    const others = ALL_PRODUCTS.filter((p) => p.id !== currentId);
    return others.slice(0, 4);
  }, [product]);

  // Reset state during render when id changes (React official pattern)
  const [prevId, setPrevId] = useState(id);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (prevId !== id) {
    setPrevId(id);
    setSelectedImageIndex(0);
    setQuantity(1);
  }

  const [openAccordions, setOpenAccordions] = useState({
    description: true,
    material: false,
    care: false,
    'beats-plastic': false,
    shipping: false
  });
  const [isZoomModalOpen, setIsZoomModalOpen] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return (
      <Container className="py-5 text-center">
        <h2>Product not found</h2>
        <Link to="/store" className="return-store-btn">
          Return to Store
        </Link>
      </Container>
    );
  }

  const gallery = product.gallery && product.gallery.length > 0 
    ? product.gallery 
    : [product.image];

  const currentImage = gallery[selectedImageIndex] || product.image;
  const wishlisted = isWishlisted(product.id);

  // Gallery Navigation Handlers
  const handlePrevImage = () => {
    setSelectedImageIndex((prev) => (prev === 0 ? gallery.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prev) => (prev === gallery.length - 1 ? 0 : prev + 1));
  };

  // Accordion Toggle
  const toggleAccordion = (accId) => {
    setOpenAccordions((prev) => ({
      ...prev,
      [accId]: !prev[accId]
    }));
  };

  // Cart & Buy Now Handlers
  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/checkout');
  };

  // Helper icon renderer for eco badges
  const renderBadgeIcon = (iconName) => {
    switch (iconName) {
      case 'leaf':
        return <Leaf size={18} className="badge-icon-svg" />;
      case 'recycle':
        return <Recycle size={18} className="badge-icon-svg" />;
      case 'sparkles':
        return <Sparkles size={18} className="badge-icon-svg" />;
      case 'heart':
      default:
        return <Heart size={18} className="badge-icon-svg" />;
    }
  };

  return (
    <div className="product-details-page">
      {/* Breadcrumb Bar */}
      <div className="pd-breadcrumb-bar">
        <Container>
          <nav className="pd-breadcrumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span className="pd-breadcrumb-sep">&gt;</span>
            <Link to="/store">Store</Link>
            <span className="pd-breadcrumb-sep">&gt;</span>
            <Link to={`/store?category=${product.categoryType}`}>{product.category}</Link>
            <span className="pd-breadcrumb-sep">&gt;</span>
            <span className="pd-breadcrumb-current">{product.name}</span>
          </nav>
        </Container>
      </div>

      {/* Main Showcase Section */}
      <Container className="pd-main-container">
        <div className="pd-layout-grid">
          {/* Left Column: Gallery with vertical thumbnails and main stage */}
          <div className="pd-gallery-column">
            {/* Left Vertical Thumbnail Strip */}
            <div className="pd-thumbnail-strip" role="tablist" aria-label="Product thumbnails">
              {gallery.map((imgUrl, idx) => (
                <button
                  key={idx}
                  type="button"
                  role="tab"
                  aria-selected={selectedImageIndex === idx}
                  className={`pd-thumb-btn ${selectedImageIndex === idx ? 'active' : ''}`}
                  onClick={() => setSelectedImageIndex(idx)}
                  aria-label={`View photo ${idx + 1}`}
                >
                  <img src={imgUrl} alt={`${product.name} thumbnail ${idx + 1}`} />
                </button>
              ))}
            </div>

            {/* Main Stage */}
            <div className="pd-main-stage">
              {/* Stage Wishlist Button (Top Right) */}
              <button
                type="button"
                className={`pd-stage-wishlist-btn ${wishlisted ? 'active' : ''}`}
                onClick={() => toggleWishlist(product.id)}
                aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                <Heart
                  size={20}
                  fill={wishlisted ? '#E63946' : 'none'}
                  color={wishlisted ? '#E63946' : '#2C4A3B'}
                />
              </button>

              <img
                src={currentImage}
                alt={product.name}
                className="pd-stage-image"
              />

              {/* Prev / Next Carousel Arrows */}
              {gallery.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={handlePrevImage}
                    className="pd-stage-arrow left"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    type="button"
                    onClick={handleNextImage}
                    className="pd-stage-arrow right"
                    aria-label="Next image"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}

              {/* Expand / Fullscreen Button */}
              <button
                type="button"
                onClick={() => setIsZoomModalOpen(true)}
                className="pd-stage-expand-btn"
                aria-label="Expand image"
              >
                <Maximize2 size={16} />
              </button>
            </div>
          </div>

          {/* Right Column: Product Info & Purchase Controls */}
          <div className="pd-info-column">
            {/* Category Pill */}
            <div className="pd-category-pill">{product.category}</div>

            {/* Title & Tagline */}
            <h1 className="pd-title">{product.shortName || product.name}</h1>
            <p className="pd-tagline">{product.tagline}</p>

            {/* Price & Taxes */}
            <div className="pd-price-row">
              <span className="pd-price">₹{product.price}</span>
            </div>
            <div className="pd-tax-note">Inclusive of all taxes</div>

            {/* Short Description */}
            <p className="pd-short-desc">{product.shortDesc}</p>

            {/* 4 Feature Badges (Grid matching reference) */}
            <div className="pd-badges-grid">
              {product.ecoBadges?.map((badge, idx) => (
                <div key={idx} className="pd-badge-card">
                  <div className="pd-badge-icon">{renderBadgeIcon(badge.icon)}</div>
                  <div className="pd-badge-text">
                    <strong className="pd-badge-title">{badge.title}</strong>
                  </div>
                </div>
              ))}
            </div>

            {/* Quantity Stepper & Actions */}
            <div className="pd-purchase-actions">
              <div className="pd-quantity-row">
                <div className="pd-quantity-stepper">
                  <button
                    type="button"
                    onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                    aria-label="Decrease quantity"
                    className="pd-qty-btn"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="pd-qty-val">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity((prev) => prev + 1)}
                    aria-label="Increase quantity"
                    className="pd-qty-btn"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                <button
                  type="button"
                  className={`pd-add-cart-btn ${addedAnimation ? 'added' : ''}`}
                  onClick={handleAddToCart}
                  id="pd-add-cart-button"
                >
                  {addedAnimation ? (
                    <>
                      <Check size={18} />
                      <span>Added to Cart!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={18} />
                      <span>Add to Cart</span>
                    </>
                  )}
                </button>
              </div>

              {/* Buy Now Button */}
              <button
                type="button"
                className="pd-buy-now-btn"
                onClick={handleBuyNow}
                id="pd-buy-now-button"
              >
                Buy Now
              </button>
            </div>

            {/* Real Ecwid Product Description & Specifications */}
            <div className="pd-ecwid-details-card">
              <h3 className="pd-section-heading">About This Product</h3>
              <ul className="pd-description-list">
                {product.descriptionPoints?.map((point, idx) => (
                  <li key={idx} className="pd-description-point">
                    <span className="pd-bullet">🍃</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              <div className="pd-specs-grid">
                <div className="pd-spec-item">
                  <span className="pd-spec-label">SKU:</span>
                  <span className="pd-spec-val">{product.sku}</span>
                </div>
                {product.weight && (
                  <div className="pd-spec-item">
                    <span className="pd-spec-label">Weight:</span>
                    <span className="pd-spec-val">{product.weight}</span>
                  </div>
                )}
                <div className="pd-spec-item">
                  <span className="pd-spec-label">Availability:</span>
                  <span className="pd-spec-val in-stock">
                    {product.inStock ? `In Stock (${product.stockCount || 50} items)` : 'Out of Stock'}
                  </span>
                </div>
                <div className="pd-spec-item">
                  <span className="pd-spec-label">Category:</span>
                  <span className="pd-spec-val">{product.category}</span>
                </div>
              </div>

              <div className="pd-shipping-note">
                <span>🚚 Free Delivery on orders above ₹299 • 100% Secure Payments • Dispatched in 24–48h</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: You May Also Like */}
        <section className="pd-related-section" aria-label="Related Products">
          <div className="pd-related-header">
            <h2 className="pd-related-title">You May Also Like</h2>
            <p className="pd-related-subtitle">More natural essentials for a greener everyday life.</p>
          </div>

          <div className="pd-related-grid">
            {relatedProducts.map((relProduct) => {
              const relWishlisted = isWishlisted(relProduct.id);
              return (
                <div
                  key={relProduct.id}
                  className="pd-related-card"
                  onClick={() => navigate(`/product/${relProduct.id}`)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      navigate(`/product/${relProduct.id}`);
                    }
                  }}
                >
                  <div className="related-card-top">
                    <button
                      type="button"
                      className="related-wishlist-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(relProduct.id);
                      }}
                      aria-label="Toggle wishlist"
                    >
                      <Heart
                        size={17}
                        fill={relWishlisted ? '#E63946' : 'none'}
                        color={relWishlisted ? '#E63946' : '#718077'}
                      />
                    </button>
                  </div>

                  <div className="related-img-box">
                    <img
                      src={relProduct.image}
                      alt={relProduct.name}
                      className="related-product-img"
                      loading="lazy"
                    />
                  </div>

                  <div className="related-card-body">
                    <h3 className="related-name">{relProduct.name}</h3>
                    <div className="related-price">₹{relProduct.price}</div>
                  </div>

                  <button
                    type="button"
                    className="related-view-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/product/${relProduct.id}`);
                    }}
                  >
                    View Product
                  </button>
                </div>
              );
            })}
          </div>
        </section>
      </Container>

      {/* Image Zoom Modal */}
      {isZoomModalOpen && (
        <div 
          className="pd-zoom-modal-overlay" 
          onClick={() => setIsZoomModalOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div className="pd-zoom-modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="pd-zoom-close-btn"
              onClick={() => setIsZoomModalOpen(false)}
              aria-label="Close zoomed image"
            >
              <X size={24} />
            </button>
            <img src={currentImage} alt={product.name} className="pd-zoomed-img" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
