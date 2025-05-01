import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Auth.css';

const Signup = () => {
  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1 className="auth-title">Awaken Your Account</h1>
        <form className="auth-form">
          <input type="text" placeholder="Username" className="auth-input" />
          <input type="email" placeholder="Email" className="auth-input" />
          <input type="password" placeholder="Password" className="auth-input" />
          <input type="password" placeholder="Confirm Password" className="auth-input" />
          <button className="auth-button">Sign Up</button>
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
