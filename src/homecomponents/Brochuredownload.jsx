import React from 'react'
import "./Brochuredownload.css"
import socialgif from './../assets/images/Brochureform/social.gif';
import webgif from './../assets/images/Brochureform/web.gif';
import bdbtn from './../assets/images/Brochureform/bdbtn.png';
const Brochuredownload = () => {
  return (
    <div className='bdparent'>
      <div className="bdmain">
        <h1>for Brochure</h1>
        <div className="bdsplit">
            
            <div className="bdleft">
                <div className="bdcenter">
                    <img src={socialgif} alt="" />
                    <h1>Social media Brochure</h1>
                    <p>Unlock Your Brand's Potential
                        With Engaging Social Media
                        Solutions</p>
                    <div className="bdbtncn">
                        <img className="bdbtn" src={bdbtn} alt="" />
                    </div>
                </div>
            </div>
            
            <div className="bdright">
                <div className="bdcenter">
                    <img src={webgif} alt="" />
                    <h1>web design brochure</h1>
                    <p>Unleash Your Online Potential With 
                    Bespoke Web Design Solutions</p>
                    <div className="bdbtncn">
                        <img className="bdbtn" src={bdbtn} alt="" />
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Brochuredownload
