import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Auth.css';

const Register = () => {
  const { loginWithGoogle, setUserType, user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [selectedUserType, setSelectedUserType] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState(1); // 1: Google Sign-in, 2: Select User Type

  // Check if user is already signed in but hasn't selected type
  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.userType) {
        // User already has a type, redirect to home
        navigate('/');
      } else {
        // User signed in but no type selected, show type selection
        setStep(2);
      }
    }
  }, [isAuthenticated, user, navigate]);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError('');

    try {
      const result = await loginWithGoogle();
      
      if (result.success) {
        if (!result.user?.userType) {
          // New user, move to step 2 to select user type
          setStep(2);
        } else {
          // Existing user with type, go home
          navigate('/');
        }
      } else {
        setError(result.error || 'Failed to sign in with Google');
      }
    } catch (err) {
      console.error('Error signing in:', err);
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUserTypeSubmit = async () => {
    if (!selectedUserType) {
      setError('Please select your account type');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const result = await setUserType(selectedUserType);
      
      if (result.success) {
        navigate('/');
      } else {
        setError(result.error || 'Failed to set user type');
      }
    } catch (err) {
      console.error('Error setting user type:', err);
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card register-card">
        {step === 1 ? (
          <>
            <div className="auth-header">
              <div className="pet-icon">
                🏡
              </div>
              <h2>Join Our Pet Family!</h2>
              <p>Sign in with Google to create your account</p>
            </div>

            <div className="auth-form">
              {error && <div className="error-message">{error}</div>}
              
              <button 
                onClick={handleGoogleSignIn} 
                className="google-button" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="loading-spinner"></span>
                    Signing In...
                  </>
                ) : (
                  <>
                    <svg className="google-icon" viewBox="0 0 24 24" width="24" height="24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Continue with Google
                  </>
                )}
              </button>

              <div className="auth-divider">
                <span>✨ Quick & Secure ✨</span>
              </div>

              <div className="info-box">
                <p>🔒 We use Google Sign-In for secure authentication</p>
                <p>🐾 Your account will be created automatically</p>
                <p>💝 Join thousands of pet lovers today!</p>
              </div>
            </div>

            <div className="auth-footer">
              <p>
                Already have an account?{' '}
                <Link to="/login" className="auth-link">
                  Sign in here 🐕
                </Link>
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="auth-header">
              <div className="pet-icon">
                🎯
              </div>
              <h2>Choose Your Role</h2>
              <p>Let us know how you'd like to help</p>
            </div>

            <div className="auth-form">
              {error && <div className="error-message">{error}</div>}
              
              <div className="user-type-selection">
                <div 
                  className={`user-type-card ${selectedUserType === 'adopter' ? 'selected' : ''}`}
                  onClick={() => setSelectedUserType('adopter')}
                >
                  <div className="user-type-icon">🏠</div>
                  <h3>Pet Adopter</h3>
                  <p>Looking to adopt and care for a pet</p>
                  <ul className="user-type-features">
                    <li>✓ Browse available pets</li>
                    <li>✓ Request adoptions</li>
                    <li>✓ Track your adoption journey</li>
                    <li>✓ Share your adoption stories</li>
                  </ul>
                  {selectedUserType === 'adopter' && (
                    <div className="selected-badge">Selected ✓</div>
                  )}
                </div>

                <div 
                  className={`user-type-card ${selectedUserType === 'shelter' ? 'selected' : ''}`}
                  onClick={() => setSelectedUserType('shelter')}
                >
                  <div className="user-type-icon">🏥</div>
                  <h3>Pet Owner/Shelter</h3>
                  <p>Have pets available for adoption</p>
                  <ul className="user-type-features">
                    <li>✓ List pets for adoption</li>
                    <li>✓ Manage adoption requests</li>
                    <li>✓ Update pet information</li>
                    <li>✓ Connect with adopters</li>
                  </ul>
                  {selectedUserType === 'shelter' && (
                    <div className="selected-badge">Selected ✓</div>
                  )}
                </div>
              </div>

              <button 
                onClick={handleUserTypeSubmit}
                className="auth-button"
                disabled={isLoading || !selectedUserType}
              >
                {isLoading ? (
                  <>
                    <span className="loading-spinner"></span>
                    Setting up your account...
                  </>
                ) : (
                  <>
                    <span className="icon">🚀</span>
                    Complete Registration
                  </>
                )}
              </button>
            </div>
          </>
        )}

        <div className="pet-decorations">
          <span className="decoration-paw">🐾</span>
          <span className="decoration-heart">💝</span>
          <span className="decoration-bone">🦴</span>
        </div>
      </div>
    </div>
  );
};

export default Register;
