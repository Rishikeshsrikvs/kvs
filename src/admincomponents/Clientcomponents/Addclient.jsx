import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Addclient.css';
import upload from './../../assets/images/upload.png';

export const Addclient = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    clientName: '',
    location: '',
    email: '',
    gstNo: '',
    phone: '',
    adharNumber: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Validate field on change
    validateField(name, value);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await axios.post('http://localhost:3500/clients', formData);
      if (response.status === 201) {
        navigate(`/admin/response&package/${response.data.id}`);
      } else {
        setErrors({ submit: 'Failed to create client.' });
      }
    } catch (error) {
      setErrors({ submit: 'Error connecting to server.' });
      console.error('Error:', error);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const { clientName, location, email, gstNo, phone, adharNumber, paymentMode, paymentRefNo } = formData;

    if (!clientName) newErrors.clientName = 'Client Name is required.';
    if (!location) newErrors.location = 'Location is required.';
    if (!email || !/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Valid Email is required.';
    if (!gstNo || gstNo.length < 10) newErrors.gstNo = 'GST Number should be at least 10 digits.';
    if (!phone || phone.length !== 10) newErrors.phone = 'Phone Number should be 10 digits.';
    if (!adharNumber || adharNumber.length !== 12) newErrors.adharNumber = 'Aadhar Number should be 12 digits.';


    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isFormValid = Object.keys(errors).length === 0;

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
                  <img src={upload} alt="" /> <h5>Upload</h5>
                </span>
              </label>
              <input id="logo-upload" type="file" className="item" />
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
          {errors.submit && <p className="error">{errors.submit}</p>}
          <div className="addclient-submit">
            <input
              type="submit"
              value="Create Client"
              // Disable button if there are errors
            />
          </div>
        </form>
      </div>
    </div>
  );
};
