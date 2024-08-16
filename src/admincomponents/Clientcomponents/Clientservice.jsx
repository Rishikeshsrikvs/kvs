import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../Auth/AuthContext';
import "./Clientservice.css";

export const Clientservice = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  
  
  const location = useLocation();
  
  // Retrieve client details from location state
  const clientDetails = location.state?.clientDetails || {};
  const {
    client_name = '',
    client_logo = '',
    client_email = '',
    client_mobile = '',
    client_Location = '',
    client_govt_id = '',
    client_Plan = [],
    client_GST = ''
  } = clientDetails;

  const [formData, setFormData] = useState({
    services: client_Plan,
    gst: client_GST,
    clientLogoKey: client_logo,
    email: client_email,
    phone: client_mobile,
    location: client_Location,
    adharNumber: client_govt_id,
  });
  const [error, setError] = useState('');

  const servicesList = [
    {
      name: "Social Media Marketing",
      packages: [
        { name: "Elite" },
        { name: "Pro" },
        { name: "Standard" }
      ]
    },
    {
      name: "Search Engine Optimization",
      packages: [
        { name: "Elite" },
        { name: "Pro" },
        { name: "Standard" }
      ]
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
        { name: "Customised Plan" }
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
      client_name: client_name,
      client_logo: formData.clientLogoKey,
      client_email: formData.email,
      client_mobile: formData.phone,
      client_Location: formData.location,
      client_govt_id: formData.adharNumber,
      client_Plan: formData.services.map(service => ({
        name: service.name,
        package: service.package,
        price: service.amount // Use the manually entered amount
      })),
      client_GST: formData.gst
    };
    console.log('Client Data:', clientData);
    
    try {
      const response = await axios.post('https://srikvs.onrender.com/api/admin/clientSignUp', 
        clientData,
        {
          headers: {
            'authorization': `${token}`,
          },
        }
      );
      console.log(response);
      
      //for  checking
      // navigate(`/admin/invoice`, { state: { clientdata: clientData, discount: formData.discount } });


      if (response.status === 201) {
        console.log(response.data.client_id);
         navigate(`/admin/invoice`, { state: { client_id: response.data.client_id, discount: formData.discount } });
       
      } else {
        setError('Failed to create client.');
      }
    } catch (error) {
      setError('Error connecting to server.');
      console.error('Error:', error);
    }
  };

  const validateForm = () => {
    const { services, discount, email, phone, location, adharNumber } = formData;
    if (!email || !phone || !location || !adharNumber || services.length === 0 || !discount) {
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
            <h1>Service and Package</h1>
          </div>
          <div className="client-name">
            <h2>Client: {client_name}</h2>
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
              <div className="discount">
                <input
                  type="text"
                  placeholder='Discount'
                  name='discount'
                  value={formData.discount}
                  onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                />
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
            <button type="submit">Generate</button>
          </div>
        </form>
      </div>
    </div>
  );
};
