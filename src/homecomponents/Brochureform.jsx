import React from 'react'
import "./Brochureform.css"
import brfsub from './../assets/images/Brochureform/brformbacksub.png';
import brfmain from './../assets/images/Brochureform/brformbackmain.jpg';
const Brochureform = () => {
  return (
    <div className='brochureformparent'>
       {/* <div className="brochureformback">
         <img src={brfmain} alt="" />
       </div> */}
       <div className="brochureformmain">
            <div className="brochureformcontainer">
                <div className="brformleft">
                    <img src={brfsub} alt="" />
                </div>
                <form action="" className='brformright'>
                    <h1>FORM BROCHURE</h1>
                    <div className="brformin">
                        <label htmlFor="Name">Name</label>
                        <input type="text" placeholder='Enter you name' />
                    </div>
                    <div className="brformin">
                        <label htmlFor="Name">Email</label>
                        <input type="text" placeholder='Enter  your email' />
                    </div>
                    <div className="brformin">
                        <label htmlFor="Name">Phone Number</label>
                        <input type="text" placeholder='Enter your Phone number' />
                    </div>
                    <div className="brformbtncn">
                        <div className="brformbtn">Send Message</div>
                    </div>
                </form>
            </div>
       </div>
    </div>
  )
}

export default Brochureform
