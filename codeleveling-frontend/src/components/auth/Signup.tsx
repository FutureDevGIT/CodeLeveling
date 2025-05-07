import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './styles/Auth.css';

const Signup = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '', confirm: '' });
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password !== form.confirm) {
      alert('Passwords do not match.');
      return;
    }

    const res = await fetch('http://localhost:8000/api/auth/register/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: form.username,
        email: form.email,
        password: form.password,
      }),
    });

    if (res.ok) {
      alert('Registration successful! You may now enter the gate.');
      navigate('/login');
    } else {
      const err = await res.json();
      alert(err.detail || 'Registration failed. Username/email might be taken.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1 className="auth-title">Awaken Your Account</h1>
        <form className="auth-form" onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Username"
            className="auth-input"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            className="auth-input"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            className="auth-input"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="auth-input"
            value={form.confirm}
            onChange={(e) => setForm({ ...form, confirm: e.target.value })}
          />
          <button type="submit" className="auth-button">Sign Up</button>
        </form>
        <p className="auth-text">
          Already a Hunter?{' '}
          <Link to="/login" className="auth-link">Return to the Gate</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
