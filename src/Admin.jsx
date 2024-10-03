import React from "react";
import { Routes, Route } from "react-router-dom";

import { AuthProvider } from "./admincomponents/Auth/AuthContext";
import { Adminlogin } from "./admincomponents/Adminlogin";
import ProtectedRoute from "./admincomponents/Auth/ProtectedRoute"; // Adjust path as necessary
import { Admindashboard } from "./admincomponents/Admindashboard";
import { Addclient } from "./admincomponents/Clientcomponents/Addclient";
import { Blogedit } from "./admincomponents/Clientcomponents/Blogcomponents/Blogedit";
import { Careerpost } from "./admincomponents/Careercomponents/Careerpost";
import { Careerview } from "./admincomponents/Careercomponents/Careerview";
import { Invoice } from "./admincomponents/Clientcomponents/Invoice";
import Acontact from "./admincomponents/Admindashboardcomponents/Acontact";
import Clientservice from "./admincomponents/Clientcomponents/Clientservice";
import { Careerresponse } from "./admincomponents/Careercomponents/Careerresponse";
import { ClientserviceEdit } from "./admincomponents/Clientcomponents/ClientserviceEdit";
import { AddProject } from "./admincomponents/Admindashboardcomponents/AddProject";
import JobApplicants from "./admincomponents/Careercomponents/JobApplicants";
export const Admin = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="login" element={<Adminlogin />} />
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <Routes>
                <Route path="dashboard/*" element={<Admindashboard />} />
                <Route path="add" element={<Addclient />} />
                <Route path="createblog" element={<Blogedit />} />
                <Route path="careerpost" element={<Careerpost />} />
                <Route path="careerview" element={<Careerview />} />
                <Route path="invoice" element={<Invoice />} />
                <Route path="response/:jobId" element={<Careerresponse />} />
                <Route path="clientservice" element={<Clientservice />} />
                
                <Route
                  path="clientservice-edit/:clientId"
                  element={<ClientserviceEdit />}
                />
                <Route
                  path="job-applicants/:jobId"
                  element={<JobApplicants />}
                />
                <Route path="add-project" element={<AddProject />} />
              </Routes>
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
};
