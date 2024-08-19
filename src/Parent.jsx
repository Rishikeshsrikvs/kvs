import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './Home';
import { Admin } from './Admin';
import { Check } from './Check';

export const Parent = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/home/*" element={<Home />} /> Base route for the Home page
        <Route path="/admin/*" element={<Admin />} />
        <Route path="/check" element={<Check />} />
      </Routes>
    </BrowserRouter>
  );
};
