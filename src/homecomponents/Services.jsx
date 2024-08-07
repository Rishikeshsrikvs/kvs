import React from 'react'
import "./Services.css"
import { Link } from 'react-router-dom';
import ser2left from './../assets/images/landblogback1.png';
import ser2right from './../assets/images/landblogback3.png';
import sercard1 from './../assets/images/serviceimages/servicecard1.png';
import sercard2 from './../assets/images/serviceimages/servicecard2.png';
import sercard3 from './../assets/images/serviceimages/servicecard3.png';
const Services = () => {
  return (
    <div className='Servicesparent'>
      <div className="services1main">
        

        <h1 className="ser1nor">What We Do</h1>
        <h1 className="ser1grd">Services</h1>
      </div>
      <div className="service2main">
        <img src={ser2left} alt="" className="service2left" />
        <div className="ser2text">
        Whatever the challenge, <br/> we have the solution
        </div>
        <img src={ser2right} alt="" className="service2right" />

      </div>
      <div className="service3main">
        <div className="service3sub service31">
                <div className="sersubbar"></div>
                <div className="sersubmain">
                    <div className="sersubleft">

                        <span className='ser3colorbar'></span>
                        <h1>website Design & development</h1>
                        <p>Join the conversation and drive engagement on Twitter with our Twitter marketing services. From real-time updates and trending topics to hashtag campaigns and promoted tweets, we'll help you leverage the power of Twitter to connect with your audience and drive results.</p>
                    </div>
                    <div className="sersubright">
                        <img src={sercard1} alt="" />
                    </div>
                </div>
                
        </div>
        <div className="service3sub service32">
                <div className="sersubbar"></div>
                <div className="sersubmain">
                    <div className="sersubleft">

                        <span className='ser3colorbar'></span>
                        <h1>DIGITAL MARKETING</h1>
                        <p>Engage visually-oriented audiences on Instagram with our Instagram marketing services. From stunning visuals and captivating stories to influencer partnerships and hashtag strategies, we'll help you stand out on one of the fastest-growing social platforms.</p>
                    </div>
                    <div className="sersubright">
                        <img src={sercard2} alt="" />
                    </div>
                </div>
                
        </div>
        <div className="service3sub service33">
                <div className="sersubbar"></div>
                <div className="sersubmain">
                    <div className="sersubleft">

                        <span className='ser3colorbar'></span>
                        <h1>SEARCH ENGINE OPTIMIZATION</h1>
                        <p>our search engine optimization service helps you engage with your audience, build brand awareness, and drive traffic to your website..</p>
                    </div>
                    <div className="sersubright">
                        <img src={sercard3} alt="" />
                    </div>
                </div>
                
        </div>
        
        
      </div>
      <div className="service4main">
        <div className="ser4cont">
            <h1>From unveiling user needs, crafting narratives, and simplifying interactions to creating harmonious experiences And engineering for growth, we’re in the business of making a positive impact on our collective future.</h1>
            <Link to="/contactus" className="ser4btn">let’s collaborate</Link>
        </div>
      </div>
    </div>
  )
}

export default Services
