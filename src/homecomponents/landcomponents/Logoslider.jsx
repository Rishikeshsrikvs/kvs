import React from 'react'
import logo from './../../assets/images/logo.png';
import './Logoslider.css';
const Logoslider = () => {
  return (
    <div className="land1clientlogocontainer">
                  <div className="scrolling-wrapper">
                    <div className="scrolling">
                        <img src={logo} alt="" />
                    </div>
                    <div className="scrolling">
                        <img src={logo} alt="" />
                    </div>
                    <div className="scrolling">
                        <img src={logo} alt="" />
                    </div>
                    <div className="scrolling">
                        <img src={logo} alt="" />
                    </div>
                  </div>
                </div>
  )
}

export default Logoslider
