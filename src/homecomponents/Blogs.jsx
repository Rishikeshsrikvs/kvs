import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Blogs.css';
import bb1 from './../assets/images/Blogs/bb1.png';
import bb2 from './../assets/images/Blogs/bb2.png';
import bb3 from './../assets/images/Blogs/bb3.png';
import bb4 from './../assets/images/Blogs/bb4.png';
import bb5 from './../assets/images/Blogs/bb5.png';
import bb6 from './../assets/images/Blogs/bb6.png';

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('https://srikvs.onrender.com/blogs')
            .then(response => {
                const sortedBlogs = response.data.sort((a, b) => new Date(b.blogDate) - new Date(a.blogDate));
                setBlogs(sortedBlogs);
            })
            .catch(error => {
                console.error("Error fetching the blogs:", error);
            });
    }, []);

    const handleCardClick = (blog) => {
        navigate(`/blog/${blog._id}`,{ state: { blog } });
    };

    return (
        <div className='blogparent'>
            <div className="blog1main">
                <div className="blog1back">
                    <div><img src={bb1} alt="Background 1" /></div>
                    <div><img src={bb2} alt="Background 2" /></div>
                    <div><img src={bb3} alt="Background 3" /></div>
                    <div><img src={bb4} alt="Background 4" /></div>
                    <div><img src={bb5} alt="Background 5" /></div>
                    <div><img src={bb6} alt="Background 6" /></div>
                </div>
                <div className="blog1sub">
                    <h1>Unraveling the Unsolvable: <br />
                        Your Blogging Solutions Await!</h1>
                </div>
            </div>

            <div className="blog2latest">
                <h2>Latest Blogs</h2>
                <div className='blogcon'>
                    {blogs.slice(0, 4).map((blog) => (
                        <div 
                            key={blog._id} 
                            className="blogcard"
                            onClick={() => handleCardClick(blog)}
                        >
                            <div className="blogcardimg">
                                <img 
                                    src={`https://srikvs.onrender.com/getBlogImage/${blog.imageName}`} 
                                    alt={blog.blogTitle} 
                                />
                            </div>
                            <div className="blogdetail">
                                <h1 className="bgtiltle">{blog.blogTitle}</h1>
                                <p>{blog.blogDescription}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="blog2latest">
                <h2>More Blogs</h2>
                <div className='blogcon'>
                    {blogs.slice(4, 8).map((blog) => (
                        <div 
                            key={blog._id} 
                            className="blogcard"
                            onClick={() => handleCardClick(blog)}
                        >
                            <div className="blogcardimg">
                                <img 
                                    src={`https://srikvs.onrender.com/getBlogImage/${blog.imageName}`} 
                                    alt={blog.blogTitle} 
                                />
                            </div>
                            <div className="blogdetail">
                                <h1 className="bgtiltle">{blog.blogTitle}</h1>
                                <p>{blog.blogDescription}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Blogs;
