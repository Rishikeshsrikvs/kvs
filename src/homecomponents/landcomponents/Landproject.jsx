import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useNavigate } from 'react-router-dom';
import { Navigation, Pagination } from 'swiper/modules'; // Import necessary modules
import ne from './../../assets/images/ne arrow.svg';
import next from './../../assets/images/next.png';
import pre from './../../assets/images/pre.png';
import projectimage from './../../assets/images/blogland.png';

import digima from './../../assets/images/project/digital marketing.jpg';
import seo from './../../assets/images/project/seo.jpg';
import web from './../../assets/images/project/web.jpg';
import app from './../../assets/images/project/app.jpg';
import content from './../../assets/images/project/content.jpg';


import './Landproject.css';

const Landproject = () => {
    const projects = [
        { title: 'Social Media Management', description: 'Managing your brand’s presence on social media platforms.', image: projectimage },
        { title: 'Digital Marketing', description: 'Effective digital marketing strategies to boost your brand.', image: digima },
        { title: 'SEO Optimization', description: 'Optimize your website for better search engine rankings.', image: seo },
        { title: 'Content Creation', description: 'Creating engaging content for your brand.', image: content },
        { title: 'Website Design Development', description: 'We provide visual designs and mobile and web interface development.', image: web },
        { title: 'E-commerce Development', description: 'We build scalable and secure e-commerce platforms.', image: projectimage },
        { title: 'UI/UX Design', description: 'Crafting user-friendly interfaces and experiences.', image: projectimage },
        { title: 'App Development', description: 'Developing mobile applications tailored to your needs.', image: app }
    ];

    // Create a ref for Swiper instance
    const swiperRef = useRef(null);
    const navigate = useNavigate();

    return (
        <div className="lprmain">
            <div className='landprojectcontainer'>
                <div className="landprojecttitle">
                    <div className="projecttitle">
                        <h1>Elevate Your Brand, Accelerate <br />
                            Your <span>Growth</span>
                        </h1>
                    </div>
                    <div className='projectbtns'>
                        <div className="allprjt">
                            <Link to="/projects" className='allprjtbtn'>
                                <span>ALL PROJECT</span>
                                <img src={ne} alt="Next arrow" />
                            </Link>
                        </div>
                        <div className='arrowbtns'>
                            <button className="prev-button"><img src={pre} alt="Previous" /></button>
                            <button className="next-button"><img src={next} alt="Next" /></button>
                        </div>
                    </div>
                </div>

                <Swiper
                    className='landprojectcardcontainer'
                    ref={swiperRef} // Attach Swiper instance to ref
                    slidesPerView={4}
                    spaceBetween={60}
                    
                    // autoplay={{
                    //     delay: 1000,
                    //     disableOnInteraction: false,
                    // }}
                    navigation={{
                        nextEl: '.next-button',
                        prevEl: '.prev-button',
                    }}
                    loop={true}
                    pagination={{ clickable: true }}
                    modules={[Navigation, Pagination]} // Include the Navigation and Pagination modules
                >
                    {projects.map((project, index) => (
                        <SwiperSlide key={index} className="landprojectcard" onClick={()=>{navigate('/projects')}} >
                            <div className="landprojectimagecon">
                                <img className="landprojectimg" src={project.image} alt={project.title} />
                            </div>
                            <div className="landprojectdetail">
                                <h1>{project.title}</h1>
                                <p>{project.description}</p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default Landproject;
