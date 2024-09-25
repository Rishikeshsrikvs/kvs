import React from "react";
import { useEffect } from "react";
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
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="landmaincontainer">
      <div className="land1">
        <div className="land1spilt">
          <div className="land1left">
            <h1>UNLEASH YOUR DIGITAL</h1>
            <h1 className="color">POTENTIAL</h1>
            <p>
              It's Time To Transform Your Online Presence And Accelerate <br />
              Your Business Growth With Sri KVS Tech.
              <br />
              Let's Start The Journey Together And Witness The Transformation
            </p>
          </div>
          <div className="land1right">
            <img src={cube} className="imagelandright" alt="Cube" />
            <Link to="/contactus">
              <span className="Enquirespan">
                <CircularText />
              </span>
            </Link>
          </div>
        </div>
        <div className="land1yearcontainer">
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
          <h1 className="landabouth1">About Us</h1>
          <h1 className="landabouttext">PROVIDING THE BEST FOR THE BEST</h1>
          <h6 className="landabouth6">
            It's time to transform your online presence and accelerate your
            business growth with Sri KVS Tech. Let's start the journey together
            and witness the transformation.
          </h6>
          <Link to="/about" className="landaboutbtn">
            Know More
          </Link>
        </div>
        <div className="landaboutright">
          <Iconcontainer />
        </div>
      </div>
      <div className="landservicescontainer">
        <div className="landservicetitlecon">
          <h1 className="landsert1">What we do</h1>
          <h1 className="landsert2">OUR SERVICES</h1>
        </div>
        <Serviceland />
      </div>
      <Landproject />
      <div className="landwhyuscontainer">
        <div className="wytextcontainer">
          <span>Why us</span>
        </div>
        <div className="wymaincon">
          <div className="wytitle">
            <h1 className="wytitle1">Bringing Your Ideas In </h1>
            <h1 className="wytitle2">Exceptional Ways</h1>
          </div>
          <div className="wygrid">
            <div className="wyleft">
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
            <div className="wyright">
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
        <div className="landblogtitle">
          <span></span>
          <h1>OUR BLOGS</h1>
        </div>
        <Blogland />
        <div className="landblogbtncn">
          <Link to="blogs" className="landblogbtn">
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
          <img src={contactus} alt="" />
        </div>
        <div className="landcontactussub">
          <div className="landcutitle">
            <h1>create something awesome </h1>
            <h1>
              and <span>extraordinary</span> with Us
            </h1>
          </div>

          <div className="landcusubtitle">
            <p>with a lot of creativity, we can make your dream come true</p>
          </div>
          <div className="landcubtn">
            <Link to="/contactus" className="landcubtnsub">
              CONTACT US
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
