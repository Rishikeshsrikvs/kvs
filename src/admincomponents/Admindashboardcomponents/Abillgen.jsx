import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Abillgen.css';

const Abillgen = () => {
  const [paymentMode, setPaymentMode] = useState('');
  const [accountType, setAccountType] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientLocation, setClientLocation] = useState('');
  const [clientGST, setClientGST] = useState('');
  const [clientMobile, setClientMobile] = useState('');
  const [serviceDetails, setServiceDetails] = useState([{ name: '', package: '', price: '' }]);
  const navigate = useNavigate();

  const handlePaymentModeChange = (e) => {
    setPaymentMode(e.target.value);
    setAccountType('');
    setAccountNumber('');
    setRollNumber('');
  };

  const handleAccountTypeChange = (e) => {
    setAccountType(e.target.value);
    setAccountNumber('');
  };

  const handleServiceChange = (index, field, value) => {
    const updatedServices = [...serviceDetails];
    updatedServices[index][field] = value;
    setServiceDetails(updatedServices);
  };

  const addService = () => {
    setServiceDetails([...serviceDetails, { name: '', package: '', price: '' }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      (paymentMode === 'online' && accountType === 'kvs') ||
      (paymentMode === 'online' && accountType === 'other' && accountNumber) ||
      (paymentMode === 'cash' && rollNumber)
    ) {
      navigateToBillPage();
    } else {
      alert('Please fill out all required fields.');
    }
  };

  const navigateToBillPage = () => {
    navigate('/admin/SHRA/finalbillmanual', {
      state: {
        paymentMode,
        accountType,
        accountNumber,
        rollNumber,
        clientName,
        clientLocation,
        clientGST,
        clientMobile,
        serviceDetails,
      },
    });
  };

  return (
    <div className='bgcon'>
      <h1>BILL GENERATION</h1>
      <form onSubmit={handleSubmit}>
        <h2>Client Information</h2>
        <label>
          Client Name:
          <input type='text' value={clientName} onChange={(e) => setClientName(e.target.value)} required />
        </label>
        <label>
          Client Location:
          <input type='text' value={clientLocation} onChange={(e) => setClientLocation(e.target.value)} required />
        </label>
        <label>
          Client GST:
          <input type='text' value={clientGST} onChange={(e) => setClientGST(e.target.value)} required />
        </label>
        <label>
          Client Mobile:
          <input type='text' value={clientMobile} onChange={(e) => setClientMobile(e.target.value)} required />
        </label>

        <h2>Service Details</h2>
        {serviceDetails.map((service, index) => (
          <div key={index} className="service-details">
            <label>
              Service Name:
              <input
                type='text'
                value={service.name}
                onChange={(e) => handleServiceChange(index, 'name', e.target.value)}
                required
              />
            </label>
            <label>
              Package:
              <input
                type='text'
                value={service.package}
                onChange={(e) => handleServiceChange(index, 'package', e.target.value)}
                required
              />
            </label>
            <label>
              Price:
              <input
                type='number'
                value={service.price}
                onChange={(e) => handleServiceChange(index, 'price', e.target.value)}
                required
              />
            </label>
          </div>
        ))}
        <button type="button" onClick={addService}>Add Another Service</button>

        <h2>Payment Information</h2>
        <label>
          Select Payment Mode:
          <select value={paymentMode} onChange={handlePaymentModeChange}>
            <option value=''>-- Select Payment Mode --</option>
            <option value='cash'>Cash</option>
            <option value='online'>Online</option>
          </select>
        </label>

        {paymentMode === 'online' && (
          <label>
            Select Account Type:
            <select value={accountType} onChange={handleAccountTypeChange}>
              <option value=''>-- Select Account Type --</option>
              <option value='kvs'>KVS</option>
              <option value='other'>Other</option>
            </select>
          </label>
        )}
        {paymentMode === 'online' && accountType === 'other' && (
          <label>
            Account Number:
            <input
              type='text'
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              required
            />
          </label>
        )}
        {paymentMode === 'cash' && (
          <label>
            Roll Number:
            <input
              type='text'
              value={rollNumber}
              onChange={(e) => setRollNumber(e.target.value)}
              required
            />
          </label>
        )}

        <button type='submit' className='generate-bill-button'>Generate Bill</button>
      </form>
    </div>
  );
};

export default Abillgen;
