import React from 'react'
import "./Header.css"
import logo from './../assets/images/logo.png';
import { Link } from 'react-router-dom'
export const Header = () => {
  return (
    <div className='navbar-container'>
        <div className='navbar-logo'>
            <img src={logo} alt="" />
        </div>
        <div className='navcontainer'>
            <ul className='navul'>
                <li><Link>ABOUTUS</Link></li>
                <li><Link>PROJECTS</Link></li>
                <li><Link>SERVICES <span></span></Link></li>
                <li><Link>BLOGS</Link></li>
                <li><Link>CAREER</Link></li>
            </ul>
        </div>
    </div>
  )
}
