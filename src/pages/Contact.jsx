import React, { useState, useRef, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import './Contact.css';

function Contact() {
  const { theme } = useContext(AppContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSent, setIsSent] = useState(false);
  const nameInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSent(true);
    setTimeout(() => {
      setIsSent(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
      nameInputRef.current?.focus();
    }, 3000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className={`contact-container ${theme}`}>
      <h1>Contact Us</h1>

      <div className="contact-content">
        <div className="contact-info">
          <h2>Get in Touch</h2>
          <div className="info-item">
            <span className="icon">📍</span>
            <div>
              <h3>Address</h3>
              <p>123 Bike Street, City Center</p>
            </div>
          </div>
          <div className="info-item">
            <span className="icon">📞</span>
            <div>
              <h3>Phone</h3>
              <p>+91 9998876543</p>
            </div>
          </div>
          <div className="info-item">
            <span className="icon">✉️</span>
            <div>
              <h3>Email</h3>
              <p>support@bikerent.com</p>
            </div>
          </div>
          <div className="info-item">
            <span className="icon">🕐</span>
            <div>
              <h3>Working Hours</h3>
              <p>Mon-Sat: 9:00 AM - 9:00 PM</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="contact-form">
          <h2>Send us a Message</h2>
          <input
            ref={nameInputRef}
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            rows="5"
            required
          />
          <button type="submit">
            {isSent ? '✅ Sent!' : 'Send Message'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;