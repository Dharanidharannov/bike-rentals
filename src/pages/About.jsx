import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import './About.css';

function About() {
  const { theme } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState('mission');

  const teamMembers = [
    { name: 'John Doe', role: 'CEO & Founder', image: '👨‍💼' },
    { name: 'Jane Smith', role: 'Operations Manager', image: '👩‍💼' },
    { name: 'Mike Johnson', role: 'Bike Expert', image: '👨‍🔧' },
    { name: 'Sarah Williams', role: 'Customer Support', image: '👩‍💻' },
  ];

  return (
    <div className={`about-container ${theme}`}>
      <h1>About BikeRent</h1>

      <div className="about-tabs">
        <button 
          className={activeTab === 'mission' ? 'active' : ''}
          onClick={() => setActiveTab('mission')}
        >
          Mission
        </button>
        <button 
          className={activeTab === 'vision' ? 'active' : ''}
          onClick={() => setActiveTab('vision')}
        >
          Vision
        </button>
        <button 
          className={activeTab === 'values' ? 'active' : ''}
          onClick={() => setActiveTab('values')}
        >
          Values
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'mission' && (
          <div className="content-card">
            <h2>Our Mission</h2>
            <p>To provide eco-friendly and affordable transportation solutions, making bike rental accessible to everyone while promoting a healthier lifestyle and reducing carbon footprint.</p>
          </div>
        )}
        {activeTab === 'vision' && (
          <div className="content-card">
            <h2>Our Vision</h2>
            <p>To become the world's leading bike rental platform, connecting people with sustainable mobility solutions in every city across the globe.</p>
          </div>
        )}
        {activeTab === 'values' && (
          <div className="content-card">
            <h2>Our Values</h2>
            <ul>
              <li>🌱 Sustainability</li>
              <li>❤️ Customer First</li>
              <li>🤝 Integrity</li>
              <li>🚀 Innovation</li>
              <li>🌍 Community</li>
            </ul>
          </div>
        )}
      </div>

      <section className="team-section">
        <h2>Meet Our Team</h2>
        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <div key={index} className="team-card">
              <div className="team-avatar">{member.image}</div>
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="stats-section">
        <div className="stat-item">
          <h3>500+</h3>
          <p>Bikes Available</p>
        </div>
        <div className="stat-item">
          <h3>10K+</h3>
          <p>Happy Customers</p>
        </div>
        <div className="stat-item">
          <h3>50+</h3>
          <p>Locations</p>
        </div>
        <div className="stat-item">
          <h3>4.8⭐</h3>
          <p>Average Rating</p>
        </div>
      </section>
    </div>
  );
}

export default About;