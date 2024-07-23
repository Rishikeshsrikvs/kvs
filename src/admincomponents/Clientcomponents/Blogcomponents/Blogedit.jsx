import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Ensure you import your CSS file
import upload from './../../../assets/images/upload.png';

export const Blogedit = () => {
  const [fileName, setFileName] = useState('');
  const [fileSrc, setFileSrc] = useState('');

  // Function to handle file selection and read file as a data URL
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);

      const reader = new FileReader();
      reader.onload = (e) => {
        setFileSrc(e.target.result); // Set the file source to display as an image
      };
      reader.readAsDataURL(file); // Read the file as a data URL for images
    }
  };

  return (
    <div className='editblogmaincontainer'>
      <div className="ebtitle">
        <Link to="/admin/dashboard">
          <button>BACK TO MAINPAGE</button>
        </Link>
        <div className="btnleft">
          <button className='prebtn'>PREVIEW</button>
          <button className='pubbtn'>PUBLISH</button>
        </div>
      </div>
      <div className="subtitle">
        <h2>UPLOAD A BLOG</h2>
      </div>
      <div className="blogcontainer">
        <div className="leftcon">
          {/* Custom file upload button */}
          <label htmlFor="inputfile" className='inputblogfile'>
            <img src={upload} alt="" />
            <span>Choose a file</span>
          </label>
          <input 
            id="inputfile" 
            type="file" 
            className='inputfile-hidden' 
            onChange={handleFileChange} 
          />
          {/* Display the file name */}
          <div className="filenamecontainer">{fileName && <div className="filename">Selected file: {fileName}</div>}</div>
        </div>
        <div className="rightcon">
          <div className="rightsubcontainer">
            <div className="subtitle">File Preview:</div>
            <div className="filecontent">
              {/* Display the uploaded image */}
              {fileSrc && <img src={fileSrc} alt="Uploaded Preview" className="uploaded-image" />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
