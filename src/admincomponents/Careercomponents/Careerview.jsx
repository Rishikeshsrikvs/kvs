import React from 'react'
import { Job } from './Job'
export const Careerview = () => {
  return (
    <div className='cvmaincon'>
        <div className="cvtitle">
            <div className="lefttitle">
                <h2>MANAGE JOBS AND RESPONSE</h2>
                <h4>Manage job and response</h4>
            </div>
            <div className="righttitle">
                <button>BACK TO MENU</button>
                <button>POST A JOB</button>
            </div>
        </div>
        <div className="cvcontentcon">
            <div className="contentleft">
                <div className="lefttitlefilter">
                    <h1>Filters</h1>
                </div>
                <div className="search">
                    <input type="search" placeholder='Search by title' />
                </div>
                <div className="status">
                    <h2>Job status</h2>
                    <div className="checkrow">
                        <input type="checkbox" />
                        <label htmlFor="">Active jobs</label>
                    </div>
                    <div className="checkrow">
                        <input type="checkbox" />
                        <label htmlFor="">Active jobs</label>
                    </div>
                    <div className="checkrow">
                        <input type="checkbox" />
                        <label htmlFor="">Active jobs</label>
                    </div>
                
                   
                </div>
                <div className="postby">
                    <h2>POST BY</h2>
                    <input type="search" placeholder='Search by username' />
                    <div className="checkrow">
                    <input type="checkbox" />
                    <label htmlFor="">HR</label>
                    </div>
                </div>
            </div>
            <div className="contentright">
                <div className="catitle">
                    <div className="cartitle1">
                        <span>All jobs</span>
                        <span>Drafts</span>
                    </div>
                    <div>page No</div>
                </div>
                <div className="rightfilter"> 
                    <div className="rightrow">
                        <input type="checkbox" />
                        <label htmlFor="">Select All</label>
                    </div>
                    <div className="rightrow">
                        <input type="checkbox" />
                        <label htmlFor="">Refresh</label>
                    </div>
                    <div className="rightrow">
                        <input type="checkbox" />
                        <label htmlFor="">Colaborate</label>
                    </div>
                    <div className="rightrow">
                        <input type="checkbox" />
                        <label htmlFor="">Refresh</label>
                    </div>
                </div>
                <div className="jobcontainer">
                    <Job/>
                    <Job/>
                </div>
                
            </div>
        </div>
    </div>
  )
}
