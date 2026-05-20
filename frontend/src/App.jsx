import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

// Pages
import Home from './pages/Home';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Sahayak from './pages/Sahayak';
import Competitions from './pages/Competitions';
import Internships from './pages/Internships';
import Resources from './pages/Resources';
import AiRoadmap from './pages/AiRoadmap';

/**
 * Protected Route Component
 */
const ProtectedRoute = ({ children }) => {
  const { token, loading } = useAuth();

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return token ? children : <Navigate to="/login" />;
};

/**
 * Main App Router
 */
function App() {
  return (
    <AuthProvider>
      <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Auth isLogin={true} />} />
          <Route path="/register" element={<Auth isLogin={false} />} />
          <Route path="/sahayak" element={<Sahayak />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/ai-roadmap" element={<AiRoadmap />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/competitions"
            element={
              <ProtectedRoute>
                <Competitions />
              </ProtectedRoute>
            }
          />
          <Route
            path="/internships"
            element={
              <ProtectedRoute>
                <Internships />
              </ProtectedRoute>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    </AuthProvider>
  );
}

export default App;
