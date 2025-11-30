import { useState } from 'react';
import Navbar from '../components/Navbar';
import './Resources.css';

const Resources = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  // Categories data
  const categories = [
    { id: 'all', name: 'All', icon: '📚', count: 126, color: '#FD9A39' },
    { id: 'new-parent', name: 'New Pet Parent Guide', icon: '🏠', count: 12, color: '#4299E1' },
    { id: 'health', name: 'Health & Wellness', icon: '❤️', count: 45, color: '#F56565' },
    { id: 'nutrition', name: 'Nutrition & Diet', icon: '🥗', count: 28, color: '#48BB78' },
    { id: 'training', name: 'Training Tips', icon: '🎯', count: 36, color: '#9F7AEA' },
    { id: 'grooming', name: 'Grooming Basics', icon: '✂️', count: 19, color: '#ED8936' },
    { id: 'behavioral', name: 'Behavioral Issues', icon: '🧠', count: 24, color: '#ECC94B' }
  ];

  // Articles data
  const articles = [
    {
      id: 1,
      category: 'health',
      title: 'Complete Guide to Pet Vaccinations',
      description: 'Everything you need to know about keeping your pet healthy with proper vaccinations.',
      readTime: '8 min read',
      author: 'Dr. Sarah Johnson, DVM',
      image: null,
      featured: true
    },
    {
      id: 2,
      category: 'new-parent',
      title: 'First Week Home: A Complete Checklist',
      description: 'Prepare your home and family for your new furry friend with this comprehensive guide.',
      readTime: '10 min read',
      author: 'Emily Carter',
      image: null,
      featured: true
    },
    {
      id: 3,
      category: 'nutrition',
      title: 'Understanding Your Pet\'s Nutritional Needs',
      description: 'Learn about proper nutrition and how to choose the right food for your pet\'s age and breed.',
      readTime: '6 min read',
      author: 'Dr. Michael Chen',
      image: null,
      featured: false
    },
    {
      id: 4,
      category: 'training',
      title: 'Positive Reinforcement Training Methods',
      description: 'Effective training techniques that build trust and strengthen the bond with your pet.',
      readTime: '12 min read',
      author: 'Lisa Anderson',
      image: null,
      featured: true
    },
    {
      id: 5,
      category: 'grooming',
      title: 'Essential Grooming Tools Every Pet Owner Needs',
      description: 'A comprehensive guide to grooming supplies and how to use them properly.',
      readTime: '7 min read',
      author: 'James Wilson',
      image: null,
      featured: false
    },
    {
      id: 6,
      category: 'behavioral',
      title: 'Understanding Common Behavioral Issues',
      description: 'Identify and address common behavioral problems with expert advice and solutions.',
      readTime: '9 min read',
      author: 'Dr. Rachel Martinez',
      image: null,
      featured: false
    },
    {
      id: 7,
      category: 'health',
      title: 'Signs Your Pet Needs to See a Vet',
      description: 'Learn to recognize warning signs and when to seek professional veterinary care.',
      readTime: '5 min read',
      author: 'Dr. Sarah Johnson, DVM',
      image: null,
      featured: false
    },
    {
      id: 8,
      category: 'new-parent',
      title: 'Choosing the Right Pet for Your Lifestyle',
      description: 'Important factors to consider before bringing a new pet into your home.',
      readTime: '11 min read',
      author: 'Emily Carter',
      image: null,
      featured: false
    },
    {
      id: 9,
      category: 'nutrition',
      title: 'Homemade Pet Food: Benefits and Risks',
      description: 'Explore the pros and cons of preparing your pet\'s meals at home.',
      readTime: '8 min read',
      author: 'Dr. Michael Chen',
      image: null,
      featured: false
    },
    {
      id: 10,
      category: 'training',
      title: 'House Training Your New Puppy',
      description: 'Step-by-step guide to successfully house train your puppy with patience and consistency.',
      readTime: '10 min read',
      author: 'Lisa Anderson',
      image: null,
      featured: false
    },
    {
      id: 11,
      category: 'grooming',
      title: 'How to Trim Your Pet\'s Nails Safely',
      description: 'Professional tips for safe and stress-free nail trimming at home.',
      readTime: '6 min read',
      author: 'James Wilson',
      image: null,
      featured: false
    },
    {
      id: 12,
      category: 'behavioral',
      title: 'Dealing with Separation Anxiety',
      description: 'Effective strategies to help your pet cope with being alone.',
      readTime: '9 min read',
      author: 'Dr. Rachel Martinez',
      image: null,
      featured: false
    },
    {
      id: 13,
      category: 'health',
      title: 'Preventing Common Pet Parasites',
      description: 'Essential information about fleas, ticks, and worms and how to prevent them.',
      readTime: '7 min read',
      author: 'Dr. Sarah Johnson, DVM',
      image: null,
      featured: false
    },
    {
      id: 14,
      category: 'nutrition',
      title: 'Reading Pet Food Labels Like a Pro',
      description: 'Understand ingredient lists and nutritional information to make informed choices.',
      readTime: '8 min read',
      author: 'Dr. Michael Chen',
      image: null,
      featured: false
    },
    {
      id: 15,
      category: 'training',
      title: 'Teaching Basic Commands',
      description: 'Master essential commands like sit, stay, and come with professional training methods.',
      readTime: '11 min read',
      author: 'Lisa Anderson',
      image: null,
      featured: false
    }
  ];

  const filteredArticles = activeCategory === 'All' || activeCategory === 'all'
    ? articles
    : articles.filter(article => article.category === activeCategory);

  const featuredArticles = articles.filter(article => article.featured);

  const handleReadArticle = (articleId) => {
    alert(`Opening article ${articleId}`);
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
          <div className="search-bar-resources">
            <input 
              type="text" 
              placeholder="Search articles..."
              className="search-input-resources"
            />
            <button className="search-btn-resources">Search</button>
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
                  <p>{category.count} articles</p>
                </div>
                <div className="category-arrow" style={{ color: category.color }}>→</div>
              </button>
            ))}
          </div>
        </div>

        {/* Featured Articles */}
        {activeCategory === 'All' || activeCategory === 'all' ? (
          <div className="featured-section">
            <h2 className="section-title">Featured Articles</h2>
            <div className="featured-grid">
              {featuredArticles.map((article) => (
                <div key={article.id} className="featured-article-card">
                  <div className="featured-badge">⭐ Featured</div>
                  <div className="article-image-large">
                    <div className="image-placeholder-large">
                      {article.category === 'health' && '🏥'}
                      {article.category === 'new-parent' && '🏠'}
                      {article.category === 'training' && '🎯'}
                      {article.category === 'nutrition' && '🥗'}
                    </div>
                  </div>
                  <div className="article-content-large">
                    <div className="article-meta">
                      <span className="article-category-badge">
                        {categories.find(cat => cat.id === article.category)?.name}
                      </span>
                      <span className="article-read-time">{article.readTime}</span>
                    </div>
                    <h3 className="article-title-large">{article.title}</h3>
                    <p className="article-description">{article.description}</p>
                    <div className="article-footer">
                      <div className="author-info">
                        <div className="author-avatar">
                          {article.author.split(' ')[0][0]}
                        </div>
                        <span className="author-name">{article.author}</span>
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
        ) : null}

        {/* All Articles Grid */}
        <div className="articles-section">
          <div className="articles-header">
            <h2 className="section-title">
              {activeCategory === 'All' || activeCategory === 'all' 
                ? 'All Articles' 
                : categories.find(cat => cat.id === activeCategory)?.name}
            </h2>
            <p className="results-count">{filteredArticles.length} articles found</p>
          </div>
          
          <div className="articles-grid">
            {filteredArticles.map((article) => (
              <div key={article.id} className="article-card">
                <div className="article-image">
                  <div className="image-placeholder">
                    {article.category === 'health' && '🏥'}
                    {article.category === 'new-parent' && '🏠'}
                    {article.category === 'nutrition' && '🥗'}
                    {article.category === 'training' && '🎯'}
                    {article.category === 'grooming' && '✂️'}
                    {article.category === 'behavioral' && '🧠'}
                  </div>
                </div>
                <div className="article-content">
                  <div className="article-meta">
                    <span className="article-category-badge-small">
                      {categories.find(cat => cat.id === article.category)?.name}
                    </span>
                    <span className="article-read-time-small">{article.readTime}</span>
                  </div>
                  <h3 className="article-title">{article.title}</h3>
                  <p className="article-description-short">{article.description}</p>
                  <div className="article-author">
                    <div className="author-avatar-small">
                      {article.author.split(' ')[0][0]}
                    </div>
                    <span className="author-name-small">{article.author}</span>
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

        {/* Newsletter Section */}
        <div className="newsletter-section">
          <div className="newsletter-content">
            <div className="newsletter-icon">📬</div>
            <h2>Stay Updated with Pet Care Tips</h2>
            <p>Subscribe to our newsletter for weekly expert advice and resources</p>
            <div className="newsletter-form">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="newsletter-input"
              />
              <button className="newsletter-btn">Subscribe</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources;
