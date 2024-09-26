import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./Home";
import { Admin } from "./Admin";
import { Check } from "./Check";
import Adminlogin from "./admincomponents/Adminlogin"; // Import Adminlogin component

export const Parent = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Home />} />{" "}
        {/* Base route for the Home page */}
        <Route path="/admin/SHRA/*" element={<Admin />} />{" "}

        {/* Admin login path */}

        <Route path="/check" element={<Check/>} />
      </Routes>
    </BrowserRouter>
  );
};
