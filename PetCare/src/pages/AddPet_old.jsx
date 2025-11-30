import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import './AddPet.css';

const AddPet = () => {
  const navigate = useNavigate();
  const { addPet } = useAuth();
  
  const [formData, setFormData] = useState({
    petName: '',
    petType: '',
    breed: '',
    age: '',
    gender: '',
    size: '',
    activityLevel: '',
    location: '',
    description: '',
    adoptionFee: '',
    medicalInfo: '',
    goodWithKids: false,
    goodWithPets: false,
    notRacist: false,
  });

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setSelectedFiles(files);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validation
    if (!formData.petName || !formData.petType || !formData.breed || !formData.age || !formData.gender) {
      setError('Please fill in all required fields.');
      return;
    }

    // Add pet to context
    addPet(formData);
    
    // Mock submission
    setSuccess('Pet added successfully! Redirecting...');
    setTimeout(() => {
      navigate('/profile');
    }, 1500);
  };

  const handleCancel = () => {
    navigate('/profile');
  };

  return (
    <div className="add-pet-page">
      <Navbar />
      <div className="add-pet-header">
        <button className="back-to-profile" onClick={() => navigate('/profile')}>
          <span className="back-arrow">←</span> Back to Profile
        </button>
        
      </div>

      <div className="add-pet-container">
    <div className="header-content">                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
          <h1>Add Pet 🐾</h1>
          <p>Help a Pet find their forever home</p>
        </div>
        <form className="add-pet-form" onSubmit={handleSubmit}>
            
          <div className="form-section">
            <h2>Pet Information</h2>
            <p className="section-subtitle">Provide detailed information about the pet to help potential adopter.</p>

            {error && <div className="alert-error">{error}</div>}
            {success && <div className="alert-success">{success}</div>}

            <div className="form-grid">
              <div className="form-field">
                <label htmlFor="petName">Pet Name <span className="required">*</span></label>
                <input
                  type="text"
                  id="petName"
                  name="petName"
                  value={formData.petName}
                  onChange={handleChange}
                  placeholder="Enter Pet's Name"
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="petType">Pet Type <span className="required">*</span></label>
                <input
                  type="text"
                  id="petType"
                  name="petType"
                  value={formData.petType}
                  onChange={handleChange}
                  placeholder="Enter Pet's Type"
                  required
                />
              </div>
            </div>

            <div className="form-grid">
              <div className="form-field">
                <label htmlFor="breed">Breed <span className="required">*</span></label>
                <input
                  type="text"
                  id="breed"
                  name="breed"
                  value={formData.breed}
                  onChange={handleChange}
                  placeholder="Enter Breed"
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="age">Age <span className="required">*</span></label>
                <input
                  type="text"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="Age in Years"
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="gender">Gender <span className="required">*</span></label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Pet Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>

            <div className="form-grid">
              <div className="form-field">
                <label htmlFor="size">Size <span className="required">*</span></label>
                <select
                  id="size"
                  name="size"
                  value={formData.size}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select size</option>
                  <option value="Small">Small</option>
                  <option value="Medium">Medium</option>
                  <option value="Large">Large</option>
                  <option value="Extra Large">Extra Large</option>
                </select>
              </div>

              <div className="form-field">
                <label htmlFor="activityLevel">Activity Level</label>
                <select
                  id="activityLevel"
                  name="activityLevel"
                  value={formData.activityLevel}
                  onChange={handleChange}
                >
                  <option value="">Select Activity Level</option>
                  <option value="Low">Low</option>
                  <option value="Moderate">Moderate</option>
                  <option value="High">High</option>
                  <option value="Very High">Very High</option>
                </select>
              </div>
            </div>

            <div className="form-field full-width">
              <label htmlFor="location">Location <span className="required">*</span></label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Enter City, area"
                required
              />
            </div>

            <div className="form-field full-width">
              <label htmlFor="description">Description <span className="required">*</span></label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the pet's personality, habits and any special needs ........."
                rows="4"
                required
              />
            </div>

            <div className="form-field full-width">
              <label htmlFor="petImages">Pet Images <span className="required">*</span></label>
              <div className="file-upload-area">
                <input
                  type="file"
                  id="petImages"
                  name="petImages"
                  onChange={handleFileSelect}
                  accept="image/*"
                  multiple
                  style={{ display: 'none' }}
                />
                <button
                  type="button"
                  className="file-upload-btn"
                  onClick={() => document.getElementById('petImages').click()}
                >
                  Choose File(s)
                </button>
                {selectedFiles.length > 0 && (
                  <span className="file-count">{selectedFiles.length} file(s) selected</span>
                )}
              </div>
              <small className="field-hint">Images upto 10MB, max 20</small>
            </div>
          </div>

          <div className="form-section">
            <h3>Characteristics</h3>
            <div className="checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="goodWithKids"
                  checked={formData.goodWithKids}
                  onChange={handleChange}
                />
                <span className="checkbox-text">Good with kids</span>
              </label>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="goodWithPets"
                  checked={formData.goodWithPets}
                  onChange={handleChange}
                />
                <span className="checkbox-text">Good with other pets</span>
              </label>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="notRacist"
                  checked={formData.notRacist}
                  onChange={handleChange}
                />
                <span className="checkbox-text">Not Racist</span>
              </label>
            </div>
          </div>

          <div className="form-section">
            <div className="form-field">
              <label htmlFor="adoptionFee">Adoption Fee ( Optional )</label>
              <input
                type="text"
                id="adoptionFee"
                name="adoptionFee"
                value={formData.adoptionFee}
                onChange={handleChange}
                placeholder="Enter Adoption fees"
              />
            </div>

            <div className="form-field full-width">
              <label htmlFor="medicalInfo">Medical Information ( Optional )</label>
              <textarea
                id="medicalInfo"
                name="medicalInfo"
                value={formData.medicalInfo}
                onChange={handleChange}
                placeholder="Describe the pet's medical conditions ........."
                rows="3"
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={handleCancel}>
              Cancel
            </button>
            <button type="submit" className="btn-submit">
              Add Pet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPet;
