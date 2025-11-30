import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import ErrorBoundary from './components/ErrorBoundary';
import Chatbot from './components/Chatbot';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Home from './pages/Home';
import Profile from './pages/Profile';
import AddPet from './pages/AddPet';
import BrowsePets from './pages/BrowsePets';
import PetDetail from './pages/PetDetail';
import Shelters from './pages/Shelters';
import Stories from './pages/Stories';
import Resources from './pages/Resources';
import './App.css';

const AppRoutes = () => {
  const { isAuthenticated, isLoading } = useAuth();
  console.log('AppRoutes render - isLoading:', isLoading, 'isAuthenticated:', isAuthenticated);

  if (isLoading) {
    console.log('Showing loading screen...');
    return (
      <div className="loading-container">
        <div className="loading-spinner-app">
          <span className="pet-loading">🐾</span>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      <Route 
        path="/login" 
        element={
          isAuthenticated ? <Navigate to="/" replace /> : <Login />
        } 
      />
      <Route 
        path="/register" 
        element={<Register />}
      />
      <Route 
        path="/" 
        element={<Home />}
      />
      <Route
        path="/profile"
        element={
          isAuthenticated ? <Profile /> : <Navigate to="/login" replace />
        }
      />
      <Route
        path="/add-pet"
        element={
          isAuthenticated ? <AddPet /> : <Navigate to="/login" replace />
        }
      />
      <Route
        path="/browse-pets"
        element={<BrowsePets />}
      />
      <Route
        path="/pet/:id"
        element={
          isAuthenticated ? <PetDetail /> : <Navigate to="/login" replace />
        }
      />
      <Route
        path="/shelters"
        element={<Shelters />}
      />
      <Route
        path="/stories"
        element={<Stories />}
      />
      <Route
        path="/resources"
        element={<Resources />}
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

function App() {
  console.log('App component rendering...');
  return (
    <ErrorBoundary>
      <Router>
        <div className="app">
          <AppRoutes />
          <Chatbot />
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
