import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black bg-opacity-30 backdrop-blur-md border-b border-gray-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center text-white">
        <Link to="/" className="text-2xl font-extrabold tracking-widest text-indigo-400">CodeLeveling</Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 font-semibold text-md">
          <li><Link to="/" className="hover:text-indigo-400 transition">Home</Link></li>
          <li><Link to="/missions" className="hover:text-indigo-400 transition">Missions</Link></li>
          <li><Link to="/leaderboard" className="hover:text-indigo-400 transition">Leaderboard</Link></li>
          <li><Link to="/profile" className="hover:text-indigo-400 transition">Profile</Link></li>
          <li><Link to="/login" className="hover:text-red-400 transition">Logout</Link></li>
        </ul>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {isOpen ? <X className="text-white" /> : <Menu className="text-white" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden flex flex-col items-center space-y-4 py-4 bg-black bg-opacity-90 text-white font-semibold animate-slide-down">
          <li><Link to="/" onClick={toggleMenu}>Home</Link></li>
          <li><Link to="/missions" onClick={toggleMenu}>Missions</Link></li>
          <li><Link to="/leaderboard" onClick={toggleMenu}>Leaderboard</Link></li>
          <li><Link to="/profile" onClick={toggleMenu}>Profile</Link></li>
          <li><Link to="/login" onClick={toggleMenu} className="text-red-400">Logout</Link></li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
