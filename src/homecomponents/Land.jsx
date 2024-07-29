import React from 'react';
import './Land.css';
import CircularText from './CircularText';
import AnimatedNumber from './landcomponents/AnimatedNumber.';
import cube from './../assets/images/cube.png';
import logo from './../assets/images/logo.png';
import { Iconcontainer } from './landcomponents/Iconcontainer';
import landback from './../assets/images/landback.png';
import Feedbacklandslider from './landcomponents/Feedbacklandslider';
import Blogland from './landcomponents/Blogland';
import wsrotate from './../assets/images/ws3.png';
import contactus from './../assets/images/contactusback.png';
import Serviceland from './landcomponents/Serviceland';
import pre from './../assets/images/pre.png';
import next from './../assets/images/next.png';
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
                        <img src={cube}  className='imagelandright' alt="Cube" />
                    </div>
                </div>
                <div className="land1yearcontainer">
                    <div className="yearssplit">
                        <h1><AnimatedNumber value={75} duration="4000" />+</h1>
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
                  <div className="landaboutright">
                    <Iconcontainer/>
                  </div>
                
            </div>
            <div className='landservicescontainer'>
                <div className="landservicetitlecon">
                    <h1 className='landsert1'>What we do</h1>
                    <h1 className='landsert2'>OUR SERVICES</h1>
                </div>
                <Serviceland/>
               
            </div>
            <div className='landprojectcontainer'>
                    <div className="landprojecttitle">
                        <div className="projecttitle">
                            <h1>Elevate Your Brand,Accelerate <br/>
                            Your <span>Growth</span></h1>
                        </div>
                        <div className='projectbtns'>
                            <div className="allprjt">
                                <button>ALL PROJECTS<span></span></button>
                            </div>
                            <div className='arrowbtns'>
                                <button><img src={pre} alt="" /></button>
                                <button><img src={next} alt="" /></button>
                            </div>
                        </div>
                    </div>
                    <div className='landprojectcardcontainer'>
                        <div className="landprojectcard">
                            <div className="landprojectimagecon"><img  className="landprojectimg" src="" alt="" /></div>
                        
                            <div className="landprojectdetail">
                                <h1>Website design developement</h1>
                                <p> we provide visual designs and mobile and we interface developement</p>
                            </div>
                        </div>
                        <div className="landprojectcard">
                            <div className="landprojectimagecon"><img  className="landprojectimg" src="" alt="" /></div>
                        
                            <div className="landprojectdetail">
                                <h1>Website design developement</h1>
                                <p> we provide visual designs and mobile and we interface developement</p>
                            </div>
                        </div>
                        <div className="landprojectcard">
                            <div className="landprojectimagecon"><img  className="landprojectimg" src="" alt="" /></div>
                        
                            <div className="landprojectdetail">
                                <h1>Website design developement</h1>
                                <p> we provide visual designs and mobile and we interface developement</p>
                            </div>
                        </div>
                        <div className="landprojectcard">
                            <div className="landprojectimagecon"><img  className="landprojectimg" src="" alt="" /></div>
                        
                            <div className="landprojectdetail">
                                <h1>Website design developement</h1>
                                <p> we provide visual designs and mobile and we interface developement</p>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="landwhyuscontainer">
                    <div className="wytextcontainer">
                        <span>Why us</span>
                    </div>
                    <div className="wymaincon">
                        <div className="wytitle">
                            <h1 className='wytitle1'>Bringing Your Ideas In </h1>
                            <h1 className='wytitle2'>Exceptional Ways</h1>
                        </div>
                        <div className="wygrid">
                            <div className="wyleft">
                                <div className="wylupimg"><img src={wsrotate} alt="" /></div>
                                <div className="wyltext"><h2>Fulfilling Your Requirements With Precision</h2></div>
                                <div className="wyldownimg"><img src="" alt="" /></div>
                            </div>
                            <div className="wyright">
                                <div className="wyrightup"></div>
                                <div className="wyrightbottom"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="landfeedbackmain">
                    <div className="landfeedbacktitle">
                        <h1>What do we do exactly?</h1>
                        <p>We only do 3 things. But we do them really well.</p>
                    </div>
                   <div className="landfeedslidercontainer">
                   <Feedbacklandslider/>
                   </div>
                </div>
                <div className="landblogmain">
                    <div className="landblogtitle">
                        <span></span>
                        <h1>OUR BLOGS</h1>
                    </div>
                    <Blogland/>
                    <div className="landblogbtn">
                        <button>Click For More Blogs</button>
                    </div>
                </div>
                <div className='landcontactusmain'>
                    <div className="landcutitle">
                        <h1>create something awesome </h1>
                        <h1>and <span>extraordinary</span> with Us</h1>
                    </div>
                    <div className="landcusubtitle">
                        <p>with a lot of creativity, we can make your dream come true</p>
                    </div>
                    <div className="landcubtn">
                        <button>CONTACT US</button>
                    </div>
                    

                </div>
                
            
        </div>
    );
}
