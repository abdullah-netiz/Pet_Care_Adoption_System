import { useState } from 'react';
import Navbar from '../components/Navbar';
import './Shelters.css';

const Shelters = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [distanceFilter, setDistanceFilter] = useState('5km');

  // Mock shelter data
  const shelters = [
    {
      id: 1,
      name: 'PetVerse Shelter - Block 7',
      rating: 4.6,
      reviews: 127,
      location: 'Block 7, Karachi, Pakistan',
      address: 'Block 7, Karachi, Pakistan',
      phone: '+92 xxx xxx 1234',
      email: 'karachi@petverse.com',
      hours: 'Mon-Sat: 10:00 AM - 6:00 PM',
      status: 'Open Now',
      distance: '1.2 km',
      availablePets: {
        dogs: 15,
        cats: 8,
        birds: 3,
        others: 2
      }
    },
    {
      id: 2,
      name: 'Happy Paws Rescue Center',
      rating: 4.6,
      reviews: 89,
      location: 'Clifton, Karachi, Pakistan',
      address: 'Main Clifton Road, Karachi',
      phone: '+92 xxx xxx 5678',
      email: 'info@happypaws.com',
      hours: 'Mon-Sat: 10:00 AM - 6:00 PM',
      status: 'Open Now',
      distance: '3.7 km',
      availablePets: {
        dogs: 23,
        cats: 18,
        birds: 5,
        others: 4
      }
    },
    {
      id: 3,
      name: 'Furry Friends Sanctuary',
      rating: 4.8,
      reviews: 156,
      location: 'DHA Phase 5, Karachi, Pakistan',
      address: 'DHA Phase 5, Karachi',
      phone: '+92 xxx xxx 9012',
      email: 'contact@furryfriends.com',
      hours: 'Mon-Sun: 9:00 AM - 7:00 PM',
      status: 'Open Now',
      distance: '4.5 km',
      availablePets: {
        dogs: 31,
        cats: 22,
        birds: 8,
        others: 6
      }
    },
    {
      id: 4,
      name: 'Paws & Claws Adoption Center',
      rating: 4.5,
      reviews: 94,
      location: 'Gulshan-e-Iqbal, Karachi',
      address: 'Block 13-D, Gulshan-e-Iqbal',
      phone: '+92 xxx xxx 3456',
      email: 'adopt@pawsclaws.com',
      hours: 'Mon-Sat: 11:00 AM - 5:00 PM',
      status: 'Open Now',
      distance: '5.8 km',
      availablePets: {
        dogs: 19,
        cats: 14,
        birds: 6,
        others: 3
      }
    },
    {
      id: 5,
      name: 'Animal Love Shelter',
      rating: 4.7,
      reviews: 112,
      location: 'Nazimabad, Karachi',
      address: 'Block 3, Nazimabad',
      phone: '+92 xxx xxx 7890',
      email: 'info@animallove.org',
      hours: 'Tue-Sun: 10:00 AM - 6:00 PM',
      status: 'Closed',
      distance: '7.2 km',
      availablePets: {
        dogs: 27,
        cats: 16,
        birds: 4,
        others: 5
      }
    },
    {
      id: 6,
      name: 'Safe Haven Pet Rescue',
      rating: 4.9,
      reviews: 203,
      location: 'Defence, Karachi',
      address: 'DHA Phase 2, Karachi',
      phone: '+92 xxx xxx 2468',
      email: 'rescue@safehaven.com',
      hours: 'Mon-Sat: 9:00 AM - 7:00 PM',
      status: 'Open Now',
      distance: '8.3 km',
      availablePets: {
        dogs: 42,
        cats: 28,
        birds: 12,
        others: 8
      }
    }
  ];

  const filteredShelters = shelters.filter(shelter =>
    shelter.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    shelter.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleGetDirections = (shelter) => {
    // In a real app, this would open Google Maps or similar
    alert(`Opening directions to ${shelter.name}`);
  };

  const handleViewPets = (shelterId) => {
    // In a real app, this would navigate to filtered browse page
    alert(`Viewing pets from shelter ${shelterId}`);
  };

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
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="shelters-controls">
          <div className="search-bar-shelters">
            <input
              type="text"
              placeholder="Search shelters..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input-shelters"
            />
            <button className="search-btn-near-me">Near me</button>
          </div>
          <select
            value={distanceFilter}
            onChange={(e) => setDistanceFilter(e.target.value)}
            className="distance-filter"
          >
            <option value="5km">Within 5km</option>
            <option value="10km">Within 10km</option>
            <option value="20km">Within 20km</option>
            <option value="50km">Within 50km</option>
          </select>
        </div>

        {/* Main Content: Map and Shelters List */}
        <div className="shelters-main-content">
          {/* Map Section */}
          <div className="map-section">
            <div className="interactive-map">
              <div className="map-placeholder">
                <div className="map-icon">🗺️</div>
                <p>Interactive Map View</p>
                <span className="map-subtext">Showing shelters in Karachi area</span>
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
                        <span className="star">⭐</span>
                        <span className="rating-value">{shelter.rating}</span>
                        <span className="reviews-count">({shelter.reviews} reviews)</span>
                        <span className="distance-badge">{shelter.distance}</span>
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
                      <span className={`status-badge ${shelter.status === 'Open Now' ? 'status-open' : 'status-closed'}`}>
                        {shelter.status}
                      </span>
                    </div>
                  </div>

                  <div className="available-pets">
                    <span className="pets-label">Available Pets:</span>
                    <div className="pets-count-grid">
                      <div className="pet-count-item">
                        <span className="pet-icon">🐕</span>
                        <span className="pet-number">{shelter.availablePets.dogs}</span>
                      </div>
                      <div className="pet-count-item">
                        <span className="pet-icon">🐱</span>
                        <span className="pet-number">{shelter.availablePets.cats}</span>
                      </div>
                      <div className="pet-count-item">
                        <span className="pet-icon">🦜</span>
                        <span className="pet-number">{shelter.availablePets.birds}</span>
                      </div>
                      <div className="pet-count-item">
                        <span className="pet-icon">🐰</span>
                        <span className="pet-number">{shelter.availablePets.others}</span>
                      </div>
                    </div>
                  </div>

                  <div className="shelter-actions">
                    <button 
                      className="btn-view-pets"
                      onClick={() => handleViewPets(shelter.id)}
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

        {/* Help Section */}
        <div className="help-section">
          <div className="help-content">
            <h2>Want to Help?</h2>
            <p>Support local shelters through volunteering or donations</p>
            <div className="help-buttons">
              <button className="btn-volunteer">Volunteer</button>
              <button className="btn-donate">Donate</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shelters;
