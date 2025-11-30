import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getPet, createAdoptionRequest, updatePet, deletePet } from '../services/firebaseService';
import Navbar from '../components/Navbar';
import './PetDetail.css';

const PetDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [pet, setPet] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [requestMessage, setRequestMessage] = useState('');
  const [isSubmittingRequest, setIsSubmittingRequest] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);

  useEffect(() => {
    loadPet();
  }, [id]);

  const loadPet = async () => {
    setIsLoading(true);
    setError('');
    try {
      const petData = await getPet(id);
      if (petData) {
        setPet(petData);
      } else {
        setError('Pet not found');
      }
    } catch (err) {
      console.error('Error loading pet:', err);
      setError('Failed to load pet details');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRequestAdoption = async () => {
    if (!requestMessage.trim()) {
      alert('Please write a message about why you want to adopt this pet');
      return;
    }

    setIsSubmittingRequest(true);
    try {
      await createAdoptionRequest({
        petId: pet.id,
        petName: pet.name,
        petType: pet.type,
        petImage: pet.imageUrl || '',
        adopterId: user.id,
        adopterName: `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.displayName || 'Anonymous',
        adopterEmail: user.email,
        adopterPhone: user.phone || '',
        ownerId: pet.ownerId,
        ownerName: pet.ownerName,
        ownerEmail: pet.ownerEmail,
        message: requestMessage
      });

      alert('Adoption request sent successfully! The pet owner will review your request.');
      setShowRequestModal(false);
      setRequestMessage('');
    } catch (err) {
      console.error('Error submitting request:', err);
      alert('Failed to submit adoption request. Please try again.');
    } finally {
      setIsSubmittingRequest(false);
    }
  };

  const handleEditPet = () => {
    // Navigate to edit page (would need to create an edit page)
    alert('Edit functionality - would navigate to edit page');
  };

  const handleDeletePet = async () => {
    if (window.confirm('Are you sure you want to delete this pet listing?')) {
      try {
        await deletePet(pet.id);
        alert('Pet listing deleted successfully');
        navigate('/browse-pets');
      } catch (err) {
        console.error('Error deleting pet:', err);
        alert('Failed to delete pet listing');
      }
    }
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

  if (isLoading) {
    return (
      <div className="pet-detail-page">
        <Navbar />
        <div className="loading-container">
          <div className="loading-spinner-large"></div>
          <p>Loading pet details...</p>
        </div>
      </div>
    );
  }

  if (error || !pet) {
    return (
      <div className="pet-detail-page">
        <Navbar />
        <div className="error-container">
          <div className="error-icon">😿</div>
          <h2>{error || 'Pet not found'}</h2>
          <button onClick={() => navigate('/browse-pets')} className="back-btn">
            Back to Browse
          </button>
        </div>
      </div>
    );
  }

  const isOwner = user?.id === pet.ownerId;
  const isAdopter = user?.userType === 'adopter';
  const quickInfoItems = [
    { label: 'Age', value: pet.age || 'Not provided', icon: '🎂' },
    { label: 'Gender', value: pet.gender || 'Not provided', icon: pet.gender === 'Male' ? '♂️' : pet.gender === 'Female' ? '♀️' : '⚧' },
    { label: 'Size', value: pet.size || 'Not provided', icon: '📏' },
    pet.breed ? { label: 'Breed', value: pet.breed, icon: '🐾' } : null,
  ].filter(Boolean);

  return (
    <div className="pet-detail-page">
      <Navbar />
      
      <div className="pet-detail-container">
        <button onClick={() => navigate('/browse-pets')} className="back-button">
          ← Back to Browse
        </button>

        <div className="pet-detail-content">
          <div className="pet-detail-image-section">
            {pet.imageUrl ? (
              <img src={pet.imageUrl} alt={pet.name} className="pet-detail-image" />
            ) : (
              <div className="pet-detail-placeholder">
                <span className="pet-placeholder-emoji-large">
                  {getPetEmoji(pet.type)}
                </span>
              </div>
            )}
            
            <div className="pet-status-badge">
              {pet.status === 'available' ? '✓ Available' : '❌ Not Available'}
            </div>
          </div>

          <div className="pet-detail-info-section">
            <div className="pet-detail-header">
              <div>
                <h1 className="pet-detail-name">{pet.name}</h1>
                <div className="pet-detail-type-badge">{pet.type}</div>
              </div>
              
              {isOwner && (
                <div className="owner-actions">
                  <button onClick={handleEditPet} className="edit-btn" title="Edit">
                    ✏️
                  </button>
                  <button onClick={handleDeletePet} className="delete-btn" title="Delete">
                    🗑️
                  </button>
                </div>
              )}
            </div>

            {quickInfoItems.length > 0 && (
              <div className="pet-detail-quick-info">
                {quickInfoItems.map((item) => (
                  <div className="quick-info-item" key={item.label}>
                    <span className="info-icon">{item.icon}</span>
                    <div>
                      <span className="info-label">{item.label}</span>
                      <span className="info-value">{item.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {pet.city && (
              <div className="section-card">
                <div className="pet-location-section">
                  <span className="location-icon">📍</span>
                  <div>
                    <p className="location-label">Currently in</p>
                    <p className="location-text">{pet.city}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="pet-detail-section section-card">
              <h2>About {pet.name}</h2>
              <p className="pet-description-full">{pet.description || 'No description provided. Reach out to the shelter for more information.'}</p>
            </div>

            {pet.medicalHistory && (
              <div className="pet-detail-section section-card">
                <h2>Medical History</h2>
                <p className="pet-medical-info">{pet.medicalHistory}</p>
              </div>
            )}

            <div className="pet-detail-section section-card">
              <h2>Health Status</h2>
              <div className="health-badges">
                {pet.vaccinated && (
                  <div className="health-badge positive">
                    <span className="badge-icon">✓</span>
                    Vaccinated
                  </div>
                )}
                {pet.spayedNeutered && (
                  <div className="health-badge positive">
                    <span className="badge-icon">✓</span>
                    Spayed/Neutered
                  </div>
                )}
                {!pet.vaccinated && !pet.spayedNeutered && (
                  <p className="no-info">No health information provided</p>
                )}
              </div>
            </div>

            <div className="pet-detail-section section-card">
              <h2>Contact Information</h2>
              <div className="contact-info">
                <div className="contact-item">
                  <span className="contact-icon">👤</span>
                  <span className="contact-text">{pet.ownerName}</span>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">📧</span>
                  <span className="contact-text">{pet.ownerEmail}</span>
                </div>
                {pet.ownerPhone && (
                  <div className="contact-item">
                    <span className="contact-icon">📱</span>
                    <span className="contact-text">{pet.ownerPhone}</span>
                  </div>
                )}
              </div>
            </div>

            {isAdopter && pet.status === 'available' && !isOwner && (
              <div className="adoption-action-section">
                <button 
                  onClick={() => setShowRequestModal(true)}
                  className="request-adoption-btn"
                >
                  <span className="btn-icon">💝</span>
                  Request to Adopt {pet.name}
                </button>
              </div>
            )}

            {!isAdopter && !isOwner && (
              <div className="info-message">
                <p>ℹ️ Only adopters can request adoptions. Switch to an adopter account to adopt this pet.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Adoption Request Modal */}
      {showRequestModal && (
        <div className="modal-overlay" onClick={() => setShowRequestModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Request to Adopt {pet.name}</h2>
              <button 
                onClick={() => setShowRequestModal(false)}
                className="modal-close"
              >
                ×
              </button>
            </div>

            <div className="modal-body">
              <p className="modal-description">
                Tell the owner why you'd like to adopt {pet.name} and how you'll provide a loving home.
              </p>
              
              <textarea
                value={requestMessage}
                onChange={(e) => setRequestMessage(e.target.value)}
                placeholder="Write your message here..."
                rows="6"
                className="request-message-input"
              />
            </div>

            <div className="modal-footer">
              <button 
                onClick={() => setShowRequestModal(false)}
                className="modal-cancel-btn"
                disabled={isSubmittingRequest}
              >
                Cancel
              </button>
              <button 
                onClick={handleRequestAdoption}
                className="modal-submit-btn"
                disabled={isSubmittingRequest || !requestMessage.trim()}
              >
                {isSubmittingRequest ? 'Sending...' : 'Send Request'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PetDetail;
