import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './Profile.css';

const Badge = ({ type }) => {
  const label = type === 'adopter' ? 'Adopter' : 'Owner';
  const icon = type === 'adopter' ? '🏠' : '🏥';
  return (
    <span className={`role-badge ${type}`}>
      <span className="icon">{icon}</span>
      {label}
    </span>
  );
};

const PetCard = ({ pet, cta, onCta, variant }) => {
  // Handle both old mock data format and new context format
  const displayName = pet.name || pet.petName;
  const displayType = pet.type || pet.petType;
  const displayAge = pet.age;
  const displayGender = pet.gender;
  const displayDescription = pet.description;
  
  return (
    <div className="pet-card">
      <div className="pet-image" aria-hidden>
        <span className="pet-emoji">{pet.emoji || '🐾'}</span>
      </div>
      <div className="pet-info">
        <h4>{displayName}</h4>
        <div className="pet-meta">
          <span>Type: <strong>{displayType}</strong></span>
          <span>Age: <strong>{displayAge}</strong></span>
          <span>Gender: <strong>{displayGender}</strong></span>
        </div>
        {displayDescription && <p className="pet-desc">{displayDescription}</p>}
        {cta && (
          <div className="card-actions">
            <button className={`${variant === 'danger' ? 'danger-btn' : 'primary-btn'} compact fullwidth`} onClick={() => onCta?.(pet)}>{cta}</button>
          </div>
        )}
      </div>
    </div>
  );
};

