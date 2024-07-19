import React from 'react'
import "./Aclients.css"
import { BrowserRouter, Routes, Route ,Link } from "react-router-dom";
import { Clientrow } from './Clientrow'
export const Aclients = () => {
  const nav=function(){
    Navigate
  }
  return (
    <div className='maincontainer'>
      <div className="actitle">
        <span>Our Clients</span>
      </div>
      <div className="container">
          <table>
            <tr>
              <th>Client Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Location</th>
              <th>Valid</th>
              <th>Action</th>
            </tr>
            <Clientrow/>
            <Clientrow/>
            <Clientrow/>
            
          </table>
      </div>
      <div className="clientbutton">
        <Link to="/admin/add"><button >ADD CLIENTS</button></Link>
        <button>DOWNLOAD</button>
      </div>
    </div>
  )
}
