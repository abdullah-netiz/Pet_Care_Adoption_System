import { useAuth } from '../context/AuthContext';
import './Home.css';

const Home = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <div className="header-content">
          <h1>🐾 Pet Care & Adoption System</h1>
          {user && (
            <div className="user-info">
              <span>Welcome, {user.firstName} {user.lastName}! 👋</span>
              <span className="user-type-badge">
                {user.userType === 'adopter' ? '🏠 Adopter' : '🏥 Shelter'}
              </span>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      <main className="home-main">
        <div className="hero-section">
          <div className="hero-content">
            <h2>Find Your Perfect Companion 🏡</h2>
            <p>Connect with loving pets looking for their forever homes</p>
            
            <div className="stats-grid">
              <div className="stat-card">
                <span className="stat-icon">🐕</span>
                <h3>1,234</h3>
                <p>Dogs Adopted</p>
              </div>
              <div className="stat-card">
                <span className="stat-icon">🐱</span>
                <h3>987</h3>
                <p>Cats Adopted</p>
              </div>
              <div className="stat-card">
                <span className="stat-icon">🏠</span>
                <h3>156</h3>
                <p>Shelters</p>
              </div>
              <div className="stat-card">
                <span className="stat-icon">❤️</span>
                <h3>2,500+</h3>
                <p>Happy Families</p>
              </div>
            </div>
          </div>
        </div>

        <div className="features-section">
          <h3>How It Works 🎯</h3>
          <div className="features-grid">
            <div className="feature-card">
              <span className="feature-icon">🔍</span>
              <h4>Browse Pets</h4>
              <p>Search through our extensive database of loving pets waiting for homes</p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">💝</span>
              <h4>Connect</h4>
              <p>Get in touch with shelters and learn more about your potential companion</p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">🏡</span>
              <h4>Adopt</h4>
              <p>Complete the adoption process and welcome your new family member</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
