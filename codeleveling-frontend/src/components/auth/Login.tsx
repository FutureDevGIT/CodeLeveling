import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Auth.css'; // for shared styles

const Login = () => {
  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1 className="auth-title">Enter the Gate</h1>
        <form className="auth-form">
          <input type="email" placeholder="Email" className="auth-input" />
          <input type="password" placeholder="Password" className="auth-input" />
          <button className="auth-button">Login</button>
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
