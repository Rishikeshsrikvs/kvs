import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../Auth/AuthContext';
import "./Clientservice.css";

export const ClientserviceEdit = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const { clientId } = useParams();

  
  
  const [formData, setFormData] = useState({
    services: [],
    gst: '',
    clientLogoKey: '',
    email: '',
    phone: '',
    location: '',
    adharNumber: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        const response = await api.get(`/api/admin/getClient/${clientId}`, {
          headers: { authorization: `${token}` },
        });
    
        // Access clientDetailes from response.data
        const clientData = response.data.clientDetailes || {};
    
        setFormData({
          services: clientData.client_Plan || [],
          gst: clientData.client_GST || '',
          clientLogoKey: clientData.client_logo || '',
          email: clientData.client_email || '',
          phone: clientData.client_mobile || '',
          location: clientData.client_Location || '',
          adharNumber: clientData.client_govt_id || '',
        });
      } catch (error) {
        console.error('Error fetching client data:', error);
        setError('Failed to load client data.');
      }
    };
    

    fetchClientData();
  }, [clientId, token]);

  const servicesList = [
    // List of services
    {
      name: "Social Media Marketing",
      packages: [{ name: "Elite" }, { name: "Pro" }, { name: "Standard" }]
    },
    {
      name: "Search Engine Optimization",
      packages: [{ name: "Elite" }, { name: "Pro" }, { name: "Standard" }]
    },
    {
      name: "Web Development",
      packages: [
        { name: "Static Plan" }, { name: "Static Plus Plan" }, { name: "Static Standard" },
        { name: "Standard Plan" }, { name: "Standard Plus Plan" }, { name: "Premium Plan" },
        { name: "Exclusive Plan" }, { name: "Customised Plan" }
      ]
    }
  ];

  const handleServiceChange = (index, e) => {
    const { name, value } = e.target;
    const updatedServices = formData.services.map((service, i) =>
      i === index ? { ...service, [name]: value } : service
    );
    setFormData({ ...formData, services: updatedServices });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setFormData(prevData => ({
        ...prevData,
        services: [...prevData.services, { name: value, package: '', amount: '' }]
      }));
    } else {
      setFormData(prevData => ({
        ...prevData,
        services: prevData.services.filter(service => service.name !== value)
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setError('Please fill out all fields correctly.');
      return;
    }
  
    const clientData = {
      client_Plan: formData.services.map(service => ({
        name: service.name,
        package: service.package,
        price: service.amount // Use the manually entered amount
      })),
      client_GST: formData.gst,
      client_logo: formData.clientLogoKey,
      client_email: formData.email,
      client_mobile: formData.phone,
      client_Location: formData.location,
      client_govt_id: formData.adharNumber,
      client_id:clientId,
    };
  
    try {
      const response = await api.put(`/api/admin/clientUpdate`, 
        clientData,
        {
          headers: { 'authorization': `${token}` },
        }
      );
     
      
      if (response.status === 200) {
        navigate(`/admin/SHRA/invoice`, { state: { client_id: clientId } });
      } else {
        setError('Failed to update client.');
      }
    } catch (error) {
      setError('Error connecting to server.');
      console.error('Error:', error);
    }
  };
  

  const validateForm = () => {
    const { services } = formData;
    if (services.length === 0) {
      return false;
    }
    for (const service of services) {
      if (!service.package || !service.amount) {
        return false;
      }
    }
    return true;
  };

  return (
    <div className='Clientservicemaincontainer'>
      <div className="Clientservicecontainer">
        <form onSubmit={handleSubmit}>
          <div className="Clientservice-title">
            <h1>Edit Client Services and Package</h1>
          </div>
          <div className="client-name">
            <h2>Client Id: {clientId}</h2> {/* Display client name */}
          </div>
          <div className='service1'>
            <div className="service1left">
              <h4>Services</h4>
              <div className="checkcontainer">
                {servicesList.map((service, index) => (
                  <div key={index} className="serinput">
                    <input
                      type="checkbox"
                      value={service.name}
                      checked={formData.services.some(s => s.name === service.name)}
                      onChange={handleCheckboxChange}
                    />
                    <label>{service.name}</label>
                  </div>
                ))}
              </div>
            </div>
            <div className="service1right">
              {formData.services.map((service, index) => (
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
                          {servicesList.find(s => s.name === service.name).packages.map((pkg, idx) => (
                            <option key={idx} value={pkg.name}>{pkg.name}</option>
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
              ))}
            </div>
          </div>
          {error && <p className="error">{error}</p>}
          <div className="generate">
            <button type="submit">Update and Generate Invoice</button>
          </div>
        </form>
      </div>
    </div>
  );
};
