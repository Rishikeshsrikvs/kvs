import React from 'react'
import "./Aprojects.css"
import { Project } from './Project'
export const Aprojects = () => {
  return (
    <div className="projectmaincontainer">
      <h2>PROJECT SITE</h2>
      <h1>PICK THE FAVOURITES OF OUR WORKS</h1>
      <div className="card-container">
         <Project/>
         <Project/>
         <Project/>
         <Project/>
         <Project/>
         <Project/>
         <Project/>
         <Project/>
         <Project/>
      </div>
    </div>
  )
}

