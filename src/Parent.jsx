import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './admincomponents/Auth/AuthContext';
import { Home } from './Home';
import { Admin } from './Admin';
import { Adminlogin } from './admincomponents/Adminlogin';
export const Parent = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin/login" element={<Adminlogin />} />
          <Route path="/admin/*" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};
