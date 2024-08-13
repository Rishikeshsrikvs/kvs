import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Addclient.css';
import axios from 'axios';
import { useAuth } from '../Auth/AuthContext';
import upload from './../../assets/images/upload.png';

export const Addclient = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [formData, setFormData] = useState({
    clientName: '',
    location: '',
    email: '',
    gstNo: '',
    phone: '',
    adharNumber: '',
    clientLogo: '' // To store the S3 key of the uploaded logo
  });
  const [errors, setErrors] = useState({});
  const [logo, setLogo] = useState(null); // State to manage the logo file
  const [uploadStatus, setUploadStatus] = useState('');
  const [fileName, setFileName] = useState(''); // State to store the file name

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    validateField(name, value);
  };

  const handleLogo = (e) => {
    const file = e.target.files[0]; // Update the logo state with the selected file
    setLogo(file);
    setFileName(file ? file.name : ''); // Update file name state
  };

  const validateField = (name, value) => {
    let newErrors = { ...errors };
    switch (name) {
      case 'clientName':
        newErrors.clientName = value ? '' : 'Client Name is required.';
        break;
      case 'location':
        newErrors.location = value ? '' : 'Location is required.';
        break;
      case 'email':
        newErrors.email = /\S+@\S+\.\S+/.test(value) ? '' : 'Valid Email is required.';
        break;
      case 'gstNo':
        newErrors.gstNo = value.length >= 10 ? '' : 'GST Number should be at least 10 digits.';
        break;
      case 'phone':
        newErrors.phone = value.length === 10 ? '' : 'Phone Number should be 10 digits.';
        break;
      case 'adharNumber':
        newErrors.adharNumber = value.length === 12 ? '' : 'Aadhar Number should be 12 digits.';
        break;
      default:
        break;
    }
    setErrors(newErrors);
  };

  const handleLogoUpload = async () => {
    if (!logo) {
      setUploadStatus('Please select an image file.');
      return null;
    }

    const formData = new FormData();
    formData.append('client-logo', logo);
    formData.append('imageType', 'Logo');

    try {
      const response = await axios.post(
        'https://srikvstech.onrender.com/api/admin/clientLogoUpload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'authorization': `${token}`, // Use the token from useAuth hook
          },
        }
      );
      setUploadStatus(`Image uploaded successfully! Image name: ${response.data.imagename}`);
      return response.data.imagename; // Assuming the response includes the image name
    } catch (error) {
      setUploadStatus('Error uploading the image.');
      console.error('Error uploading logo:', error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    let clientLogoKey = '';
    if (logo) {
      clientLogoKey = await handleLogoUpload();
      if (!clientLogoKey) return; // If logo upload failed, exit the function
    }
    console.log(formData);
    
    // Navigate to Clientservice and pass the client details via state
    navigate('/admin/clientservice', {
      state: {
        clientDetails: {
          client_name: formData.clientName,
          client_logo: clientLogoKey,
          client_email: formData.email,
          client_mobile: formData.phone,
          client_Location: formData.location,
          client_govt_id: formData.adharNumber,
          client_Plan: [], // Empty array for now, you can update this later
          client_GST: formData.gstNo
        }
      }
    });
  };

  const validateForm = () => {
    const newErrors = {};
    const { clientName, location, email, gstNo, phone, adharNumber } = formData;

    if (!clientName) newErrors.clientName = 'Client Name is required.';
    if (!location) newErrors.location = 'Location is required.';
    if (!email || !/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Valid Email is required.';
    if (!gstNo || gstNo.length < 10) newErrors.gstNo = 'GST Number should be at least 10 digits.';
    if (!phone || phone.length !== 10) newErrors.phone = 'Phone Number should be 10 digits.';
    if (!adharNumber || adharNumber.length !== 12) newErrors.adharNumber = 'Aadhar Number should be 12 digits.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="addclientmaincontainer">
      <div className="title">
        <span></span>
      </div>
      <div className="adclientcontainer">
        <form onSubmit={handleSubmit}>
          <div className="addclient-title">
            <h1>ADD CLIENTS</h1>
          </div>
          <div className="addclient-inputs">
            <div className="inputcontainer">
              <input
                type="text"
                placeholder="Client Name"
                className="item"
                name="clientName"
                value={formData.clientName}
                onChange={handleChange}
              />
              {errors.clientName && <p className="error">{errors.clientName}</p>}
            </div>
            <div className="inputcontainer">
              <label htmlFor="logo-upload" className="item logolabel">
                Client Logo:
                <span>
                  <img src={upload} alt="Upload" />
                  <h5>Upload</h5>
                  <p className="file-name">{fileName}</p> {/* Display file name */}
                </span>
              </label>
              <input
                id="logo-upload"
                type="file"
                className="item"
                onChange={handleLogo} // Attach handleLogo function
              />
            </div>
            <div className="inputcontainer">
              <input
                type="text"
                placeholder="Location"
                className="item"
                name="location"
                value={formData.location}
                onChange={handleChange}
              />
              {errors.location && <p className="error">{errors.location}</p>}
            </div>
            <div className="inputcontainer">
              <input
                type="email"
                placeholder="Email"
                className="item"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <p className="error">{errors.email}</p>}
            </div>
            <div className="inputcontainer">
              <input
                type="text"
                placeholder="GST No"
                className="item"
                name="gstNo"
                value={formData.gstNo}
                onChange={handleChange}
              />
              {errors.gstNo && <p className="error">{errors.gstNo}</p>}
            </div>
            <div className="inputcontainer">
              <input
                type="text"
                placeholder="Phone Number"
                className="item"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
              {errors.phone && <p className="error">{errors.phone}</p>}
            </div>
            <div className="inputcontainer">
              <input
                type="text"
                placeholder="Aadhar Number"
                className="item"
                name="adharNumber"
                value={formData.adharNumber}
                onChange={handleChange}
              />
              {errors.adharNumber && <p className="error">{errors.adharNumber}</p>}
            </div>
          </div>
          {uploadStatus && <p>{uploadStatus}</p>}
          {errors.submit && <p className="error">{errors.submit}</p>}
          <div className="addclient-submit">
            <input
              type="submit"
              value="Create Client"
            />
          </div>
        </form>
      </div>
    </div>
  );
};
