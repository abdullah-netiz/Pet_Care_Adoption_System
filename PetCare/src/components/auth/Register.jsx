import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '../../context/AuthContext';
import './Auth.css';

const Register = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    userType: 'adopter' // adopter or shelter
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    // Simulate loading time for better UX
    setTimeout(() => {
      // Mock successful registration for frontend design purposes
      console.log('Mock registration successful');
      setSuccess('Account created successfully! Logging you in...');
      
      // Mock user data from registration form
      const mockUser = {
        id: Date.now(), // Simple ID generation for mock
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        userType: formData.userType
      };
      const mockToken = 'mock-jwt-token-' + Date.now();
      
      // Clear form
      const clearedForm = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        userType: 'adopter'
      };
      setFormData(clearedForm);
      
      setIsLoading(false);
      
      // Auto login after 1.5 seconds to show success message
      setTimeout(() => {
        login(mockUser, mockToken);
      }, 1500);
    }, 1500); // 1.5 second delay to show loading state

    // TODO: Replace with actual API call when backend is ready
    /*
    try {
      const { confirmPassword, ...submitData } = formData;
      const response = await axios.post('http://localhost:5000/api/auth/register', submitData);
      console.log('Registration successful:', response.data);
      setSuccess('Account created successfully! You can now sign in.');
      // Clear form and handle success
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
    */
  };

  return (
    <div className="auth-container">
      <div className="auth-card register-card">
        <div className="auth-header">
          <div className="pet-icon">
            🏡
          </div>
          <h2>Join Our Pet Family!</h2>
          <p>Create an account to start your pet adoption journey</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">
                <span className="icon">👤</span>
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Your first name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastName">
                <span className="icon">👤</span>
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Your last name"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">
              <span className="icon">📧</span>
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">
              <span className="icon">📱</span>
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="userType">
              <span className="icon">🏠</span>
              I am a...
            </label>
            <select
              id="userType"
              name="userType"
              value={formData.userType}
              onChange={handleChange}
              required
            >
              <option value="adopter">Pet Adopter 🐾</option>
              <option value="shelter">Pet Shelter/Rescue 🏥</option>
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="password">
                <span className="icon">🔒</span>
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create password"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">
                <span className="icon">✅</span>
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password"
                required
              />
            </div>
          </div>

          <button type="submit" className="auth-button" disabled={isLoading}>
            {isLoading ? (
              <>
                <span className="loading-spinner"></span>
                Creating Account...
              </>
            ) : (
              <>
                <span className="icon">🎉</span>
                Create Account
              </>
            )}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Already have an account?{' '}
            <Link to="/login" className="auth-link">
              Sign in here! 🐕
            </Link>
          </p>
        </div>

        <div className="pet-decorations">
          <span className="decoration-paw">🐾</span>
          <span className="decoration-heart">💝</span>
          <span className="decoration-bone">🦴</span>
          <span className="decoration-cat">🐱</span>
        </div>
      </div>
    </div>
  );
};

export default Register;
