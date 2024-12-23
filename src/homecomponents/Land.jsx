import React from "react";
import { Helmet } from "react-helmet";
import { useEffect } from "react";
import ScrollReveal from "./ScrollReveal";
import AOS from "aos";
import "aos/dist/aos.css";

import { Link } from "react-router-dom";
import "./Land.css";
import CircularText from "./landcomponents/CircularText";
import AnimatedNumber from "./landcomponents/AnimatedNumber.";
import cube from "./../assets/images/cube.png";
import logo from "./../assets/images/logo.png";
import { Iconcontainer } from "./landcomponents/Iconcontainer";
import landback from "./../assets/images/landback.png";
import Feedbacklandslider from "./landcomponents/Feedbacklandslider";
import Blogland from "./landcomponents/Blogland";
import wsrotate from "./../assets/images/ws3.png";
import contactus from "./../assets/images/contactusback.png";
import Serviceland from "./landcomponents/Serviceland";
import Landproject from "./landcomponents/Landproject";
import pre from "./../assets/images/pre.png";
import ne from "./../assets/images/ne arrow.svg";
import next from "./../assets/images/next.png";
import wsleftdown from "./../assets/images/wsleftdown.png";

import Logoslider from "./landcomponents/Logoslider";
export const Land = () => {
  const duration = 4000; // Animation duration in milliseconds
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scroll effect
    });
    AOS.init({
      duration: 2000, // Animation duration in ms
      once: false, // Whether animation should happen only once
    });
  }, []);
  return (
    <div className="landmaincontainer">
      <Helmet>
        <meta
          name="description"
          content="SRI KVS TECH - Your trusted partner for technology solutions. Offering web development, digital marketing, and more with a focus on innovation and quality."
        />
        <meta
          name="keywords"
          content="SRI KVS TECH, technology solutions, web development, digital marketing, IT services, tech company, innovative solutions,Sri kvs tech chennai , sri kvs tech avadi , digital marketing , web designing , app development , web development , website design , digital marketing agency , mobile app development , Sri kvs tech , digital marketing company , ui ux design , web designers near me , web page design , online advertising , android app development , marketing strategy , website  developers near me , google digital marketing , digital marketing services , website developers , website designers near me , website creators , digital advertising , marketing agency near me , graphic design website
       app builders , website builders near me , digital marketing near me , digital marketing strategy , digital marketing agency near me , digital marketing specialist , digital marketing companies near me , social media marketing agency near me , digital marketing ads , digital marketing content ,lead generations , sem digital marketing , social digital marketing , social , marketing agencies , digital marketing and advertising , digital marketing social media marketing , social media marketing digital
       "
        />
        <meta name="author" content="SRI KVS TECH" />

        <meta
          property="og:title"
          content="Sri KVSTECH - Innovative IT Solutions "
        />

        <meta name="twitter:image" content="/kvsfevicon.png" />

        <title>SRI KVS TECH - Innovative Technology Solutions</title>

        <meta
          property="og:description"
          content="Explore cutting-edge technology solutions from SRI KVS TECH. Delivering excellence in web development, digital marketing, and more."
        />
        <meta property="og:image" content="/kvsfevicon.png" />
        <meta property="og:url" content="https://srikvstech.com/" />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="land1">
        <div className="land1spilt">
          <div className="land1left">
            <h1 data-aos="fade-right">UNLEASH YOUR DIGITAL</h1>
            <h1 className="color" data-aos="fade-right">
              POTENTIAL
            </h1>

            <p data-aos="fade-right">
              It's Time To Transform Your Online Presence And Accelerate <br />
              Your Business Growth With Sri KVS Tech.
              <br />
              Let's Start The Journey Together And Witness The Transformation
            </p>
          </div>
          <div className="land1right">
            <img src={cube} className="imagelandright" alt="Cube" />
            <Link to="/contactus">
              <span className="Enquirespan" data-aos="fade-up">
                <CircularText />
              </span>
            </Link>
          </div>
        </div>

        <div className="land1yearcontainer" data-aos="fade-up">
          <div className="yearssplit">
            <h1>
              <AnimatedNumber value={75} duration="4000" />+
            </h1>
            <h4>SUCCESSFUL PROJECTS</h4>
          </div>
          <div className="yearssplit">
            <h1>
              <AnimatedNumber value={50} duration="4000" />
            </h1>
            <h4>HAPPY CLIENTS</h4>
          </div>
          <div className="yearssplit">
            <h1>
              <AnimatedNumber value={4} duration="4000" />+
            </h1>
            <h4>YEARS IN INDUSTRY</h4>
          </div>
        </div>

        <Logoslider />
      </div>
      <div className="landaboutcontainer">
        <div className="landaboutleft">
          <h1 className="landabouth1" data-aos="fade-right">
            About Us
          </h1>
          <h1 className="landabouttext" data-aos="fade-right">
            PROVIDING THE BEST FOR THE BEST
          </h1>

          <h6 className="landabouth6" data-aos="fade-right">
            It's time to transform your online presence and accelerate your
            business growth with Sri KVS Tech. Let's start the journey together
            and witness the transformation.
          </h6>
          <Link to="/about" className="landaboutbtn" data-aos="fade-right">
            Know More
          </Link>
        </div>

        <div className="landaboutright" data-aos="fade-up">
          <Iconcontainer />
        </div>
      </div>
      <div className="landservicescontainer">
        <div className="landservicetitlecon" data-aos="zoom-in">
          <h1 className="landsert1">What we do</h1>
          <h1 className="landsert2">OUR SERVICES</h1>
        </div>
        <Serviceland />
      </div>
      <Landproject />
      <div className="landwhyuscontainer">
        <div className="wytextcontainer" data-aos="fade-bottom">
          <span>Why us</span>
        </div>
        <div className="wymaincon">
          <div className="wytitle">
            <h1 className="wytitle1" data-aos="zoom-in">
              Bringing Your Ideas In{" "}
            </h1>
            <h1 className="wytitle2" data-aos="zoom-in">
              Exceptional Ways
            </h1>
          </div>
          <div className="wygrid">
            <div className="wyleft" data-aos="zoom-in">
              <div className="wylupimg">
                <img src={wsrotate} alt="" />
              </div>
              <div className="wyltext">
                <h2>Fulfilling Your Requirements With Precision</h2>
              </div>
              <div className="wyldownimg">
                <img src={wsleftdown} alt="" />
              </div>
            </div>
            <div className="wyright" data-aos="zoom-in">
              <div className="wyrightup"></div>
              <div className="wyrightbottom">
                <div className="wyrightbottommain">
                  <div className="wyrbleft">
                    <p className="wyup">Work With Us To</p>
                    <h2>Realize</h2>
                    <p className="wydown">Your Project Vision</p>
                  </div>
                  <div className="wyrbright">
                    <Link to="/contactus" className="letstartbtn">
                      LET'S STRART
                    </Link>
                  </div>
                  <div className="wyround"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Feedbacklandslider />
      <div className="landblogmain">
        <div className="landblogtitle" data-aos="fade-up">
          <span></span>
          <h1>OUR BLOGS</h1>
        </div>
        <Blogland />
        <div className="landblogbtncn">
          <Link to="blogs" className="landblogbtn" data-aos="fade-up">
            Click For More Blogs
          </Link>
        </div>
      </div>
      <div className="landcontactusmain">
        <div className="rectback">
          <div className="rcb1"></div>
          <div className="rcb2"></div>
          <div className="rcb3"></div>
        </div>
        <div className="contactback">
          <img src={contactus} alt="" data-aos="fade-left" />
        </div>
        <div className="landcontactussub">
          <div className="landcutitle">
            <h1 data-aos="fade-right">create something awesome </h1>
            <h1 data-aos="fade-left">
              and <span>extraordinary</span> with Us
            </h1>
          </div>

          <div className="landcusubtitle">
            <p data-aos="fade-up">
              with a lot of creativity, we can make your dream come true
            </p>
          </div>
          <div className="landcubtn">
            <Link to="/contactus" className="landcubtnsub" data-aos="fade-up">
              CONTACT US
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
