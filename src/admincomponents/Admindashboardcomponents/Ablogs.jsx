import React from 'react'
import "./Ablogs.css"
import { Link } from "react-router-dom";
export const Ablogs = () => {
  return (
    <div className='mainblogcontainer'>
      <div className='blogtitle'>
        <h1>CREATE YOUR AMAZING BLOG</h1>
        
        <Link to="/admin/SHRA/createblog"><button className='newbt'>CREATE NEW</button></Link>
      </div>
    </div>
  )
}
