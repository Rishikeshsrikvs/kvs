import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './Auth/AuthContext';
import logo from './../assets/images/logo.png';
import './Adminlogin.css';

export const Adminlogin = () => {
  const { login } = useAuth(); // This should work if AuthContext is properly set up
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.get('/api/admin/adminlogin', {
        params: {
          adminEmail: username,
          adminPassword: password,
        },
        withCredentials: true, // Include this if your server requires credentials
      });

      const { status, data } = response;

      if (status === 200 && data.success) {
        login();
        navigate('/admin/dashboard'); // Adjust path as needed
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
    <div className='adminloginmaincon'>
      <div className="adminlogincon">
        <img src={logo} alt="logo" /> 
        <div className='title'>
          <h1>Welcome Commander!</h1>
          <h5>Please Login To Your Account</h5>
        </div>
        <form className='formcon' onSubmit={handleSubmit}>
          <div className="inputcon">
            <label htmlFor="uname">Username</label>
            <input
              type="text"
              name='uname'
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
          <input className="formsubmit" type="submit" value="Sign In" disabled={loading} />
        </form>
        {error && <p className='error'>{error}</p>}
      </div>
    </div>
  );
};
