import React from 'react';
import "./Brochuredownload.css";
import socialgif from './../assets/images/Brochureform/social.gif';
import webgif from './../assets/images/Brochureform/web.gif';
import bdbtn from './../assets/images/Brochureform/bdbtn.png';
import socialMediaPDF from './../assets/images/Brochureform/social brocure.pdf'; // Importing the PDF file
import webDesignPDF from './../assets/images/Brochureform/WEBSITE BROCHURE.pdf';    // Importing the PDF file

const Brochuredownload = () => {
  return (
    <div className='bdparent'>
      <div className="bdmain">
        <h1>Download Brochure</h1>
        <div className="bdsplit">
          <div className="bdleft">
            <div className="bdcenter">
              <img src={socialgif} alt="" />
              <h1>Social Media Brochure</h1>
              <p>Unlock Your Brand's Potential With Engaging Social Media Solutions</p>
              <div className="bdbtncn">
                <a href={socialMediaPDF} download="SocialMediaBrochure.pdf">
                  <img className="bdbtn" src={bdbtn} alt="Download Social Media Brochure" />
                </a>
              </div>
            </div>
          </div>

          <div className="bdright">
            <div className="bdcenter">
              <img src={webgif} alt="" />
              <h1>Web Design Brochure</h1>
              <p>Unleash Your Online Potential With Bespoke Web Design Solutions</p>
              <div className="bdbtncn">
                <a href={webDesignPDF} download="WebDesignBrochure.pdf">
                  <img className="bdbtn" src={bdbtn} alt="Download Web Design Brochure" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Brochuredownload;
