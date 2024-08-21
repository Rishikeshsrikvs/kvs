import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './BlogDetail.css';
import api from '../../../api/api';

const BlogDetail = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { blog } = location.state || {}; // Access blog details from state

    const handleBackClick = () => {
        navigate(-1); // Go back to the previous page
    };

    if (!blog) {
        return <div>Blog not found</div>;
    }

    return (
        <div className='blog-detail'>
            
            <div className="blog-detail-content">
                <h1>{blog.blogTitle}</h1>
                <div className="blogimg">
                    <img
                        src={`${api.defaults.baseURL}/getBlogImage/${blog.imageName}`}
                        alt={blog.blogTitle}
                    />
                </div>
                
                <p>{blog.blogDescription}</p>
            </div>
            <button onClick={handleBackClick} className="back-button">Back</button>
        </div>
    );
}

export default BlogDetail;
