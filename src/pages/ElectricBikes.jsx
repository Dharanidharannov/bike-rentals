import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import useFetch from '../hooks/useFetch';
import './NestedBikes.css';

function ElectricBikes() {
  const { theme } = useContext(AppContext);
  const { data: bikes, loading } = useFetch('http://localhost:5000/bikes?type=electric');

  return (
    <div className={`nested-bikes ${theme}`}>
      <h2>⚡ Electric Bikes</h2>
      <p>Eco-friendly electric bikes with long battery life</p>

      {loading ? (
        <div className="loading">Loading electric bikes...</div>
      ) : bikes && bikes.length > 0 ? (
        <div className="bike-grid">
          {bikes.map((bike) => (
            <div key={bike.id} className="bike-item">
              <div className="bike-icon">{bike.image || '⚡'}</div>
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
        <div className="no-bikes">No electric bikes available</div>
      )}
    </div>
  );
}

export default ElectricBikes;