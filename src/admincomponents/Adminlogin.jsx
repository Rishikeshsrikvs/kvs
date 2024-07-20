import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './Auth/AuthContext';
import logo from './../assets/images/logo.png';
import adminLoginBackground from './../assets/images/adminloginback2.mov';
import './Adminlogin.css';

export const Adminlogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate(); // Use useNavigate hook
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('password12345');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (username === 'admin' && password === 'password12345') {
      login();
      console.log("login");
      navigate("/admin/dashboard/clients"); // Use navigate for programmatic navigation
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className='adminloginmaincon'>
      <video autoPlay loop muted className="background-video">
        <source src={adminLoginBackground} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
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
            />
          </div>
          <div className="inputcon">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <input className="formsubmit" type="submit" value="Sign In" />
        </form>
      </div>
    </div>
  );
};
