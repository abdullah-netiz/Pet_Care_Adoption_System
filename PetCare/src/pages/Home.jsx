import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './Home.css';

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <Navbar />

      <main className="home-main">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">Find Your Perfect Companion 🐾</h1>
              <p className="hero-subtitle">
                Connect with loving pets looking for their forever homes. 
                Give a pet a second chance at happiness.
              </p>
              {user && (
                <div className="welcome-message">
                  <span>Welcome back, <strong>{user.firstName} {user.lastName}</strong>! 👋</span>
                  <span className="user-type-badge">
                    {user.userType === 'adopter' ? '🏠 Adopter' : '🏥 Shelter'}
                  </span>
                </div>
              )}
              <div className="hero-cta">
                <button className="cta-primary" onClick={() => navigate('/browse')}>
                  Browse Pets
                </button>
                <button className="cta-secondary" onClick={() => navigate('/add-pet')}>
                  List a Pet
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="stats-section">
          <div className="stats-container">
            <div className="stat-item">
              <div className="stat-icon">🐕</div>
              <div className="stat-content">
                <h3 className="stat-number">1,234+</h3>
                <p className="stat-label">Dogs Adopted</p>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">🐱</div>
              <div className="stat-content">
                <h3 className="stat-number">987+</h3>
                <p className="stat-label">Cats Adopted</p>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">🏠</div>
              <div className="stat-content">
                <h3 className="stat-number">156+</h3>
                <p className="stat-label">Active Shelters</p>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">❤️</div>
              <div className="stat-content">
                <h3 className="stat-number">2,500+</h3>
                <p className="stat-label">Happy Families</p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="how-it-works-section">
          <h2 className="section-title">How It Works 🎯</h2>
          <p className="section-subtitle">Your journey to finding a perfect companion in 3 simple steps</p>
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">1</div>
              <div className="step-icon">🔍</div>
              <h3 className="step-title">Browse Pets</h3>
              <p className="step-description">
                Search through our extensive database of loving pets waiting for homes. 
                Filter by type, location, and characteristics.
              </p>
            </div>
            <div className="step-card">
              <div className="step-number">2</div>
              <div className="step-icon">💝</div>
              <h3 className="step-title">Connect</h3>
              <p className="step-description">
                Get in touch with shelters and learn more about your potential companion. 
                Ask questions and schedule visits.
              </p>
            </div>
            <div className="step-card">
              <div className="step-number">3</div>
              <div className="step-icon">🏡</div>
              <h3 className="step-title">Adopt</h3>
              <p className="step-description">
                Complete the adoption process and welcome your new family member. 
                Start a beautiful journey together!
              </p>
            </div>
          </div>
        </section>

        {/* Featured Pets Section */}
        <section className="featured-pets-section">
          <h2 className="section-title">Featured Pets �</h2>
          <p className="section-subtitle">Meet some of our amazing pets looking for homes</p>
          <div className="featured-pets-grid">
            <div className="featured-pet-card">
              <div className="featured-pet-image"></div>
              <div className="featured-pet-info">
                <h3>Max</h3>
                <p className="pet-type">Golden Retriever • 2 Years</p>
                <p className="pet-desc">Friendly and energetic, loves to play fetch!</p>
                <button className="learn-more-btn" onClick={() => navigate('/browse')}>
                  Learn More
                </button>
              </div>
            </div>
            <div className="featured-pet-card">
              <div className="featured-pet-image"></div>
              <div className="featured-pet-info">
                <h3>Luna</h3>
                <p className="pet-type">Siamese Cat • 1 Year</p>
                <p className="pet-desc">Calm and affectionate, perfect lap companion</p>
                <button className="learn-more-btn" onClick={() => navigate('/browse')}>
                  Learn More
                </button>
              </div>
            </div>
            <div className="featured-pet-card">
              <div className="featured-pet-image"></div>
              <div className="featured-pet-info">
                <h3>Charlie</h3>
                <p className="pet-type">Labrador • 3 Years</p>
                <p className="pet-desc">Great with kids, well-trained family dog</p>
                <button className="learn-more-btn" onClick={() => navigate('/browse')}>
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Why Adopt Section */}
        <section className="why-adopt-section">
          <h2 className="section-title">Why Adopt? 💕</h2>
          <div className="why-adopt-grid">
            <div className="reason-card">
              <span className="reason-icon">🌟</span>
              <h4>Save a Life</h4>
              <p>Give a rescued pet a second chance at happiness and a loving home</p>
            </div>
            <div className="reason-card">
              <span className="reason-icon">💰</span>
              <h4>Cost Effective</h4>
              <p>Adoption fees are much lower than buying from breeders or pet stores</p>
            </div>
            <div className="reason-card">
              <span className="reason-icon">🏥</span>
              <h4>Health Checked</h4>
              <p>All pets are vaccinated, spayed/neutered, and health screened</p>
            </div>
            <div className="reason-card">
              <span className="reason-icon">🤝</span>
              <h4>Expert Support</h4>
              <p>Get guidance and support from experienced shelter staff</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <div className="cta-content">
            <h2>Ready to Make a Difference? 🎉</h2>
            <p>Start your adoption journey today and bring home unconditional love</p>
            <button className="cta-large" onClick={() => navigate('/browse')}>
              Find Your Pet Today
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
