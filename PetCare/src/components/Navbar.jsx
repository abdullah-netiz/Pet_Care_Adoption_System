import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Notifications from './Notifications';
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
            Home
          </Link>
          <Link to="/browse-pets" className={`nav-link ${isActive('/browse-pets') ? 'active' : ''}`}>
            Browse Pets
          </Link>
          <Link to="/shelters" className={`nav-link ${isActive('/shelters') ? 'active' : ''}`}>
            Shelters
          </Link>
          <Link to="/stories" className={`nav-link ${isActive('/stories') ? 'active' : ''}`}>
            Stories
          </Link>
          <Link to="/resources" className={`nav-link ${isActive('/resources') ? 'active' : ''}`}>
            Resources
          </Link>
        </div>

        <div className="navbar-actions">
          {user && (
            <>
              <Notifications />
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
