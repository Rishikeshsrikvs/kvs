import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import api from "../api/api";
import "./Career.css";
import AOS from "aos";
import "aos/dist/aos.css";

const Career = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.init({
      duration: 2000, // Animation duration in ms
      once: false, // Whether animation should happen only once
    });
  }, []);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await api.get("/getjobs");
        setJobs(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load jobs");
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="careerparent">
      <Helmet>
        <title>
          Careers at Sri KVS Tech - Join Our Digital Marketing & IT Team
        </title>
        <meta
          name="description"
          content="Explore exciting career opportunities at Sri KVS Tech. Join our team of experts in digital marketing, IT solutions, web development, and technology innovation."
        />
        <link rel="canonical" href="https://srikvstech.com/career" />
      </Helmet>
      <div className="career1main">
        <div className="career1text">
          <h1 data-aos="fade-right">
            Careers <span>&</span>
          </h1>
          <h1 data-aos="fade-right">Vacancies</h1>
        </div>
      </div>
      <div className="career2main">
        <div className="career2left" data-aos="fade-right">
          <p>
            Cannot find the suitable vacancy?
            <br />
            Drop us a line
          </p>
        </div>
        <div className="career2right">
          {jobs.map((job) => (
            <Link
              to={`/career/${job._id}`} // Use the URL path with the job ID
              state={{ job }} // Pass the job data via state
              className="cjobcard"
              key={job._id}
              data-aos="fade-left"
            >
              <div className="cjobleft">
                <div className="cjup">
                  <h1>{job.jobName}</h1>
                </div>
                <ul className="cjdown">
                  <li>
                    {job.experienceMin} - {job.experienceMax} years experience
                  </li>
                  <li>{job.location}</li>
                </ul>
              </div>
              <div className="cjobright">
                <p>&#8599;</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Career;
