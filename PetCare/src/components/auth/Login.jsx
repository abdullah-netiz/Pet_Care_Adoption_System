import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Auth.css';

const Login = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {k,k  
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate loading time for better UX
    setTimeout(() => {
      // Mock successful login for frontend design purposes
      const mockUser = {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: formData.email,
        userType: 'adopter'
      };
      const mockToken = 'mock-jwt-token-12345';
      
      console.log('Mock login successful');
      login(mockUser, mockToken);
      setIsLoading(false);
    }, 1500); // 1.5 second delay to show loading state

    // TODO: Replace with actual API call when backend is ready
    /*
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', formData);
      console.log('Login successful:', response.data);
      login(response.data.user, response.data.token);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
    */
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="pet-icon">
            🐾
          </div>
          <h2>Welcome Back!</h2>
          <p>Sign in to continue your pet care journey</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="error-message">{error}</div>}
          
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
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="auth-button" disabled={isLoading}>
            {isLoading ? (
              <>
                <span className="loading-spinner"></span>
                Signing In...
              </>
            ) : (
              <>
                <span className="icon">🐕</span>
                Sign In
              </>
            )}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Don't have an account?{' '}
            <Link to="/register" className="auth-link">
              Join our pet family! 🐱
            </Link>
          </p>
        </div>

        <div className="pet-decorations">
          <span className="decoration-paw">🐾</span>
          <span className="decoration-heart">💝</span>
          <span className="decoration-bone">🦴</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
