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
    adharNumber: '',
    paymentMode: '',
    paymentRefNo: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setError('Please fill out all fields correctly.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3500/clients', formData);
      if (response.status === 201) {
        navigate(`/admin/response&package/${response.data.id}`);
      } else {
        setError('Failed to create client.');
      }
    } catch (error) {
      setError('Error connecting to server.');
      console.error('Error:', error);
    }
  };

  const validateForm = () => {
    const { clientName, location, email, gstNo, phone, adharNumber, paymentMode, paymentRefNo } = formData;
    if (!clientName || !location || !email || !gstNo || !phone || !adharNumber || !paymentMode || !paymentRefNo) {
      return false;
    }
    return true;
  };

  return (
    <div className="addclientmaincontainer">
      <div className="title">
        <span>Main page</span>
      </div>
      <div className="adclientcontainer">
        <form onSubmit={handleSubmit}>
          <div className="addclient-title">
            <h1>ADD CLIENTS</h1>
          </div>
          <div className="addclient-inputs">
            <input
              type="text"
              placeholder="Client Name"
              className="item"
              name="clientName"
              value={formData.clientName}
              onChange={handleChange}
            />
            <label htmlFor="logo-upload" className="item logolabel">
              Client Logo:
              <span>
                <img src={upload} alt="" /> <h5>Upload</h5>
              </span>
            </label>
            <input id="logo-upload" type="file" className="item" />
            <input
              type="text"
              placeholder="Location"
              className="item"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="Email"
              className="item"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="GST No"
              className="item"
              name="gstNo"
              value={formData.gstNo}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Phone Number"
              className="item"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Aadhar Number"
              className="item"
              name="adharNumber"
              value={formData.adharNumber}
              onChange={handleChange}
            />
          </div>
          <div className="addclient-paymentcontainer">
            <label htmlFor="PaymentType">Payment Mode</label>
            <button type="button" onClick={() => setFormData({ ...formData, paymentMode: 'Cash' })}>
              Cash
            </button>
            <button type="button" onClick={() => setFormData({ ...formData, paymentMode: 'Online' })}>
              Online
            </button>
          </div>
          <div className="paymentref">
            <label htmlFor="paymentRefNo">Payment Reference No:</label>
            <input
              type="text"
              placeholder="Number"
              className="item"
              name="paymentRefNo"
              value={formData.paymentRefNo}
              onChange={handleChange}
            />
          </div>
          {error && <p className="error">{error}</p>}
          <div className="addclient-submit">
            <input type="submit" value="Create Client" />
          </div>
        </form>
      </div>
    </div>
  );
};
