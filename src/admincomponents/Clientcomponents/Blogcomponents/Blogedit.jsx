import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import upload from './../../../assets/images/upload.png';
import api from '../../../api/api'; // Import Axios for API calls
import { useAuth } from '../../Auth/AuthContext';

export const Blogedit = () => {
  const [blogTitle, setBlogTitle] = useState('');
  const [blogDescription, setBlogDescription] = useState('');
  const [fileName, setFileName] = useState('');
  const [fileSrc, setFileSrc] = useState('');
  const [file, setFile] = useState(null); // Store the file for upload
  const [preview, setPreview] = useState(false);
  const { token } = useAuth();

  // Function to handle file selection and read file as a data URL
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFileName(selectedFile.name);
      setFile(selectedFile); // Set the file for later use

      const reader = new FileReader();
      reader.onload = (e) => {
        setFileSrc(e.target.result); // Set the file source to display as an image
      };
      reader.readAsDataURL(selectedFile); // Read the file as a data URL for images
    }
  };

  // Function to handle blog preview
  const handlePreview = () => {
    setPreview(true);
  };

  // Function to handle blog publish
  const handlePublish = async () => {
    const formData = new FormData();
    formData.append('blogTitle', blogTitle);
    formData.append('blogDescription', blogDescription);
    formData.append('blog-image', file);

    try {
      const response = await api.post(
        '/api/admin/blogUpload',
        formData,
        {
          headers: {
            authorization: `${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      alert('Blog uploaded successfully!');

      // Reset the form after successful upload
      setBlogTitle('');
      setBlogDescription('');
      setFileName('');
      setFileSrc('');
      setFile(null);
      setPreview(false);

      // Reset the file input field
      const fileInput = document.getElementById('inputfile');
      if (fileInput) {
        fileInput.value = '';
      }
    } catch (error) {
      alert('Failed to upload blog');
      console.error(error);
    }
  };

  return (
    <div className='editblogmaincontainer'>
      <div className="ebtitle">
        <Link to="/admin/dashboard">
          <button>BACK TO MAINPAGE</button>
        </Link>
        <div className="btnleft">
          <button className='prebtn' onClick={handlePreview}>PREVIEW</button>
          <button className='pubbtn' onClick={handlePublish}>PUBLISH</button>
        </div>
      </div>
      <div className="subtitle">
        <h2>UPLOAD A BLOG</h2>
      </div>
      <div className="blogcontainer">
        <div className="leftcon">
          <label>Blog Title:</label>
          <input 
            type="text" 
            value={blogTitle}
            onChange={(e) => setBlogTitle(e.target.value)}
            placeholder="Enter blog title"
          />
          <label>Blog Description:</label>
          <textarea 
            value={blogDescription}
            onChange={(e) => setBlogDescription(e.target.value)}
            placeholder="Enter blog description"
          />
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
          <div className="filenamecontainer">
            {fileName && <div className="filename">Selected file: {fileName}</div>}
          </div>
        </div>
        <div className="rightcon">
          {preview && (
            <div className="rightsubcontainer">
              <div className="subtitle">Blog Preview:</div>
              <div className="filecontent">
                <h2>{blogTitle}</h2>
                {fileSrc && <img src={fileSrc} alt="Uploaded Preview" className="uploaded-image" />}
                <p>{blogDescription}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
