import React from 'react';
import './Abill.css';
import { Routes, Route } from "react-router-dom";
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Abill = () => {
  const navigate = useNavigate(); // Initialize the navigate hook

  // Functions to handle button clicks
  const handleBillGeneration = () => {
    navigate('/admin/SHRA/dashboard/generation'); // Navigate to the 'bill-generation' route
  };

  const handleInvoice = () => {
    navigate('/admin/SHRA/dashboard/bill-invoice'); // Navigate to the 'invoice' route
  };

  return (
    <div>
    <div className='abillcon'>
      <h1>BILL GENERATION</h1>
      <div className="billcon">
        <button onClick={handleBillGeneration}>BILL GENERATION</button>
        <button onClick={handleInvoice}>INVOICE</button>
      </div>
    </div>
  
    </div>
    
  );
};

export default Abill;
