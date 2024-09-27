import React from "react";
import { useEffect } from "react";
import "./Brochuredownload.css";
import AOS from "aos";
import "aos/dist/aos.css";
import socialgif from "./../assets/images/Brochureform/social.gif";
import webgif from "./../assets/images/Brochureform/web.gif";
import bdbtn from "./../assets/images/Brochureform/bdbtn.png";
import socialMediaPDF from "./../assets/images/Brochureform/social brocure.pdf"; // Importing the PDF file
import webDesignPDF from "./../assets/images/Brochureform/WEBSITE BROCHURE.pdf"; // Importing the PDF file

const Brochuredownload = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.init({
      duration: 2000,  // Animation duration in ms
      once: false,     // Whether animation should happen only once
    });
  }, []);
  return (
    <div className="bdparent">
      <div className="bdmain">
        <h1 data-aos="zoom-in">Download Brochure</h1>
        <div className="bdsplit">
          <div className="bdleft" data-aos="zoom-in">
            <div className="bdcenter">
              <img src={socialgif} alt="" />
              <h1>Social Media Brochure</h1>
              <p>
                Unlock Your Brand's Potential With Engaging Social Media
                Solutions
              </p>
              <div className="bdbtncn">
                <a href={socialMediaPDF} download="SocialMediaBrochure.pdf">
                  <img
                    className="bdbtn"
                    src={bdbtn}
                    alt="Download Social Media Brochure"
                  />
                </a>
              </div>
            </div>
          </div>

          <div className="bdright"data-aos="zoom-in">
            <div className="bdcenter">
              <img src={webgif} alt="" />
              <h1>Web Design Brochure</h1>
              <p>
                Unleash Your Online Potential With Bespoke Web Design Solutions
              </p>
              <div className="bdbtncn">
                <a href={webDesignPDF} download="WebDesignBrochure.pdf">
                  <img
                    className="bdbtn"
                    src={bdbtn}
                    alt="Download Web Design Brochure"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Brochuredownload;
