import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Addclient.css";
import { useAuth } from "../Auth/AuthContext";
import upload from "./../../assets/images/upload.png";

export const Addclient = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [formData, setFormData] = useState({
    clientName: "",
    location: "",
    email: "",
    phone: "",
    gstNo: "",
    adharNumber: "",
    clientLogo: null, // To store the selected file directly
  });
  const [errors, setErrors] = useState({});
  const [fileName, setFileName] = useState("");
  const [fileError, setFileError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    validateField(name, value);
  };

  const handleLogo = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 1 * 1024 * 1024) {
        setFileError("File size exceeds 1 MB.");
        setFileName("");
        setFormData({
          ...formData,
          clientLogo: null,
        });
      } else {
        setFileError("");
        setFileName(file.name);
        setFormData({
          ...formData,
          clientLogo: file, // Store the actual file object
        });
      }
    } else {
      setFileError("");
      setFileName("");
      setFormData({
        ...formData,
        clientLogo: null,
      });
    }
  };

  const validateField = (name, value) => {
    let newErrors = { ...errors };
    switch (name) {
      case "clientName":
        newErrors.clientName = value ? "" : "Client Name is required.";
        break;
      case "location":
        newErrors.location = value ? "" : "Location is required.";
        break;
      case "phone":
        newErrors.phone =
          value.length === 10 ? "" : "Phone Number should be 10 digits.";
        break;
      default:
        break;
    }
    setErrors(newErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Pass the client details including the file object to the next component
    navigate("/admin/SHRA/clientservice", {
      state: {
        clientDetails: {
          client_name: formData.clientName,
          client_logo: formData.clientLogo, // Pass the file object here
          client_email: formData.email,
          client_mobile: formData.phone,
          client_Location: formData.location,
          client_govt_id: formData.adharNumber,
          client_Plan: [],
          client_GST: formData.gstNo,
        },
      },
    });
  };

  const validateForm = () => {
    const newErrors = {};
    const { clientName, location, phone } = formData;

    if (!clientName) newErrors.clientName = "Client Name is required.";
    if (!location) newErrors.location = "Location is required.";
    if (!phone || phone.length !== 10)
      newErrors.phone = "Phone Number should be 10 digits.";

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
              {errors.clientName && (
                <p className="error">{errors.clientName}</p>
              )}
            </div>
            <div className="inputcontainer">
              <label htmlFor="logo-upload" className="item logolabel">
                Client Logo:
                <span>
                  <img src={upload} alt="Upload" />
                  <h5>Upload</h5>
                  <p className="file-name">{fileName}</p>
                </span>
              </label>
              <input
                id="logo-upload"
                type="file"
                className="item"
                onChange={handleLogo}
              />
              {fileError && <p className="error">{fileError}</p>}
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
                placeholder="Aadhar No"
                className="item"
                name="adharNumber"
                value={formData.adharNumber}
                onChange={handleChange}
              />
              {errors.adharNumber && (
                <p className="error">{errors.adharNumber}</p>
              )}
            </div>
            <div className="addclient-submit">
              <input type="submit" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
