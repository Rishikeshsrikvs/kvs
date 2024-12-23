import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Services.css";
import { Link } from "react-router-dom";
import ser2left from "./../assets/images/landblogback1.png";
import ser2right from "./../assets/images/landblogback3.png";
import sercard1 from "./../assets/images/serviceimages/servicecard1.png";
import sercard2 from "./../assets/images/serviceimages/servicecard2.png";
import sercard3 from "./../assets/images/serviceimages/servicecard3.png";
import sercard4 from "./../assets/images/serviceimages/servicecard4.png";
import sercard5 from "./../assets/images/serviceimages/servicecard5.png";
const Services = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.init({
      duration: 2000, // Animation duration in ms
      once: false, // Whether animation should happen only once
    });
  }, []);

  return (
    <div className="Servicesparent">
      <Helmet>
        <title>
          Services by Sri KVS Tech - Digital Marketing & IT Solutions
        </title>
        <meta
          name="description"
          content="Discover Sri KVS Tech's wide range of services, including digital marketing, social media marketing, web development, graphic design, and business growth strategies."
        />
        <link rel="canonical" href="https://srikvstech.com/services" />
      </Helmet>
      <div
        className="services1main"
        data-aos="zoom-out"
        data-aos-duration="4000"
      >
        <h1 className="ser1nor">What We Do</h1>
        <h1 className="ser1grd">Services</h1>
      </div>
      <div className="service2main">
        <img
          src={ser2left}
          alt=""
          className="service2left"
          data-aos="fade-right"
        />
        <div className="ser2text" data-aos="zoom-in">
          Whatever the <span className="se2ts1">challengers</span>, <br /> we
          have the <span className="se2ts2">solution</span>
        </div>
        <img
          src={ser2right}
          alt=""
          className="service2right"
          data-aos="fade-left"
        />
      </div>
      <div className="service3main">
        <div className="service3sub service31">
          <div className="sersubbar"></div>
          <div className="sersubmain">
            <div className="sersubleft">
              <span className="ser3colorbar" data-aos="fade-right"></span>
              <h1 data-aos="fade-right">DIGITAL MARKETING</h1>
              <div className="ser3list">
                <ul>
                  <li data-aos="fade-right">Facebook Marketing Services</li>
                  <li data-aos="fade-right">YouTube Marketing Services</li>
                  <li data-aos="fade-right">LinkedIn Marketing Services</li>
                  <li data-aos="fade-right">Instagram Marketing Services</li>
                </ul>
              </div>
              <p data-aos="fade-right">
                Engage visually-oriented audiences on Instagram with our
                Instagram marketing services. From stunning visuals and
                captivating stories to influencer partnerships and hashtag
                strategies, we'll help you stand out on one of the
                fastest-growing social platforms.
              </p>
            </div>
            <div className="sersubright">
              <img src={sercard2} alt="" data-aos="fade-left" />
            </div>
          </div>
        </div>
        <div className="service3sub service32">
          <div className="sersubbar"></div>
          <div className="sersubmain ">
            <div className="sersubleft">
              <span className="ser3colorbar" data-aos="fade-right"></span>
              <h1 data-aos="fade-right">Social media marketing</h1>
              <p data-aos="fade-right">
                In today's digital world, social media is the primary marketing
                platform. Partnering with a trusted social media company is
                crucial for businesses.
              </p>
              <p data-aos="fade-right">
                At Sri KVS Tech, our social media experts ensure you stay ahead
                in this dynamic arena, driving brand influence, leads, and
                sales. Trusted by startups to top brands, we offer comprehensive
                social media services including strategy development,
                optimization, content creation, paid campaigns, profile
                management and more.
              </p>
            </div>
            <div className="sersubright">
              <img src={sercard4} alt="" data-aos="fade-left" />
            </div>
          </div>
        </div>
        <div className="service3sub service33">
          <div className="sersubbar"></div>
          <div className="sersubmain ">
            <div className="sersubleft">
              <span className="ser3colorbar" data-aos="fade-right"></span>
              <h1 data-aos="fade-right">Branding</h1>
              <p data-aos="fade-right">
                With millions of websites struggling for attention on search
                engines, standing out from the crowd can be challenging. This is
                where SEO services come into play. By leveraging the power of
                SEO, businesses can enhance their visibility, attract more
                organic traffic, and ultimately boost their revenue.
              </p>
              <p data-aos="fade-right">
                At Sri KVS Tech, we specialize in boosting your online
                visibility through our advanced SEO strategies. Our focus is on
                improving search engine rankings and increasing organic traffic
                to your website. By using the latest SEO techniques and staying
                up to date on digital trends, we ensure your company reaches its
                maximum potential.
              </p>
            </div>
            <div className="sersubright">
              <img src={sercard5} alt="" data-aos="fade-left" />
            </div>
          </div>
        </div>
        <div className="service3sub service34">
          <div className="sersubbar"></div>
          <div className="sersubmain">
            <div className="sersubleft">
              <span className="ser3colorbar" data-aos="fade-right"></span>
              <h1 data-aos="fade-right">website Design & development</h1>
              <p data-aos="fade-right">
                Join the conversation and drive engagement on Twitter with our
                Twitter marketing services. From real-time updates and trending
                topics to hashtag campaigns and promoted tweets, we'll help you
                leverage the power of Twitter to connect with your audience and
                drive results.
              </p>
            </div>
            <div className="sersubright">
              <img src={sercard1} alt="" data-aos="fade-left" />
            </div>
          </div>
        </div>
        <div className="service3sub service35">
          <div className="sersubbar"></div>
          <div className="sersubmain">
            <div className="sersubleft">
              <span className="ser3colorbar" data-aos="fade-right"></span>
              <h1 data-aos="fade-right">SEARCH ENGINE OPTIMIZATION</h1>
              <p data-aos="fade-right">
                With millions of websites struggling for attention on search
                engines, standing out from the crowd can be challenging. This is
                where SEO services come into play. By leveraging the power of
                SEO, businesses can enhance their visibility, attract more
                organic traffic, and ultimately boost their revenue.
              </p>
              <p data-aos="fade-right">
                At Sri KVS Tech, we specialize in boosting your online
                visibility through our advanced SEO strategies. Our focus is on
                improving search engine rankings and increasing organic traffic
                to your website. By using the latest SEO techniques and staying
                up to date on digital trends, we ensure your company reaches its
                maximum potential.
              </p>
            </div>
            <div className="sersubright">
              <img src={sercard3} alt="" data-aos="fade-left" />
            </div>
          </div>
        </div>
      </div>
      <div className="service4main">
        <div className="ser4cont" data-aos="zoom-in">
          <h1>
            From unveiling user needs, crafting narratives, and simplifying
            interactions to creating harmonious experiences And engineering for
            growth, we’re in the business of making a positive impact on our
            collective future.
          </h1>
          <Link to="/contactus" className="ser4btn">
            let’s collaborate
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Services;
