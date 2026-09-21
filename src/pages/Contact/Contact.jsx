import React from 'react';
import { Link } from 'react-router-dom';
import './Contact.css';

const Contact = () => {
  return (
    <div className="contact-page">
      <div className="contact-hero">
        <div className="container">
          <div className="breadcrumbs">Home / Contact Us</div>
          <h1>Let's Talk.</h1>
          <p>Have a question about our products, your order, or anything EarthLife?<br />We're here to help.</p>
        </div>
      </div>
      
      <div className="container contact-content">
        <div className="contact-info">
          <h2>Connect with EarthLife.</h2>
          <p>Contact us at <strong>support@earthlifeco.com.</strong></p>
          <p>Our dedicated support team will respond within one business day to ensure a smooth and hassle-free shopping experience.</p>
          
          <div className="info-block">
            <div className="info-icon">✉️</div>
            <div>
              <h4>EMAIL US</h4>
              <p><strong>support@earthlifeco.com</strong></p>
              <p>We're here to help.</p>
            </div>
          </div>
          
          <div className="info-block">
            <div className="info-icon">🚚</div>
            <div>
              <h4>SHIPPING</h4>
              <p><strong>Made in India — Shipping Across India</strong></p>
              <p>Delivering natural essentials to every home.</p>
            </div>
          </div>
          
          <div className="info-block">
            <div className="info-icon">📦</div>
            <div>
              <h4>RETURNS</h4>
              <p><strong>Returns within 7 days</strong></p>
              <p>Hassle-free returns for a worry-free experience.</p>
            </div>
          </div>
        </div>
        
        <div className="contact-form-container">
          <h3>Send Us a Message</h3>
          <form className="contact-form">
            <div className="form-group">
              <label>Full Name *</label>
              <input type="text" placeholder="Your full name" required />
            </div>
            <div className="form-group">
              <label>Email Address *</label>
              <input type="email" placeholder="your@email.com" required />
            </div>
            <div className="form-group">
              <label>Subject *</label>
              <input type="text" placeholder="How can we help?" required />
            </div>
            <div className="form-group">
              <label>Message *</label>
              <textarea placeholder="Write your message here..." rows="4" required></textarea>
            </div>
            <button type="submit" className="btn btn-primary whatsapp-btn">
              <span>💬</span> Send Message via WhatsApp →
            </button>
            <p className="form-hint">We usually respond within one business day.</p>
          </form>
        </div>
      </div>
      
      <div className="quick-question">
        <div className="container flex-between">
          <div>
            <h2>Have a quick question?</h2>
            <p>You might find the answer in our FAQs.</p>
            <Link to="/faqs" className="btn btn-primary">Visit our FAQs →</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
