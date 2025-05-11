import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './styles/Auth.css';
import { setTokens } from '../../utils/auth';

const Login = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('http://localhost:8000/api/auth/token/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok && data.access) {
      setTokens(data.access, data.refresh);
      navigate('/profile');
    } else {
      alert(data.detail || 'Login failed. Check credentials.');
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
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            className="auth-input"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <button type="submit" className="auth-button">Login</button>
        </form>
        <p className="auth-text">
          Don't have an account?{' '}
          <Link to="/signup" className="auth-link">Become a Hunter</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
