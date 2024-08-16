import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./Blogland.css";
import nearrow from './../../assets/images/ne arrow.svg';

const Blogland = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        // Fetching the blogs from the API
        axios.get('https://srikvs.onrender.com/blogs')
            .then(response => {
                // Sort the blogs by date in descending order and then slice the first three
                const sortedBlogs = response.data.sort((a, b) => new Date(b.blogDate) - new Date(a.blogDate));
                setBlogs(sortedBlogs.slice(0, 3));
            })
            .catch(error => {
                console.error("Error fetching the blogs:", error);
            });
    }, []);

    return (
        <div className="landblogcordcon">
            {blogs.map((blog, index) => (
                <div key={index} className="landblogcard">
                    <div className="lbimg">
                        <img 
                            src={`https://srikvs.onrender.com/getBlogImage/${blog.imageName}`} 
                            alt={blog.blogTitle} 
                        />
                    </div>
                    <div className="lbdetail">
                        <h2>{blog.blogTitle}</h2>
                        <p>{blog.blogDescription}</p>
                        <span className="lbarrow"><img src={nearrow} alt="" /></span>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Blogland;
