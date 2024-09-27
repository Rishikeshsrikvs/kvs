import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import './Notfound.css';
import back from './assets/images/notfound/Ellipse 33.png';
import img1 from './assets/images/notfound/Group.png';
const Notfound = () => {
    
  return (
    <div className='notfound'>
      
     <div className="nfleft">
        <h1>404 - error</h1>
        <h1>PAGE NOT FOUND</h1>
        <Link to='/' className='nothome'>HOME PAGE</Link>
     </div>
      
        <div className="nfright">
                <img src={back} alt="" className='nfrback' />
                <img src={img1} alt="" className='nfrimg'/>
        </div>
    </div>
  )
}

export default Notfound
