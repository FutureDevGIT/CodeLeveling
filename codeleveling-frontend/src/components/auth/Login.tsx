import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './styles/Auth.css';
import { setTokens } from '../../utils/auth';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/api/token/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok && data.access && data.refresh) {
        setTokens(data.access, data.refresh);
        setIsLoggedIn(true);
        navigate('/profile');
      } else {
        setError(data.detail || 'Invalid credentials');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1 className="auth-title">Enter the Gate</h1>
        <form className="auth-form" onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            className="auth-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="auth-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="auth-button">Login</button>
        </form>
        {error && <p className="error-text">{error}</p>}
        <p className="auth-text">
          Don't have an account?{' '}
          <Link to="/signup" className="auth-link">Become a Hunter</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
