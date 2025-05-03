import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="hero-container">
      <div className="overlay">
        <h1 className="hero-title">Code Leveling</h1>
        <p className="hero-subtitle">Level Up Your Coding Skills Like a True Hunter</p>
        <div className="hero-buttons">
          <button className="hero-btn" onClick={() => navigate('/signup')}>Start Now</button>
          <button className="hero-btn ghost" onClick={() => navigate('/missions')}>View Missions</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
