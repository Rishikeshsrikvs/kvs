import React from 'react'
import { BrowserRouter, Routes, Route ,Link } from "react-router-dom";
export const Blogedit = () => {
  return (
    <div className='editblogmaincontainer'>
        <div className="ebtitle">
        
           <Link to="/admin/dashboard/*"> <button>BACK TO MAINPAGE</button></Link>
            <div className="btnleft">
                <button className='prebtn'>PREVIEW</button>
                <button className='pubbtn'>PUBLISH</button>
            </div>
        
        </div>
        <div className="subtitle">
            <h2>FONT EDITING OPTIONS</h2>
        </div>
        <div className="blogcontainer">
            <div className="leftcon">
                <h2>Image background color gradient options</h2>
                <input type="file" />
            </div>
            <div className="rightcon">
                <div className="rightsubcontainer">
                        <div className="subtitle">
                            
                        </div>
                </div>
            </div>
        </div>
    </div>
  )
}
