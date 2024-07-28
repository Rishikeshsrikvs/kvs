import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import "./Clientservice.css";

export const Clientservice = () => {
  const { id } = useParams(); // Get client ID from URL parameters
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    services: [],
    discount: '',
  });
  const [error, setError] = useState('');
  const [clientData, setClientData] = useState(null);
  const [clientName, setClientName] = useState(''); // State for client name

  const servicesList = [
    {
      name: "Social Media Marketing",
      packages: [
        { name: "Elite", amount: 1000 },
        { name: "Pro", amount: 800 },
        { name: "Standard", amount: 600 }
      ]
    },
    {
      name: "Search Engine Optimization",
      packages: [
        { name: "Elite", amount: 900 },
        { name: "Pro", amount: 700 },
        { name: "Standard", amount: 500 }
      ]
    },
    {
      name: "Web Development",
      packages: [
        { name: "Static Plan", amount: 1200 },
        { name: "Static Plus Plan", amount: 1400 },
        { name: "Static Standard", amount: 1600 },
        { name: "Standard Plan", amount: 1800 },
        { name: "Standard Plus Plan", amount: 2000 },
        { name: "Premium Plan", amount: 2200 },
        { name: "Exclusive Plan", amount: 2400 },
        { name: "Customised Plan", amount: 2600 }
      ]
    }
  ];

  useEffect(() => {
    if (id) {
      const fetchClientData = async () => {
        try {
          const response = await axios.get(`http://localhost:3500/clients/${id}`);
          setClientData(response.data);
          setFormData({
            services: response.data.services || [],
            discount: response.data.discount || ''
          });
          setClientName(response.data.name || ''); // Set the client name
        } catch (error) {
          setError('Error fetching client data.');
          console.error('Error:', error);
        }
      };

      fetchClientData();
    }
  }, [id]);

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
        services: [...prevData.services, { name: value, quantity: '', package: '' }]
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

    try {
      const updatedData = {
        ...clientData,
        services: formData.services,
        discount: formData.discount
      };

      const response = await axios.put(`http://localhost:3500/clients/${id}`, updatedData);
      if (response.status === 200) {
        navigate(`/admin/invoice/${id}`);
      } else {
        setError('Failed to update client service.');
      }
    } catch (error) {
      setError('Error connecting to server.');
      console.error('Error:', error);
    }
  };

  const validateForm = () => {
    const { services, discount } = formData;
    if (services.length === 0 || !discount) {
      return false;
    }
    for (const service of services) {
      if (!service.quantity || !service.package) {
        return false;
      }
    }
    return true;
  };

  const getPackagePrice = (serviceName, packageName) => {
    const service = servicesList.find(s => s.name === serviceName);
    if (service) {
      const selectedPackage = service.packages.find(p => p.name === packageName);
      return selectedPackage ? selectedPackage.amount : '';
    }
    return '';
  };

  if (!clientData && id) {
    return <div>Loading...</div>;
  }

  return (
    <div className='Clientservicemaincontainer'>
      <div className="Clientservicecontainer">
        <form onSubmit={handleSubmit}>
          <div className="Clientservice-title">
            <h1>Service and Package</h1>
          </div>
          <div className="client-name">
            <h2>Client: {clientName}</h2> {/* Display the client name */}
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
                      <input
                        type="text"
                        placeholder='Quantity'
                        name='quantity'
                        value={service.quantity}
                        onChange={(e) => handleServiceChange(index, e)}
                      />
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
                        <span className="package-price">
                          {getPackagePrice(service.name, service.package)}
                        </span>
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
