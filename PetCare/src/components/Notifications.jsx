import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getAdoptionRequests } from '../services/firebaseService';
import './Notifications.css';

const Notifications = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      loadNotifications();
    }
  }, [user]);

  const loadNotifications = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const requests = await getAdoptionRequests(user.id, user.userType);
      
      // Convert requests to notifications
      const notifs = requests.map(request => ({
        id: request.id,
        type: user.userType === 'adopter' ? 'request-status' : 'new-request',
        title: user.userType === 'adopter' 
          ? `Request ${request.status}` 
          : 'New Adoption Request',
        message: user.userType === 'adopter'
          ? `Your adoption request for ${request.petName} has been ${request.status}`
          : `${request.adopterName} wants to adopt ${request.petName}`,
        timestamp: request.createdAt,
        status: request.status,
        read: false
      }));
      
      setNotifications(notifs);
      setUnreadCount(notifs.filter(n => !n.read && n.status === 'pending').length);
    } catch (error) {
      console.error('Error loading notifications:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return 'Just now';
    
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    const now = new Date();
    const diffInMs = now - date;
    const diffInMins = Math.floor(diffInMs / 60000);
    
    if (diffInMins < 1) return 'Just now';
    if (diffInMins < 60) return `${diffInMins}m ago`;
    
    const diffInHours = Math.floor(diffInMins / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'new-request':
        return '📬';
      case 'request-status':
        return '✉️';
      case 'approved':
        return '✅';
      case 'rejected':
        return '❌';
      default:
        return '🔔';
    }
  };

  const toggleNotifications = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="notifications-container">
      <button 
        className="notification-bell"
        onClick={toggleNotifications}
        aria-label="Notifications"
      >
        <span className="bell-icon">🔔</span>
        {unreadCount > 0 && (
          <span className="notification-badge">{unreadCount}</span>
        )}
      </button>

      {isOpen && (
        <>
          <div className="notification-overlay" onClick={toggleNotifications} />
          <div className="notification-dropdown">
            <div className="notification-header">
              <h3>Notifications</h3>
              {unreadCount > 0 && (
                <span className="unread-count">{unreadCount} new</span>
              )}
            </div>

            <div className="notification-list">
              {isLoading ? (
                <div className="notification-loading">
                  <span className="loading-spinner"></span>
                  <p>Loading notifications...</p>
                </div>
              ) : notifications.length === 0 ? (
                <div className="notification-empty">
                  <span className="empty-icon">🐾</span>
                  <p>No notifications yet</p>
                  <span className="empty-subtext">We'll notify you about adoption updates</span>
                </div>
              ) : (
                notifications.map((notification) => (
                  <div 
                    key={notification.id} 
                    className={`notification-item ${!notification.read ? 'unread' : ''}`}
                  >
                    <div className="notification-icon">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="notification-content">
                      <h4>{notification.title}</h4>
                      <p>{notification.message}</p>
                      <span className="notification-time">
                        {formatTime(notification.timestamp)}
                      </span>
                    </div>
                    {!notification.read && (
                      <div className="unread-dot"></div>
                    )}
                  </div>
                ))
              )}
            </div>

            {notifications.length > 0 && (
              <div className="notification-footer">
                <button className="view-all-btn">
                  View All Notifications
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Notifications;
