import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Abillinvoice.css';

const Abillinvoice = () => {
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [paymentMode, setPaymentMode] = useState('');
  const [accountType, setAccountType] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const navigate = useNavigate();

  const handlePaymentModeChange = (e) => {
    setPaymentMode(e.target.value);
    // Reset dependent fields when payment mode changes
    setAccountType('');
    setAccountNumber('');
    setRollNumber('');
  };

  const handleAccountTypeChange = (e) => {
    setAccountType(e.target.value);
    setAccountNumber('');
  };

  const handleSubmit = () => {
    // Ensure required fields are filled based on conditions
    if (
      invoiceNumber &&
      (paymentMode === 'online' && accountType === 'kvs') ||
      (paymentMode === 'online' && accountType === 'other' && accountNumber) ||
      (paymentMode === 'cash' && rollNumber)
    ) {
      // Navigate and pass state to the final bill page
      navigate('/admin/SHRA/finalbill', {
        state: {
          invoiceNumber,
          paymentMode,
          accountType,
          accountNumber,
          rollNumber
        },
      });
    } else {
      alert('Please fill out all required fields.');
    }
  };

  return (
    <div className='billincon'>
      <h1>INVOICE BILL GENERATION</h1>
      <div className='billinput'> 
        <input 
          type="text" 
          value={invoiceNumber}
          onChange={(e) => setInvoiceNumber(e.target.value)} 
          placeholder="Enter Invoice Number"
        />
      </div>
      <div className="billinput">
        <label>
          Select Payment Mode:
          <select value={paymentMode} onChange={handlePaymentModeChange}>
            <option value=''>-- Select Payment Mode --</option>
            <option value='cash'>Cash</option>
            <option value='online'>Online</option>
          </select>
        </label>
        </div>

        {paymentMode === 'online' && (
          <div className="billinput">
          <label>
            Select Account Type:
            <select value={accountType} onChange={handleAccountTypeChange}>
              <option value=''>-- Select Account Type --</option>
              <option value='kvs'>KVS</option>
              <option value='other'>Other</option>
            </select>
          </label>
          </div>
        )}

        {paymentMode === 'online' && accountType === 'other' && (
          <div className="billinput">
          <label>
            Account Name:
            <input
              type='text'
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              required
            />
          </label>
          </div>
        )}

        {paymentMode === 'cash' && (
          <div className="billinput">
          <label>
            Payment Reference Number:
            <input
              type='text'
              value={rollNumber}
              onChange={(e) => setRollNumber(e.target.value)}
              required
            />
          </label>
          </div>
        )}
        <div className="billinput">
        <button onClick={handleSubmit}>SUBMIT</button>
        </div>
      
    </div>
  );
};

export default Abillinvoice;
