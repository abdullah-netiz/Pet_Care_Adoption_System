import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { getAllShelters, createShelter, getAllPets } from '../services/firebaseService';
import './Shelters.css';

const Shelters = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [shelters, setShelters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [newShelter, setNewShelter] = useState({
    name: '',
    location: '',
    address: '',
    phone: '',
    email: '',
    hours: '',
    description: ''
  });

  useEffect(() => {
    loadShelters();
  }, []);

  const loadShelters = async () => {
    try {
      setLoading(true);
      const fetchedShelters = await getAllShelters();
      
      // Get pet counts for each shelter
      const sheltersWithCounts = await Promise.all(
        fetchedShelters.map(async (shelter) => {
          try {
            const pets = await getAllPets({ ownerId: shelter.ownerId });
            const petCounts = {
              dogs: pets.filter(p => p.type === 'Dog').length,
              cats: pets.filter(p => p.type === 'Cat').length,
              birds: pets.filter(p => p.type === 'Bird').length,
              others: pets.filter(p => !['Dog', 'Cat', 'Bird'].includes(p.type)).length
            };
            return { ...shelter, availablePets: petCounts };
          } catch (error) {
            console.error(`Error loading pets for shelter ${shelter.id}:`, error);
            return { ...shelter, availablePets: { dogs: 0, cats: 0, birds: 0, others: 0 } };
          }
        })
      );

      setShelters(sheltersWithCounts);
    } catch (error) {
      console.error('Error loading shelters:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredShelters = shelters.filter(shelter =>
    shelter.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    shelter.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleGetDirections = (shelter) => {
    // Open Google Maps with the shelter address
    const query = encodeURIComponent(shelter.address);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  const handleViewPets = (shelter) => {
    // Navigate to browse pets with shelter filter
    navigate(`/browse-pets?shelter=${shelter.ownerId}`);
  };

  const handleRegisterShelter = async (e) => {
    e.preventDefault();
    
    if (!user) {
      alert('Please log in to register your shelter');
      return;
    }

    if (user.userType !== 'shelter') {
      alert('Only shelter/owner accounts can register shelters');
      return;
    }

    try {
      setSubmitting(true);
      
      const shelterData = {
        ...newShelter,
        ownerId: user.id,
        ownerName: `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.displayName || 'Anonymous',
        ownerEmail: user.email
      };
      
      console.log('Registering shelter with data:', shelterData);

      await createShelter(shelterData);
      
      // Reset form and close modal
      setNewShelter({
        name: '',
        location: '',
        address: '',
        phone: '',
        email: '',
        hours: '',
        description: ''
      });
      setShowRegisterModal(false);
      
      // Reload shelters
      await loadShelters();
      
      alert('Your shelter has been registered successfully!');
    } catch (error) {
      console.error('Error registering shelter:', error);
      alert('Failed to register shelter. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const isUserShelterRegistered = shelters.some(s => s.ownerId === user?.id);

  return (
    <div className="shelters-page">
      <Navbar />
      
      <div className="shelters-container">
        {/* Header Section */}
        <div className="shelters-header">
          <div className="header-content">
            <div className="location-icon">📍</div>
            <h1>Find Pet Shelters Near You</h1>
            <p>Discover local shelters and rescue organizations</p>
            {user && user.userType === 'shelter' && !isUserShelterRegistered && (
              <button 
                className="btn-register-shelter"
                onClick={() => setShowRegisterModal(true)}
              >
                Register Your Shelter
              </button>
            )}
          </div>
        </div>

        {/* Search Bar */}
        <div className="shelters-controls">
          <div className="search-bar-shelters">
            <input
              type="text"
              placeholder="Search shelters by name or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input-shelters"
            />
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="loading-container">
            <p>Loading shelters...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && shelters.length === 0 && (
          <div className="empty-state-shelters">
            <h3>No shelters registered yet</h3>
            <p>Be the first to register your shelter!</p>
            {user && user.userType === 'shelter' && (
              <button 
                className="btn-register-shelter"
                onClick={() => setShowRegisterModal(true)}
              >
                Register Your Shelter
              </button>
            )}
          </div>
        )}

        {/* Main Content: Map and Shelters List */}
        {!loading && filteredShelters.length > 0 && (
          <div className="shelters-main-content">
            {/* Map Section */}
            <div className="map-section">
              <div className="interactive-map">
                <div className="map-placeholder">
                  <div className="map-icon">🗺️</div>
                  <p>Interactive Map View</p>
                  <span className="map-subtext">Showing {filteredShelters.length} shelters</span>
                </div>
              </div>
            </div>

            {/* Shelters List Section */}
            <div className="shelters-list-section">
              <h2 className="results-count">{filteredShelters.length} Shelters Found</h2>
              
              <div className="shelters-list">
                {filteredShelters.map((shelter) => (
                  <div key={shelter.id} className="shelter-card">
                    <div className="shelter-card-header">
                      <div>
                        <h3 className="shelter-name">{shelter.name}</h3>
                        <div className="shelter-rating">
                          <span className="location-text">📍 {shelter.location}</span>
                        </div>
                      </div>
                    </div>

                    <div className="shelter-details">
                      <div className="detail-item">
                        <span className="detail-icon">📍</span>
                        <span className="detail-text">{shelter.address}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-icon">📞</span>
                        <span className="detail-text">{shelter.phone}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-icon">📧</span>
                        <span className="detail-text">{shelter.email}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-icon">🕐</span>
                        <span className="detail-text">{shelter.hours}</span>
                      </div>
                    </div>

                    {shelter.description && (
                      <div className="shelter-description">
                        <p>{shelter.description}</p>
                      </div>
                    )}

                    <div className="available-pets">
                      <span className="pets-label">Available Pets:</span>
                      <div className="pets-count-grid">
                        <div className="pet-count-item">
                          <span className="pet-icon">🐕</span>
                          <span className="pet-number">{shelter.availablePets?.dogs || 0}</span>
                        </div>
                        <div className="pet-count-item">
                          <span className="pet-icon">🐱</span>
                          <span className="pet-number">{shelter.availablePets?.cats || 0}</span>
                        </div>
                        <div className="pet-count-item">
                          <span className="pet-icon">🦜</span>
                          <span className="pet-number">{shelter.availablePets?.birds || 0}</span>
                        </div>
                        <div className="pet-count-item">
                          <span className="pet-icon">🐰</span>
                          <span className="pet-number">{shelter.availablePets?.others || 0}</span>
                        </div>
                      </div>
                    </div>

                    <div className="shelter-actions">
                      <button 
                        className="btn-view-pets"
                        onClick={() => handleViewPets(shelter)}
                      >
                        View Pets
                      </button>
                      <button 
                        className="btn-get-directions"
                        onClick={() => handleGetDirections(shelter)}
                      >
                        Get Directions
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Help Section */}
        <div className="help-section">
          <div className="help-content">
            <h2>Want to Help?</h2>
            <p>Support local shelters through volunteering or donations</p>
            <div className="help-buttons">
              <button className="btn-volunteer" onClick={() => alert('Volunteer program coming soon!')}>
                Volunteer
              </button>
              <button className="btn-donate" onClick={() => alert('Donation system coming soon!')}>
                Donate
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Register Shelter Modal */}
      {showRegisterModal && (
        <div className="modal-backdrop" onClick={() => !submitting && setShowRegisterModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Register Your Shelter</h2>
            <form onSubmit={handleRegisterShelter}>
              <div className="form-group">
                <label>Shelter Name *</label>
                <input
                  type="text"
                  value={newShelter.name}
                  onChange={(e) => setNewShelter({ ...newShelter, name: e.target.value })}
                  required
                  placeholder="e.g., Happy Paws Rescue Center"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>City/Location *</label>
                  <input
                    type="text"
                    value={newShelter.location}
                    onChange={(e) => setNewShelter({ ...newShelter, location: e.target.value })}
                    required
                    placeholder="e.g., Karachi"
                  />
                </div>

                <div className="form-group">
                  <label>Phone *</label>
                  <input
                    type="tel"
                    value={newShelter.phone}
                    onChange={(e) => setNewShelter({ ...newShelter, phone: e.target.value })}
                    required
                    placeholder="+92 xxx xxx xxxx"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Full Address *</label>
                <input
                  type="text"
                  value={newShelter.address}
                  onChange={(e) => setNewShelter({ ...newShelter, address: e.target.value })}
                  required
                  placeholder="Street address for directions"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Email *</label>
                  <input
                    type="email"
                    value={newShelter.email}
                    onChange={(e) => setNewShelter({ ...newShelter, email: e.target.value })}
                    required
                    placeholder="contact@shelter.com"
                  />
                </div>

                <div className="form-group">
                  <label>Operating Hours *</label>
                  <input
                    type="text"
                    value={newShelter.hours}
                    onChange={(e) => setNewShelter({ ...newShelter, hours: e.target.value })}
                    required
                    placeholder="e.g., Mon-Sat: 10 AM - 6 PM"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={newShelter.description}
                  onChange={(e) => setNewShelter({ ...newShelter, description: e.target.value })}
                  placeholder="Tell people about your shelter..."
                  rows={4}
                  maxLength={500}
                />
                <span className="char-count">{newShelter.description.length}/500</span>
              </div>

              <div className="modal-actions">
                <button 
                  type="button" 
                  className="btn-cancel"
                  onClick={() => setShowRegisterModal(false)}
                  disabled={submitting}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn-submit"
                  disabled={submitting}
                >
                  {submitting ? 'Registering...' : 'Register Shelter'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Shelters;
