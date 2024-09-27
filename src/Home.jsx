import React from 'react';
import { Header } from './homecomponents/Header';
import { Land } from './homecomponents/Land';
import Services from './homecomponents/Services';
import { Footer } from './homecomponents/Footer';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Works from './homecomponents/Works';
import Blogs from './homecomponents/Blogs';
import Career from './homecomponents/Career';
import { About } from './homecomponents/About';
import Brochureform from './homecomponents/Brochureform';
import Contactus from './homecomponents/Contactus';
import Brochuredownload from './homecomponents/Brochuredownload';
import JobDetails from './homecomponents/JobDetails';
import BlogDetail from './homecomponents/landcomponents/BlogDetail';
import Notfound from './Notfound';

export const Home = () => {
  const location = useLocation();  // Get the current route

  // Check if the current route is '/notfound'
  const hideHeaderFooter = location.pathname === '/notfound';

  return (
    <div>
      {/* Conditionally render Header and Footer based on the current route */}
      {!hideHeaderFooter && <Header />}
      <main>
        <Routes>
          <Route path='/' element={<Land />} />
          <Route path='/about' element={<About />} />
          <Route path='/projects' element={<Works />} />
          <Route path='/services' element={<Services />} />
          <Route path='/blogs' element={<Blogs />} />
          <Route path='/career' element={<Career />} />
          <Route path="/career/:id" element={<JobDetails />} />
          <Route path='/contactus' element={<Contactus />} />
          <Route path='/brochureform' element={<Brochureform />} />
          <Route path='/brochuredownload' element={<Brochuredownload />} />
          <Route path="/blog/:id" element={<BlogDetail />} />

          {/* Notfound route */}
          <Route path='/notfound' element={<Notfound />} />
          <Route path='/*' element={<Navigate to='/notfound' />} />
        </Routes>
      </main>
      {!hideHeaderFooter && <Footer />}
    </div>
  );
};
