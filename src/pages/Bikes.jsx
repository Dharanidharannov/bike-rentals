import React, { useState, useEffect, useContext } from 'react';
import { Link, Outlet, useSearchParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import useFetch from '../hooks/useFetch';
import './Bikes.css';

function Bikes() {
  const { theme } = useContext(AppContext);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const { data: allBikes, loading } = useFetch('http://localhost:5000/bikes');
  const [filteredBikes, setFilteredBikes] = useState([]);

  useEffect(() => {
    if (allBikes) {
      if (searchQuery) {
        const filtered = allBikes.filter(bike =>
          bike.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          bike.type.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredBikes(filtered);
      } else {
        setFilteredBikes(allBikes);
      }
    }
  }, [allBikes, searchQuery]);

  return (
    <div className={`bikes-container ${theme}`}>
      <h1>Our Bikes</h1>

      {/* Category Navigation - Nested Routing Links */}
      <div className="bike-categories">
        <Link to="/bikes">All Bikes</Link>
        <Link to="/bikes/mountain">🏔️ Mountain</Link>
        <Link to="/bikes/city">🏙️ City</Link>
        <Link to="/bikes/electric">⚡ Electric</Link>
      </div>

      {/* Search Result Info */}
      {searchQuery && (
        <p className="search-info">
          Showing results for: <strong>"{searchQuery}"</strong>
          <span> ({filteredBikes.length} bikes found)</span>
        </p>
      )}

      {/* Show All Bikes when no nested route */}
      {!searchParams.get('type') && (
        <>
          {loading ? (
            <div className="loading">Loading bikes...</div>
          ) : (
            <div className="bikes-grid">
              {filteredBikes.map((bike) => (
                <div key={bike.id} className="bike-item">
                  <div className="bike-icon">{bike.image || '🚲'}</div>
                  <h3>{bike.name}</h3>
                  <p className="bike-type">{bike.type}</p>
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
          )}
        </>
      )}

      {/* Nested Routes will render here */}
      <div className="nested-content">
        <Outlet />
      </div>
    </div>
  );
}

export default Bikes;