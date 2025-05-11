import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import logo from '/assets/codeleveling.png';
import { useScrollFadeIn } from '../../hooks/useScrollFadeIn';
import ManaEffect from '../effects/ManaEffect';
import SoloLoader from '../../components/common/SoloLoader';

const Dashboard: React.FC = () => {
  const logoFade = useScrollFadeIn();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate async data fetching
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) return <SoloLoader />;

  return (
    <div className="dashboard-root">
      <div className="dashboard-overlay">
      <ManaEffect />
        <div
          className={`dashboard-logo-wrapper fade-in-section ${logoFade.isVisible ? 'is-visible' : ''}`}
          ref={logoFade.ref}
        >
          <img src={logo} alt="CodeLeveling Logo" className="dashboard-logo" />
        </div>
        <h1 className="dashboard-title">Welcome, Hunter</h1>
        <p className="dashboard-subtitle">Your journey to become the strongest begins now.</p>
        <button className="dashboard-button">Enter the Dungeon</button>
      </div>
    </div>
  );
};

export default Dashboard;
