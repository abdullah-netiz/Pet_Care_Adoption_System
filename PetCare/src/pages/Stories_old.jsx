import { useState } from 'react';
import Navbar from '../components/Navbar';
import './Stories.css';

const Stories = () => {
  const [activeFilter, setActiveFilter] = useState('All Pets');

  // Mock stories data
  const stories = [
    {
      id: 1,
      petName: 'Max',
      petType: 'Dog',
      image: null,
      adoptionDate: 'December 20, 2023',
      family: 'The Johnson Family',
      title: 'Max has brought so much joy to our home!',
      story: 'Max was brought to much joy to our home. Our kids absolutely adore him, and he\'s been the perfect addition to our family. He loves playing fetch in the backyard and has already learned so many tricks. We couldn\'t imagine life without Max now!',
      likes: 342,
      comments: 28,
      shares: 15
    },
    {
      id: 2,
      petName: 'Emma Wilson',
      petType: 'Cat',
      image: null,
      adoptionDate: 'September 15, 2023',
      family: 'Emma Wilson',
      title: 'I was looking for a senior cat, and Luna is perfect',
      story: 'I was looking for a senior cat, and Luna is perfect. She\'s calm and loving, and we spend evenings cuddled up together. I\'m so grateful to have found her!',
      likes: 287,
      comments: 22,
      shares: 10
    },
    {
      id: 3,
      petName: 'Sarah & Ahmed',
      petType: 'Dog',
      image: null,
      adoptionDate: 'August 10, 2023',
      family: 'Sarah & Ahmed',
      title: 'Rocky has been a playful and energetic companion',
      story: 'Rocky has been a playful and energetic companion. His fun-loving nature fits perfectly with our active lifestyle. He loves morning runs and weekend hikes with us. Adopting Rocky was the best decision we ever made!',
      likes: 451,
      comments: 35,
      shares: 22
    },
    {
      id: 4,
      petName: 'Bella',
      petType: 'Cat',
      image: null,
      adoptionDate: 'November 5, 2023',
      family: 'The Martinez Family',
      title: 'Bella is the sweetest cat we\'ve ever met',
      story: 'Bella is the sweetest cat we\'ve ever met. She\'s gentle with our children and loves to purr while being petted. Every morning she greets us with soft meows and follows us around the house. She\'s brought so much warmth to our home.',
      likes: 312,
      comments: 24,
      shares: 18
    },
    {
      id: 5,
      petName: 'Charlie',
      petType: 'Dog',
      image: null,
      adoptionDate: 'July 22, 2023',
      family: 'Michael Chen',
      title: 'Charlie was a rescue from the shelter',
      story: 'Charlie was a rescue from the shelter, and he\'s transformed my life completely. As someone living alone, he\'s become my best friend and constant companion. His loyalty and affection are unmatched. We go on daily walks and he\'s helped me meet so many new people in the neighborhood!',
      likes: 528,
      comments: 42,
      shares: 31
    },
    {
      id: 6,
      petName: 'Luna & Shadow',
      petType: 'Cat',
      image: null,
      adoptionDate: 'October 1, 2023',
      family: 'The Anderson Family',
      title: 'We adopted two bonded cats',
      story: 'We adopted two bonded cats, Luna and Shadow, and they\'ve brought double the joy! They play together, groom each other, and even sleep cuddled up. It\'s heartwarming to see their bond and how they\'ve adapted to our home. Best decision to keep them together!',
      likes: 395,
      comments: 31,
      shares: 20
    },
    {
      id: 7,
      petName: 'Duke',
      petType: 'Dog',
      image: null,
      adoptionDate: 'June 15, 2023',
      family: 'The Thompson Family',
      title: 'Duke is our gentle giant',
      story: 'Duke is our gentle giant. Despite his large size, he\'s incredibly gentle with our kids. He loves playing in the yard and is always excited for meal times. He\'s protective yet loving, and has become an integral part of our family. Everyone in the neighborhood knows and loves Duke!',
      likes: 418,
      comments: 38,
      shares: 25
    },
    {
      id: 8,
      petName: 'Whiskers',
      petType: 'Cat',
      image: null,
      adoptionDate: 'May 8, 2023',
      family: 'Lisa Patterson',
      title: 'Whiskers came into my life when I needed companionship',
      story: 'Whiskers came into my life when I needed companionship the most. This senior cat has so much love to give. He sits by the window watching birds and purrs contentedly on my lap every evening. His calming presence has helped me through difficult times.',
      likes: 276,
      comments: 19,
      shares: 12
    }
  ];

  const filters = ['All Pets', 'Dogs', 'Cats', 'Birds', 'Breed & Size'];

  const filteredStories = activeFilter === 'All Pets' 
    ? stories 
    : stories.filter(story => {
        if (activeFilter === 'Dogs') return story.petType === 'Dog';
        if (activeFilter === 'Cats') return story.petType === 'Cat';
        if (activeFilter === 'Birds') return story.petType === 'Bird';
        return true;
      });

  const handleShare = (storyId) => {
    alert(`Sharing story ${storyId}`);
  };

  return (
    <div className="stories-page">
      <Navbar />
      
      <div className="stories-container">
        {/* Header Section */}
        <div className="stories-header">
          <div className="header-badge">❤️ Happy Tails & New Beginnings</div>
          <h1>Every adoption creates a lifelong bond</h1>
          <p>Share your experience and inspire others to adopt!</p>
          <button className="btn-share-story">
            Share Your Story
          </button>
        </div>

        {/* Stats Section */}
        <div className="stories-stats">
          <div className="stat-box">
            <div className="stat-icon">📖</div>
            <div className="stat-info">
              <h3>2,500+</h3>
              <p>Happy Stories</p>
            </div>
          </div>
          <div className="stat-box">
            <div className="stat-icon">🐕</div>
            <div className="stat-info">
              <h3>1,200+</h3>
              <p>Dogs Adopted</p>
            </div>
          </div>
          <div className="stat-box">
            <div className="stat-icon">🐱</div>
            <div className="stat-info">
              <h3>1,000+</h3>
              <p>Cats Adopted</p>
            </div>
          </div>
          <div className="stat-box">
            <div className="stat-icon">🦜</div>
            <div className="stat-info">
              <h3>300+</h3>
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

        {/* Stories Grid */}
        <div className="stories-grid">
          {filteredStories.map((story) => (
            <div key={story.id} className="story-card">
              {/* Story Image/Placeholder */}
              <div className="story-image">
                <div className="image-placeholder">
                  <span className="pet-emoji">
                    {story.petType === 'Dog' ? '🐕' : story.petType === 'Cat' ? '🐱' : '🦜'}
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
                      {story.petType} • Adopted {story.adoptionDate}
                    </p>
                  </div>
                </div>

                <div className="story-family">
                  <span className="family-icon">👨‍👩‍👧‍👦</span>
                  <span className="family-name">{story.family}</span>
                </div>

                <h4 className="story-title">{story.title}</h4>
                <p className="story-text">{story.story}</p>

                <button className="read-more-btn">Read Full Story</button>

                {/* Engagement Section */}
                <div className="story-engagement">
                  <div className="engagement-stats">
                    <div className="stat-item">
                      <span className="stat-icon-small">❤️</span>
                      <span className="stat-count">{story.likes}</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-icon-small">💬</span>
                      <span className="stat-count">{story.comments}</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-icon-small">🔄</span>
                      <span className="stat-count">{story.shares}</span>
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

        {/* Call to Action Section */}
        <div className="cta-section">
          <div className="cta-content">
            <h2>Have an Adoption Success Story?</h2>
            <p>Share your experience and inspire others to adopt!</p>
            <button className="btn-cta-submit">Submit Your Story</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stories;
