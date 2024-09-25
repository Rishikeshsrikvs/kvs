import React, { useState, useEffect } from "react";
import api from "../../api/api";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../Auth/AuthContext";
import "./Clientserviceedit.css";
import upload from "./../../assets/images/upload.png";

export const ClientserviceEdit = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const { clientId } = useParams();

  const [formData, setFormData] = useState({
    clientName: "",
    clientLogoKey: "",
    email: "",
    phone: "",
    location: "",
    adharNumber: "",
    gst: "",
    services: [],
  });

  const [fileError, setFileError] = useState("");
  const [error, setError] = useState("");
  const [originalData, setOriginalData] = useState({});

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        const response = await api.get(`/api/admin/getClient/${clientId}`, {
          headers: { authorization: `${token}` },
        });

        const clientData = response.data.clientDetailes || {};
        const initialData = {
          clientName: clientData.client_name || "",
          clientLogoKey: clientData.client_logo || "",
          email: clientData.client_email || "",
          phone: clientData.client_mobile || "",
          location: clientData.client_Location || "",
          adharNumber: clientData.client_govt_id || "",
          gst: clientData.client_GST || "",
          services: clientData.client_Plan || [],
        };

        setFormData(initialData);
        setOriginalData(initialData);
      } catch (error) {
        console.error("Error fetching client data:", error);
        setError("Failed to load client data.");
      }
    };

    fetchClientData();
  }, [clientId, token]);

  const servicesList = [
    {
      name: "Social Media Marketing",
      packages: [{ name: "Elite" }, { name: "Pro" }, { name: "Standard" }],
    },
    {
      name: "Search Engine Optimization",
      packages: [{ name: "Elite" }, { name: "Pro" }, { name: "Standard" }],
    },
    {
      name: "Web Development",
      packages: [
        { name: "Static Plan" },
        { name: "Static Plus Plan" },
        { name: "Static Standard" },
        { name: "Standard Plan" },
        { name: "Standard Plus Plan" },
        { name: "Premium Plan" },
        { name: "Exclusive Plan" },
        { name: "Customised Plan" },
      ],
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleServiceChange = (index, e) => {
    const { name, value } = e.target;
    const updatedServices = formData.services.map((service, i) =>
      i === index ? { ...service, [name]: value } : service
    );
    setFormData({ ...formData, services: updatedServices });
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 1 * 1024 * 1024) {
        setFileError("File size exceeds 1 MB.");
        setFormData({ ...formData, clientLogoKey: "" });
      } else {
        setFileError("");
        setFormData({ ...formData, clientLogoKey: file });
      }
    }
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setFormData((prevData) => ({
        ...prevData,
        services: [
          ...prevData.services,
          { name: value, package: "", amount: "" },
        ],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        services: prevData.services.filter((service) => service.name !== value),
      }));
    }
  };

  const validateFormData = () => {
    if (JSON.stringify(formData) === JSON.stringify(originalData)) {
      setError("No changes were made to update.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateFormData()) {
      return;
    }

    const clientData = {
      client_name: formData.clientName || undefined,
      client_logo: formData.clientLogoKey || undefined,
      client_email: formData.email || undefined,
      client_mobile: formData.phone || undefined,
      client_Location: formData.location || undefined,
      client_govt_id: formData.adharNumber || undefined,
      client_GST: formData.gst || undefined,
      client_Plan: formData.services.map((service) => ({
        name: service.name,
        package: service.package || undefined,
        price: service.amount || undefined,
      })),
      client_id: clientId,
    };

    try {
      const response = await api.put(
        `/api/admin/clientUpdate/${clientId}`,
        clientData,
        {
          headers: { authorization: token },
          "Content-Type": "multipart/form-data",
        }
      );

      if (response.status === 200) {
        navigate(`/admin/SHRA/invoice`, { state: { client_id: clientId } });
      } else {
        setError("Failed to update client.");
      }
    } catch (error) {
      setError("Error connecting to server.");
      console.error("Error:", error);
    }
  };

  return (
    <div className="Clientservicemaincontainer">
      <div className="Clientservicecontainer">
        <form onSubmit={handleSubmit}>
          <div className="Clientservice-title">
            <h1>Edit Client Services and Package</h1>
          </div>

          <div className="inputcontainer">
            <input
              type="text"
              placeholder="Client Name"
              name="clientName"
              value={formData.clientName}
              onChange={handleChange}
            />
          </div>

          <div className="inputcontainer">
            <label htmlFor="logo-upload" className="item logolabel">
              Client Logo:
              <span>
                <img src={upload} alt="Upload" />
                <h5>Upload</h5>
              </span>
            </label>
            <input id="logo-upload" type="file" onChange={handleLogoChange} />
            {formData.clientLogoKey && <p>{formData.clientLogoKey.name}</p>}
          </div>

          <div className="inputcontainer">
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="inputcontainer">
            <input
              type="text"
              placeholder="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="inputcontainer">
            <input
              type="text"
              placeholder="Location"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
          </div>

          <div className="inputcontainer">
            <input
              type="text"
              placeholder="Aadhar No"
              name="adharNumber"
              value={formData.adharNumber}
              onChange={handleChange}
            />
          </div>

          <div className="inputcontainer">
            <input
              type="text"
              placeholder="GST No"
              name="gst"
              value={formData.gst}
              onChange={handleChange}
            />
          </div>

          <div className="service1">
            <div className="service1left">
              <h4>Services</h4>
              <div className="checkcontainer">
                {servicesList.map((service, index) => (
                  <div key={index} className="serinput">
                    <input
                      type="checkbox"
                      value={service.name}
                      checked={formData.services.some(
                        (s) => s.name === service.name
                      )}
                      onChange={handleCheckboxChange}
                    />
                    <label>{service.name}</label>
                  </div>
                ))}
              </div>
            </div>

            <div className="service1right">
              {formData.services.map(
                (service, index) =>
                  service.name && (
                    <div key={index} className="service-details">
                      <h5>{service.name}</h5>
                      <div className="serviceselect">
                        <div className="package-select">
                          <select
                            name="package"
                            value={service.package}
                            onChange={(e) => handleServiceChange(index, e)}
                          >
                            <option value="">Select Package</option>
                            {servicesList
                              .find((s) => s.name === service.name)
                              .packages.map((pkg, idx) => (
                                <option key={idx} value={pkg.name}>
                                  {pkg.name}
                                </option>
                              ))}
                          </select>
                          <input
                            type="text"
                            name="amount"
                            placeholder="Amount"
                            value={service.amount}
                            onChange={(e) => handleServiceChange(index, e)}
                          />
                        </div>
                      </div>
                    </div>
                  )
              )}
            </div>
          </div>

          {error && <p className="error">{error}</p>}

          <div className="Clientservicebuttoncontainer">
            <button type="submit" className="btn btn-primary">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClientserviceEdit;
