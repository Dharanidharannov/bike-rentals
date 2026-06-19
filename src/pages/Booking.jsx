import React, { useState, useEffect, useContext, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import useFetch from '../hooks/useFetch';
import './Booking.css';

function Booking() {
  const { theme } = useContext(AppContext);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const bikeId = searchParams.get('bike');
  const nameInputRef = useRef(null);

  const { data: bike } = useFetch(`http://localhost:5000/bikes/${bikeId}`);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    startDate: '',
    endDate: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Focus on name input on mount
  useEffect(() => {
    if (nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, []);

  // Form Validation
  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    else if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Phone must be 10 digits';
    if (!formData.startDate) newErrors.startDate = 'Start date is required';
    if (!formData.endDate) newErrors.endDate = 'End date is required';
    else if (new Date(formData.endDate) <= new Date(formData.startDate)) {
      newErrors.endDate = 'End date must be after start date';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      // Simulate API call
      setTimeout(() => {
        setIsSubmitted(true);
        setIsSubmitting(false);
        console.log('Booking submitted:', { ...formData, bikeId });
      }, 1500);
    } else {
      setErrors(newErrors);
      // Focus on first error field
      const firstError = Object.keys(newErrors)[0];
      const input = document.querySelector(`[name="${firstError}"]`);
      if (input) input.focus();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  if (isSubmitted) {
    return (
      <div className={`booking-success ${theme}`}>
        <h2>✅ Booking Confirmed!</h2>
        <p>Thank you, {formData.name}! Your booking has been confirmed.</p>
        <p>We'll send you a confirmation email at {formData.email}</p>
        <div className="booking-details-summary">
          <p><strong>Bike:</strong> {bike?.name || 'Selected Bike'}</p>
          <p><strong>Dates:</strong> {formData.startDate} to {formData.endDate}</p>
        </div>
        <button onClick={() => navigate('/bikes')}>Browse More Bikes</button>
      </div>
    );
  }

  return (
    <div className={`booking-container ${theme}`}>
      <h1>Book Your Bike</h1>

      {bike && (
        <div className="booking-bike-info">
          <span className="bike-icon">{bike.image || '🚲'}</span>
          <div>
            <h3>{bike.name}</h3>
            <p>₹{bike.price}/day</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="booking-form">
        <div className="form-group">
          <label>Full Name *</label>
          <input
            ref={nameInputRef}
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            className={errors.name ? 'error-input' : ''}
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label>Email *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className={errors.email ? 'error-input' : ''}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label>Phone *</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter 10-digit phone number"
            className={errors.phone ? 'error-input' : ''}
          />
          {errors.phone && <span className="error">{errors.phone}</span>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Start Date *</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              min={new Date().toISOString().split('T')[0]}
              className={errors.startDate ? 'error-input' : ''}
            />
            {errors.startDate && <span className="error">{errors.startDate}</span>}
          </div>

          <div className="form-group">
            <label>End Date *</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              min={formData.startDate || new Date().toISOString().split('T')[0]}
              className={errors.endDate ? 'error-input' : ''}
            />
            {errors.endDate && <span className="error">{errors.endDate}</span>}
          </div>
        </div>

        <div className="form-group">
          <label>Special Requests</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Any special requests..."
            rows="4"
          />
        </div>

        <button type="submit" className="submit-btn" disabled={isSubmitting}>
          {isSubmitting ? 'Booking...' : 'Confirm Booking'}
        </button>
      </form>
    </div>
  );
}

export default Booking;