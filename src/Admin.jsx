import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Adminlogin } from './admincomponents/Adminlogin';
import { Admindashboard } from './admincomponents/Admindashboard';
import { Addclient } from './admincomponents/Clientcomponents/Addclient';
export const Admin = () => {
  return (
   <div>
    
    <Routes>
        <Route path='login' element={<Adminlogin/>}/>
        <Route path='dashboard/*' element={<Admindashboard/>}/>
        <Route path='add' element={<Addclient/>}/>
    </Routes>
   </div>
  )
}
