import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './Auth/AuthContext';
import logo from './../assets/images/logo.png';
import './Adminlogin.css';

export const Adminlogin = () => {
  const { login } = useAuth();
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
      // Fetch users with the given username
      const response = await axios.get(`http://localhost:3500/users?username=${username}`);
      const users = response.data;
      // Check if user exists and password matches
      if (users.length > 0 && users[0].password === password) {
        login(); // Simulate login by calling the login function
        navigate("/admin/dashboard/clients");
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