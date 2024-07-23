import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import "./Clientservice.css";

export const Clientservice = () => {
  const { id } = useParams(); // Get client ID from URL parameters
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    services: [],
    quality: '',
    package: '',
    discount: ''
  });
  const [error, setError] = useState('');
  const [clientData, setClientData] = useState(null);

  const servicesList = [
    "Social Media Marketing",
    "SEO Optimization",
    "Email Marketing",
    "Content Creation",
    "Web Development"
  ];

  useEffect(() => {
    if (id) {
      const fetchClientData = async () => {
        try {
          const response = await axios.get(`http://localhost:3500/clients/${id}`);
          setClientData(response.data);
          // Pre-fill the form with client data
          setFormData({
            services: response.data.services || [],
            quality: response.data.quality || '',
            package: response.data.package || '',
            discount: response.data.discount || ''
          });
        } catch (error) {
          setError('Error fetching client data.');
          console.error('Error:', error);
        }
      };

      fetchClientData();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      if (checked) {
        setFormData(prevData => ({
          ...prevData,
          services: [...prevData.services, value]
        }));
      } else {
        setFormData(prevData => ({
          ...prevData,
          services: prevData.services.filter(service => service !== value)
        }));
      }
    } else {
      setFormData(prevData => ({
        ...prevData,
        [name]: value
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
      // Merge existing client data with new form data
      const updatedData = {
        ...clientData,
        services: formData.services,
        quality: formData.quality,
        package: formData.package,
        discount: formData.discount
      };

      // Update existing client service data
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
    const { services, quality, package: packageName, discount } = formData;
    if (services.length === 0 || !quality || !packageName || !discount) {
      return false;
    }
    return true;
  };

  if (!clientData && id) {
    return <div>Loading...</div>;
  }

  return (
    <div className='Clientservicemaincontainer'>
      <div className="title">
        <span>Main page</span>
      </div>
      <div className="Clientservicecontainer">
        <form onSubmit={handleSubmit}>
          <div className="Clientservice-title">
            <h1>Service and Package</h1>
          </div>
          <div className='service1'>
            <div className="service1left">
              <h4>Services</h4>
              <div className="checkcontainer">
                {servicesList.map((service, index) => (
                  <div key={index} className="serinput">
                    <input
                      type="checkbox"
                      value={service}
                      checked={formData.services.includes(service)}
                      onChange={handleChange}
                    />
                    <label>{service}</label>
                  </div>
                ))}
              </div>
              <div className="quality">
                <input
                  type="text"
                  placeholder='Quality'
                  name='quality'
                  value={formData.quality}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="service1right">
              <select
                name="package"
                id="package"
                value={formData.package}
                onChange={handleChange}
              >
                <option value="">Select Package</option>
                <option value="Elite">Elite</option>
                <option value="Pro">Pro</option>
                <option value="Standard">Standard</option>
              </select>
              <div className="discount">
                <input
                  type="text"
                  placeholder='Discount'
                  name='discount'
                  value={formData.discount}
                  onChange={handleChange}
                />
              </div>
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
