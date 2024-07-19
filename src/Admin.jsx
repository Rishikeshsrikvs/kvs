import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Adminlogin } from './admincomponents/Adminlogin';
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
   <div>
    
    <Routes>
        <Route path='login' element={<Adminlogin/>}/>
        <Route path='dashboard/*' element={<Admindashboard/>}/>
        <Route path='add' element={<Addclient/>}/>
        <Route path='createblog' element={<Blogedit/>}/>
        <Route path='careerpost' element={<Careerpost/>}/>
        <Route path='careerview' element={<Careerview/>}/>
        <Route path='invoice' element={<Invoice/>}/>
        <Route path='response' element={<Careerresponse/>}/>
        <Route path='response&package' element={<Clientservice/>}/>
    </Routes>
   </div>
  )
}
