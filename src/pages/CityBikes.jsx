import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import useFetch from '../hooks/useFetch';
import './NestedBikes.css';

function CityBikes() {
  const { theme } = useContext(AppContext);
  const { data: bikes, loading } = useFetch('http://localhost:5000/bikes?type=city');

  return (
    <div className={`nested-bikes ${theme}`}>
      <h2>🏙️ City Bikes</h2>
      <p>Comfortable and stylish bikes for urban commuting</p>

      {loading ? (
        <div className="loading">Loading city bikes...</div>
      ) : bikes && bikes.length > 0 ? (
        <div className="bike-grid">
          {bikes.map((bike) => (
            <div key={bike.id} className="bike-item">
              <div className="bike-icon">{bike.image || '🚲'}</div>
              <h3>{bike.name}</h3>
              <p className="bike-price">₹{bike.price}/day</p>
              <span className={bike.available ? 'available' : 'unavailable'}>
                {bike.available ? '✅ Available' : '❌ Not Available'}
              </span>
              <Link to={`/booking?bike=${bike.id}`} className="book-btn">
                Book Now
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-bikes">No city bikes available</div>
      )}
    </div>
  );
}

export default CityBikes;