import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './Auth/AuthContext';
import logo from './../assets/images/logo.png';
import './Adminlogin.css';

export const Adminlogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('Admin');
  const [password, setPassword] = useState('Skv@12345');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('https://srikvs.onrender.com/api/admin/adminlogin', {
        adminEmail: username,
        adminPassword: password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const { status, data } = response;
      if (status === 200 && data.token) {
        login(data.token); // Store JWT token in AuthContext
        navigate('/admin/dashboard');
      } else {
        setError('Invalid credentials');
      }
    } catch (error) {
      setError('Error connecting to server');
      console.error('Login error', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="adminloginmaincon">
      <div className="adminlogincon">
        <img src={logo} alt="logo" />
        <div className="title">
          <h1>Welcome Commander!</h1>
          <h5>Please Login To Your Account</h5>
        </div>
        <form className="formcon" onSubmit={handleSubmit}>
          <div className="inputcon">
            <label htmlFor="uname">Username</label>
            <input
              type="text"
              name="uname"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
            />
          </div>
          <div className="inputcon">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
          </div>
          <input
            className="formsubmit"
            type="submit"
            value="Sign In"
            disabled={loading}
          />
        </form>
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
};
