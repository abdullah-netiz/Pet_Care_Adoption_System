// Complete implementation guide for Pet Care Adoption System with Firebase

## IMPLEMENTATION SUMMARY

### ✅ COMPLETED:
1. Firebase Configuration (firebase.js)
   - Added Google Auth, Firestore, and Storage
   
2. Firebase Services (services/firebaseService.js)
   - All CRUD operations for: users, pets, adoption requests, stories, shelters, articles
   
3. Authentication System
   - Google OAuth Sign-In (Login.jsx)
   - User Type Selection (Register.jsx)
   - AuthContext with Firebase integration
   
4. Notifications System
   - Notification bell component
   - Real-time adoption request notifications
   - Added to Navbar

### 🔨 REMAINING IMPLEMENTATIONS:

## 1. UPDATE ADDPET PAGE (src/pages/AddPet.jsx)

Replace the entire file content with:

```jsx
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
      let imageUrl = '';
      
      // Upload image if exists
      if (imageFile) {
        const storageRef = ref(storage, `pets/${user.id}/${Date.now()}_${imageFile.name}`);
        await uploadBytes(storageRef, imageFile);
        imageUrl = await getDownloadURL(storageRef);
      }

      // Create pet in Firestore
      const result = await createPet({
        ...petData,
        imageUrl,
        ownerId: user.id,
        ownerName: `${user.firstName} ${user.lastName}`,
        ownerEmail: user.email,
        ownerPhone: user.phone || ''
      });

      if (result.success) {
        navigate('/browse');
      }
    } catch (err) {
      console.error('Error adding pet:', err);
      setError('Failed to add pet. Please try again.');
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
            <h2>Access Restricted</h2>
            <p>Only pet owners and shelters can list pets for adoption.</p>
            <button onClick={() => navigate('/browse')}>Browse Pets</button>
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
          <h1>List a Pet for Adoption</h1>
          <p>Help find a loving home for your pet</p>
        </div>

        <form onSubmit={handleSubmit} className="add-pet-form">
          {error && <div className="error-message">{error}</div>}
          
          <div className="image-upload-section">
            <label className="image-upload-label">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }}
              />
              {imagePreview ? (
                <img src={imagePreview} alt="Pet preview" className="image-preview" />
              ) : (
                <div className="image-placeholder">
                  <span>📷</span>
                  <p>Click to upload pet photo</p>
                </div>
              )}
            </label>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Pet Name *</label>
              <input
                type="text"
                name="name"
                value={petData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Type *</label>
              <select name="type" value={petData.type} onChange={handleChange} required>
                <option value="Dog">Dog</option>
                <option value="Cat">Cat</option>
                <option value="Bird">Bird</option>
                <option value="Rabbit">Rabbit</option>
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
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div className="form-group">
              <label>Size *</label>
              <select name="size" value={petData.size} onChange={handleChange} required>
                <option value="Small">Small</option>
                <option value="Medium">Medium</option>
                <option value="Large">Large</option>
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

          <div className="form-group">
            <label>Description *</label>
            <textarea
              name="description"
              value={petData.description}
              onChange={handleChange}
              rows="4"
              placeholder="Tell us about this pet's personality, behavior, and any special needs..."
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
              placeholder="Any health conditions, medications, or special care instructions..."
            />
          </div>

          <div className="checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="vaccinated"
                checked={petData.vaccinated}
                onChange={handleChange}
              />
              <span>Vaccinated</span>
            </label>

            <label className="checkbox-label">
              <input
                type="checkbox"
                name="spayedNeutered"
                checked={petData.spayedNeutered}
                onChange={handleChange}
              />
              <span>Spayed/Neutered</span>
            </label>
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={() => navigate('/browse')}
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
              {isLoading ? 'Listing Pet...' : 'List Pet for Adoption'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPet;
```

## 2. UPDATE BROWSEPETS PAGE (src/pages/BrowsePets.jsx)

Key changes needed:
- Import getAllPets from firebaseService
- Use useEffect to load pets from Firestore
- Add filter functionality
- Show pet images from Storage
- Add "Request Adoption" button for adopters
- Show "Edit" option for owners

## 3. UPDATE PETDETAIL PAGE (src/pages/PetDetail.jsx)

- Load pet data from Firestore using getPet(petId)
- Show pet owner information
- Add "Request Adoption" button
- Create adoption request in Firestore
- Handle request flow

## 4. UPDATE PROFILE PAGE (src/pages/Profile.jsx)

- Fetch user profile from Firestore
- Show adoption requests (incoming for owners, outgoing for adopters)
- Allow owners to approve/reject requests
- Update pet status when adopted
- Show user's listed pets (for owners)
- Show saved/adopted pets (for adopters)

## 5. STORIES PAGE (src/pages/Stories.jsx)

- Load stories from Firestore
- Add "Share Your Story" form
- Implement like/comment/share functionality
- Filter by pet type

## 6. SHELTERS PAGE (src/pages/Shelters.jsx)

- Load shelters from Firestore
- Add ability for owners to register as shelters
- Show real pet counts from database
- Implement directions functionality

## 7. RESOURCES PAGE (src/pages/Resources.jsx)

- Load articles from Firestore
- Implement newsletter subscription
- Category filtering
- Search functionality

## 8. INITIALIZE SAMPLE DATA

Create a script (src/utils/initializeData.js):

```javascript
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

export const initializeSampleData = async () => {
  // Add sample articles
  const articles = [
    {
      category: 'health',
      title: 'Complete Guide to Pet Vaccinations',
      description: 'Everything you need to know about keeping your pet healthy...',
      readTime: '8 min read',
      author: 'Dr. Sarah Johnson, DVM',
      featured: true
    },
    // Add more sample articles
  ];

  for (const article of articles) {
    await addDoc(collection(db, 'articles'), article);
  }
  
  console.log('Sample data initialized');
};
```

## 9. FIREBASE SECURITY RULES

Add to Firebase Console > Firestore Database > Rules:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth.uid == userId;
    }
    
    // Pets collection
    match /pets/{petId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update, delete: if request.auth.uid == resource.data.ownerId;
    }
    
    // Adoption Requests
    match /adoptionRequests/{requestId} {
      allow read: if request.auth.uid == resource.data.adopterId 
                  || request.auth.uid == resource.data.ownerId;
      allow create: if request.auth != null;
      allow update: if request.auth.uid == resource.data.ownerId;
    }
    
    // Stories, Shelters, Articles - public read
    match /{document=**} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
    }
  }
}
```

## 10. TESTING CHECKLIST

- [ ] Google Sign-In works
- [ ] User type selection saves correctly
- [ ] Adopters can browse and request pets
- [ ] Owners can list pets
- [ ] Notifications show pending requests
- [ ] Owners can approve/reject requests
- [ ] Pet status updates to "adopted"
- [ ] Stories can be submitted
- [ ] Resources load from Firestore
- [ ] Profile updates work

## NEXT STEPS:

1. Update remaining pages with Firebase integration
2. Test all functionality thoroughly
3. Add error handling and loading states
4. Implement real-time updates with Firebase listeners
5. Add image upload for stories and shelters
6. Implement search functionality
7. Add email notifications (using Firebase Cloud Functions)

This provides a complete foundation for your Firebase-integrated pet adoption system!
