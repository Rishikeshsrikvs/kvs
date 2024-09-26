import React, { useEffect } from "react";
import "./About.css";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles
import about22 from "./../assets/images/Aboutimages/about21.png";
import about21 from "./../assets/images/Aboutimages/about22.png";
import about3 from "./../assets/images/Aboutimages/about3.png";
import AnimatedNumber from "./landcomponents/AnimatedNumber.";
import or1 from "./../assets/images/Aboutimages/Ornament 21.svg";
import or2 from "./../assets/images/Aboutimages/Ornament 22.svg";
import or3 from "./../assets/images/Aboutimages/Ornament 23.svg";
import a25i1 from "./../assets/images/Aboutimages/a25i1.png";
import a25i2 from "./../assets/images/Aboutimages/a25i2.png";
import a25i3 from "./../assets/images/Aboutimages/a25i3.png";
import a25i4 from "./../assets/images/Aboutimages/a25i4.png";
import Aboutteam from "./landcomponents/Aboutteam";
export const About = () => {
  // Scroll to the top of the page when the component is mounted
  useEffect(() => {
    
    window.scrollTo(0, 0);
    AOS.init({
      duration: 2000, // Animation duration in ms
      once: false,     // Whether animation should happen only once
    });
  }, []);

  return (
    <div className="aboutparentcontainer">
      <div className="aboutland">
        <h1  data-aos="zoom-in">Built for modern brands who want to make waves</h1>
      </div>
      <div className="about2main">
        <div className="about2left">
          <img className="abt22" src={about21} alt=""  data-aos="fade-up-right"/>
          <img className="abt21" src={about22} alt="" data-aos="fade-up"/>
        </div>
        <div className="about2right">
          <h1 className="a2color" data-aos="fade-left">
            <span className="a2colorline"></span>
            <span>WHO WE ARE</span>
          </h1>
          <p>
            Sri KVS Tech is one of the leading Digital marketing service
            companies in Chennai.
          </p>
          <p>
            We are more than just a Marketing agency – we're your digital
            partner in achieving your business goals. Our experts know all the
            techniques to help your business grow online.
          </p>
          <p>
            We provide the best online marketing services
            <ul>
              <li>Search Engine Optimization (SEO),</li>
              <li>Social Media Marketing (SMM),</li>
              <li>Website design and development</li>
              <li>Branding</li>
            </ul>
            and more to businesses of all sizes.
          </p>
          <h1 className="about2rightlasth1">
            “ Transform your online presence and boost your business with us
            today! ”
          </h1>
        </div>
      </div>
      <div className="about25main">
        <h1>Why Choose Us?</h1>
        <div className="a25cardcon">
          <div className="a25card1">
            <div className="a25img">
              <img src={a25i1} alt="" />
            </div>
            <h1>Expertise :</h1>
            <p>
              With years of experience in the industry, we have the knowledge
              and skills to deliver results-driven digital marketing solutions
              that align with your business objectives.
            </p>
          </div>
          <div className="a25card2">
            <div className="a25img">
              <img src={a25i2} alt="" />
            </div>
            <h1>Customization :</h1>
            <p>
              We understand that every business is unique. That's why we take a
              personalized approach to each client, crafting custom-made
              strategies that align perfectly with your business and objectives.
            </p>
          </div>
          <div className="a25card3">
            <div className="a25img">
              <img src={a25i3} alt="" />
            </div>
            <h1>Transparency :</h1>
            <p>
              We believe in honest and open communication. Throughout the
              duration of our partnership, you'll have full visibility into the
              progress of your campaigns and access to detailed performance
              reports.
            </p>
          </div>
          <div className="a25card4">
            <div className="a25img">
              <img src={a25i4} alt="" />
            </div>
            <h1>Dedicated to Your Success</h1>
            <p>
              Our ultimate goal is your success. Whether it's increasing brand
              awareness, driving website traffic, or boosting sales, we're
              committed to delivering measurable results that exceed your
              expectations.
            </p>
          </div>
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
            <div className="ab3colortitle">
              No worries! We've got you covered!
            </div>
            <h1 className="ab3main">
              WE HELP PEOPLE CREATE AND <span>BUILD WEALTH</span>
            </h1>
            <p className="ab3p">
              At SRI kvs TECH, we’re fueled by an insatiable drive to push the
              limits of digital creativity, combined with a team of talented
              individuals with the capabilities
            </p>
            <div className="btncontainer">
              <Link to="/contactus" className="ab3btn">
                Book A Call
              </Link>
            </div>
          </div>
          <div className="about3right">
            <img src={about3} alt="" />
          </div>
        </div>
      </div>
      <Aboutteam />
      <div className="aboutyearcontainer">
        <div className="abyearssplit">
          <h1>
            <AnimatedNumber value={75} duration="2000" />+
          </h1>
          <h4>SUCCESSFUL PROJECTS</h4>
        </div>
        <div className="abyearssplit">
          <h1>
            <AnimatedNumber value={50} duration="2000" />
          </h1>
          <h4>HAPPY CLIENTS</h4>
        </div>
        <div className="abyearssplit">
          <h1>
            <AnimatedNumber value={4} duration="2000" />+
          </h1>
          <h4>YEARS IN INDUSTRY</h4>
        </div>
      </div>
    </div>
  );
};
