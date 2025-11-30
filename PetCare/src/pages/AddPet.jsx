import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { createPet } from '../services/firebaseService';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';
import Navbar from '../components/Navbar';
import './AddPet.css';

const AddPet = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [uploadMethod, setUploadMethod] = useState('url'); // 'url' or 'file'
  const [imageUrl, setImageUrl] = useState('');
  
  const [petData, setPetData] = useState({
    name: '',
    type: 'Dog',
    breed: '',
    age: '',
    gender: 'Male',
    size: 'Medium',
    description: '',
    medicalHistory: '',
    vaccinated: false,
    spayedNeutered: false,
    city: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPetData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      let finalImageUrl = '';
      
      // Use URL directly if provided
      if (uploadMethod === 'url' && imageUrl.trim()) {
        finalImageUrl = imageUrl.trim();
      }
      // Skip file upload - Firebase Storage not available
      // If you enable Firebase Storage later, uncomment this:
      /*
      else if (uploadMethod === 'file' && imageFile) {
        const storageRef = ref(storage, `pets/${user.id}/${Date.now()}_${imageFile.name}`);
        await uploadBytes(storageRef, imageFile);
        finalImageUrl = await getDownloadURL(storageRef);
      }
      */

      // Create pet in Firestore
      const result = await createPet({
        ...petData,
        imageUrl: finalImageUrl,
        ownerId: user.id,
        ownerName: `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.displayName || 'Anonymous',
        ownerEmail: user.email,
        ownerPhone: user.phone || ''
      });

      if (result.success) {
        alert('Pet listed successfully!');
        navigate('/browse-pets');
      }
    } catch (err) {
      console.error('Error adding pet:', err);
      console.error('Full error details:', err.message, err.code);
      setError(`Failed to add pet: ${err.message || 'Please try again.'}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Only allow shelter/owner users to add pets
  if (user?.userType === 'adopter') {
    return (
      <div className="add-pet-page">
        <Navbar />
        <div className="add-pet-container">
          <div className="access-denied">
            <div className="denied-icon">🚫</div>
            <h2>Access Restricted</h2>
            <p>Only pet owners and shelters can list pets for adoption.</p>
            <button onClick={() => navigate('/browse-pets')} className="browse-btn">
              Browse Available Pets
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="add-pet-page">
      <Navbar />
      
      <div className="add-pet-container">
        <div className="add-pet-header">
          <h1>🐾 List a Pet for Adoption</h1>
          <p>Help find a loving home for your pet</p>
        </div>

        <form onSubmit={handleSubmit} className="add-pet-form">
          {error && <div className="error-message">{error}</div>}
          
          <div className="image-upload-section">
            <div className="upload-method-tabs">
              <button
                type="button"
                className={uploadMethod === 'url' ? 'active' : ''}
                onClick={() => setUploadMethod('url')}
              >
                Image URL
              </button>
              <button
                type="button"
                className={uploadMethod === 'file' ? 'active' : ''}
                onClick={() => setUploadMethod('file')}
                disabled
                title="File upload disabled - use image URL instead"
                style={{ opacity: 0.5, cursor: 'not-allowed' }}
              >
                Upload File (Disabled)
              </button>
            </div>
            
            {uploadMethod === 'url' ? (
              <div className="form-group" style={{ marginTop: '15px' }}>
                <label>Pet Image URL (Optional)</label>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => {
                    setImageUrl(e.target.value);
                    setImagePreview(e.target.value);
                  }}
                  placeholder="https://example.com/pet-image.jpg"
                  className="image-url-input"
                />
                {imagePreview && (
                  <div style={{ marginTop: '10px' }}>
                    <img 
                      src={imagePreview} 
                      alt="Pet preview" 
                      className="image-preview"
                      onError={() => setImagePreview('')}
                      style={{ maxWidth: '200px', borderRadius: '8px' }}
                    />
                  </div>
                )}
                <small style={{ display: 'block', marginTop: '5px', color: '#666' }}>
                  Tip: Use free image hosting like imgur.com or upload to your Google Drive and use the direct link
                </small>
              </div>
            ) : (
              <div className="image-placeholder" style={{ marginTop: '15px', padding: '30px', background: '#f5f5f5', borderRadius: '8px', textAlign: 'center' }}>
                <span className="upload-icon">🚫</span>
                <p>File upload is disabled</p>
                <span className="upload-hint">Please use Image URL option instead</span>
              </div>
            )}
          </div>

          <div className="form-section">
            <h3>Basic Information</h3>
            
            <div className="form-row">
              <div className="form-group">
                <label>Pet Name *</label>
                <input
                  type="text"
                  name="name"
                  value={petData.name}
                  onChange={handleChange}
                  placeholder="e.g., Max"
                  required
                />
              </div>

              <div className="form-group">
                <label>Type *</label>
                <select name="type" value={petData.type} onChange={handleChange} required>
                  <option value="Dog">Dog 🐕</option>
                  <option value="Cat">Cat 🐱</option>
                  <option value="Bird">Bird 🦜</option>
                  <option value="Rabbit">Rabbit 🐰</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Breed</label>
                <input
                  type="text"
                  name="breed"
                  value={petData.breed}
                  onChange={handleChange}
                  placeholder="e.g., Golden Retriever"
                />
              </div>

              <div className="form-group">
                <label>Age *</label>
                <input
                  type="text"
                  name="age"
                  value={petData.age}
                  onChange={handleChange}
                  placeholder="e.g., 2 years"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Gender *</label>
                <select name="gender" value={petData.gender} onChange={handleChange} required>
                  <option value="Male">Male ♂️</option>
                  <option value="Female">Female ♀️</option>
                </select>
              </div>

              <div className="form-group">
                <label>Size *</label>
                <select name="size" value={petData.size} onChange={handleChange} required>
                  <option value="Small">Small (0-20 lbs)</option>
                  <option value="Medium">Medium (21-50 lbs)</option>
                  <option value="Large">Large (51+ lbs)</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>City/Location *</label>
              <input
                type="text"
                name="city"
                value={petData.city}
                onChange={handleChange}
                placeholder="e.g., Karachi, Pakistan"
                required
              />
            </div>
          </div>

          <div className="form-section">
            <h3>About This Pet</h3>
            
            <div className="form-group">
              <label>Description *</label>
              <textarea
                name="description"
                value={petData.description}
                onChange={handleChange}
                rows="4"
                placeholder="Tell us about this pet's personality, behavior, energy level, and what makes them special..."
                required
              />
            </div>

            <div className="form-group">
              <label>Medical History</label>
              <textarea
                name="medicalHistory"
                value={petData.medicalHistory}
                onChange={handleChange}
                rows="3"
                placeholder="Any health conditions, medications, allergies, or special care instructions..."
              />
            </div>
          </div>

          <div className="form-section">
            <h3>Health Status</h3>
            
            <div className="checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="vaccinated"
                  checked={petData.vaccinated}
                  onChange={handleChange}
                />
                <span className="checkbox-text">
                  <strong>Vaccinated</strong>
                  <small>Up to date on vaccinations</small>
                </span>
              </label>

              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="spayedNeutered"
                  checked={petData.spayedNeutered}
                  onChange={handleChange}
                />
                <span className="checkbox-text">
                  <strong>Spayed/Neutered</strong>
                  <small>Sterilization completed</small>
                </span>
              </label>
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={() => navigate('/browse-pets')}
              className="cancel-btn"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="submit-btn"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="loading-spinner"></span>
                  Listing Pet...
                </>
              ) : (
                <>
                  <span className="icon">🐾</span>
                  List Pet for Adoption
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPet;
