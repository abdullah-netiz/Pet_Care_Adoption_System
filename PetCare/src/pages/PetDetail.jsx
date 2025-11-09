import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './PetDetail.css';

const PetDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pet, setPet] = useState(null);

  useEffect(() => {
    // Mock data - replace with API call later
    const mockPets = [
      {
        id: 1,
        name: 'Buddy',
        type: 'Dog',
        breed: 'Golden Retriever',
        age: '2 Years',
        gender: 'Male',
        city: 'Karachi',
        description: 'This is a very good dog, and is in brown and very faithful. If parrot does not obey you use a whip to make him listen.',
        healthInfo: {
          vaccinated: true,
          dewormed: true,
          spayedNeutered: true,
          lastUpdate: 'March 2025'
        },
        owner: {
          name: 'XYZ',
          city: 'ABC',
          email: 'abc@gmail.com',
          phone: '03xx-xxxxxxx'
        },
        images: [
          'https://via.placeholder.com/400x300/cccccc/666666?text=Pet+Image+1',
          'https://via.placeholder.com/400x300/cccccc/666666?text=Pet+Image+2',
          'https://via.placeholder.com/400x300/cccccc/666666?text=Pet+Image+3'
        ]
      },
      // Add more mock pets as needed
    ];

    // Find pet by id or default to first pet
    const foundPet = mockPets.find(p => p.id === parseInt(id)) || mockPets[0];
    setPet(foundPet);
  }, [id]);

  const handleAdopt = () => {
    alert('Adoption request sent successfully!');
    navigate('/browse');
  };

  const handleBack = () => {
    navigate('/browse');
  };

  if (!pet) {
    return <div>Loading...</div>;
  }

  return (
    <div className="pet-detail-page">
      <Navbar />
      <div className="pet-detail-container">
        <div className="pet-detail-card">
          <div className="pet-detail-image-section">
            <div className="pet-main-image">
              <img src={pet.images[0]} alt={pet.name} />
            </div>
          </div>

          <div className="pet-detail-content">
            <div className="pet-detail-header">
              <h1 className="pet-name">{pet.name}</h1>
              <p className="pet-breed">{pet.breed}</p>
              <div className="pet-meta-info">
                <span>Age: {pet.age}</span>
                <span>Gender: {pet.gender}</span>
                <span>City: {pet.city}</span>
              </div>
            </div>

            <div className="pet-detail-sections">
              <div className="pet-section">
                <h3 className="section-title">About</h3>
                <p className="section-text">{pet.description}</p>
              </div>

              <div className="pet-info-grid">
                <div className="info-card">
                  <h3 className="section-title">Health & Vaccination</h3>
                  <ul className="info-list">
                    {pet.healthInfo.vaccinated && <li>Vaccinated</li>}
                    {pet.healthInfo.dewormed && <li>De wormed</li>}
                    {pet.healthInfo.spayedNeutered && <li>Sprayed/Neutered</li>}
                    <li>Pet Updated: {pet.healthInfo.lastUpdate}</li>
                  </ul>
                </div>

                <div className="info-card">
                  <h3 className="section-title">Owner Details</h3>
                  <ul className="info-list">
                    <li>Name: {pet.owner.name}</li>
                    <li>City: {pet.owner.city}</li>
                    <li>Email: {pet.owner.email}</li>
                    <li>Phone number: {pet.owner.phone}</li>
                  </ul>
                </div>

                <div className="info-card images-card">
                  <h3 className="section-title">Images</h3>
                  <div className="images-placeholder">
                    <button className="see-more-btn">+ see more →</button>
                  </div>
                </div>
              </div>
            </div>

            <div className="pet-detail-actions">
              <button className="back-btn" onClick={handleBack}>
                Back to browse
              </button>
              <button className="adopt-btn" onClick={handleAdopt}>
                Adopt me
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetDetail;
