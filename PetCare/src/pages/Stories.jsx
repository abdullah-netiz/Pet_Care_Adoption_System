import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import { getAllStories, createStory, updateStoryEngagement } from '../services/firebaseService';
import { seedStories } from '../utils/seedStories';
import './Stories.css';

const Stories = () => {
  const { user } = useAuth();
  const [activeFilter, setActiveFilter] = useState('All Pets');
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [seeding, setSeeding] = useState(false);

  const [newStory, setNewStory] = useState({
    petName: '',
    petType: 'Dog',
    adoptionDate: '',
    title: '',
    story: ''
  });

  useEffect(() => {
    loadStories();
  }, []);

  const loadStories = async () => {
    try {
      setLoading(true);
      const fetchedStories = await getAllStories();
      setStories(fetchedStories);
    } catch (error) {
      console.error('Error loading stories:', error);
    } finally {
      setLoading(false);
    }
  };

  const filters = ['All Pets', 'Dogs', 'Cats', 'Birds', 'Breed & Size'];

  const filteredStories = activeFilter === 'All Pets' 
    ? stories 
    : stories.filter(story => {
        if (activeFilter === 'Dogs') return story.petType === 'Dog';
        if (activeFilter === 'Cats') return story.petType === 'Cat';
        if (activeFilter === 'Birds') return story.petType === 'Bird';
        return true;
      });

  const handleLike = async (storyId) => {
    try {
      await updateStoryEngagement(storyId, 'like');
      setStories(prev => prev.map(story => 
        story.id === storyId 
          ? { ...story, likes: (story.likes || 0) + 1 }
          : story
      ));
    } catch (error) {
      console.error('Error liking story:', error);
    }
  };

  const handleComment = (storyId) => {
    // Placeholder for future comment functionality
    alert('Comment functionality coming soon!');
  };

  const handleShare = async (storyId) => {
    try {
      await updateStoryEngagement(storyId, 'shares');
      setStories(prev => prev.map(story => 
        story.id === storyId 
          ? { ...story, shares: (story.shares || 0) + 1 }
          : story
      ));
      
      // Copy link to clipboard
      const link = `${window.location.origin}/stories/${storyId}`;
      await navigator.clipboard.writeText(link);
      alert('Story link copied to clipboard!');
    } catch (error) {
      console.error('Error sharing story:', error);
      alert('Could not copy link to clipboard');
    }
  };

  const handleSeedStories = async () => {
    if (!window.confirm('This will add 20 fabricated stories to the database. Continue?')) {
      return;
    }
    
    try {
      setSeeding(true);
      const result = await seedStories();
      if (result.success) {
        alert(`Successfully added ${result.count} stories!`);
        await loadStories();
      } else {
        alert('Failed to add stories. Check console for details.');
      }
    } catch (error) {
      console.error('Error seeding stories:', error);
      alert('Failed to seed stories');
    } finally {
      setSeeding(false);
    }
  };

  const handleSubmitStory = async (e) => {
    e.preventDefault();
    
    if (!user) {
      alert('Please log in to share your story');
      return;
    }

    try {
      setSubmitting(true);
      
      const storyData = {
        ...newStory,
        adopterName: `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.displayName || 'Anonymous',
        authorId: user.id,
        authorEmail: user.email
      };

      await createStory(storyData);
      
      // Reset form and close modal
      setNewStory({
        petName: '',
        petType: 'Dog',
        adoptionDate: '',
        title: '',
        story: ''
      });
      setShowModal(false);
      
      // Reload stories
      await loadStories();
      
      alert('Your story has been submitted successfully!');
    } catch (error) {
      console.error('Error submitting story:', error);
      alert('Failed to submit story. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  // Calculate stats from actual stories
  const totalStories = stories.length;
  const dogsAdopted = stories.filter(s => s.petType === 'Dog').length;
  const catsAdopted = stories.filter(s => s.petType === 'Cat').length;
  const otherPets = stories.filter(s => s.petType !== 'Dog' && s.petType !== 'Cat').length;

  return (
    <div className="stories-page">
      <Navbar />
      
      <div className="stories-container">
        {/* Header Section */}
        <div className="stories-header">
          <div className="header-badge">❤️ Happy Tails & New Beginnings</div>
          <h1>Every adoption creates a lifelong bond</h1>
          <p>Share your experience and inspire others to adopt!</p>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <button 
              className="btn-share-story"
              onClick={() => {
                if (!user) {
                  alert('Please log in to share your story');
                  return;
                }
                setShowModal(true);
              }}
            >
              Share Your Story
            </button>
            <button 
              className="btn-share-story"
              onClick={handleSeedStories}
              disabled={seeding}
              style={{ background: '#9333ea' }}
            >
              {seeding ? 'Adding Stories...' : 'Add Sample Stories'}
            </button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="stories-stats">
          <div className="stat-box">
            <div className="stat-icon">📖</div>
            <div className="stat-info">
              <h3>{totalStories}+</h3>
              <p>Happy Stories</p>
            </div>
          </div>
          <div className="stat-box">
            <div className="stat-icon">🐕</div>
            <div className="stat-info">
              <h3>{dogsAdopted}+</h3>
              <p>Dogs Adopted</p>
            </div>
          </div>
          <div className="stat-box">
            <div className="stat-icon">🐱</div>
            <div className="stat-info">
              <h3>{catsAdopted}+</h3>
              <p>Cats Adopted</p>
            </div>
          </div>
          <div className="stat-box">
            <div className="stat-icon">🦜</div>
            <div className="stat-info">
              <h3>{otherPets}+</h3>
              <p>Other Pets</p>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="filter-tabs">
          {filters.map((filter) => (
            <button
              key={filter}
              className={`filter-tab ${activeFilter === filter ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="loading-container">
            <p>Loading stories...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && stories.length === 0 && (
          <div className="empty-state-stories">
            <h3>No stories yet</h3>
            <p>Be the first to share your adoption success story!</p>
            <button 
              className="btn-share-story"
              onClick={() => {
                if (!user) {
                  alert('Please log in to share your story');
                  return;
                }
                setShowModal(true);
              }}
            >
              Share Your Story
            </button>
          </div>
        )}

        {/* Stories Grid */}
        {!loading && filteredStories.length > 0 && (
          <div className="stories-grid">
            {filteredStories.map((story) => (
              <div key={story.id} className="story-card">
                {/* Story Image/Placeholder */}
                <div className="story-image">
                  <div className="image-placeholder">
                    <span className="pet-emoji">
                      {story.petType === 'Dog' ? '🐕' : story.petType === 'Cat' ? '🐱' : story.petType === 'Bird' ? '🦜' : '🐾'}
                    </span>
                  </div>
                  <div className="adoption-badge">
                    <span className="badge-icon">✓</span>
                    <span className="badge-text">Adopted</span>
                  </div>
                </div>

                {/* Story Content */}
                <div className="story-content">
                  <div className="story-header">
                    <div className="pet-info">
                      <h3 className="pet-name">{story.petName}</h3>
                      <p className="pet-meta">
                        {story.petType} • Adopted {formatDate(story.adoptionDate)}
                      </p>
                    </div>
                  </div>

                  <div className="story-family">
                    <span className="family-icon">👨‍👩‍👧‍👦</span>
                    <span className="family-name">{story.authorName}</span>
                  </div>

                  <h4 className="story-title">{story.title}</h4>
                  <p className="story-text">{story.story}</p>

                  {/* Engagement Section */}
                  <div className="story-engagement">
                    <div className="engagement-stats">
                      <button 
                        className="stat-item clickable"
                        onClick={() => handleLike(story.id)}
                        title="Like this story"
                      >
                        <span className="stat-icon-small">❤️</span>
                        <span className="stat-count">{story.likes || 0}</span>
                      </button>
                      <button 
                        className="stat-item clickable"
                        onClick={() => handleComment(story.id)}
                        title="Comment on this story"
                      >
                        <span className="stat-icon-small">💬</span>
                        <span className="stat-count">{story.comments || 0}</span>
                      </button>
                      <div className="stat-item">
                        <span className="stat-icon-small">🔄</span>
                        <span className="stat-count">{story.shares || 0}</span>
                      </div>
                    </div>
                    <button 
                      className="share-btn"
                      onClick={() => handleShare(story.id)}
                    >
                      <span className="share-icon">↗</span>
                      Share
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Call to Action Section */}
        <div className="cta-section">
          <div className="cta-content">
            <h2>Have an Adoption Success Story?</h2>
            <p>Share your experience and inspire others to adopt!</p>
            <button 
              className="btn-cta-submit"
              onClick={() => {
                if (!user) {
                  alert('Please log in to share your story');
                  return;
                }
                setShowModal(true);
              }}
            >
              Submit Your Story
            </button>
          </div>
        </div>
      </div>

      {/* Submit Story Modal */}
      {showModal && (
        <div className="modal-backdrop" onClick={() => !submitting && setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Share Your Adoption Story</h2>
            <form onSubmit={handleSubmitStory}>
              <div className="form-group">
                <label>Pet's Name *</label>
                <input
                  type="text"
                  value={newStory.petName}
                  onChange={(e) => setNewStory({ ...newStory, petName: e.target.value })}
                  required
                  placeholder="e.g., Max"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Pet Type *</label>
                  <select
                    value={newStory.petType}
                    onChange={(e) => setNewStory({ ...newStory, petType: e.target.value })}
                    required
                  >
                    <option value="Dog">Dog</option>
                    <option value="Cat">Cat</option>
                    <option value="Bird">Bird</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Adoption Date *</label>
                  <input
                    type="date"
                    value={newStory.adoptionDate}
                    onChange={(e) => setNewStory({ ...newStory, adoptionDate: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Story Title *</label>
                <input
                  type="text"
                  value={newStory.title}
                  onChange={(e) => setNewStory({ ...newStory, title: e.target.value })}
                  required
                  placeholder="e.g., Max has brought so much joy to our home!"
                  maxLength={100}
                />
              </div>

              <div className="form-group">
                <label>Your Story *</label>
                <textarea
                  value={newStory.story}
                  onChange={(e) => setNewStory({ ...newStory, story: e.target.value })}
                  required
                  placeholder="Tell us about your experience adopting your pet..."
                  rows={6}
                  maxLength={1000}
                />
                <span className="char-count">{newStory.story.length}/1000</span>
              </div>

              <div className="modal-actions">
                <button 
                  type="button" 
                  className="btn-cancel"
                  onClick={() => setShowModal(false)}
                  disabled={submitting}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn-submit"
                  disabled={submitting}
                >
                  {submitting ? 'Submitting...' : 'Submit Story'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Stories;
