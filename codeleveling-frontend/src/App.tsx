import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import FogEffect from './components/effects/FogEffect';
import Dashboard from './components/dashboard/Dashboard';
import Navbar from './components/common/Navbar';
import Profile from './pages/Profile';
import Home from './pages/Home';

const App: React.FC = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <>
      {/* <MistEffect /> */}
      <FogEffect />
      <Navbar />
      {/* {!isAuthPage && <Navbar />} */}

      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
};

export default App;
