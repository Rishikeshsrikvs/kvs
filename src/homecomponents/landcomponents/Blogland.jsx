import React, { useEffect, useState } from 'react';
import api from '../../api/api';
import "./Blogland.css";
import nearrow from './../../assets/images/ne arrow.svg';

const Blogland = () => {
    const [blogs, setBlogs] = useState([]);
    const [blogImages, setBlogImages] = useState({});

    useEffect(() => {
        // Fetching the blogs from the API
        api.get('/blogs')
            .then(response => {
                // Sort the blogs by date in descending order and then slice the first three
                const sortedBlogs = response.data.sort((a, b) => new Date(b.blogDate) - new Date(a.blogDate));
                setBlogs(sortedBlogs.slice(0, 3));

                // Fetch blog images for the first three blogs
                sortedBlogs.slice(0, 3).forEach(blog => {
                    fetchBlogImage(blog.imageName, blog._id);
                });
            })
            .catch(error => {
                console.error("Error fetching the blogs:", error);
            });
    }, []);

    const fetchBlogImage = async (imageName, blogId) => {
        try {
            const imageResponse = await api.get(`/getBlogImage/${imageName}`, { responseType: 'blob' });
            
            // Create a blob URL for the image and save it in state
            const imageBlob = new Blob([imageResponse.data], { type: imageResponse.headers['content-type'] });
            const imageUrl = URL.createObjectURL(imageBlob);

            setBlogImages(prevState => ({
                ...prevState,
                [blogId]: imageUrl
            }));
        } catch (error) {
            console.error(`Error fetching image for blogId ${blogId}:`, error);
        }
    };

    return (
        <div className="landblogcordcon">
            {blogs.map((blog, index) => (
                <div key={index} className="landblogcard">
                    <div className="lbimg">
                        <img 
                            src={blogImages[blog._id] || 'fallback-image-url'}  // Use blogImages state or fallback image
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
