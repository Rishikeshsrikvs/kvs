import React, { useEffect, useState, useRef } from "react";
import "./Works.css";
import rightbig from "./../assets/images/workimages/work1rightbig.png";
import rightsmall from "./../assets/images/workimages/work1rightsmall.png";
import next from "./../assets/images/next.png";
import pre from "./../assets/images/pre.png";
import api from "../api/api";
import AOS from "aos";
import "aos/dist/aos.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation, Pagination } from "swiper/modules";

const Workproject = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.init({
      duration: 3000, // Animation duration in ms
      once: false, // Whether animation should happen only once
    });
  }, []);

  const swiperRef = useRef(null);
  const [favprojects, setFavProjects] = useState([]);
  const [projectDetails, setProjectDetails] = useState([]);

  // Fetch favorite projects
  const fetchFavProjects = async () => {
    try {
      const response = await api.get("/getAllFavProject");
      setFavProjects(response.data);
    } catch (error) {
      console.error("Error fetching favorite projects:", error);
    }
  };

  // Fetch project details for each favorite project
  const fetchProjects = async () => {
    try {
      const detailsPromises = favprojects.map(async (project) => {
        const response = await api.get(`/getProject/${project._id}`);
        return response.data;
      });
      const allProjectDetails = await Promise.all(detailsPromises);
      setProjectDetails(allProjectDetails);
    } catch (error) {
      console.error("Error fetching project details:", error);
    }
  };

  useEffect(() => {
    fetchFavProjects();
  }, []);

  useEffect(() => {
    if (favprojects.length > 0) {
      fetchProjects();
    }
  }, [favprojects]);

  return (
    <div className="work2maincontainer">
      <Swiper
        className="swiper-wrapper"
        ref={swiperRef}
        
        spaceBetween={0}
        navigation={{
          nextEl: ".nextproject",
          prevEl: ".preproject",
        }}
        
        pagination={{ clickable: true }}
        modules={[Navigation, Pagination]}
      >
        {projectDetails.length > 0 &&
          projectDetails.map((project, index) => (
            <SwiperSlide
              className="work2main"
              key={index}
              style={{ height: "unset" }}
            >
              <div className="work2left">
                <img
                  className="w2imgbig"
                  src={`${api.defaults.baseURL}/getProjectImage1/${project.projectImageName1}`}
                  alt="Project Image 1"
                  data-aos="fade-right"
                />
                <img
                  className="w2imgsm"
                  src={`${api.defaults.baseURL}/getProjectImage2/${project.projectImageName2}`}
                  alt="Project Image 2"
                  data-aos="fade-up-left"
                />
              </div>
              <div className="work2right">
                <h1 className="w2color" data-aos="fade-left">
                  software/<span>websites</span>
                </h1>
                <h1 className="w2normal" data-aos="fade-left">{project.projectName}</h1>
                <p >{project.projectDescription}</p>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>

      {/* Navigation buttons outside the Swiper */}
      <div className="work2btn">
        <img className="preproject" src={pre} alt="Previous" />
        <img className="nextproject" src={next} alt="Next" />
      </div>
    </div>
  );
};

export default Workproject;

// import React, { useRef } from 'react';
// import { useEffect, useState } from 'react';
// import './Works.css';

// import rightbig from './../assets/images/workimages/work1rightbig.png';
// import rightsmall from './../assets/images/workimages/work1rightsmall.png';
// import next from './../assets/images/next.png';
// import pre from './../assets/images/pre.png';

// import api from '../api/api';

// const Workproject = () => {
//     const [favprojects, setFavrojects] = useState([]);

//      const fetchfavprojects = async() =>{
//         const response= await api.get(/getAllFavProject);

//         setFavrojects(response.data);
//         fetchProjects();
//      }
//      console.log(favprojects);

//     useEffect(()=>{
//         fetchfavprojects();
//     },[] );
//     const fetchProjects = async({favprojects._id}) => {
//         const response= await api.get(/getProject/${id});
//         console.log(response.data);

//     };

//   return (
//     <div className="work2main">
//             <div className="work2left">
//               <img className="w2imgbig"  src={rightbig} alt="" />
//               <img className="w2imgsm"src={rightsmall} alt="" />
//             </div>
//             <div className="work2right">
//               <h1 className='w2color'>software/<span>websites</span></h1>
//               <h1 className='w2normal'>Client Name</h1>
//               <p>Contentlayer started as a small project with just a Readme file to explain the product. We designed and developed a proper landing page as well as documentation pages, example pages and a blog – using Contentlayer of course.To show how powerful Contentlayer is, we included severeal Stackblitz playgrounds. With these pages in place, Contentlayer evolved from being used in 210 projects in April 2022 to 5700+ projects in November 2023.</p>
//               <div className="work2btn">
//                <img src={pre} alt="" />
//                 <img src={next} alt="" />
//               </div>
//             </div>
//         </div>
//   )
// }

// export default Workproject
