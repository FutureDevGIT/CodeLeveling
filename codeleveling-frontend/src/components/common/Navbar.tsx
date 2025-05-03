import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import './Navbar.css';
import MistEffect from '../effects/MistEffect';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="navbar">
    <MistEffect />
      <div className="mist-layer"></div>

      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <span className="navbar-logo-text">Code Leveling</span>
        </Link>

        {/* Desktop Menu */}
        <ul className="navbar-link">
          <li><Link to="/" className="navbar-links">Home</Link></li>
          <li><Link to="/missions" className="navbar-links">Missions</Link></li>
          <li><Link to="/leaderboard" className="navbar-links">Leaderboard</Link></li>
          <li><Link to="/profile" className="navbar-links">Profile</Link></li>
          <li><Link to="/login" className="navbar-links logout">Logout</Link></li>
        </ul>

        {/* Mobile Menu Toggle */}
        <div className="navbar-toggle" onClick={toggleMenu}>
          {isOpen ? <X className="icon" /> : <Menu className="icon" />}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="navbar-mobile-menu">
          <li><Link to="/" onClick={toggleMenu}>Home</Link></li>
          <li><Link to="/missions" onClick={toggleMenu}>Missions</Link></li>
          <li><Link to="/leaderboard" onClick={toggleMenu}>Leaderboard</Link></li>
          <li><Link to="/profile" onClick={toggleMenu}>Profile</Link></li>
          <li><Link to="/login" onClick={toggleMenu} className="logout">Logout</Link></li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
