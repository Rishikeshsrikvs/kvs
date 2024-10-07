import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Abillgen.css';

const Abillgen = () => {
  const [paymentMode, setPaymentMode] = useState('');
  const [accountType, setAccountType] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const navigate = useNavigate();

  const handlePaymentModeChange = (e) => {
    setPaymentMode(e.target.value);
    // Reset the dependent states when payment mode changes
    setAccountType('');
    setAccountNumber('');
    setRollNumber('');
  };

  const handleAccountTypeChange = (e) => {
    setAccountType(e.target.value);
    setAccountNumber('');
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
    // Pass the state to the Bill page
    navigate('/bill', {
      state: {
        paymentMode,
        accountType,
        accountNumber,
        rollNumber,
      },
    });
  };

  return (
    <div className='bgcon'>
      <h1>BILL GENERATION</h1>
      <form onSubmit={handleSubmit}>
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
            Payment Roll Number:
            <input
              type='text'
              value={rollNumber}
              onChange={(e) => setRollNumber(e.target.value)}
              required
            />
          </label>
        )}

        <button type='submit'>Go to Bill Page</button>
      </form>
    </div>
  );
};

export default Abillgen;
