import { useState, useRef, useEffect } from 'react';
import './Chatbot.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: 'Hi! 👋 I\'m your Pet Adoption Assistant. How can I help you today?',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickReplies = [
    { text: 'How to adopt a pet?', icon: '🐾' },
    { text: 'How to list a pet?', icon: '📝' },
    { text: 'About shelters', icon: '🏥' },
    { text: 'Contact info', icon: '📞' }
  ];

  const getBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase();

    // Greetings
    if (message.match(/^(hi|hello|hey|good morning|good afternoon|good evening)/)) {
      return 'Hello! 😊 I\'m here to help you with pet adoption. What would you like to know?';
    }

    // How to adopt
    if (message.includes('adopt') || message.includes('adoption')) {
      return '🐾 To adopt a pet:\n\n1. Browse available pets in the "Browse Pets" section\n2. Click on a pet you like to see details\n3. Click "Request to Adopt"\n4. Fill in your information\n5. Wait for the shelter to approve your request\n\nYou need to be logged in as an Adopter to send adoption requests!';
    }

    // How to list a pet
    if (message.includes('list') || message.includes('add pet') || message.includes('shelter')) {
      return '📝 To list a pet for adoption:\n\n1. Log in as a Shelter/Owner account\n2. Go to "Add Pet" from navigation\n3. Fill in pet details (name, type, age, etc.)\n4. Add an image URL (use imgur.com for free hosting)\n5. Submit the form\n\nOnly Shelter accounts can list pets!';
    }

    // About shelters
    if (message.includes('shelter') && !message.includes('list')) {
      return '🏥 About Shelters:\n\n• View all registered shelters in the "Shelters" section\n• See their location, contact info, and available pets\n• Shelter owners can register their organization\n• Each shelter can list multiple pets for adoption';
    }

    // Stories
    if (message.includes('stor')) {
      return '❤️ Success Stories:\n\n• Read heartwarming adoption stories from other families\n• Share your own adoption experience\n• Get inspired to adopt a pet\n\nVisit the "Stories" section to read more!';
    }

    // Resources
    if (message.includes('resource') || message.includes('guide') || message.includes('help')) {
      return '📚 Resources:\n\n• Pet care guides and tips\n• Training advice\n• Health information\n• Subscribe to our newsletter for updates\n\nCheck the "Resources" section!';
    }

    // Account/Login
    if (message.includes('account') || message.includes('login') || message.includes('sign up') || message.includes('register')) {
      return '👤 Account Information:\n\n• Click "Login" to sign in with Google\n• Choose your account type: Adopter or Shelter\n• Adopters can request pet adoptions\n• Shelters can list pets for adoption\n\nNo password needed - we use Google login!';
    }

    // Profile
    if (message.includes('profile')) {
      return '⚙️ Your Profile:\n\n• View and edit your information\n• See your listed pets (Shelters)\n• Check adoption requests\n• Manage your account settings\n\nAccess your profile from the top-right menu!';
    }

    // Contact
    if (message.includes('contact') || message.includes('support') || message.includes('email')) {
      return '📞 Contact Us:\n\n• Email: support@petadoption.com\n• Phone: +1 (555) 123-4567\n• Address: 123 Pet Street, Animal City\n\nOr visit our office during business hours!';
    }

    // Image upload
    if (message.includes('image') || message.includes('photo') || message.includes('picture')) {
      return '📷 Adding Pet Images:\n\n1. Use free image hosting sites like imgur.com\n2. Upload your pet photo there\n3. Copy the direct image URL\n4. Paste it in the "Pet Image URL" field\n\nNo paid storage needed!';
    }

    // Pricing/Cost
    if (message.includes('price') || message.includes('cost') || message.includes('fee') || message.includes('free')) {
      return '💰 Adoption Fees:\n\nAdoption fees vary by shelter and pet. Contact the shelter directly for specific pricing. Most adoption fees cover:\n• Vaccinations\n• Spay/neuter surgery\n• Health checkup\n\nOur website is completely free to use!';
    }

    // Thanks
    if (message.includes('thank') || message.includes('thanks')) {
      return 'You\'re welcome! 😊 Feel free to ask if you need anything else. Happy pet hunting! 🐾';
    }

    // Bye
    if (message.match(/^(bye|goodbye|see you|later)/)) {
      return 'Goodbye! 👋 Come back anytime you need help. Good luck finding your perfect pet! 🐾';
    }

    // Default response
    return '🤔 I\'m not sure about that. I can help you with:\n\n• How to adopt a pet\n• How to list a pet\n• About shelters and stories\n• Account and login info\n• Resources and guides\n\nWhat would you like to know?';
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    // Add user message
    const userMessage = {
      type: 'user',
      text: inputText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    // Get and add bot response after a short delay
    setTimeout(() => {
      const botResponse = {
        type: 'bot',
        text: getBotResponse(inputText),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 500);
  };

  const handleQuickReply = (text) => {
    setInputText(text);
    setTimeout(() => handleSendMessage(), 100);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <>
      {/* Chat Button */}
      <button 
        className={`chatbot-button ${isOpen ? 'hidden' : ''}`}
        onClick={() => setIsOpen(true)}
        aria-label="Open chat"
      >
        <span className="chat-icon">💬</span>
        <span className="chat-pulse"></span>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="chatbot-window">
          {/* Header */}
          <div className="chatbot-header">
            <div className="chatbot-header-info">
              <div className="chatbot-avatar">🤖</div>
              <div>
                <h3>Pet Adoption Assistant</h3>
                <span className="chatbot-status">
                  <span className="status-dot"></span>
                  Online
                </span>
              </div>
            </div>
            <button 
              className="chatbot-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="chatbot-messages">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`message ${message.type}`}
              >
                {message.type === 'bot' && (
                  <div className="message-avatar">🤖</div>
                )}
                <div className="message-content">
                  <div className="message-bubble">
                    {message.text}
                  </div>
                  <div className="message-time">
                    {formatTime(message.timestamp)}
                  </div>
                </div>
                {message.type === 'user' && (
                  <div className="message-avatar user-avatar">👤</div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          {messages.length <= 2 && (
            <div className="chatbot-quick-replies">
              {quickReplies.map((reply, index) => (
                <button
                  key={index}
                  className="quick-reply-btn"
                  onClick={() => handleQuickReply(reply.text)}
                >
                  <span>{reply.icon}</span>
                  {reply.text}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="chatbot-input-container">
            <input
              type="text"
              className="chatbot-input"
              placeholder="Type your message..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button 
              className="chatbot-send"
              onClick={handleSendMessage}
              disabled={!inputText.trim()}
            >
              <span>➤</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
