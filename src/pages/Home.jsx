import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import useFetch from '../hooks/useFetch';
import './Home.css';

function Home() {
  const { theme } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState('');
  const { data: bikes, loading } = useFetch('http://localhost:5000/bikes');

  // Featured bikes (first 3)
  const featuredBikes = bikes?.slice(0, 3) || [];

  return (
    <div className={`home-container ${theme}`}>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Ride the World with <span>BikeRent</span></h1>
          <p>Explore the city on two wheels. Rent premium bikes at affordable prices.</p>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search for bikes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Link to={`/bikes?search=${searchTerm}`} className="search-btn">
              Find Bikes
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="feature-item">
          <div className="feature-icon">🔒</div>
          <h3>Secure Booking</h3>
          <p>Safe and encrypted transactions</p>
        </div>
        <div className="feature-item">
          <div className="feature-icon">🛵</div>
          <h3>Premium Bikes</h3>
          <p>Well-maintained quality bikes</p>
        </div>
        <div className="feature-item">
          <div className="feature-icon">⏰</div>
          <h3>24/7 Support</h3>
          <p>Round the clock assistance</p>
        </div>
        <div className="feature-item">
          <div className="feature-icon">📍</div>
          <h3>Easy Pickup</h3>
          <p>Multiple locations across city</p>
        </div>
      </section>

      {/* Featured Bikes */}
     {/* Featured Bikes */}
<section className="featured-section">
  <h2>🔥 Featured Bikes</h2>

  {loading ? (
    <div className="loading">Loading bikes...</div>
  ) : featuredBikes.length > 0 ? (
    <div className="bike-grid">
      {featuredBikes.map((bike) => (
        <div key={bike.id} className="bike-card">
          <div className="bike-image">{bike.image || '🚲'}</div>
          <h3>{bike.name}</h3>
          <p className="bike-type">{bike.type}</p>
          <p className="bike-price">₹{bike.price}/day</p>

          <span className={bike.available ? 'available' : 'unavailable'}>
            {bike.available ? '✅ Available' : '❌ Not Available'}
          </span>

          <Link to={`/booking?bike=${bike.id}`} className="rent-btn">
            Rent Now
          </Link>
        </div>
      ))}
    </div>
  ) : (
    <div className="no-bikes">
      <h3> No Bikes Available</h3>
      <p>Please check back later.</p>
    </div>
  )}
</section>

      {/* Testimonials */}
      <section className="testimonials">
        <h2>What Our Customers Say</h2>
        <div className="testimonial-grid">
          <div className="testimonial-card">
            <p>"Amazing bikes and great service! Highly recommend."</p>
            <h4>- Rahul K.</h4>
            <span>⭐⭐⭐⭐⭐</span>
          </div>
          <div className="testimonial-card">
            <p>"Best bike rental experience in the city. Very professional."</p>
            <h4>- Priya S.</h4>
            <span>⭐⭐⭐⭐⭐</span>
          </div>
          <div className="testimonial-card">
            <p>"Affordable prices and well-maintained bikes. Will rent again!"</p>
            <h4>- Amit P.</h4>
            <span>⭐⭐⭐⭐⭐</span>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;