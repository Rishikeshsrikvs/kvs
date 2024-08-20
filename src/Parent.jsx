import React from 'react';
import { BrowserRouter, Routes, Route ,Navigate } from 'react-router-dom';
import { Home } from './Home';
import { Admin } from './Admin';
import { Check } from './Check';

export const Parent = () => {
  return (
    <BrowserRouter >
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        
        <Route path="/home/*" element={<Home />} /> Base route for the Home page
        <Route path="/admin/*" element={<Admin />} />
        <Route path="/check" element={<Check />} />
      </Routes>
    </BrowserRouter>
  );
};
