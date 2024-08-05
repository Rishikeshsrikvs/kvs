import React from 'react'
import "./Career.css"
const Career = () => {
  return (
    <div className='careerparent'>
      <div className="career1main">
        <div className="career1text">
            <h1>Careers <span>&</span></h1>
            <h1>vacancies</h1>
        </div>
      </div>
      <div className="career2main">
        <div className="career2left">
            <p>cannot find the suitable vacancy ?<br/>
            Drop us a line</p>
        </div>
        <div className="career2right">
            <div className="cjobcard">
                <div className="cjobleft">
                    <div className="cjup">
                        <h1>web designer</h1>
                    </div>
                    <ul className="cjdown">
                        
                            <li>senior</li>
                            <li>1 yesr experience</li>
                            <li>Chennai</li>
                        
                    </ul>
                </div>
                <div className="cjobright">
                        <p>----</p>
                </div>
            </div>
            <div className="cjobcard">
                <div className="cjobleft">
                    <div className="cjup">
                        <h1>web designer</h1>
                    </div>
                    <ul className="cjdown">
                        
                            <li>senior</li>
                            <li>1 yesr experience</li>
                            <li>Chennai</li>
                        
                    </ul>
                </div>
                <div className="cjobright">
                        <p>----</p>
                </div>
            </div>
        </div>
        
      </div>
    </div>
  )
}

export default Career
