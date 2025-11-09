import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './BrowsePets.css';

const BrowsePets = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    petType: '',
    city: '',
  });

  // Mock data - many pets for a fuller display
  const allPets = [
    { id: 1, name: 'Golden Retriever', type: 'Dog', age: '2 years', size: 'Large', description: 'This is a very good dog, and is in black color and very faithful. If dog does not obey you use a whip to make him listen.', image: null },
    { id: 2, name: 'Siamese Cat', type: 'Cat', age: '3- years', size: 'Large', description: 'This is a very good cat, and is in white color and very faithful. If cat does not obey you use a whip to make him listen.', image: null },
    { id: 3, name: 'Green Parrot', type: 'Bird', age: '1- years', size: 'Large', description: 'This is a very good parrot, and is in green color and very faithful. If parrot does not obey you use a whip to make him listen.', image: null },
    { id: 4, name: 'Labrador', type: 'Dog', age: '1 year', size: 'Medium', description: 'Friendly and energetic Labrador puppy looking for a loving home. Great with kids!', image: null },
    { id: 5, name: 'Persian Cat', type: 'Cat', age: '4 years', size: 'Medium', description: 'Beautiful Persian cat with long fur. Very calm and loves to cuddle.', image: null },
    { id: 6, name: 'German Shepherd', type: 'Dog', age: '3 years', size: 'Large', description: 'Well-trained German Shepherd, excellent guard dog and family companion.', image: null },
    { id: 7, name: 'Bengal Cat', type: 'Cat', age: '2 years', size: 'Medium', description: 'Active and playful Bengal cat with beautiful spotted coat pattern.', image: null },
    { id: 8, name: 'Cockatiel', type: 'Bird', age: '6 months', size: 'Small', description: 'Sweet and friendly cockatiel that loves to whistle and play.', image: null },
    { id: 9, name: 'Beagle', type: 'Dog', age: '2 years', size: 'Medium', description: 'Adorable Beagle with great temperament, loves walks and treats.', image: null },
    { id: 10, name: 'Maine Coon', type: 'Cat', age: '5 years', size: 'Large', description: 'Gentle giant Maine Coon, very affectionate and great with children.', image: null },
    { id: 11, name: 'Budgie', type: 'Bird', age: '1 year', size: 'Small', description: 'Colorful budgie that loves to chirp and socialize.', image: null },
    { id: 12, name: 'Poodle', type: 'Dog', age: '4 years', size: 'Medium', description: 'Elegant toy poodle, hypoallergenic and very intelligent.', image: null },
    { id: 13, name: 'British Shorthair', type: 'Cat', age: '3 years', size: 'Medium', description: 'Calm and dignified British Shorthair with plush grey coat.', image: null },
    { id: 14, name: 'Husky', type: 'Dog', age: '2 years', size: 'Large', description: 'Beautiful Siberian Husky with striking blue eyes and friendly nature.', image: null },
    { id: 15, name: 'Ragdoll Cat', type: 'Cat', age: '1 year', size: 'Large', description: 'Docile Ragdoll cat that goes limp when picked up, very gentle.', image: null },
    { id: 16, name: 'Lovebird', type: 'Bird', age: '8 months', size: 'Small', description: 'Pair of lovebirds, very social and affectionate with each other.', image: null },
    { id: 17, name: 'Bulldog', type: 'Dog', age: '3 years', size: 'Medium', description: 'Friendly English Bulldog, great for apartments and families.', image: null },
    { id: 18, name: 'Sphynx Cat', type: 'Cat', age: '2 years', size: 'Medium', description: 'Unique hairless Sphynx cat, warm to touch and very loving.', image: null },
    { id: 19, name: 'Macaw', type: 'Bird', age: '5 years', size: 'Large', description: 'Stunning blue and gold macaw, can learn to talk and very intelligent.', image: null },
    { id: 20, name: 'Pug', type: 'Dog', age: '1 year', size: 'Small', description: 'Charming pug puppy with wrinkly face and playful personality.', image: null },
    { id: 21, name: 'Abyssinian Cat', type: 'Cat', age: '2 years', size: 'Medium', description: 'Active Abyssinian with reddish coat, very curious and playful.', image: null },
    { id: 22, name: 'Boxer', type: 'Dog', age: '4 years', size: 'Large', description: 'Energetic Boxer dog, great with kids and loves to play.', image: null },
    { id: 23, name: 'Scottish Fold', type: 'Cat', age: '3 years', size: 'Medium', description: 'Sweet Scottish Fold with unique folded ears and calm demeanor.', image: null },
    { id: 24, name: 'Conure', type: 'Bird', age: '1 year', size: 'Small', description: 'Vibrant sun conure with yellow and orange plumage, very social.', image: null },
  ];

  const [pets] = useState(allPets);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => {
    // In real app, this would filter the pets
    console.log('Searching with filters:', filters);
  };

  const filteredPets = pets.filter(pet => {
    if (filters.petType && pet.type !== filters.petType) return false;
    return true;
  });

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
              <option value="">Pet Type</option>
              <option value="Dog">Dog</option>
              <option value="Cat">Cat</option>
              <option value="Bird">Bird</option>
              <option value="Rabbit">Rabbit</option>
              <option value="Other">Other</option>
            </select>

            <select
              name="city"
              value={filters.city}
              onChange={handleFilterChange}
              className="filter-select"
            >
              <option value="">All Cities</option>
              <option value="New York">New York</option>
              <option value="Los Angeles">Los Angeles</option>
              <option value="Chicago">Chicago</option>
              <option value="Houston">Houston</option>
              <option value="Phoenix">Phoenix</option>
              <option value="Philadelphia">Philadelphia</option>
              <option value="San Antonio">San Antonio</option>
            </select>

            <button className="search-btn" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>

        <div className="pets-grid">
          {filteredPets.map(pet => (
            <div key={pet.id} className="pet-browse-card">
              <div className="pet-browse-image">
                {/* Placeholder for image */}
              </div>
              <div className="pet-browse-info">
                <h3 className="pet-browse-name">{pet.name}</h3>
                <div className="pet-browse-meta">
                  <span className="meta-item">
                    <strong>Pet-Type</strong> {pet.type}
                  </span>
                  <span className="meta-item">
                    <span className="icon">🎂</span> <strong>{pet.age}</strong>
                  </span>
                  <span className="meta-item">
                    <strong>{pet.size}</strong>
                  </span>
                </div>
                <p className="pet-browse-description">{pet.description}</p>
                <button 
                  className="view-detail-btn"
                  onClick={() => navigate(`/pet/${pet.id}`)}
                >
                  View Detail
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrowsePets;
