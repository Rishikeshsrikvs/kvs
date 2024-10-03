import React from "react";
import { Ablogs } from "./Admindashboardcomponents/Ablogs";
import { Acareer } from "./Admindashboardcomponents/Acareer";
import { Aprojects } from "./Admindashboardcomponents/Aprojects";
import Acontact from "./Admindashboardcomponents/Acontact";
import { Asidebar } from "./Admindashboardcomponents/Asidebar";
import { Atestms } from "./Admindashboardcomponents/Atestms";
import Abill from "./Admindashboardcomponents/Abill";
import Aclients from "./Admindashboardcomponents/Aclients";
import { Routes, Route, Navigate } from 'react-router-dom';
import Abillgen from "./Admindashboardcomponents/Abillgen";
import Abillinvoice from "./Admindashboardcomponents/Abillinvoice";
import "./Admindashboard.css"; // Assuming you have some CSS to style the layout

export const Admindashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="sidecontainer">
        <Asidebar />
      </div>
      <div className="main-content">
        <Routes>
          <Route path="clients" element={<Aclients />} />
          <Route path="testimonials" element={<Atestms />} />
          <Route path="blogs" element={<Ablogs />} />
          <Route path="career" element={<Acareer />} />
          <Route path="projects" element={<Aprojects />} />
          <Route path="contacts" element={<Acontact />} />
          <Route path="Bill" element={<Abill />} />
          <Route path="bill-invoice" element={<Abillinvoice/>} /> 
          <Route path="generation" element={<Abillgen />} />
        </Routes>
        {/* <Route path='login' element={<Adminlogin/>}/> */}
      </div>
    </div>
  );
};