const Profile = () => {
  const { user, updateProfile, updatePassword, userPets, deletePet } = useAuth();
  const navigate = useNavigate();

  const [emailForm, setEmailForm] = useState({ email: user?.email || '', phone: user?.phone || '' });
  const [emailMessage, setEmailMessage] = useState('');
  const [emailError, setEmailError] = useState('');

  const [pwdForm, setPwdForm] = useState({ current: '', next: '', confirm: '' });
  const [pwdMessage, setPwdMessage] = useState('');
  const [pwdError, setPwdError] = useState('');

  const isOwner = user?.userType !== 'adopter';

  // Sample/mock data for frontend-only UI
  const initialSaved = [
    { id: 1, name: 'Buddy', type: 'Dog', age: '2y', gender: 'Male', emoji: '🐶', description: 'Friendly and energetic.' },
    { id: 2, name: 'Luna', type: 'Cat', age: '1y', gender: 'Female', emoji: '🐱', description: 'Calm and cuddly.' },
    { id: 3, name: 'Coco', type: 'Parrot', age: '3y', gender: 'Female', emoji: '🦜', description: 'Talkative companion.' },
  ];
  const initialAdopted = [
    { id: 4, name: 'Max', type: 'Dog', age: '4y', gender: 'Male', emoji: '🐕', description: 'Loves walks and treats.' },
  ];
  const initialListings = [
    { id: 101, name: 'Bella', type: 'Dog', age: '8m', gender: 'Female', emoji: '🐶', description: 'Playful puppy.' },
    { id: 102, name: 'Oliver', type: 'Cat', age: '2y', gender: 'Male', emoji: '🐈', description: 'Curious explorer.' },
  ];

  const [savedPets, setSavedPets] = useState(initialSaved);
  const adoptedPets = initialAdopted;
  // Use userPets from context for owner listings
  const myListings = userPets.length > 0 ? userPets : initialListings;

  const [showAddModal, setShowAddModal] = useState(false);
  const [newPet, setNewPet] = useState({ name: '', type: 'Dog', age: '', gender: 'Male', description: '' });

  const handleEmailSave = async (e) => {
    e.preventDefault();
    setEmailMessage('');
    setEmailError('');

    const emailRegex = /[^@]+@[^.]+\..+/;
    if (!emailRegex.test(emailForm.email)) {
      setEmailError('Please enter a valid email address.');
      return;
    }
    try {
      await updateProfile({ email: emailForm.email, phone: emailForm.phone });
      setEmailMessage('Profile updated successfully.');
    } catch {
      setEmailError('Failed to update profile.');
    }
  };

  const handlePasswordSave = async (e) => {
    e.preventDefault();
    setPwdMessage('');
    setPwdError('');
    if (pwdForm.next.length < 6) {
      setPwdError('New password must be at least 6 characters.');
      return;
    }
    if (pwdForm.next !== pwdForm.confirm) {
      setPwdError('New password and confirmation do not match.');
      return;
    }
    try {
      await updatePassword(pwdForm.current, pwdForm.next);
      setPwdMessage('Password changed successfully.');
      setPwdForm({ current: '', next: '', confirm: '' });
    } catch {
      setPwdError('Failed to change password.');
    }
  };

  const totalPets = isOwner ? myListings.length : savedPets.length + adoptedPets.length;

  const handleAddPet = (e) => {
    e.preventDefault();
    const id = Date.now();
    setMyListings(prev => ([{ id, ...newPet, emoji: newPet.type === 'Dog' ? '🐶' : newPet.type === 'Cat' ? '🐱' : '🐾' }, ...prev]));
    setShowAddModal(false);
    setNewPet({ name: '', type: 'Dog', age: '', gender: 'Male', description: '' });
  };

  const handleDeleteListing = (pet) => {
    if (confirm('Delete this pet listing?')) {
      deletePet(pet.id);
    }
  };

  const handleDeleteSaved = (id) => {
    if (confirm('Remove this pet from your saved list?')) {
      setSavedPets(prev => prev.filter(p => p.id !== id));
    }
  };

  return (
    <div className="profile-layout">
      <Navbar />
      <div className="profile-content-wrapper">
        <button className="back-button" onClick={() => navigate('/')}>
          <span className="back-icon">←</span> Back to Home
        </button>
        <div className="profile-grid">
        {/* Sidebar Card */}
        <aside className="profile-sidebar-card">
          <div className="sidebar-inner">
            <div className="sidebar-avatar" aria-hidden>
              {(user?.firstName?.[0] || 'U')}{(user?.lastName?.[0] || '')}
            </div>
            <div className="sidebar-fields">
              <div><span className="field-label">First Name</span><span className="field-value">{user?.firstName}</span></div>
              <div><span className="field-label">Last Name</span><span className="field-value">{user?.lastName}</span></div>
              <div><span className="field-label">Email Address</span><span className="field-value">{user?.email}</span></div>
              {user?.phone && <div><span className="field-label">Phone Number</span><span className="field-value">{user.phone}</span></div>}
              <div><span className="field-label">Role</span><span className="field-value">{isOwner ? 'Owner' : 'Adopter'}</span></div>
            </div>
            <div className="sidebar-actions">
              <button className="sidebar-btn edit" onClick={() => {
                const el = document.getElementById('account-edit');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}>Edit Profile</button>
              <button className="sidebar-btn add" onClick={() => navigate('/add-pet')}>Add Pet</button>
            </div>
            <div className="sidebar-stats">
              <h4>Statistics</h4>
              <ul>
                <li><span>Total Pets</span><strong>{totalPets}</strong></li>
                {isOwner && <li><span>Available Pets</span><strong>{myListings.length}</strong></li>}
                {!isOwner && <li><span>Saved Pets</span><strong>{savedPets.length}</strong></li>}
                {!isOwner && <li><span>Adopted Pets</span><strong>{adoptedPets.length}</strong></li>}
              </ul>
            </div>
          </div>
        </aside>
        {/* Main Content */}
        <section className="profile-main-card">
          <div className="pets-header">
            <h2>{isOwner ? 'My Pets' : 'My Pets'}</h2>
            <p className="sub">{isOwner ? 'Pets you have listed for adoption' : 'Your saved and adopted pets'}</p>
          </div>
          {isOwner ? (
            <div className="pet-grid large">
              {myListings.map(p => (
                <PetCard pet={p} key={p.id} cta="Delete Pet" variant="danger" onCta={() => handleDeleteListing(p)} />
              ))}
            </div>
          ) : (
            <>
              <h3 className="pet-section-title">Saved Pets</h3>
              <div className="pet-grid">
                {savedPets.map(p => (
                  <PetCard pet={p} key={p.id} cta="Delete Pet" variant="danger" onCta={() => handleDeleteSaved(p.id)} />
                ))}
              </div>
              <h3 className="pet-section-title">Adopted Pets</h3>
              <div className="pet-grid">
                {adoptedPets.map(p => <PetCard pet={p} key={p.id} cta="Details" onCta={() => {}} />)}
              </div>
            </>
          )}
          <div id="account-edit" className="edit-panels">
            <div className="edit-panel">
              <h3>Account Details</h3>
              <form className="form" onSubmit={handleEmailSave}>
                {emailError && <div className="alert error">{emailError}</div>}
                {emailMessage && <div className="alert success">{emailMessage}</div>}
                <div className="form-row">
                  <div className="form-group">
                    <label>Email</label>
                    <input type="email" value={emailForm.email} onChange={(e) => setEmailForm({ ...emailForm, email: e.target.value })} placeholder="you@example.com" required />
                  </div>
                  <div className="form-group">
                    <label>Phone</label>
                    <input type="tel" value={emailForm.phone} onChange={(e) => setEmailForm({ ...emailForm, phone: e.target.value })} placeholder="+1 234 567 890" />
                  </div>
                </div>
                <button type="submit" className="primary-btn compact">Save Changes</button>
              </form>
            </div>
            <div className="edit-panel">
              <h3>Change Password</h3>
              <form className="form" onSubmit={handlePasswordSave}>
                {pwdError && <div className="alert error">{pwdError}</div>}
                {pwdMessage && <div className="alert success">{pwdMessage}</div>}
                <div className="form-row">
                  <div className="form-group">
                    <label>Current</label>
                    <input type="password" value={pwdForm.current} onChange={(e) => setPwdForm({ ...pwdForm, current: e.target.value })} placeholder="••••••" required />
                  </div>
                  <div className="form-group">
                    <label>New</label>
                    <input type="password" value={pwdForm.next} onChange={(e) => setPwdForm({ ...pwdForm, next: e.target.value })} placeholder="At least 6 characters" required />
                  </div>
                  <div className="form-group">
                    <label>Confirm</label>
                    <input type="password" value={pwdForm.confirm} onChange={(e) => setPwdForm({ ...pwdForm, confirm: e.target.value })} placeholder="Repeat new password" required />
                  </div>
                </div>
                <button type="submit" className="secondary-btn compact">Update Password</button>
              </form>
            </div>
          </div>
        </section>
        {showAddModal && (
          <div className="modal-backdrop" onClick={() => setShowAddModal(false)}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Add a New Pet</h3>
            <form className="form" onSubmit={handleAddPet}>
              <div className="form-row">
                <div className="form-group">
                  <label>Name</label>
                  <input value={newPet.name} onChange={(e) => setNewPet({ ...newPet, name: e.target.value })} required />
                </div>
                <div className="form-group">
                  <label>Type</label>
                  <select value={newPet.type} onChange={(e) => setNewPet({ ...newPet, type: e.target.value })}>
                    <option>Dog</option>
                    <option>Cat</option>
                    <option>Bird</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Age</label>
                  <input value={newPet.age} onChange={(e) => setNewPet({ ...newPet, age: e.target.value })} placeholder="e.g. 2y, 8m" />
                </div>
                <div className="form-group">
                  <label>Gender</label>
                  <select value={newPet.gender} onChange={(e) => setNewPet({ ...newPet, gender: e.target.value })}>
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea rows="3" value={newPet.description} onChange={(e) => setNewPet({ ...newPet, description: e.target.value })} />
              </div>
              <div className="modal-actions">
                <button type="button" className="ghost-btn" onClick={() => setShowAddModal(false)}>Cancel</button>
                <button type="submit" className="primary-btn">Add Pet</button>
              </div>
            </form>
          </div>
        </div>
        )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
