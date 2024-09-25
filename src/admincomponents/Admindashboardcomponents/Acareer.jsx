import React from "react";
import "./Acareer.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
export const Acareer = () => {
  return (
    <div className="careermaincontainer">
      <h2>CAREER SITE</h2>
      <div className="careercontainer">
        <h1>CREATE AND VIEW THE JOB POSTINGS AND UPDATES</h1>
        <div className="buttoncontainer">
          <Link to="/admin/SHRA/careerpost">
            <button>POST A JOB</button>
          </Link>
          <Link to="/admin/SHRA/careerview">
            <button>VIEW</button>
          </Link>
        </div>
      </div>
    </div>
  );
};
