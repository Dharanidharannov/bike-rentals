import React, { useReducer, useState, useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import useFetch from '../hooks/useFetch';
import './Admin.css';

// Reducer for bike management
const bikeReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, bikes: action.payload };
    case 'ADD_BIKE':
      return { ...state, bikes: [...state.bikes, action.payload] };
    case 'DELETE_BIKE':
      return { ...state, bikes: state.bikes.filter(bike => bike.id !== action.payload) };
    case 'SET_ERROR':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const initialState = {
  bikes: [],
  loading: false,
  error: null
};

function Admin() {
  const { theme } = useContext(AppContext);
  const { data: fetchedBikes, loading: fetchLoading } = useFetch('http://localhost:5000/bikes');
  const [state, dispatch] = useReducer(bikeReducer, initialState);
  const [newBike, setNewBike] = useState({
    name: '',
    type: '',
    price: '',
    image: '🚲',
    available: true
  });
  const [isAdding, setIsAdding] = useState(false);

  // Load bikes from API
  useEffect(() => {
    if (fetchedBikes) {
      dispatch({ type: 'FETCH_SUCCESS', payload: fetchedBikes });
    }
  }, [fetchedBikes]);

  const handleAddBike = (e) => {
    e.preventDefault();
    setIsAdding(true);
    const bike = {
      id: Date.now(),
      ...newBike,
      price: parseInt(newBike.price)
    };
    dispatch({ type: 'ADD_BIKE', payload: bike });
    setNewBike({ name: '', type: '', price: '', image: '🚲', available: true });
    setIsAdding(false);
    alert('✅ Bike added successfully!');
  };

  // Delete bike (CRUD - Delete)
  const handleDeleteBike = (id) => {
    if (window.confirm('Are you sure you want to delete this bike?')) {
      dispatch({ type: 'DELETE_BIKE', payload: id });
      alert('✅ Bike deleted successfully!');
    }
  };

  return (
    <div className={`admin-container ${theme}`}>
      <h1>Admin Dashboard</h1>

      <div className="admin-content">
        {/* Add Bike Form */}
        <div className="admin-form">
          <h2>Add New Bike</h2>
          <form onSubmit={handleAddBike}>
            <input
              type="text"
              placeholder="Bike Name"
              value={newBike.name}
              onChange={(e) => setNewBike({ ...newBike, name: e.target.value })}
              required
            />
            <select
              value={newBike.type}
              onChange={(e) => setNewBike({ ...newBike, type: e.target.value })}
              required
            >
              <option value="">Select Type</option>
              <option value="mountain">Mountain</option>
              <option value="city">City</option>
              <option value="sports">Sports</option>
              <option value="electric">Electric</option>
            </select>
            <input
              type="number"
              placeholder="Price per day"
              value={newBike.price}
              onChange={(e) => setNewBike({ ...newBike, price: e.target.value })}
              required
            />
            <select
              value={newBike.image}
              onChange={(e) => setNewBike({ ...newBike, image: e.target.value })}
            >
              <option value="🚲">🚲 City</option>
              <option value="🚵">🚵 Mountain</option>
              <option value="🏍️">🏍️ Sports</option>
              <option value="⚡">⚡ Electric</option>
              <option value="🛵">🛵 Vintage</option>
            </select>
            <button type="submit" disabled={isAdding}>
              {isAdding ? 'Adding...' : 'Add Bike'}
            </button>
          </form>
        </div>

        {/* Bike List */}
        <div className="admin-list">
          <h2>Manage Bikes ({state.bikes.length})</h2>
          {fetchLoading ? (
            <div className="loading">Loading bikes...</div>
          ) : state.bikes.length === 0 ? (
            <p className="no-bikes">No bikes available</p>
          ) : (
            <div className="bike-list">
              {state.bikes.map((bike) => (
                <div key={bike.id} className="admin-bike-item">
                  <div className="bike-info">
                    <span className="bike-icon">{bike.image || '🚲'}</span>
                    <span className="bike-name">{bike.name}</span>
                  </div>
                  <span className="bike-type-tag">{bike.type}</span>
                  <span className="bike-price-tag">₹{bike.price}</span>
                  <span className={bike.available ? 'available' : 'unavailable'}>
                    {bike.available ? 'Available' : 'Unavailable'}
                  </span>
                  <button onClick={() => handleDeleteBike(bike.id)} className="delete-btn">
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Admin;