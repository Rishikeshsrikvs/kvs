import React from 'react'
import "./About.css"
import about22 from './../assets/images/Aboutimages/about21.png';
import about21 from './../assets/images/Aboutimages/about22.png';
import about3 from './../assets/images/Aboutimages/about3.png';
import AnimatedNumber from './landcomponents/AnimatedNumber.';
import or1 from './../assets/images/Aboutimages/Ornament 21.svg';
import or2 from './../assets/images/Aboutimages/Ornament 22.svg';
import or3 from './../assets/images/Aboutimages/Ornament 23.svg';

export const About = () => {
  return (
    <div className='aboutparentcontainer'>
        <div className="aboutland">
          <h1>Built for modern brands who want to make waves</h1>
        </div>
        <div className="about2main">
            <div className="about2left">
              <img className="abt22" src={about21} alt="" />
              <img className="abt21" src={about22} alt="" />
            </div>
            <div className='about2right'>
              <h1 className="a2color"><span>WHAT WE DO AND WHY WE DO IT</span></h1>
              <h1 className="a2main">Work that’s worth talking about</h1>
              <p>At sRI kvs TECH, we’re fueled by an insatiable drive to 
                  push the limits of digital creativity, combined with 
                  a team of talented individuals with the capabilities
                  to really do it. Couple that with the strategic 
                  know-how to ensure the needs of your brand, 
                  product and audience are always fully met, and you 
                  have a recipe for work that drives results.</p>
            </div>
        </div>
        <div className="about3main">
          <div className="about3mainback">
              <img src={or1} alt="" />
              <img src={or3} alt="" />
              <img src={or2} alt="" />
          </div>
          <div className="about3sub">
            <div className="about3left">
                <div className="ab3colortitle">Content</div>
                <h1 className="ab3main">WE HELP PEOPLE CREATE AND <span>BUILD WEALTH</span></h1>
                <p className='ab3p'>At sRI kvs TECH, we’re fueled by an insatiable drive to 
                  push the limits of digital creativity, combined with 
                  a team of talented individuals with the capabilities</p>
                <div className="btncontainer"><button className='ab3btn'>Book A Call</button></div>
            </div>
            <div className="about3right">
              <img src={about3} alt="" />
            </div>
          </div>
        </div>
        <div className="aboutyearcontainer">
                    <div className="abyearssplit">
                        <h1><AnimatedNumber value={75} duration="4000" />+</h1>
                        <h4>SUCCESSFUL PROJECTS</h4>
                    </div>
                    <div className="abyearssplit">
                        <h1><AnimatedNumber value={50} duration="4000" /></h1>
                        <h4>HAPPY CLIENTS</h4>
                    </div>
                    <div className="abyearssplit">
                        <h1><AnimatedNumber value={4} duration="4000" />+</h1>
                        <h4>YEARS IN INDUSTRY</h4>
                    </div>
                </div>
        
    </div>
  )
}
