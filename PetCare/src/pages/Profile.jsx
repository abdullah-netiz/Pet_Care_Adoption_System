import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { 
  getAllPets,
  deletePet, 
  getAdoptionRequests, 
  updateAdoptionRequest,
  updateUserProfile 
} from '../services/firebaseService';
import './Profile.css';

const Badge = ({ type }) => {
  const label = type === 'adopter' ? 'Adopter' : 'Shelter';
  const icon = type === 'adopter' ? '🏠' : '🏥';
  return (
    <span className={`role-badge ${type}`}>
      <span className="icon">{icon}</span>
      {label}
    </span>
  );
};

const PetCard = ({ pet, cta, onCta, variant }) => {
  return (
    <div className="pet-card">
      <div className="pet-image-container">
        {pet.images && pet.images.length > 0 ? (
          <img src={pet.images[0]} alt={pet.name} className="pet-image-real" />
        ) : (
          <div className="pet-image" aria-hidden>
            <span className="pet-emoji">🐾</span>
          </div>
        )}
      </div>
      <div className="pet-info">
        <h4>{pet.name}</h4>
        <div className="pet-meta">
          <span>Type: <strong>{pet.type}</strong></span>
          <span>Age: <strong>{pet.age}</strong></span>
          <span>Gender: <strong>{pet.gender}</strong></span>
        </div>
        {pet.breed && <p className="pet-breed">Breed: {pet.breed}</p>}
        {pet.description && <p className="pet-desc">{pet.description}</p>}
        {cta && (
          <div className="card-actions">
            <button className={`${variant === 'danger' ? 'danger-btn' : 'primary-btn'} compact fullwidth`} onClick={() => onCta?.(pet)}>{cta}</button>
          </div>
        )}
      </div>
    </div>
  );
};

