import React from 'react'
import "./Addclient.css"
import upload from './../../assets/images/upload.png';
import { BrowserRouter, Routes, Route ,Link } from "react-router-dom";
export const Addclient = () => {
  return (
    <div className="addclientmaincontainer">
        <div className="title">
            <span>Main page</span>
        </div>
        <div className="adclientcontainer">
            <form action="">
                <div className="addclient-title">
                    <h1>ADD CLIENTS</h1>
                </div>
                <div className="addclient-inputs">
                    <input type="text" placeholder='clientname' className="item"/>
                    <label for="logo-upload" className="item logolabel">Client logo :  <span><img src={upload} alt="" /> <h5>Upload</h5></span></label>
                    <input id="logo-upload" type="file" />
                    <input type="text" placeholder='Location' className="item"/>
                    <input type="text" placeholder='Email' className="item"/>
                    <input type="text" placeholder='Gst No' className="item"/>
                    <input type="text" placeholder='Phone number' className="item"/>
                    <input type="text" placeholder='Adhar number' className="item"/>

            </div>
            <div className="addclient-paymentcontainer">
                <label htmlFor="Payment type">Payment Mode</label>
                <button>Cash </button> <button>online</button>
            </div>
            <div className="paymentref">
                <label htmlFor="">payment reference No:</label>
                <input type="text" placeholder='Number'/>
            </div>
            <div className='addclient-submit'>
                <Link to="/admin/response&package"><input type="submit" value="create Client" /></Link>
            </div>
            </form>
        </div>
    </div>
 
  )
}
