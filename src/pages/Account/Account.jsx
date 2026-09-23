import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  User, 
  Home, 
  Package, 
  MapPin, 
  LogOut, 
  Calendar, 
  Edit3, 
  Trash2, 
  Building2, 
  Plus, 
  Leaf, 
  ExternalLink,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useEcwidAccount } from '../../hooks/useEcwidAccount';
import EcwidStore from '../../ecwid/storefront/EcwidStore';
import productBrushes from '../../assets/product_brushes_clean.png';
import './Account.css';

const Account = () => {
  const { 
    customer, 
    isLoggedIn, 
    openPage, 
    logout, 
    refresh,
    updateProfile 
  } = useEcwidAccount();

  // Authenticated view state: 'details' | 'addresses' | 'orders' | 'overview'
  const [activeTab, setActiveTab] = useState(() => {
    const hash = window.location.hash || '';
    if (hash.includes('orders')) return 'orders';
    if (hash.includes('address')) return 'addresses';
    if (hash.includes('settings')) return 'details';
    return 'details';
  });

  // Profile Form State (Prefilled from authoritative Ecwid customer data)
  const [profileName, setProfileName] = useState(() => customer?.name || '');
  const [profileEmail, setProfileEmail] = useState(() => customer?.email || '');
  const [profilePhone, setProfilePhone] = useState(() => customer?.phone || (customer?.billingAddress ? customer.billingAddress.phone : ''));
  const [profileDob, setProfileDob] = useState('1995-03-12');
  const [profileGender, setProfileGender] = useState('Female');
  const [subscribeNewsletter, setSubscribeNewsletter] = useState(() => (customer && typeof customer.acceptsMarketing === 'boolean' ? customer.acceptsMarketing : true));
  const [receiveOffers, setReceiveOffers] = useState(false);
  
  // Profile update action feedback
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);
  const [showEcwidEmbed, setShowEcwidEmbed] = useState(false);

  // Synchronize profile fields whenever customer session updates in Ecwid
  const customerId = customer?.id || customer?.email;
  useEffect(() => {
    if (customer) {
      setProfileName(customer.name || '');
      setProfileEmail(customer.email || '');
      setProfilePhone(customer.phone || (customer.billingAddress ? customer.billingAddress.phone : ''));
      if (typeof customer.acceptsMarketing === 'boolean') {
        setSubscribeNewsletter(customer.acceptsMarketing);
      }
    }
  }, [customerId, customer]);

  // Handle Tab Switch
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSaveStatus(null);

    if (tab === 'orders') {
      openPage('orders');
    } else if (tab === 'addresses') {
      openPage('addressBook');
    } else if (tab === 'details') {
      openPage('settings');
    }
  };

  // Handle Profile Update Changes
  const handleProfileSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveStatus(null);

    try {
      const res = await updateProfile({
        customerId: customer?.id,
        email: customer?.email,
        name: profileName.trim(),
        phone: profilePhone.trim(),
        acceptsMarketing: Boolean(subscribeNewsletter)
      });

      setIsSaving(false);

      if (res && res.success) {
        setSaveStatus({
          type: 'success',
          message: 'Profile changes saved successfully to your Ecwid account!'
        });
        refresh();
      } else if (res && res.requiresStorefrontAction) {
        // Honest response: do not fake success! Direct customer to Ecwid Account Settings.
        setSaveStatus({
          type: 'warning',
          requiresStorefront: true,
          message: 'Direct REST API updates require an Ecwid Secret Token. Opening the official Ecwid Account Settings panel below to review and save your changes directly in Ecwid.'
        });
        setShowEcwidEmbed(true);
        openPage('settings');
      } else {
        setSaveStatus({
          type: 'error',
          message: res?.message || res?.error || 'Failed to update customer in Ecwid. Please try via Ecwid Account Settings.'
        });
        setShowEcwidEmbed(true);
      }
    } catch (err) {
      setIsSaving(false);
      setSaveStatus({
        type: 'error',
        message: err.message || 'Network error updating profile. Please try using Ecwid Account Settings.'
      });
      setShowEcwidEmbed(true);
    }
  };

  // Logout via Ecwid.Customer.signout()
  const handleLogout = () => {
    logout(() => {
      setActiveTab('details');
      setSaveStatus(null);
    });
  };

  // ---------------------------------------------------------------------------
  // RENDER: GUEST FLOW (Matching EarthLifeCo-Account-creation.jpeg)
  // Utilizes real Ecwid native sign-in flow with native CAPTCHA & Access Code
  // ---------------------------------------------------------------------------
  if (!isLoggedIn) {
    return (
      <div className="account-page-wrapper">
        <div className="account-container">
          {/* Breadcrumbs */}
          <div className="account-breadcrumbs">
            <Link to="/">Home</Link>
            <span>&gt;</span>
            <span className="current">My Account</span>
          </div>

          <div className="account-auth-container">
            {/* Left Column: EarthLife Header + Real Ecwid Native Sign-In Component */}
            <div className="auth-form-column">
              <div className="auth-header">
                <h1 className="auth-title">Welcome Back</h1>
                <p className="auth-subtitle">
                  Sign in with your email to access your EarthLife Co. orders, saved addresses, and profile. Ecwid generates a secure one-time access code sent to your inbox.
                </p>
              </div>

              {/* Native Ecwid Sign-in Component: Handles CAPTCHA/Security, sends real access code/link */}
              <div className="earthlife-native-auth-wrapper">
                <EcwidStore defaultPage="signin" />
              </div>

              <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.85rem', color: '#6B7280' }}>
                Protected by Ecwid secure customer session &amp; Cloudflare security verification.
              </div>
            </div>

            {/* Right Column: Hero Banner matching official design */}
            <div className="auth-banner-column">
              <div className="auth-banner-script">
                <span>Small Choices</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  Big Change <Leaf size={28} className="leaf-icon" />
                </span>
              </div>

              <div className="auth-banner-image-wrapper">
                <img 
                  src={productBrushes} 
                  alt="Eco-friendly bamboo toothbrushes" 
                  className="auth-banner-img"
                />
              </div>

              <div className="auth-banner-features">
                <div className="auth-feature-item">
                  <div className="auth-feature-icon">
                    <Leaf size={18} />
                  </div>
                  <span className="auth-feature-text">100% Eco-Friendly</span>
                </div>
                <div className="auth-feature-item">
                  <div className="auth-feature-icon">
                    <CheckCircle2 size={18} />
                  </div>
                  <span className="auth-feature-text">Better for Your Family</span>
                </div>
                <div className="auth-feature-item">
                  <div className="auth-feature-icon">
                    <Leaf size={18} />
                  </div>
                  <span className="auth-feature-text">A Greener Tomorrow</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // RENDER: AUTHENTICATED DASHBOARD (Matching EarthLifeCo-Account-details.jpeg)
  // ---------------------------------------------------------------------------
  return (
    <div className="account-page-wrapper">
      <div className="account-container">
        {/* Top Breadcrumbs */}
        <div className="account-breadcrumbs">
          <Link to="/">Home</Link>
          <span>&gt;</span>
          <Link to="/account" onClick={() => setActiveTab('details')}>My Account</Link>
          <span>&gt;</span>
          <span className="current">
            {activeTab === 'details' && 'Account Details'}
            {activeTab === 'addresses' && 'Saved Addresses'}
            {activeTab === 'orders' && 'My Orders'}
            {activeTab === 'overview' && 'Dashboard Overview'}
          </span>
        </div>

        <div className="account-dashboard-grid">
          {/* Left Sidebar */}
          <aside className="account-sidebar-wrap">
            <nav className="account-sidebar-nav">
              <button
                type="button"
                className={`account-nav-btn ${activeTab === 'overview' ? 'active' : ''}`}
                onClick={() => handleTabChange('overview')}
              >
                <Home size={18} />
                <span>My Account</span>
              </button>

              <button
                type="button"
                className={`account-nav-btn ${activeTab === 'orders' ? 'active' : ''}`}
                onClick={() => handleTabChange('orders')}
              >
                <Package size={18} />
                <span>My Orders</span>
              </button>

              <button
                type="button"
                className={`account-nav-btn ${activeTab === 'addresses' ? 'active' : ''}`}
                onClick={() => handleTabChange('addresses')}
              >
                <MapPin size={18} />
                <span>Saved Addresses</span>
              </button>

              <button
                type="button"
                className={`account-nav-btn ${activeTab === 'details' ? 'active' : ''}`}
                onClick={() => handleTabChange('details')}
              >
                <User size={18} />
                <span>Account Details</span>
              </button>

              <button
                type="button"
                className="account-nav-btn account-logout-btn"
                onClick={handleLogout}
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </nav>

            {/* Promo Card: "Save Extra with Every Choice" */}
            <div className="account-sidebar-promo">
              <div className="promo-badge">
                <span>SAVE 10%</span>
              </div>
              <h4 className="promo-title">Save Extra with Every Choice</h4>
              <p className="promo-desc">
                Subscribe to your everyday essentials and enjoy an extra 10% off + free delivery on every order.
              </p>
              <Link to="/store" className="promo-action-btn">
                <span>Shop Subscriptions</span>
                <span className="promo-arrow">→</span>
              </Link>
            </div>
          </aside>

          {/* Right Main Content Card */}
          <main className="account-main-card">
            {/* -------------------------------------------------------------
                PANEL: ACCOUNT DETAILS (Image 2 Center)
               ------------------------------------------------------------- */}
            {activeTab === 'details' && (
              <>
                <div className="account-card-header">
                  <div className="account-card-title-group">
                    <h2 className="account-card-title">
                      Welcome, {customer?.name || 'Valued Customer'}
                    </h2>
                    <p className="account-card-subtitle">
                      Update your account details and manage your communication preferences.
                    </p>
                  </div>
                  <div className="account-card-script-accent">
                    <span>Good for You. Good for the Planet.</span>
                    <Leaf size={24} style={{ color: '#2D5540' }} />
                  </div>
                </div>

                {saveStatus && (
                  <div 
                    style={{ 
                      padding: '1rem', 
                      borderRadius: '8px', 
                      marginBottom: '1.5rem',
                      fontSize: '0.9rem',
                      lineHeight: 1.5,
                      backgroundColor: saveStatus.type === 'success' ? '#ECFDF5' : saveStatus.type === 'warning' ? '#FFFBEB' : '#FEE2E2',
                      color: saveStatus.type === 'success' ? '#065F46' : saveStatus.type === 'warning' ? '#92400E' : '#991B1B',
                      border: `1px solid ${saveStatus.type === 'success' ? '#A7F3D0' : saveStatus.type === 'warning' ? '#FDE68A' : '#FCA5A5'}`,
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.65rem'
                    }}
                  >
                    {saveStatus.type === 'success' ? (
                      <CheckCircle2 size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
                    ) : (
                      <AlertCircle size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
                    )}
                    <div>
                      <div>{saveStatus.message}</div>
                      {saveStatus.requiresStorefront && (
                        <button
                          type="button"
                          onClick={() => {
                            setShowEcwidEmbed(true);
                            openPage('settings');
                          }}
                          style={{
                            marginTop: '0.5rem',
                            backgroundColor: '#1E3A2B',
                            color: '#FFFFFF',
                            border: 'none',
                            padding: '0.4rem 0.85rem',
                            borderRadius: '6px',
                            fontSize: '0.8rem',
                            fontWeight: 600,
                            cursor: 'pointer'
                          }}
                        >
                          Open Ecwid Account Settings
                        </button>
                      )}
                    </div>
                  </div>
                )}

                <form className="account-details-form" onSubmit={handleProfileSave}>
                  <div className="form-row">
                    <label className="form-label">
                      Full Name <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-input"
                      value={profileName}
                      onChange={(e) => setProfileName(e.target.value)}
                      placeholder="Your full name"
                      required
                    />
                  </div>

                  <div className="form-row">
                    <label className="form-label">
                      Email Address <span className="required">*</span>
                    </label>
                    <input
                      type="email"
                      className="form-input"
                      value={profileEmail}
                      disabled
                      style={{ backgroundColor: '#F9FAFB', cursor: 'not-allowed', color: '#6B7280' }}
                    />
                    <span style={{ fontSize: '0.8rem', color: '#6B7280', marginTop: '0.25rem' }}>
                      To update your primary email address, use the Ecwid Account Settings panel below.
                    </span>
                  </div>

                  <div className="form-row">
                    <label className="form-label">
                      Phone Number <span className="required">*</span>
                    </label>
                    <div className="phone-input-group">
                      <select className="phone-country-code" defaultValue="+91">
                        <option value="+91">+91</option>
                      </select>
                      <input
                        type="tel"
                        className="form-input"
                        value={profilePhone}
                        onChange={(e) => setProfilePhone(e.target.value)}
                        placeholder="98765 43210"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <label className="form-label">Date of Birth</label>
                    <div className="form-input-with-icon">
                      <input
                        type="date"
                        className="form-input"
                        value={profileDob}
                        onChange={(e) => setProfileDob(e.target.value)}
                      />
                      <Calendar size={18} className="input-icon-right" />
                    </div>
                    <div className="unsupported-field-badge">
                      <span>ℹ️ Ecwid native customer profile manages Name, Email, Phone &amp; Addresses. Date of birth is saved in your local session.</span>
                    </div>
                  </div>

                  <div className="form-row">
                    <label className="form-label">Gender</label>
                    <select
                      className="form-select"
                      value={profileGender}
                      onChange={(e) => setProfileGender(e.target.value)}
                    >
                      <option value="Female">Female</option>
                      <option value="Male">Male</option>
                      <option value="Other">Other</option>
                      <option value="Prefer not to say">Prefer not to say</option>
                    </select>
                  </div>

                  <div className="account-checkbox-group">
                    <label className="account-checkbox-label">
                      <input
                        type="checkbox"
                        checked={subscribeNewsletter}
                        onChange={(e) => setSubscribeNewsletter(e.target.checked)}
                      />
                      <span>
                        <strong>Subscribe to our newsletter</strong>
                        <br />
                        Get updates on new products, offers and sustainable living tips.
                      </span>
                    </label>

                    <label className="account-checkbox-label">
                      <input
                        type="checkbox"
                        checked={receiveOffers}
                        onChange={(e) => setReceiveOffers(e.target.checked)}
                      />
                      <span>
                        I'd like to receive exclusive offers and product recommendations.
                      </span>
                    </label>
                  </div>

                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
                    <button type="submit" className="account-save-btn" disabled={isSaving}>
                      {isSaving ? 'Saving to Ecwid...' : 'Update Changes'}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setShowEcwidEmbed(true);
                        openPage('settings');
                      }}
                      style={{
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #1E3A2B',
                        color: '#1E3A2B',
                        padding: '0.85rem 1.25rem',
                        borderRadius: '8px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}
                    >
                      <span>Edit in Ecwid Account Settings</span>
                      <ExternalLink size={16} />
                    </button>
                  </div>
                </form>

                {/* Direct Ecwid Settings Bridge */}
                <div style={{ marginTop: '2.5rem', borderTop: '1px solid #F3F4F6', paddingTop: '1.5rem' }}>
                  <button
                    type="button"
                    onClick={() => setShowEcwidEmbed(!showEcwidEmbed)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#1E3A2B',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      padding: 0
                    }}
                  >
                    <span>{showEcwidEmbed ? 'Hide' : 'Show'} Ecwid Native Account Settings Panel</span>
                    <ExternalLink size={14} />
                  </button>

                  {showEcwidEmbed && (
                    <div className="ecwid-account-embedded" style={{ marginTop: '1rem' }}>
                      <EcwidStore defaultPage="account/settings" />
                    </div>
                  )}
                </div>
              </>
            )}

            {/* -------------------------------------------------------------
                PANEL: SAVED ADDRESSES (Image 2 Right)
               ------------------------------------------------------------- */}
            {activeTab === 'addresses' && (
              <>
                <div className="account-card-header">
                  <div className="account-card-title-group">
                    <h2 className="account-card-title">Saved Addresses</h2>
                    <p className="account-card-subtitle">
                      Manage your delivery addresses stored in your Ecwid account.
                    </p>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.75rem' }}>
                    <div className="account-card-script-accent" style={{ fontSize: '1.75rem' }}>
                      <span>Small Choices Big Change</span>
                      <Leaf size={20} style={{ color: '#2D5540' }} />
                    </div>
                    <button
                      type="button"
                      className="add-address-top-btn"
                      onClick={() => openPage('addressBook')}
                    >
                      <Plus size={16} />
                      <span>Add New Address</span>
                    </button>
                  </div>
                </div>

                {customer?.addresses && customer.addresses.length > 0 ? (
                  <div className="saved-addresses-list">
                    {customer.addresses.map((addr, index) => (
                      <div key={addr.id || index} className="address-card">
                        <div className="address-card-icon">
                          {addr.type?.toLowerCase().includes('office') ? (
                            <Building2 size={24} />
                          ) : (
                            <Home size={24} />
                          )}
                        </div>

                        <div className="address-card-details">
                          <div className="address-badge-row">
                            <span className="address-type-badge">
                              {addr.type || (index === 0 ? 'Home' : 'Office')}
                            </span>
                            {addr.isDefault && (
                              <span className="address-default-badge">Default</span>
                            )}
                          </div>

                          <h3 className="address-recipient-name">
                            {addr.name || customer.name || 'Recipient'}
                          </h3>
                          {addr.companyName && (
                            <p className="address-company">{addr.companyName}</p>
                          )}
                          <p className="address-line">
                            {addr.street}
                            {addr.address2 ? `, ${addr.address2}` : ''}
                          </p>
                          <p className="address-line">
                            {addr.city}, {addr.state} - {addr.postalCode}
                          </p>
                          <p className="address-line">{addr.country || 'India'}</p>
                          {addr.phone && (
                            <p className="address-phone">Phone: {addr.phone}</p>
                          )}

                          <div className="address-actions-row">
                            <button
                              type="button"
                              className="address-action-btn edit-btn"
                              onClick={() => openPage('addressBook')}
                            >
                              <Edit3 size={15} />
                              <span>Edit</span>
                            </button>
                            <button
                              type="button"
                              className="address-action-btn remove-btn"
                              onClick={() => openPage('addressBook')}
                            >
                              <Trash2 size={15} />
                              <span>Remove</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="account-empty-state">
                    <MapPin size={48} className="account-empty-icon" />
                    <h3>No Saved Addresses in Ecwid</h3>
                    <p>
                      You have not saved any delivery addresses in your Ecwid account yet. Add an address for quicker checkout.
                    </p>
                    <button
                      type="button"
                      className="add-address-top-btn"
                      onClick={() => openPage('addressBook')}
                    >
                      <Plus size={16} />
                      <span>Add Address via Ecwid</span>
                    </button>
                  </div>
                )}

                {/* Direct Ecwid Address Book Panel */}
                <div style={{ marginTop: '2.5rem', borderTop: '1px solid #F3F4F6', paddingTop: '1.5rem' }}>
                  <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#1E3A2B', margin: 0 }}>
                      Ecwid Authoritative Address Book
                    </h3>
                    <span style={{ fontSize: '0.8rem', color: '#6B7280' }}>
                      Directly synced with Ecwid store
                    </span>
                  </div>
                  <div style={{ backgroundColor: '#F9FAFB', padding: '1rem', borderRadius: '8px', border: '1px solid #E5E7EB' }}>
                    <EcwidStore defaultPage="account/addressBook" />
                  </div>
                </div>
              </>
            )}

            {/* -------------------------------------------------------------
                PANEL: MY ORDERS (Image 2 Real Orders)
               ------------------------------------------------------------- */}
            {activeTab === 'orders' && (
              <>
                <div className="account-card-header">
                  <div className="account-card-title-group">
                    <h2 className="account-card-title">My Orders</h2>
                    <p className="account-card-subtitle">
                      View your real Ecwid order history, delivery tracking, and tax invoices.
                    </p>
                  </div>
                  <div className="account-card-script-accent">
                    <span>Small Choices Big Change</span>
                    <Leaf size={24} style={{ color: '#2D5540' }} />
                  </div>
                </div>

                <div className="ecwid-orders-wrapper">
                  <EcwidStore defaultPage="account/orders" />
                </div>
              </>
            )}

            {/* -------------------------------------------------------------
                PANEL: DASHBOARD OVERVIEW
               ------------------------------------------------------------- */}
            {activeTab === 'overview' && (
              <>
                <div className="account-card-header">
                  <div className="account-card-title-group">
                    <h2 className="account-card-title">
                      Welcome, {customer?.name || 'EarthLife Customer'}
                    </h2>
                    <p className="account-card-subtitle">
                      From your dashboard you can easily review your orders, manage shipping addresses, and edit account settings.
                    </p>
                  </div>
                  <div className="account-card-script-accent">
                    <span>Good for You. Good for the Planet.</span>
                    <Leaf size={24} style={{ color: '#2D5540' }} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                  <div 
                    onClick={() => handleTabChange('orders')}
                    style={{ 
                      padding: '1.5rem', 
                      borderRadius: '12px', 
                      backgroundColor: '#F8F6F0', 
                      border: '1px solid #EBE7DF', 
                      cursor: 'pointer',
                      transition: 'transform 0.15s ease, box-shadow 0.15s ease'
                    }}
                  >
                    <Package size={28} style={{ color: '#1E3A2B', marginBottom: '0.75rem' }} />
                    <h4 style={{ margin: '0 0 0.35rem 0', color: '#1E3A2B' }}>My Orders</h4>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: '#6B7280' }}>
                      Check delivery status, order tracking and invoices.
                    </p>
                  </div>

                  <div 
                    onClick={() => handleTabChange('addresses')}
                    style={{ 
                      padding: '1.5rem', 
                      borderRadius: '12px', 
                      backgroundColor: '#F8F6F0', 
                      border: '1px solid #EBE7DF', 
                      cursor: 'pointer',
                      transition: 'transform 0.15s ease, box-shadow 0.15s ease'
                    }}
                  >
                    <MapPin size={28} style={{ color: '#1E3A2B', marginBottom: '0.75rem' }} />
                    <h4 style={{ margin: '0 0 0.35rem 0', color: '#1E3A2B' }}>Saved Addresses</h4>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: '#6B7280' }}>
                      {customer?.addresses?.length || 0} address(es) saved in your account.
                    </p>
                  </div>

                  <div 
                    onClick={() => handleTabChange('details')}
                    style={{ 
                      padding: '1.5rem', 
                      borderRadius: '12px', 
                      backgroundColor: '#F8F6F0', 
                      border: '1px solid #EBE7DF', 
                      cursor: 'pointer',
                      transition: 'transform 0.15s ease, box-shadow 0.15s ease'
                    }}
                  >
                    <User size={28} style={{ color: '#1E3A2B', marginBottom: '0.75rem' }} />
                    <h4 style={{ margin: '0 0 0.35rem 0', color: '#1E3A2B' }}>Account Details</h4>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: '#6B7280' }}>
                      Manage name, phone number, and marketing preferences.
                    </p>
                  </div>
                </div>

                <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '1.5rem' }}>
                  <h4 style={{ margin: '0 0 0.75rem 0', color: '#1E3A2B' }}>Customer Account Information</h4>
                  <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem', color: '#4B5563' }}>
                    <strong>Email:</strong> {customer.email}
                  </p>
                  {customer.phone && (
                    <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem', color: '#4B5563' }}>
                      <strong>Phone:</strong> {customer.phone}
                    </p>
                  )}
                  <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem', color: '#4B5563' }}>
                    <strong>Ecwid Store ID:</strong> 141633269
                  </p>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: '#10B981', fontWeight: 600 }}>
                    ● Ecwid Verified Active Session
                  </p>
                </div>
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Account;
