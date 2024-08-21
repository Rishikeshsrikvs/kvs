import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./Landproject.css";
import ne from './../../assets/images/ne arrow.svg';
import next from './../../assets/images/next.png'; // Corrected image path
import pre from './../../assets/images/pre.png';  // Corrected image path
import projectimage from './../../assets/images/blogland.png';
const Landproject = () => {
    const projects = [
        { title: 'Website Design Development', description: 'We provide visual designs and mobile and web interface development.', image: 'path_to_image_1.jpg' },
        { title: 'E-commerce Development', description: 'We build scalable and secure e-commerce platforms.', image: 'path_to_image_2.jpg' },
        { title: 'Digital Marketing', description: 'Effective digital marketing strategies to boost your brand.', image: 'path_to_image_3.jpg' },
        { title: 'SEO Optimization', description: 'Optimize your website for better search engine rankings.', image: 'path_to_image_4.jpg' },
        { title: 'UI/UX Design', description: 'Crafting user-friendly interfaces and experiences.', image: 'path_to_image_5.jpg' },
        { title: 'App Development', description: 'Developing mobile applications tailored to your needs.', image: 'path_to_image_6.jpg' },
        { title: 'Content Creation', description: 'Creating engaging content for your brand.', image: 'path_to_image_7.jpg' },
        { title: 'Social Media Management', description: 'Managing your brand’s presence on social media platforms.', image: 'path_to_image_8.jpg' },
        // Add more projects as needed
    ];

    const itemsPerPage = 4;
    const [scrollPosition, setScrollPosition] = useState(0);

    const handleNext = () => {
        setScrollPosition(prev => prev + 1);
    };

    const handlePrev = () => {
        setScrollPosition(prev => Math.max(prev - 1, 0));
    };

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
                            <Link to="/projects" className='allprjtbtn'><span>ALL PROJECT</span><img src={ne} alt="" /></Link>
                        </div>
                        <div className='arrowbtns'>
                            <button onClick={handlePrev}><img src={pre} alt="Previous" /></button>
                            <button onClick={handleNext}><img src={next} alt="Next" /></button>
                        </div>
                    </div>
                </div>
                <div className='landprojectcardcontainer' style={{ transform: `translateX(-${scrollPosition * 100}%)` }}>
                    {projects.map((project, index) => (
                        <div key={index} className="landprojectcard">
                            <div className="landprojectimagecon">
                                <img className="landprojectimg" src={projectimage} alt={project.title} />
                            </div>
                            <div className="landprojectdetail">
                                <h1>{project.title}</h1>
                                <p>{project.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Landproject;
