import React from 'react'
import "./Services.css"
import { Link } from 'react-router-dom';
import ser2left from './../assets/images/landblogback1.png';
import ser2right from './../assets/images/landblogback3.png';
import sercard1 from './../assets/images/serviceimages/servicecard1.png';
import sercard2 from './../assets/images/serviceimages/servicecard2.png';
import sercard3 from './../assets/images/serviceimages/servicecard3.png';
import sercard4 from './../assets/images/serviceimages/servicecard4.png';
import sercard5 from './../assets/images/serviceimages/servicecard5.png';
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
                <div className="sersubmain sersubmainright">
                    <div className="sersubleft">

                        <span className='ser3colorbar'></span>
                        <h1>DIGITAL MARKETING</h1>
                        <div className='ser3list'>
                          <ul>
                            <li>Facebook Marketing Services</li>
                            <li>YouTube Marketing Services</li>
                            <li>LinkedIn Marketing Services</li>
                            <li>Instagram Marketing Services</li>
                          </ul>
                          </div>
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
                        <p>With millions of websites struggling for attention on search engines, standing out 
                          from the crowd can be challenging. This is where SEO services come into play. 
                          By leveraging the power of SEO, businesses can enhance their visibility, attract 
                          more organic traffic, and ultimately boost their revenue.</p>
                    <p>At Sri KVS Tech, we specialize in boosting your online visibility through our advanced 
                    SEO strategies. Our focus is on improving search engine rankings and increasing 
                    organic traffic to your website. By using the latest SEO techniques and staying up 
                    to date on digital trends, we ensure your company reaches its maximum potential.</p>
                    </div>
                    <div className="sersubright">
                        <img src={sercard3} alt="" />
                    </div>
                </div>
                
        </div>
        <div className="service3sub service34">
                <div className="sersubbar"></div>
                <div className="sersubmain sersubmainright">
                    <div className="sersubleft">

                        <span className='ser3colorbar'></span>
                        <h1>Social media marketing</h1>
                        <p>In today's digital world, social media is the primary marketing platform. Partnering 
                        with a trusted social media company is crucial for businesses.</p>
                    <p>At Sri KVS Tech, our social media experts ensure you stay ahead in this dynamic arena, 
driving brand influence, leads, and sales. Trusted by startups to top brands, we offer 
comprehensive social media services including strategy development, optimization, 
content creation, paid campaigns, profile management and more.</p>
                    </div>
                    <div className="sersubright">
                        <img src={sercard4} alt="" />
                    </div>
                </div>
                
        </div>
        <div className="service3sub service35">
                <div className="sersubbar"></div>
                <div className="sersubmain ">
                    <div className="sersubleft">

                        <span className='ser3colorbar'></span>
                        <h1>Branding</h1>
                        <p>With millions of websites struggling for attention on search engines, standing out from the crowd can be challenging. This is where SEO services come into play. By leveraging the power of SEO, businesses can enhance their visibility, attract more organic traffic, and ultimately boost their revenue.</p>
                    <p>At Sri KVS Tech, we specialize in boosting your online visibility through our advanced SEO strategies. Our focus is on improving search engine rankings and increasing organic traffic to your website. By using the latest SEO techniques and staying up to date on digital trends, we ensure your company reaches its maximum potential.</p>
                    </div>
                    <div className="sersubright">
                        <img src={sercard5} alt="" />
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
