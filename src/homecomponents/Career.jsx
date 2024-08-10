import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./Career.css";

// Dummy data for jobs
const dummyJobs = [
  {
    id: 1,
    title: 'Web Designer',
    level: 'Senior',
    experience: '1 year',
    location: 'Chennai',
    description: 'We are looking for a creative Web Designer with experience in modern design tools and techniques.',
  },
  {
    id: 2,
    title: 'Front-End Developer',
    level: 'Junior',
    experience: '2 years',
    location: 'Bangalore',
    description: 'Seeking a talented Front-End Developer with a passion for building responsive and interactive web applications.',
  },
  // Add more dummy job data as needed
];

const Career = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Using dummy data for now
    setJobs(dummyJobs);
    setLoading(false);
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className='careerparent'>
      <div className="career1main">
        <div className="career1text">
          <h1>Careers <span>&</span></h1>
          <h1>Vacancies</h1>
        </div>
      </div>
      <div className="career2main">
        <div className="career2left">
          <p>Cannot find the suitable vacancy?<br/>
          Drop us a line</p>
        </div>
        <div className="career2right">
          {jobs.map(job => (
            <Link
              to={`/career/${job.id}`} // Use the URL path with the job ID
              state={{ job }} // Pass the job data via state
              className="cjobcard"
              key={job.id}
            >
              <div className="cjobleft">
                <div className="cjup">
                  <h1>{job.title}</h1>
                </div>
                <ul className="cjdown">
                  <li>{job.level}</li>
                  <li>{job.experience} experience</li>
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
