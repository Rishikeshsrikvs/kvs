import React from 'react'
import logo from './../assets/images/logo.png';
import adminLoginBackground from './../assets/images/adminloginback2.mov';
import './Adminlogin.css'
export const Adminlogin = () => {
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
            <form action="" className='formcon'>
                <div className="inputcon">
                  <label htmlFor="uname">Username</label>
                  <input type="text" name='uname'/>
                </div>
                <div className="inputcon">
                  <label htmlFor="password">Password</label>
                  <input type="password" />
                  </div>
              <input  className="formsubmit" type="submit" value="Sign In" />
            </form>
        </div>
    </div>
  )
}
