import React from 'react'
import { Admin } from './Admin';
import { Home } from './Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
export const Parent = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/admin/*" element={<Admin />} />
        </Routes>
    </BrowserRouter>
  )
}
