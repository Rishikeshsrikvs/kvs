import React from 'react'
import { Link } from 'react-router-dom'
import "./Clientservice.css"
export const Clientservice = () => {
  return (
    <div className='Clientservicemaincontainer'>
         <div className="cstitle">
            <span>Main page</span>
        </div>
        <div className="Clientservicecontainer">
            <form action="">
                <div className="Clientservice-title">
                    <h1>Service and Package</h1>
                </div>
                <div className='service1'>
                    <div className="service1left">
                        <h4>Services</h4>
                        <div className="checkcontainer">
                            <div className="serinput"><input type="checkbox" /><label htmlFor="">Social Media Marketing</label></div>
                            <div className="serinput"><input type="checkbox" /><label htmlFor="">Social Media Marketing</label></div>
                            <div className="serinput"><input type="checkbox" /><label htmlFor="">Social Media Marketing</label></div>
                            <div className="serinput"><input type="checkbox" /><label htmlFor="">Social Media Marketing</label></div>
                        </div>
                        <div className="quality">
                            <input type="text" placeholder='Quality' />
                        </div>
                    </div>
                    <div className="service1right">
                        <select name="" id="package" placeholder="Package">
                            <option value="Elite">Elite</option>
                            <option value="Elite">Pro</option>
                            <option value="Elite">Standard</option>
                        </select>
                        <div className="discount"><input type="text"placeholder='Discount' className='discount' /></div>
                    </div>
                </div>
                <div className="generate"><Link><button>Generate</button></Link></div>
            </form>
        </div>
    </div>
    
  )
}
