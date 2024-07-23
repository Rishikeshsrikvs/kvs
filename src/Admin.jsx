import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './admincomponents/Auth/ProtectedRoute'; // Adjust path as necessary
import { Admindashboard } from './admincomponents/Admindashboard';
import { Addclient } from './admincomponents/Clientcomponents/Addclient';
import { Blogedit } from './admincomponents/Clientcomponents/Blogcomponents/Blogedit';
import { Careerpost } from './admincomponents/Careercomponents/Careerpost';
import { Careerview } from './admincomponents/Careercomponents/Careerview';
import { Invoice } from './admincomponents/Clientcomponents/Invoice';
import { Clientservice } from './admincomponents/Clientcomponents/Clientservice';
import { Careerresponse } from './admincomponents/Careercomponents/Careerresponse';

export const Admin = () => {
  return (
    <ProtectedRoute>
      <Routes>
        <Route path="dashboard/*" element={<Admindashboard />} />
        <Route path="add" element={<Addclient />} />
        <Route path="createblog" element={<Blogedit />} />
        <Route path="careerpost" element={<Careerpost />} />
        <Route path="careerview" element={<Careerview />} />
        <Route path="invoice/:id" element={<Invoice />} />
        <Route path="response/:jobId" element={<Careerresponse />} />
        <Route path="response&package/:id" element={<Clientservice />} />
      </Routes>
    </ProtectedRoute>
  );
};
