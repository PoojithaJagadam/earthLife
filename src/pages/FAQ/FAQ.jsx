import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './FAQ.css';

const FAQItem = ({ icon, question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`faq-item ${isOpen ? 'active' : ''}`}>
      <button className="faq-question" onClick={() => setIsOpen(!isOpen)}>
        <span className="faq-icon">{icon}</span>
        <span>{question}</span>
        <span className="faq-arrow">▼</span>
      </button>
      <div className="faq-answer">
        {answer}
      </div>
    </div>
  );
};

const FAQ = () => {
  const faqs = [
    { icon: '🍃', question: 'What products does EarthLife Co. offer?', answer: 'We offer a range of natural everyday essentials, including Neem wood combs, bamboo toothbrushes, bamboo facial tissues, and coconut coir scrub pads.' },
    { icon: '🍃', question: 'What natural materials do you use?', answer: 'We thoughtfully choose materials like Neem wood, Bamboo, and Coconut Coir for their sustainability and natural benefits.' },
    { icon: '🇮🇳', question: 'Where are EarthLife Co. products made?', answer: 'All our products are proudly made in India, supporting local communities and artisans.' },
    { icon: '🚚', question: 'Do you ship across India?', answer: 'Yes, we provide shipping across India. Free delivery is available on all orders above ₹299.' },
    { icon: '📦', question: 'What is your return policy?', answer: 'We offer hassle-free returns within 7 days of delivery for a worry-free shopping experience.' },
    { icon: '💳', question: 'What payment method is used at checkout?', answer: 'We support 100% secure payments via Razorpay, which accepts credit/debit cards, UPI, net banking, and popular wallets.' },
    { icon: '📍', question: 'How can I track my order?', answer: 'Once your order is shipped, you will receive a tracking link via email. You can also track it in the "Track Order" section of your account.' },
    { icon: '📝', question: 'What information should I check before buying a product?', answer: 'Please check the product description for material details, care instructions, and any specific dimensions to ensure it meets your needs.' },
    { icon: '🍃', question: 'Why choose natural everyday products?', answer: 'Choosing natural products reduces plastic waste, is safer for your family, and supports a healthier planet.' },
    { icon: '✉️', question: 'How can I contact EarthLife Co.?', answer: 'You can reach us anytime at support@earthlifeco.com. We usually respond within one business day.' },
  ];

  return (
    <div className="faq-page">
      {/* Hero Section */}
      <section className="faq-hero">
        <div className="container faq-hero-content">
          <div>
            <div className="breadcrumbs mb-2" style={{color: 'var(--color-text-muted)', fontSize: '0.9rem'}}>Home / FAQs</div>
            <h1>Frequently<br />Asked Questions</h1>
            <p>Simple answers about our products,<br />orders and everyday natural living.</p>
          </div>
          <div>
            {/* Using text alt as placeholder for image as requested */}
            <img 
              src="https://images.unsplash.com/photo-1610486706915-d72b2609ebfc?auto=format&fit=crop&w=800&q=80" 
              alt="Natural essentials arranged nicely" 
              className="faq-hero-img" 
            />
          </div>
        </div>
      </section>

      {/* FAQ List */}
      <section className="faq-list-section container">
        {faqs.map((faq, index) => (
          <FAQItem key={index} icon={faq.icon} question={faq.question} answer={faq.answer} />
        ))}
      </section>

      {/* CTA Section */}
      <section className="faq-cta-section">
        <div className="container faq-cta-content">
          <p className="faq-cta-subtitle">STILL HAVE A QUESTION?</p>
          <h2>We're happy to help.</h2>
          <p>Feel free to reach out to us at <strong>support@earthlifeco.com</strong></p>
          <Link to="/contact" className="btn btn-primary mt-2">Contact Us →</Link>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
