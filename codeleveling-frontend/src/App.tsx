import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Login from './components/auth/Login';
import Logout from './components/auth/Logout';
import Signup from './components/auth/Signup';
import FogEffect from './components/effects/FogEffect';
import Dashboard from './components/dashboard/Dashboard';
import Navbar from './components/common/Navbar';
import AuthRedirect from './components/auth/AuthRedirect';
import PrivateRoute from './components/auth/PrivateRoute';
import PublicRoute from './components/auth/PublicRoute';
import Profile from './pages/Profile';
import Loader from './components/common/SoloLoader';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const hasSeenLoader = sessionStorage.getItem('hasSeenLoader');
    if (hasSeenLoader) {
      setLoading(false); // Skip loader
    }
  }, []);

  const handleLoaderFinish = () => {
    sessionStorage.setItem('hasSeenLoader', 'true');
    setLoading(false);
  };

  if (loading) {
    return <Loader onFinish={handleLoaderFinish} />;
  }

  return (
    <>
      <FogEffect />
      <Navbar />
      <Routes>

        {/* Root Route: redirect based on auth status */}
        <Route path="/" element={<AuthRedirect />} />

        {/* Public Routes */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />

        {/* Private Routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </>
  );
};

export default App;
