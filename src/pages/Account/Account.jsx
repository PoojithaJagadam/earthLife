import React, { useEffect, useState } from 'react';
import EcwidStore from '../../ecwid/storefront/EcwidStore';
import heroImg from '../../assets/hero_bg.png';
import './Account.css';

const Account = () => {
  const [currentHash, setCurrentHash] = useState(window.location.hash || '#!/~/account/settings');

  useEffect(() => {
    // Listen for hash changes to update active state in custom sidebar
    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const isLoginRoute = currentHash.includes('signin') || currentHash === '';

  // The login screen in the UI (Image 2) is a split screen with an image on the right.
  // The account/orders screens (Image 3/4) have a sidebar on the left.
  
  if (isLoginRoute) {
    return (
      <div className="account-login-page" style={{ backgroundColor: 'var(--color-bg)' }}>
        <div className="container" style={{ padding: '4rem 0' }}>
           <div className="login-split-container">
              <div className="login-ecwid-wrapper">
                 <EcwidStore />
              </div>
              <div className="login-image-wrapper">
                 <img src={heroImg} alt="Natural products" className="login-side-img" />
                 <div className="login-image-text">
                   Good for You.<br />Good for the Planet.
                 </div>
              </div>
           </div>
        </div>
      </div>
    );
  }

  // Once logged in, show the Account Sidebar layout
  return (
    <div className="account-dashboard-page" style={{ backgroundColor: '#F8F6F0' }}>
      <div className="container" style={{ padding: '2rem 0 4rem 0' }}>
        <div className="breadcrumbs">Home &gt; My Account</div>
        
        <div className="account-dashboard-grid">
          {/* Custom React Sidebar that visually wraps the Ecwid native view */}
          <aside className="account-sidebar">
            <nav className="account-nav">
              <a href="#!/~/account/settings" className={`account-nav-item ${currentHash.includes('settings') && !currentHash.includes('address') ? 'active' : ''}`}>
                <span className="icon">👤</span> Account Details
              </a>
              <a href="#!/~/account/orders" className={`account-nav-item ${currentHash.includes('orders') ? 'active' : ''}`}>
                <span className="icon">📦</span> My Orders
              </a>
              <a href="#!/~/account/addressBook" className={`account-nav-item ${currentHash.includes('address') ? 'active' : ''}`}>
                <span className="icon">📍</span> Saved Addresses
              </a>
              {/* Note: Native logout requires clicking Ecwid's logout button inside the widget, 
                  but we can redirect to the login hash to simulate logout view for the wrapper */}
              <a href="#!/signin" className="account-nav-item logout">
                <span className="icon">↪️</span> Logout
              </a>
            </nav>
            <div className="sidebar-promo">
               <span className="icon">🍃</span>
               <div>Small Choices.<br/>Big Change.</div>
            </div>
          </aside>
          
          <main className="account-content-area">
             {/* Ecwid native widget renders the actual forms/orders here */}
             <EcwidStore />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Account;