const AdoptionRequestCard = ({ request, onApprove, onReject, userType }) => {
  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString();
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending: { text: 'Pending', color: '#FFA500' },
      approved: { text: 'Approved', color: '#4CAF50' },
      rejected: { text: 'Rejected', color: '#F44336' }
    };
    const badge = badges[status] || badges.pending;
    return (
      <span className="status-badge" style={{ backgroundColor: badge.color }}>
        {badge.text}
      </span>
    );
  };

  return (
    <div className="adoption-request-card">
      <div className="request-header">
        <div>
          <h4>{request.petName}</h4>
          <p className="request-meta">
            {userType === 'shelter' ? `From: ${request.adopterName}` : `To: ${request.ownerName}`}
          </p>
          <p className="request-date">Requested on: {formatDate(request.createdAt)}</p>
        </div>
        {getStatusBadge(request.status)}
      </div>
      <div className="request-message">
        <p><strong>Message:</strong></p>
        <p>{request.message}</p>
      </div>
      {request.status === 'pending' && userType === 'shelter' && (
        <div className="request-actions">
          <button className="approve-btn" onClick={() => onApprove(request.id)}>
            ✓ Approve
          </button>
          <button className="reject-btn" onClick={() => onReject(request.id)}>
            ✗ Reject
          </button>
        </div>
      )}
    </div>
  );
};

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [myPets, setMyPets] = useState([]);
  const [adoptionRequests, setAdoptionRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingRequests, setLoadingRequests] = useState(true);

  const [emailForm, setEmailForm] = useState({ 
    email: user?.email || '', 
    phone: user?.phone || '',
    firstName: user?.firstName || '',
    lastName: user?.lastName || ''
  });
  const [emailMessage, setEmailMessage] = useState('');
  const [emailError, setEmailError] = useState('');

  const isOwner = user?.userType === 'shelter';

  useEffect(() => {
    loadProfileData();
  }, [user]);

  const loadProfileData = async () => {
    if (!user) return;

    try {
      // Load pets for shelter users
      if (user.userType === 'shelter') {
        setLoading(true);
        const pets = await getAllPets({ ownerId: user.id });
        setMyPets(pets);
        setLoading(false);
      }

      // Load adoption requests for both user types
      setLoadingRequests(true);
      const requests = await getAdoptionRequests(user.id, user.userType);
      setAdoptionRequests(requests);
      setLoadingRequests(false);
    } catch (error) {
      console.error('Error loading profile data:', error);
      setLoading(false);
      setLoadingRequests(false);
    }
  };

  const handleEmailSave = async (e) => {
    e.preventDefault();
    setEmailMessage('');
    setEmailError('');

    try {
      await updateUserProfile(user.uid, {
        firstName: emailForm.firstName,
        lastName: emailForm.lastName,
        phone: emailForm.phone
      });
      setEmailMessage('Profile updated successfully.');
    } catch (error) {
      console.error('Error updating profile:', error);
      setEmailError('Failed to update profile.');
    }
  };

  const handleDeleteListing = async (pet) => {
    if (!confirm(`Delete "${pet.name}" from your listings?`)) return;

    try {
      await deletePet(pet.id);
      setMyPets(prev => prev.filter(p => p.id !== pet.id));
    } catch (error) {
      console.error('Error deleting pet:', error);
      alert('Failed to delete pet. Please try again.');
    }
  };

  const handleApproveRequest = async (requestId) => {
    try {
      await updateAdoptionRequest(requestId, 'approved');
      setAdoptionRequests(prev => 
        prev.map(req => req.id === requestId ? { ...req, status: 'approved' } : req)
      );
    } catch (error) {
      console.error('Error approving request:', error);
      alert('Failed to approve request. Please try again.');
    }
  };

  const handleRejectRequest = async (requestId) => {
    try {
      await updateAdoptionRequest(requestId, 'rejected');
      setAdoptionRequests(prev => 
        prev.map(req => req.id === requestId ? { ...req, status: 'rejected' } : req)
      );
    } catch (error) {
      console.error('Error rejecting request:', error);
      alert('Failed to reject request. Please try again.');
    }
  };

  const totalPets = isOwner ? myPets.length : adoptionRequests.filter(r => r.status === 'approved').length;
  const availablePets = isOwner ? myPets.filter(p => p.status === 'available').length : 0;
  const pendingRequests = adoptionRequests.filter(r => r.status === 'pending').length;

  if (!user) {
    return (
      <div className="profile-layout">
        <Navbar />
        <div className="profile-content-wrapper">
          <div className="no-user-message">
            <h2>Please log in to view your profile</h2>
            <button onClick={() => navigate('/login')}>Go to Login</button>
          </div>
        </div>
      </div>
    );
  }

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
                {(user.firstName?.[0] || 'U')}{(user.lastName?.[0] || '')}
              </div>
              <div className="sidebar-fields">
                <div><span className="field-label">First Name</span><span className="field-value">{user.firstName}</span></div>
                <div><span className="field-label">Last Name</span><span className="field-value">{user.lastName}</span></div>
                <div><span className="field-label">Email Address</span><span className="field-value">{user.email}</span></div>
                {user.phone && <div><span className="field-label">Phone Number</span><span className="field-value">{user.phone}</span></div>}
                <div><span className="field-label">Role</span><span className="field-value"><Badge type={user.userType} /></span></div>
              </div>
              <div className="sidebar-actions">
                <button className="sidebar-btn edit" onClick={() => {
                  const el = document.getElementById('account-edit');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}>Edit Profile</button>
                {isOwner && (
                  <button className="sidebar-btn add" onClick={() => navigate('/add-pet')}>Add Pet</button>
                )}
                <button className="sidebar-btn logout" onClick={logout}>Logout</button>
              </div>
              <div className="sidebar-stats">
                <h4>Statistics</h4>
                <ul>
                  <li><span>Total {isOwner ? 'Pets Listed' : 'Adopted'}</span><strong>{totalPets}</strong></li>
                  {isOwner && <li><span>Available Pets</span><strong>{availablePets}</strong></li>}
                  <li><span>Pending Requests</span><strong>{pendingRequests}</strong></li>
                </ul>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <section className="profile-main-card">
            {/* My Pets Section for Shelter Owners */}
            {isOwner && (
              <>
                <div className="pets-header">
                  <h2>My Pet Listings</h2>
                  <p className="sub">Pets you have listed for adoption</p>
                </div>
                {loading ? (
                  <div className="loading-state">Loading your pets...</div>
                ) : myPets.length === 0 ? (
                  <div className="empty-state">
                    <p>You haven't listed any pets yet.</p>
                    <button className="primary-btn" onClick={() => navigate('/add-pet')}>
                      Add Your First Pet
                    </button>
                  </div>
                ) : (
                  <div className="pet-grid large">
                    {myPets.map(p => (
                      <PetCard 
                        pet={p} 
                        key={p.id} 
                        cta="View Details" 
                        onCta={() => navigate(`/pet/${p.id}`)} 
                      />
                    ))}
                  </div>
                )}
              </>
            )}

            {/* Adoption Requests Section */}
            <div className="pets-header" style={{ marginTop: isOwner ? '3rem' : 0 }}>
              <h2>{isOwner ? 'Adoption Requests' : 'My Adoption Requests'}</h2>
              <p className="sub">
                {isOwner 
                  ? 'Requests from people interested in adopting your pets' 
                  : 'Your requests to adopt pets'}
              </p>
            </div>
            {loadingRequests ? (
              <div className="loading-state">Loading requests...</div>
            ) : adoptionRequests.length === 0 ? (
              <div className="empty-state">
                <p>{isOwner ? 'No adoption requests yet.' : 'You haven\'t made any adoption requests yet.'}</p>
                {!isOwner && (
                  <button className="primary-btn" onClick={() => navigate('/browse-pets')}>
                    Browse Available Pets
                  </button>
                )}
              </div>
            ) : (
              <div className="requests-grid">
                {adoptionRequests.map(request => (
                  <AdoptionRequestCard
                    key={request.id}
                    request={request}
                    onApprove={handleApproveRequest}
                    onReject={handleRejectRequest}
                    userType={user.userType}
                  />
                ))}
              </div>
            )}

            {/* Account Edit Section */}
            <div id="account-edit" className="edit-panels">
              <div className="edit-panel">
                <h3>Account Details</h3>
                <form className="form" onSubmit={handleEmailSave}>
                  {emailError && <div className="alert error">{emailError}</div>}
                  {emailMessage && <div className="alert success">{emailMessage}</div>}
                  <div className="form-row">
                    <div className="form-group">
                      <label>First Name</label>
                      <input 
                        type="text" 
                        value={emailForm.firstName} 
                        onChange={(e) => setEmailForm({ ...emailForm, firstName: e.target.value })} 
                        placeholder="First Name" 
                        required 
                      />
                    </div>
                    <div className="form-group">
                      <label>Last Name</label>
                      <input 
                        type="text" 
                        value={emailForm.lastName} 
                        onChange={(e) => setEmailForm({ ...emailForm, lastName: e.target.value })} 
                        placeholder="Last Name" 
                        required 
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Email (Read-only)</label>
                      <input 
                        type="email" 
                        value={emailForm.email} 
                        disabled 
                        style={{ backgroundColor: '#f5f5f5', cursor: 'not-allowed' }}
                      />
                    </div>
                    <div className="form-group">
                      <label>Phone</label>
                      <input 
                        type="tel" 
                        value={emailForm.phone} 
                        onChange={(e) => setEmailForm({ ...emailForm, phone: e.target.value })} 
                        placeholder="+1 234 567 890" 
                      />
                    </div>
                  </div>
                  <button type="submit" className="primary-btn compact">Save Changes</button>
                </form>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Profile;
