import React from 'react';
import './Land.css';
import CircularText from './CircularText';
import AnimatedNumber from './landcomponents/AnimatedNumber.';
import cube from './../assets/images/cube.png';
import logo from './../assets/images/logo.png';
import landback from './../assets/images/landback.png';
export const Land = () => {
    const duration = 7000; // Animation duration in milliseconds

    return (
        <div className='landmaincontainer'>
            <div className="land1">
                <div className="land1spilt">
                    <div className="land1left">
                        <h1>UNLEASH YOUR DIGITAL</h1>
                        <h1 className='color'>POTENTIAL</h1>
                        <p>It's Time To Transform Your Online Presence And Accelerate <br />Your Business Growth With Sri KVS Tech.<br/>Let's Start The Journey Together And Witness The Transformation</p>
                        <span className='Enquirespan'><CircularText/></span>
                    </div>
                    <div className="land1right">
                        <img src={cube}  className='image' alt="Cube" />
                    </div>
                </div>
                <div className="land1yearcontainer">
                    <div className="yearssplit">
                        <h1><AnimatedNumber value={75} duration={duration} />+</h1>
                        <h4>SUCCESSFUL PROJECTS</h4>
                    </div>
                    <div className="yearssplit">
                        <h1><AnimatedNumber value={50} duration={duration} /></h1>
                        <h4>HAPPY CLIENTS</h4>
                    </div>
                    <div className="yearssplit">
                        <h1><AnimatedNumber value={4} duration={duration} />+</h1>
                        <h4>YEARS IN INDUSTRY</h4>
                    </div>
                </div>
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
            </div>
            <div className="landaboutcontainer">
                
                  <div className="landaboutleft">
                    <h1 className='landabouth1'>About Us</h1>
                    <h1 className='landabouttext'>PROVIDING THE BEST FOR THE BEST</h1>
                    <h6 className='landabouth6'>It's time to transform your online presence and accelerate your 
                    business growth with Sri KVS Tech. Let's start the journey together and witness the transformation.</h6>
                    <button className='landaboutbtn'>Know More</button>
                  </div>
                  <div className="landaboutright"></div>
                
            </div>
        </div>
    );
}
