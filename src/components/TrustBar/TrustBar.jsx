import React from 'react';
import Container from '../UI/Container/Container';
import './TrustBar.css';

const TrustBar = () => {
  return (
    <div className="trust-bar">
      <Container className="trust-bar-inner">
        <span className="trust-item hide-on-mobile">🚚 Free Delivery on orders above ₹299</span>
        <span className="trust-item hide-on-mobile">🛡️ 100% Secure Payments</span>
        <span className="trust-item hide-on-mobile">🇮🇳 Made in India</span>
        <span className="trust-item tagline">A Cleaner You. A Greener Tomorrow.</span>
      </Container>
    </div>
  );
};

export default TrustBar;
