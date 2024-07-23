import React from 'react'
import { Link } from 'react-router-dom'
import logo from './../../assets/images/logo.png';
export const Careerpost = () => {
  return (
    <div className='careerpost'>
        <div className="cptitle">
            <div className="cptitleleft">
                <Link><button className='cpbackmenubtn'>BACK TO HOME</button></Link>
            </div>
            <div className='cpright'>
                <Link> <button className='cppublishbtn'>PUBLISH</button></Link>
                <Link><button className='cppreviewbtn'>PREVIEW</button></Link>
            </div>
        </div>
        <div className="cpsubtitle">
            <h2>JOB DETAILS</h2>
        </div>
        <div className="cpcontentcontainer">
            <div className="cpsidecontainer">
                <div className="cpsideinput">
                    <label htmlFor="">JOB NAME</label>
                    <input type="text" />
                </div>
                
                <div className="cpsideinput">
                    <label htmlFor="">EXPERIENCE</label>
                   <input type="number" />
                </div>
                <div className="cpsideinput">
                    <label htmlFor="">LOCATION</label>
                    <input type="text" />
                </div>
                <div className="cpsideinput">
                    <label htmlFor="">SALARY</label>
                    <input type="text" />
                </div>
                <div className="cpsideinput">
                    <label htmlFor="">SKILLS REQUIRED</label>
                    <input type="text" />
                </div>
                <div className="cpsideinput " id='inputbox'>
                    <label htmlFor="">DESCRIPTION</label>
                    <textarea name="" id="inputbox"></textarea>
                </div>
                <div className='cpsidesubmit'>
                    <input type="submit" />
                </div>
            </div>
            <div className="cpmaincontainer">
                <div className="cpmainsubcontainer">
                    <div className="cpjobcard1">
                        <div className="cpjobcard1left">
                            <div className="jobheading">
                                <h2>JAVA PROGRAMMER</h2>
                                <h6>Sri KVS Tech- Digital Marketing Agency</h6>
                            </div>
                            <div className="jobpoints">
                                <div className="jobpointsrow">
                                    <div className="experience jpitem"><h4>Fresher</h4></div>
                                    <div className=" jpitem"><h4>Openings:10</h4></div>
                                </div>
                                <div className="jobpointsrow">
                                    <div className="location jpitem"><h4>Chennai</h4></div>
                                    <div className="vacancy jpitem"><h4>Applicants:</h4></div>
                                </div>
                                <div className="jobpointsrow">
                                    <div className="salary jpitem"><h4>4-9Lacs P.A</h4></div>
                                    <div className="date jpitem"><h4>Posted:</h4></div>
                                </div>
                            </div>
                        </div>
                        <div className="cpjobcard1right">
                            <img src={logo} alt="" />
                        </div>
                    </div>
                    <div className="cpjobcard2">
                        <div className="cphighlights">
                            <h4>JOB HIGHLIGHTS</h4>
                            <ul>
                                <li><p>ELIGIBILITY: Any Graduate / Post Graduate - 2024 Passed outs ONLY</p></li>
                                <li><p>Candidates should: . - Have proficiency in both theory and Programming in JAVA</p></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
