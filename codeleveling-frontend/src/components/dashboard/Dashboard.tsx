import React from 'react';
import './Dashboard.css';
import bgImage from '/assets/bg-8.jpeg';

const Dashboard: React.FC = () => {
  return (
    <div
      className="dashboard-container"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
    <div className="dashboard-container">
      <div className="dashboard-overlay">
        <h1 className="dashboard-title">Welcome, Hunter</h1>
        <p className="dashboard-subtitle">Your journey to become the strongest begins now.</p>
        <button className="dashboard-button">Enter the Dungeon</button>
      </div>
    </div>
    </div>
  );
};

export default Dashboard;
