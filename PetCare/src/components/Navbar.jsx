import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <span className="navbar-logo">🐾</span>
          <span className="navbar-title">Pet Care & Adoption</span>
        </Link>

        <div className="navbar-links">
          <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
            <span className="nav-icon">🏠</span>
            Home
          </Link>
          <Link to="/browse" className={`nav-link ${isActive('/browse') ? 'active' : ''}`}>
            <span className="nav-icon">🔍</span>
            Browse Pets
          </Link>
          <Link to="/about" className={`nav-link ${isActive('/about') ? 'active' : ''}`}>
            <span className="nav-icon">ℹ️</span>
            About
          </Link>
          <Link to="/contact" className={`nav-link ${isActive('/contact') ? 'active' : ''}`}>
            <span className="nav-icon">📧</span>
            Contact
          </Link>
        </div>

        <div className="navbar-actions">
          {user && (
            <>
              <Link to="/profile" className="profile-avatar-link" aria-label="Profile">
                <div className="nav-avatar">
                  {(user.firstName?.[0] || 'U')}{(user.lastName?.[0] || '')}
                </div>
              </Link>
              <button onClick={logout} className="nav-logout-btn">
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
