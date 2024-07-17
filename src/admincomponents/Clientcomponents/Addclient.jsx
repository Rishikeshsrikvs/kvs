import React from 'react'
import "./Addclient.css"
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
                    <input type="text" placeholder='client id'/>
                    <input type="text" placeholder='clientname'/>
                    <input type="file" name='Client logo' id='adclientlogo'/>
                    <input type="text" placeholder='Location'/>
                    <input type="text" placeholder='Email'/>
                    <input type="text" placeholder='Gst No'/>
                    <input type="text" placeholder='Phone number'/>
                    <input type="text" placeholder='Adhar number' />

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
                <input type="submit" value="create Client" />
            </div>
            </form>
        </div>
    </div>
 
  )
}
