import React from 'react'
import "./About.css"
import about22 from './../assets/images/Aboutimages/about21.png';
import about21 from './../assets/images/Aboutimages/about22.png';
export const About = () => {
  return (
    <div className='aboutparentcontainer'>
        <div className="aboutland">
          <h1>Built for modern brands who want to make waves</h1>
        </div>
        <div className="land2main">
            <div className="land2left">
              <img className="abt22" src={about21} alt="" />
              <img className="abt21" src={about22} alt="" />
            </div>
            <div className='land2right'>
              <h1 className="l2color"><span>WHAT WE DO AND WHY WE DO IT</span></h1>
              <h1 className="l2main">Work that’s worth talking about</h1>
              <p>At sRI kvs TECH, we’re fueled by an insatiable drive to 
push the limits of digital creativity, combined with 
a team of talented individuals with the capabilities
to really do it. Couple that with the strategic 
know-how to ensure the needs of your brand, 
product and audience are always fully met, and you 
have a recipe for work that drives results.</p>
            </div>
        </div>
        <div className="land3main">
          div.
        </div>
    </div>
  )
}
