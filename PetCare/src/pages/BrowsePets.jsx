import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getAllPets } from '../services/firebaseService';
import Navbar from '../components/Navbar';
import './BrowsePets.css';

const BrowsePets = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [filters, setFilters] = useState({
    petType: '',
    city: '',
  });
  const [pets, setPets] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadPets();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, pets]);

  const loadPets = async () => {
    setIsLoading(true);
    setError('');
    try {
      const allPets = await getAllPets({ status: 'available' });
      setPets(allPets);
      setFilteredPets(allPets);
    } catch (err) {
      console.error('Error loading pets:', err);
      setError('Failed to load pets. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const applyFilters = () => {
    let result = [...pets];

    if (filters.petType) {
      result = result.filter(pet => pet.type === filters.petType);
    }

    if (filters.city) {
      result = result.filter(pet => 
        pet.city?.toLowerCase().includes(filters.city.toLowerCase())
      );
    }

    setFilteredPets(result);
  };



  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => {
    applyFilters();
  };

  const handlePetClick = (petId) => {
    navigate(`/pet/${petId}`);
  };

  const getPetEmoji = (type) => {
    const emojiMap = {
      'Dog': '🐕',
      'Cat': '🐱',
      'Bird': '🦜',
      'Rabbit': '🐰',
      'Other': '🐾'
    };
    return emojiMap[type] || '🐾';
  };

  console.log("filteredPets:", filteredPets);

  return (
    <div className="browse-pets-page">
      <Navbar />
      
      <div className="browse-container">
        <div className="browse-header">
          <h1>Browse by Pet type and City</h1>
          
          <div className="filter-bar">
            <select
              name="petType"
              value={filters.petType}
              onChange={handleFilterChange}
              className="filter-select"
            >
              <option value="">All Pet Types</option>
              <option value="Dog">🐕 Dogs</option>
              <option value="Cat">🐱 Cats</option>
              <option value="Bird">🦜 Birds</option>
              <option value="Rabbit">🐰 Rabbits</option>
              <option value="Other">🐾 Other</option>
            </select>

            <input
              type="text"
              name="city"
              value={filters.city}
              onChange={handleFilterChange}
              placeholder="Enter city..."
              className="filter-select"
            />

            <button className="search-btn" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="loading-container">
            <div className="loading-spinner-large"></div>
            <p>Loading pets...</p>
          </div>
        ) : error ? (
          <div className="error-container">
            <p className="error-text">{error}</p>
            <button onClick={loadPets} className="retry-btn">Retry</button>
          </div>
        ) : (
          <>
            <div className="results-summary">
              <h2>{filteredPets.length} Pets Available for Adoption</h2>
              {user?.userType === 'shelter' && (
                <button 
                  onClick={() => navigate('/add-pet')}
                  className="add-pet-btn"
                >
                  + List New Pet
                </button>
              )}
            </div>

            {filteredPets.length === 0 ? (
              <div className="no-results">
                <div className="no-results-icon">🐾</div>
                <h3>No pets found</h3>
                <p>Try adjusting your filters or check back later</p>
                {user?.userType === 'shelter' && (
                  <button 
                    onClick={() => navigate('/add-pet')}
                    className="add-first-pet-btn"
                  >
                    List Your First Pet
                  </button>
                )}
              </div>
            ) : (
              <div className="pets-grid">
                {filteredPets.map((pet) => (
                  <div 
                    key={pet.id} 
                    className="pet-card"
                    onClick={() => handlePetClick(pet.id)}
                  >
                    <div className="pet-card-image">
                      {pet.imageUrl ? (
                        <img src={pet.imageUrl} alt={pet.name} />
                      ) : (
                        <div className="pet-card-placeholder">
                          <span className="pet-placeholder-emoji">
                            {getPetEmoji(pet.type)}
                          </span>
                        </div>
                      )}
                      <div className="pet-card-badge">{pet.type}</div>
                    </div>

                    <div className="pet-card-content">
                      <h3 className="pet-card-name">{pet.name}</h3>
                      
                      <div className="pet-card-details">
                        <div className="pet-detail-item">
                          <span className="detail-icon">🎂</span>
                          <span className="detail-text">{pet.age}</span>
                        </div>
                        <div className="pet-detail-item">
                          <span className="detail-icon">
                            {pet.gender === 'Male' ? '♂️' : '♀️'}
                          </span>
                          <span className="detail-text">{pet.gender}</span>
                        </div>
                        <div className="pet-detail-item">
                          <span className="detail-icon">📏</span>
                          <span className="detail-text">{pet.size}</span>
                        </div>
                      </div>

                      {pet.city && (
                        <div className="pet-location">
                          <span className="location-icon">📍</span>
                          <span className="location-text">{pet.city}</span>
                        </div>
                      )}

                      <p className="pet-description">
                        {pet.description?.substring(0, 100)}
                        {pet.description?.length > 100 ? '...' : ''}
                      </p>

                      <div className="pet-tags">
                        {pet.vaccinated && (
                          <span className="pet-tag">✓ Vaccinated</span>
                        )}
                        {pet.spayedNeutered && (
                          <span className="pet-tag">✓ Spayed/Neutered</span>
                        )}
                      </div>

                      <button className="view-details-btn">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BrowsePets;
