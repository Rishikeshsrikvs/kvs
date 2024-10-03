import React, { useState } from "react";
import api from "../../api/api";
import { useAuth } from "../Auth/AuthContext";
import upload from "./../../assets/images/upload.png";
import { useNavigate } from "react-router-dom";

const Clientservice = () => {
  const { token } = useAuth();
  const [fileName, setFileName] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    client_name: "",
    client_email: "",
    client_mobile: "",
    client_Location: "",
    client_GST: "",
    client_govt_id: "",
    client_Plan: [], // This should be JSON in string format
    client_logo: null, // This will hold the uploaded file
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Reset error for the specific field
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: undefined, // Clear the error for the current field
    }));
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      client_logo: e.target.files[0], // Only one file (for logo)
    });
    setFileName(e.target.files[0]?.name || ""); // Update file name
  };

  const validateForm = () => {
    const newErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^[0-9]{10}$/;
    const gstPattern = /^[0-9]{15}$/;
    const govtIdPattern = /^[A-Z0-9]{8,12}$/; // Customize as needed

    if (!formData.client_name.trim())
      newErrors.client_name = "Client name is required.";
    if (!emailPattern.test(formData.client_email))
      newErrors.client_email = "Invalid email format.";
    if (!phonePattern.test(formData.client_mobile))
      newErrors.client_mobile = "Invalid phone number. Must be 10 digits.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form inputs
    if (!validateForm()) {
      return;
    }

    const data = new FormData();
    data.append("client_name", formData.client_name);
    data.append("client_logo", formData.client_logo); // Ensure file is uploaded
    data.append("client_email", formData.client_email);
    data.append("client_mobile", formData.client_mobile);
    data.append("client_Location", formData.client_Location);
    data.append("client_GST", formData.client_GST || ""); // Optional, but key must exist
    data.append("client_govt_id", formData.client_govt_id || ""); // Optional, but key must exist
    data.append("client_Plan", ""); // Needs to be stringified JSON if it's an array

    try {
      const response = await api.post(
        "/api/admin/clientSignUp",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Required for file uploads
            authorization: token,
          },
        }
      );
      if (response.status === 201) {
        // Navigate or success action
        navigate(`/admin/SHRA/dashboard/clients`);
      } else {
        setErrors({ api: "Failed to create client." });
      }
    } catch (error) {
      console.error(
        "Error creating client:",
        error.response ? error.response.data : error.message
      );
      setErrors({ api: "Error creating client." });
    }
  };

  return (
    <div className="addclientmaincontainer">
      <div className="adclientcontainer">
        <form onSubmit={handleSubmit}>
          <div className="addclient-title">
            <h1>ADD CLIENTS</h1>
          </div>
          <div className="addclient-inputs">
            <div className="inputcontainer">
              <label>Client Name:</label>
              <input
                type="text"
                name="client_name"
                value={formData.client_name}
                onChange={handleInputChange}
                required
              />
              {errors.client_name && (
                <p className="error">{errors.client_name}</p>
              )}
            </div>
            <div className="inputcontainer">
              <label>Email:</label>
              <input
                type="email"
                name="client_email"
                value={formData.client_email}
                onChange={handleInputChange}
                required
              />
              {errors.client_email && (
                <p className="error">{errors.client_email}</p>
              )}
            </div>
            <div className="inputcontainer">
              <label>Mobile:</label>
              <input
                type="text"
                name="client_mobile"
                value={formData.client_mobile}
                onChange={handleInputChange}
                required
              />
              {errors.client_mobile && (
                <p className="error">{errors.client_mobile}</p>
              )}
            </div>
            <div className="inputcontainer">
              <label>Location:</label>
              <input
                type="text"
                name="client_Location"
                value={formData.client_Location}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="inputcontainer">
              <label>GST:</label>
              <input
                type="text"
                name="client_GST"
                value={formData.client_GST}
                onChange={handleInputChange}
              />
              {errors.client_GST && (
                <p className="error">{errors.client_GST}</p>
              )}
            </div>
            <div className="inputcontainer">
              <label>Government ID:</label>
              <input
                type="text"
                name="client_govt_id"
                value={formData.client_govt_id}
                onChange={handleInputChange}
              />
              {errors.client_govt_id && (
                <p className="error">{errors.client_govt_id}</p>
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
                type="file"
                id="logo-upload"
                className="item"
                name="client_logo"
                onChange={handleFileChange}
                accept="image/*"
              />
            </div>
            <div className="addclient-submit">
              <input type="submit" />
            </div>
          </div>
        </form>
        {errors.api && <p className="error">{errors.api}</p>}{" "}
        {/* API error display */}
      </div>
    </div>
  );
};

export default Clientservice;

// import React, { useState } from "react";
// import axios from "axios";
// import { useAuth } from "../Auth/AuthContext";
// import upload from './../../assets/images/upload.png';

// const Clientservice = () => {
//   const { token } = useAuth();
//   const [fileName, setFileName] = useState('');
//   const [errors, setErrors] = useState({});
//   const [formData, setFormData] = useState({
//     client_name: "",
//     client_email: "",
//     client_mobile: "",
//     client_Location: "",
//     client_GST: "",
//     client_govt_id: "",
//     client_Plan: [], // This should be JSON in string format
//     client_logo: null, // This will hold the uploaded file
//   });

//   // Handle input change
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   // Handle file change and display file name
//   const handleFileChange = (e) => {
//     setFormData({
//       ...formData,
//       client_logo: e.target.files[0], // Only one file (for logo)
//     });
//     setFileName(e.target.files[0]?.name || ''); // Update file name
//   };

//   // Validation logic
//   const validateForm = () => {
//     const newErrors = {};
//     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     const phonePattern = /^[0-9]{10}$/;
//     const gstPattern = /^[0-9]{15}$/;
//     const govtIdPattern = /^[A-Z0-9]{8,12}$/; // Customize as needed

//     if (!formData.client_name.trim()) newErrors.client_name = "Client name is required.";
//     if (!emailPattern.test(formData.client_email)) newErrors.client_email = "Invalid email format.";
//     if (!phonePattern.test(formData.client_mobile)) newErrors.client_mobile = "Invalid phone number. Must be 10 digits.";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validate form inputs
//     if (!validateForm()) {
//       return;
//     }

//     const data = new FormData();
//     data.append("client_name", formData.client_name);
//     data.append("client_logo", formData.client_logo); // Ensure file is uploaded
//     data.append("client_email", formData.client_email);
//     data.append("client_mobile", formData.client_mobile);
//     data.append("client_Location", formData.client_Location);
//     data.append("client_GST", formData.client_GST || ""); // Optional, but key must exist
//     data.append("client_govt_id", formData.client_govt_id || ""); // Optional, but key must exist
//     data.append("client_Plan", formData.client_Plan); // Needs to be stringified JSON if it's an array

//     try {
//       const response = await axios.post(
//         "https://srikvstech-yaj97.ondigitalocean.app/api/admin/clientSignUp",
//         data,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data", // Required for file uploads
//             authorization: token,
//           },
//         }
//       );
//       if (response.status === 201) {
//         // Navigate or success action
//         navigate(`/admin/SHRA/dashboard/clients`);
//       } else {
//         setErrors({ api: "Failed to create client." });
//       }
//     } catch (error) {
//       console.error(
//         "Error creating client:",
//         error.response ? error.response.data : error.message
//       );
//       setErrors({ api: "Error creating client." });
//     }
//   };

//   return (
//     <div className="addclientmaincontainer">
//       <div className="adclientcontainer">
//         <form onSubmit={handleSubmit}>
//           <div className="addclient-title">
//             <h1>ADD CLIENTS</h1>
//           </div>
//           <div className="addclient-inputs">
//             <div className="inputcontainer">
//               <label>Client Name:</label>
//               <input
//                 type="text"
//                 name="client_name"
//                 value={formData.client_name}
//                 onChange={handleInputChange}
//                 required
//               />
//               {errors.client_name && <p className="error">{errors.client_name}</p>}
//             </div>
//             <div className="inputcontainer">
//               <label>Email:</label>
//               <input
//                 type="email"
//                 name="client_email"
//                 value={formData.client_email}
//                 onChange={handleInputChange}
//                 required
//               />
//               {errors.client_email && <p className="error">{errors.client_email}</p>}
//             </div>
//             <div className="inputcontainer">
//               <label>Mobile:</label>
//               <input
//                 type="text"
//                 name="client_mobile"
//                 value={formData.client_mobile}
//                 onChange={handleInputChange}
//                 required
//               />
//               {errors.client_mobile && <p className="error">{errors.client_mobile}</p>}
//             </div>
//             <div className="inputcontainer">
//               <label>Location:</label>
//               <input
//                 type="text"
//                 name="client_Location"
//                 value={formData.client_Location}
//                 onChange={handleInputChange}
//                 required
//               />
//             </div>
//             <div className="inputcontainer">
//               <label>GST:</label>
//               <input
//                 type="text"
//                 name="client_GST"
//                 value={formData.client_GST}
//                 onChange={handleInputChange}
//               />
//               {errors.client_GST && <p className="error">{errors.client_GST}</p>}
//             </div>
//             <div className="inputcontainer">
//               <label>Government ID:</label>
//               <input
//                 type="text"
//                 name="client_govt_id"
//                 value={formData.client_govt_id}
//                 onChange={handleInputChange}
//               />
//               {errors.client_govt_id && <p className="error">{errors.client_govt_id}</p>}
//             </div>
//             <div className="inputcontainer">
//               <label htmlFor="logo-upload" className="item logolabel">
//                 Client Logo:
//                 <span>
//                   <img src={upload} alt="Upload" />
//                   <h5>Upload</h5>
//                   <p className="file-name">{fileName}</p> {/* Display selected file name */}
//                 </span>
//               </label>
//               <input
//                 type="file"
//                 id="logo-upload"
//                 className="item"
//                 name="client_logo"
//                 onChange={handleFileChange}
//                 accept="image/*"
//               />
//             </div>
//             <div className="addclient-submit">
//               <input type="submit" />
//             </div>
//           </div>
//         </form>
//         {errors.api && <p className="error">{errors.api}</p>} {/* API error display */}
//       </div>
//     </div>
//   );
// };

// export default Clientservice;
