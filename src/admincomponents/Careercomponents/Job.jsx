import React from 'react'
import { Link } from 'react-router-dom'

export const Job = () => {
  return (
    <div className='job'>
            <div className="checkcon">
                <input type="checkbox"/>
                <div className="jobdetails">
                    <h4>sales Excutive</h4>
                    <h5>Chennai</h5>
                    <h6>Urgent Hiring</h6>
                </div>
            </div>
            <div className="jobnumcon">
                <div className="total"><h2>44</h2><h5>Total</h5></div>
                <div className="short"><h2>44</h2><h5>Shortlisted</h5></div>
            </div>
            <div className="responsedetails">
                <div className="btnrow">
                    <Link to="/admin/response"><button>Response</button></Link>
                    <Link><button>Refresh</button></Link>
                </div>
                <div className='resdate'>
                    <p>posted by vimal @ 2.4.2024</p>
                </div>
            </div>
    </div>
  )
}
