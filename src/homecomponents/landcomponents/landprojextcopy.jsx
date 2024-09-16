


import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./Landproject.css";
import ne from './../../assets/images/ne arrow.svg';
import next from './../../assets/images/next.png';
import pre from './../../assets/images/pre.png';
import projectimage from './../../assets/images/blogland.png';

const Landproject = () => {
    const projects = [
        { title: 'Social Media Management', description: 'Managing your brand’s presence on social media platforms.', image: projectimage },
        { title: 'Digital Marketing', description: 'Effective digital marketing strategies to boost your brand.', image: projectimage },
        { title: 'SEO Optimization', description: 'Optimize your website for better search engine rankings.', image: projectimage },
        { title: 'Content Creation', description: 'Creating engaging content for your brand.', image: projectimage },
        { title: 'Website Design Development', description: 'We provide visual designs and mobile and web interface development.', image: projectimage },
        { title: 'E-commerce Development', description: 'We build scalable and secure e-commerce platforms.', image: projectimage },
        { title: 'UI/UX Design', description: 'Crafting user-friendly interfaces and experiences.', image: projectimage },
        { title: 'App Development', description: 'Developing mobile applications tailored to your needs.', image: projectimage }
    ];

    const itemsPerPage = 4;
    const totalItems = projects.length;
    const [currentIndex, setCurrentIndex] = useState(itemsPerPage);
    const sliderRef = useRef(null);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => prevIndex + 1);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => prevIndex - 1);
    };

    useEffect(() => {
        const slider = sliderRef.current;

        if (currentIndex >= totalItems + itemsPerPage) {
            setTimeout(() => {
                slider.style.transition = 'none';
                setCurrentIndex(itemsPerPage); 
            }, 500);
        }

        if (currentIndex <= 0) {
            setTimeout(() => {
                slider.style.transition = 'none';
                setCurrentIndex(totalItems); 
            }, 500);
        }

        slider.style.transition = 'transform 0.5s ease-in-out';
        slider.style.transform = `translateX(-${currentIndex * 25}%)`;
    }, [currentIndex, totalItems, itemsPerPage]);

    const clonedProjects = [
        ...projects.slice(-itemsPerPage), 
        ...projects, 
        ...projects.slice(0, itemsPerPage)
    ];

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
                            <button onClick={handlePrev}><img src={pre} alt="Previous" /></button>
                            <button onClick={handleNext}><img src={next} alt="Next" /></button>
                        </div>
                    </div>
                </div>
                <div className='landprojectcardcontainer' ref={sliderRef}>
                    {clonedProjects.map((project, index) => (
                        <div key={index} className="landprojectcard">
                            <div className="landprojectimagecon">
                                <img className="landprojectimg" src={project.image} alt={project.title} />
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
};

export default Landproject;
