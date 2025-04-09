import React, { useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';

function Login({ onLogin }) {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    // For demo purposes, hardcoded credentials
    if (credentials.email === 'admin@example.com' && credentials.password === 'password') {
      onLogin({
        name: 'Admin User',
        email: credentials.email,
        role: 'admin'
      });
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
        <div className="login-header">
          <h1>PillReminder</h1>
          <p>Admin Dashboard</p>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <div className="input-icon">
              <FaUser />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={credentials.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className="form-group">
            <div className="input-icon">
              <FaLock />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={credentials.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className="form-group">
            <button type="submit" className="login-btn">
              Login
            </button>
          </div>
          
          <div className="form-footer">
            <a href="#">Forgot Password?</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;