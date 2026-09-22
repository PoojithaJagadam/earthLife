import React, { useState, useMemo } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Search, Heart, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import Container from '../../components/UI/Container/Container';
import { CATEGORY_TABS } from '../../data/products';
import { useEcwidProducts } from '../../hooks/useEcwidProducts';
import LoadingState from '../../components/LoadingState/LoadingState';
import ErrorState from '../../components/ErrorState/ErrorState';
import { useCart } from '../../context/CartContext';
import heroProductsImg from '../../assets/hero_products_mobile.png';
import './Store.css';

const Store = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { toggleWishlist, isWishlisted } = useCart();
  const { products, loading, error, refetch } = useEcwidProducts();

  // Category filter from URL params (e.g. ?category=neem) or default 'all'
  const activeCategory = searchParams.get('category') || 'all';
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Handle Tab Selection
  const handleTabChange = (tabId) => {
    setCurrentPage(1);
    if (tabId === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ category: tabId });
    }
  };

  // Filter live Ecwid products based on active category & search query
  const filteredProducts = useMemo(() => {
    if (!products || !Array.isArray(products)) return [];
    return products.filter((product) => {
      // Category match
      const currentTab = CATEGORY_TABS.find((t) => t.id === activeCategory);
      const targetCategoryId = currentTab?.categoryId;

      const matchesCategory =
        activeCategory === 'all' ||
        product.categoryType === activeCategory ||
        product.categoryId === activeCategory ||
        String(product.categoryId) === String(activeCategory) ||
        (Array.isArray(product.categoryIds) && product.categoryIds.includes(Number(activeCategory))) ||
        (targetCategoryId && Array.isArray(product.categoryIds) && product.categoryIds.includes(Number(targetCategoryId)));

      // Search match
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        (product.name && product.name.toLowerCase().includes(query)) ||
        (product.categoryTag && product.categoryTag.toLowerCase().includes(query)) ||
        (product.categoryName && product.categoryName.toLowerCase().includes(query)) ||
        (product.sku && product.sku.toLowerCase().includes(query)) ||
        (product.description && product.description.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [products, activeCategory, searchQuery]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  const paginatedProducts = useMemo(() => {
    const startIdx = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(startIdx, startIdx + itemsPerPage);
  }, [filteredProducts, currentPage, itemsPerPage]);

  const activeTabLabel = useMemo(() => {
    const tab = CATEGORY_TABS.find((t) => t.id === activeCategory);
    return tab ? tab.label : 'All Products';
  }, [activeCategory]);

  return (
    <div className="store-page">
      {/* Top Store Hero Banner */}
      <section className="store-hero-banner" aria-label="Store Introduction">
        <Container>
          <div className="store-hero-grid">
            {/* Left Content */}
            <div className="store-hero-left">
              <nav className="store-breadcrumbs" aria-label="Breadcrumb">
                <Link to="/">Home</Link>
                <span className="breadcrumb-separator">&gt;</span>
                <span className="breadcrumb-current">
                  {activeCategory === 'all' ? 'Store' : activeTabLabel}
                </span>
              </nav>

              <h1 className="store-hero-title">
                Shop Natural
                <br />
                Everyday Essentials
              </h1>

              <p className="store-hero-subtitle">
                Thoughtfully crafted from Neem wood, Bamboo and Coconut Coir.
                <br />
                Natural choices for modern homes, made with care in India.
              </p>

              {/* 3 Value Pillars */}
              <div className="store-value-pillars">
                <div className="pillar-item">
                  <span className="pillar-icon" aria-hidden="true">🍃</span>
                  <div className="pillar-text">
                    <strong>Natural Materials</strong>
                    <small>Better for you, better for the planet.</small>
                  </div>
                </div>

                <div className="pillar-item">
                  <span className="pillar-icon" aria-hidden="true">🤍</span>
                  <div className="pillar-text">
                    <strong>Everyday Essentials</strong>
                    <small>For happier, healthier homes.</small>
                  </div>
                </div>

                <div className="pillar-item">
                  <span className="pillar-icon" aria-hidden="true">♻️</span>
                  <div className="pillar-text">
                    <strong>Made in India</strong>
                    <small>Supporting local, reducing plastic.</small>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Visual Stage */}
            <div className="store-hero-right">
              <div className="store-visual-stage">
                <img
                  src={heroProductsImg}
                  alt="Handcrafted natural neem, bamboo, and coconut essentials"
                  className="store-hero-img"
                />
                <div className="store-handwritten-badge" aria-hidden="true">
                  <span>Small</span>
                  <span>Choices</span>
                  <span className="badge-highlight">Big Change</span>
                  <span className="badge-leaf">🍃</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Main Catalog Section */}
      <section className="store-catalog-section" aria-label="Products Catalog">
        <Container>
          {/* Controls Bar: Category Tabs & Search Box */}
          <div className="store-controls-bar">
            {/* Category Filter Tabs */}
            <div className="store-category-tabs" role="tablist" aria-label="Filter by category">
              {CATEGORY_TABS.map((tab) => {
                const isActive = activeCategory === tab.id;
                return (
                  <button
                    key={tab.id}
                    role="tab"
                    aria-selected={isActive}
                    className={`store-tab-btn ${isActive ? 'active' : ''}`}
                    onClick={() => handleTabChange(tab.id)}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="store-search-box">
              <Search size={18} className="search-icon" aria-hidden="true" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search products (e.g. hair comb, toothbrush...)"
                aria-label="Search products"
                className="store-search-input"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="search-clear-btn"
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Product Cards Grid (4 columns) / Loading / Error */}
          {loading ? (
            <LoadingState message="Loading live products from Ecwid..." />
          ) : error ? (
            <ErrorState
              title="Unable to Load Catalog"
              message={error}
              onRetry={refetch}
            />
          ) : paginatedProducts.length > 0 ? (
            <div className="store-product-grid">
              {paginatedProducts.map((product) => {
                const wishlisted = isWishlisted(product.id);
                return (
                  <div
                    key={product.id}
                    className="store-product-card"
                    onClick={() => navigate(`/product/${product.id}`)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        navigate(`/product/${product.id}`);
                      }
                    }}
                  >
                    {/* Wishlist Toggle Button */}
                    <div className="card-top-bar">
                      <button
                        type="button"
                        className={`card-wishlist-btn ${wishlisted ? 'active' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWishlist(product.id);
                        }}
                        aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                      >
                        <Heart
                          size={18}
                          fill={wishlisted ? '#E63946' : 'none'}
                          color={wishlisted ? '#E63946' : '#6B7A72'}
                        />
                      </button>
                    </div>

                    {/* Image Area with 1:1 Aspect Ratio & Safe Padding */}
                    <div className="card-img-container">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="card-product-img"
                        loading="lazy"
                      />
                    </div>

                    {/* Product Metadata */}
                    <div className="card-content">
                      <h3 className="card-product-name">{product.name}</h3>
                      <span className="card-category-label">
                        {product.categoryTag || product.categoryName}
                      </span>
                      
                      <div className="card-price-row">
                        <span className="card-price">₹{product.price}</span>
                        {product.compareToPrice && (
                          <span className="card-compare-price">₹{product.compareToPrice}</span>
                        )}
                        {product.discountPercent && (
                          <span className="card-discount-badge">{product.discountPercent}% OFF</span>
                        )}
                      </div>

                      {!product.inStock && (
                        <span className="card-out-of-stock-badge">Out of Stock</span>
                      )}
                    </div>

                    {/* Action Button */}
                    <button
                      type="button"
                      className="card-view-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/product/${product.id}`);
                      }}
                    >
                      <span>View Product</span>
                      <ArrowRight size={15} className="view-arrow" />
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="store-no-results">
              <p>No products found matching your search.</p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  handleTabChange('all');
                }}
                className="reset-filters-btn"
              >
                Clear Filters
              </button>
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="store-pagination-wrapper">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                className="pagination-arrow-btn"
                aria-label="Previous page"
              >
                <ChevronLeft size={18} />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  type="button"
                  onClick={() => setCurrentPage(pageNum)}
                  className={`pagination-num-btn ${currentPage === pageNum ? 'active' : ''}`}
                  aria-label={`Page ${pageNum}`}
                  aria-current={currentPage === pageNum ? 'page' : undefined}
                >
                  {pageNum}
                </button>
              ))}

              <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                className="pagination-arrow-btn"
                aria-label="Next page"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </Container>
      </section>
    </div>
  );
};

export default Store;
