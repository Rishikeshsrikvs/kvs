import React from 'react';
import { Ablogs } from './Admindashboardcomponents/Ablogs';
import { Acareer } from './Admindashboardcomponents/Acareer';
import { Aprojects } from './Admindashboardcomponents/Aprojects';
import { Asidebar } from './Admindashboardcomponents/Asidebar';
import { Atestms } from './Admindashboardcomponents/Atestms';
import { Aclients } from './Admindashboardcomponents/Aclients';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './Admindashboard.css'; // Assuming you have some CSS to style the layout

export const Admindashboard = () => {
  return (
    
      <div className="dashboard-container">
        <div className="sidecontainer">
          <Asidebar />
        </div>
        <div className="main-content">     
         <Routes>
            <Route exact path="clients" element={<Aclients/>} />
            <Route path="testimonials" element={<Atestms />} />
            <Route path="blogs" element={<Ablogs />} />
            <Route path="career" element={<Acareer />} />
            <Route path="projects" element={<Aprojects />} />
          </Routes>
          {/* <Route path='login' element={<Adminlogin/>}/> */}
        </div>
      </div>
    
  );
};
