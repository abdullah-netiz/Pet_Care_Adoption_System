import { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import { getAllArticles, subscribeNewsletter } from '../services/firebaseService';
import { seedArticles } from '../utils/seedArticles';
import './Resources.css';

const Resources = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribing, setSubscribing] = useState(false);
  const [newsletterMessage, setNewsletterMessage] = useState('');
  const [seedError, setSeedError] = useState('');
  const hasSeededRef = useRef(false);

  // Categories data
  const categories = [
    { id: 'all', name: 'All', icon: '📚', color: '#FD9A39' },
    { id: 'new-parent', name: 'New Pet Parent Guide', icon: '🏠', color: '#4299E1' },
    { id: 'health', name: 'Health & Wellness', icon: '❤️', color: '#F56565' },
    { id: 'nutrition', name: 'Nutrition & Diet', icon: '🥗', color: '#48BB78' },
    { id: 'training', name: 'Training Tips', icon: '🎯', color: '#9F7AEA' },
    { id: 'grooming', name: 'Grooming Basics', icon: '✂️', color: '#ED8936' },
    { id: 'behavioral', name: 'Behavioral Issues', icon: '🧠', color: '#ECC94B' }
  ];

  useEffect(() => {
    loadArticles();
  }, [activeCategory]);

  const loadArticles = async () => {
    try {
      setLoading(true);
      setSeedError('');
      const categoryFilter = activeCategory === 'all' ? null : activeCategory;
      let fetchedArticles = await getAllArticles(categoryFilter);

      if (
        fetchedArticles.length === 0 &&
        !hasSeededRef.current &&
        (categoryFilter === null || categoryFilter === undefined)
      ) {
        const seedResult = await seedArticles();
        if (seedResult.success) {
          hasSeededRef.current = true;
          fetchedArticles = await getAllArticles(categoryFilter);
        } else {
          setSeedError('Failed to auto-populate default articles. Please refresh to try again.');
        }
      }

      setArticles(fetchedArticles);
    } catch (error) {
      console.error('Error loading articles:', error);
      setArticles([]);
      setSeedError('Unable to load articles right now. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const filteredArticles = searchTerm
    ? articles.filter(article =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : articles;

  const featuredArticles = articles.filter(article => article.featured);

  const handleReadArticle = (articleId) => {
    // Placeholder for article detail page
    alert(`Article detail page coming soon! Article ID: ${articleId}`);
  };

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    
    if (!newsletterEmail) {
      setNewsletterMessage('Please enter your email address');
      return;
    }

    try {
      setSubscribing(true);
      setNewsletterMessage('');
      
      await subscribeNewsletter(newsletterEmail);
      
      setNewsletterMessage('Thank you for subscribing! Check your email for confirmation.');
      setNewsletterEmail('');
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      if (error.message.includes('already subscribed')) {
        setNewsletterMessage('This email is already subscribed to our newsletter.');
      } else {
        setNewsletterMessage('Failed to subscribe. Please try again.');
      }
    } finally {
      setSubscribing(false);
    }
  };

  const getCategoryIcon = (category) => {
    const cat = categories.find(c => c.id === category);
    return cat ? cat.icon : '📄';
  };

  const getCategoryName = (categoryId) => {
    const cat = categories.find(c => c.id === categoryId);
    return cat ? cat.name : categoryId;
  };

  // Calculate article counts per category
  const getCategoryCount = (categoryId) => {
    if (categoryId === 'all') return articles.length;
    return articles.filter(a => a.category === categoryId).length;
  };

  return (
    <div className="resources-page">
      <Navbar />
      
      <div className="resources-container">
        {/* Hero Section */}
        <div className="resources-hero">
          <div className="hero-badge">📖 Knowledge Center</div>
          <h1>Pet Care Resources & Articles</h1>
          <p>Expert guides and tips to help you provide the best care for your furry friends</p>
          {seedError && (
            <div className="resources-alert" style={{ color: '#b91c1c', fontWeight: 600 }}>
              {seedError}
            </div>
          )}
          <div className="search-bar-resources">
            <input 
              type="text" 
              placeholder="Search articles..."
              className="search-input-resources"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button 
              className="search-btn-resources"
              onClick={() => setSearchTerm(searchTerm)}
            >
              Search
            </button>
          </div>
        </div>

        {/* Categories Section */}
        <div className="categories-section">
          <h2 className="section-title">Browse by Category</h2>
          <div className="categories-grid">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`category-card ${activeCategory === category.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(category.id)}
              >
                <div className="category-icon" style={{ background: `${category.color}20` }}>
                  <span style={{ color: category.color }}>{category.icon}</span>
                </div>
                <div className="category-info">
                  <h3>{category.name}</h3>
                  <p>{getCategoryCount(category.id)} articles</p>
                </div>
                <div className="category-arrow" style={{ color: category.color }}>→</div>
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="loading-container">
            <p>Loading articles...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && articles.length === 0 && (
          <div className="empty-state-resources">
            <h3>No articles found</h3>
            <p>Check back soon for new content!</p>
          </div>
        )}

        {/* Featured Articles */}
        {!loading && activeCategory === 'all' && featuredArticles.length > 0 && (
          <div className="featured-section">
            <h2 className="section-title">Featured Articles</h2>
            <div className="featured-grid">
              {featuredArticles.map((article) => (
                <div key={article.id} className="featured-article-card">
                  <div className="featured-badge">⭐ Featured</div>
                  <div className="article-image-large">
                    <div className="image-placeholder-large">
                      {getCategoryIcon(article.category)}
                    </div>
                  </div>
                  <div className="article-content-large">
                    <div className="article-meta">
                      <span className="article-category-badge">
                        {getCategoryName(article.category)}
                      </span>
                      <span className="article-read-time">{article.readTime || '5 min read'}</span>
                    </div>
                    <h3 className="article-title-large">{article.title}</h3>
                    <p className="article-description">{article.description}</p>
                    <div className="article-footer">
                      <div className="author-info">
                        <div className="author-avatar">
                          {article.author ? article.author.split(' ')[0][0] : 'A'}
                        </div>
                        <span className="author-name">{article.author || 'Anonymous'}</span>
                      </div>
                      <button 
                        className="btn-read-more"
                        onClick={() => handleReadArticle(article.id)}
                      >
                        Read More
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All Articles Grid */}
        {!loading && filteredArticles.length > 0 && (
          <div className="articles-section">
            <div className="articles-header">
              <h2 className="section-title">
                {activeCategory === 'all' 
                  ? 'All Articles' 
                  : getCategoryName(activeCategory)}
              </h2>
              <p className="results-count">{filteredArticles.length} articles found</p>
            </div>
            
            <div className="articles-grid">
              {filteredArticles.map((article) => (
                <div key={article.id} className="article-card">
                  <div className="article-image">
                    <div className="image-placeholder">
                      {getCategoryIcon(article.category)}
                    </div>
                  </div>
                  <div className="article-content">
                    <div className="article-meta">
                      <span className="article-category-badge-small">
                        {getCategoryName(article.category)}
                      </span>
                      <span className="article-read-time-small">{article.readTime || '5 min read'}</span>
                    </div>
                    <h3 className="article-title">{article.title}</h3>
                    <p className="article-description-short">{article.description}</p>
                    <div className="article-author">
                      <div className="author-avatar-small">
                        {article.author ? article.author.split(' ')[0][0] : 'A'}
                      </div>
                      <span className="author-name-small">{article.author || 'Anonymous'}</span>
                    </div>
                    <button 
                      className="btn-read-article"
                      onClick={() => handleReadArticle(article.id)}
                    >
                      Read More
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Newsletter Section */}
        <div className="newsletter-section">
          <div className="newsletter-content">
            <div className="newsletter-icon">📬</div>
            <h2>Stay Updated with Pet Care Tips</h2>
            <p>Subscribe to our newsletter for weekly expert advice and resources</p>
            <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
              <input 
                type="email" 
                placeholder="Enter your email"
                className="newsletter-input"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                disabled={subscribing}
                required
              />
              <button 
                type="submit" 
                className="newsletter-btn"
                disabled={subscribing}
              >
                {subscribing ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
            {newsletterMessage && (
              <div className={`newsletter-message ${newsletterMessage.includes('Thank you') ? 'success' : 'error'}`}>
                {newsletterMessage}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources;
