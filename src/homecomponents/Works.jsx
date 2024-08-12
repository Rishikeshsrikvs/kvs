import React, { useEffect } from 'react';
import "./Works.css"
import Workmarq from './landcomponents/Workmarq';
import leftbig from './../assets/images/workimages/work1leftbig.png';
import leftsmall from './../assets/images/workimages/work1leftsmall.png';
import rightsmall from './../assets/images/workimages/work1rightsmall.png';
import rightbig from './../assets/images/workimages/work1rightbig.png';
import workrect from './../assets/images/workimages/landrect.png';
import next from './../assets/images/next.png';
import Feedbacklandslider from './landcomponents/Feedbacklandslider';
import pre from './../assets/images/pre.png';
import wk1 from './../assets/images/workimages/flex/wk1.png';
import wk2 from './../assets/images/workimages/flex/wk2.png';
import wk3 from './../assets/images/workimages/flex/wk3.png';
import wk4 from './../assets/images/workimages/flex/wk4.png';
import wk5 from './../assets/images/workimages/flex/wk5.png';
const Works = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  
  return (
    <div className='workparentcontainer'>
        <div className="work1main">
          <img src={workrect} alt="" className='work1rect'/>
          <div className="work1mainsub">
            <div className="work1left">
              <img  className="w1lb" src={leftbig} alt="" />
              <img  className="w1ls" src={leftsmall} alt="" />
            </div>
            <div className="work1center">
              <h1>Our Recent <br/><span>work</span></h1>
              <p>This is some of our latest design 
              and/or development work.</p>
              <div className="work1btn">scroll down <br/> <span className='arrow'></span></div>
            </div>
            <div className="work1right">
              <img  className="w1rb" src={rightbig} alt="" />
              <img  className="w1rs" src={rightsmall} alt="" />
            </div>
            
          </div>
        </div>
        <div className="work2main">
            <div className="work2left">
              <img className="w2imgbig"  src={rightbig} alt="" />
              <img className="w2imgsm"src={rightsmall} alt="" />
            </div>
            <div className="work2right">
              <h1 className='w2color'>software/<span>websites</span></h1>
              <h1 className='w2normal'>Client Name</h1>
              <p>Contentlayer started as a small project with just a Readme file to explain the product. We designed and developed a proper landing page as well as documentation pages, example pages and a blog – using Contentlayer of course.To show how powerful Contentlayer is, we included severeal Stackblitz playgrounds. With these pages in place, Contentlayer evolved from being used in 210 projects in April 2022 to 5700+ projects in November 2023.</p>
              <div className="work2btn">
               <img src={pre} alt="" />
                <img src={next} alt="" />
              </div>
            </div>
        </div>
        <Workmarq/>
        <div className="work4main">
            <div className="work4cards">
                <img src={wk1} alt="" />
            </div>
            <div className="work4cards">
                <img src={wk2} alt="" />
            </div>
            <div className="work4cards">
                <img src={wk3} alt="" />
            </div>
            <div className="work4cards">
                <img src={wk4} alt="" />
            </div>
            <div className="work4cards">
                <img src={wk5} alt="" />
            </div>
            
            <div className="work4cards work4cardfinal">
              <h1>And This Place Is <br/><span>Allotted</span> <br/>Your Project</h1>
              <div className="workflexbtn">
              Get Started Now
              </div>
            </div>
        </div>
        <Feedbacklandslider/>
    </div>
  )
}

export default Works
