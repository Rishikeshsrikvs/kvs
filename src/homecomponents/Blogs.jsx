import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import api from "../api/api";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";
import "./Blogs.css";
import bb1 from "./../assets/images/Blogs/bb1.png";
import bb2 from "./../assets/images/Blogs/bb2.png";
import bb3 from "./../assets/images/Blogs/bb3.png";
import bb4 from "./../assets/images/Blogs/bb4.png";
import bb5 from "./../assets/images/Blogs/bb5.png";
import bb6 from "./../assets/images/Blogs/bb6.png";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [blogImages, setBlogImages] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.init({
      duration: 2000, // Animation duration in ms
      once: false, // Whether animation should happen only once
    });
  }, []);
  useEffect(() => {
    // Fetch blogs data
    api
      .get("/blogs")
      .then((response) => {
        const sortedBlogs = response.data.sort(
          (a, b) => new Date(b.blogDate) - new Date(a.blogDate)
        );
        setBlogs(sortedBlogs);

        // Fetch blog images
        sortedBlogs.forEach((blog) => {
          fetchBlogImage(blog.imageName, blog._id); // Call the image fetching function for each blog
        });
      })
      .catch((error) => {
        console.error("Error fetching the blogs:", error);
      });
  }, []);

  const fetchBlogImage = async (imageName, blogId) => {
    try {
      const imageResponse = await api.get(`/getBlogImage/${imageName}`, {
        responseType: "blob",
      });

      // Create a blob URL for the image and save it in state
      const imageBlob = new Blob([imageResponse.data], {
        type: imageResponse.headers["content-type"],
      });
      const imageUrl = URL.createObjectURL(imageBlob);

      setBlogImages((prevState) => ({
        ...prevState,
        [blogId]: imageUrl,
      }));
    } catch (error) {
      console.error(`Error fetching image for blogId ${blogId}:`, error);
    }
  };

  const handleCardClick = (blog) => {
    navigate(`/blog/${blog._id}`, { state: { blog } });
  };

  return (
    <div className="blogparent">
      <Helmet>
        <title>Sri KVS Tech Blogs - Insights on Digital Marketing Agency</title>
        <meta
          name="description"
          content="Stay updated with Sri KVS Tech blogs, featuring expert insights, tips, and trends in digital marketing, social media marketing, web development, and technology innovation"
        />
        <link rel="canonical" href="https://srikvstech.com/blogs" />
      </Helmet>
      <div className="blog1main">
        <div className="blog1back" data-aos="zoom-out">
          <div>
            <img src={bb1} alt="Background 1" />
          </div>
          <div>
            <img src={bb2} alt="Background 2" />
          </div>
          <div>
            <img src={bb3} alt="Background 3" />
          </div>
          <div>
            <img src={bb4} alt="Background 4" />
          </div>
          <div>
            <img src={bb5} alt="Background 5" />
          </div>
          <div>
            <img src={bb6} alt="Background 6" />
          </div>
        </div>
        <div className="blog1sub">
          <h1 data-aos="zoom-in">
            Unraveling the Unsolvable: <br />
            Your Blogging Solutions Await!
          </h1>
        </div>
      </div>

      <div className="blog2latest">
        <h2 data-aos="fade-right">Latest Blogs</h2>
        <div className="blogcon">
          {blogs.slice(0, 4).map((blog) => (
            <div
              key={blog._id}
              className="blogcard"
              onClick={() => handleCardClick(blog)}
              data-aos="fade-up"
            >
              <div className="blogcardimg">
                <img
                  src={blogImages[blog._id] || "fallback-image-url"} // Use blogImages state or a fallback image
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
        <h2 data-aos="fade-right">More Blogs</h2>
        <div className="blogcon">
          {blogs.slice(4, 8).map((blog) => (
            <div
              key={blog._id}
              className="blogcard"
              onClick={() => handleCardClick(blog)}
              data-aos="fade-up"
            >
              <div className="blogcardimg">
                <img
                  src={blogImages[blog._id] || "fallback-image-url"} // Use blogImages state or a fallback image
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
};

export default Blogs;
