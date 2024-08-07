import React from 'react'
import { Link } from 'react-router-dom'
import "./Contactus.css"
const Contactus = () => {
  return (
    <div className='contactusparent'>
      <div className="contact1main">
        <div className="contact1sub">
            <h1 className="cn1big">Let’s collaborate on what matters to you</h1>
            <h1 className="cn1small">Contact us to discuss business opportunities, or just to say hello. Use the form below or send us an email at  <span>info@srikvstech.com</span></h1>
        </div>
      </div>
      <div className="contact2main">
        <div className="cn2left">
            <form action="">
                <div className='cn2lefttitle' >
                    <h1>Contact Us</h1>
                    <p>Get in touch with us for any inquiries.</p>
                </div>
                <div className="cn2incon">
                    <div className="cn2in">
                        <label htmlFor="">Name</label>
                        <input type="text" />
                    </div>
                    <div className="cn2in">
                        <label htmlFor="">Email</label>
                        <input type="text" />
                    </div>
                    <div className="cn2in">
                        <label htmlFor="">Message</label>
                        <input type="text" />
                    </div>
                </div>
                <div className="cn2submit">
                    <button>Send Message</button>
                </div>
            </form>
        </div>
        <div className="cn2right">
            <div className="cn2text">
                <h2>We are Here</h2>
                <p>mon - sat  [9AM - 6PM]</p>
            </div>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3885.747619069917!2d80.09382927505325!3d13.115168411714471!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2f8e1bf45980d30f%3A0xdf6d20a33d911ed7!2sSri%20KVS%20Tech%20-%20Digital%20Marketing%20Agency%20-%20Avadi!5e0!3m2!1sen!2sin!4v1722930908375!5m2!1sen!2sin"  className='cn2iframe'   loading="lazy" ></iframe>

        </div>
      </div>
      <div className="cn3main">
        <div className="cn3left">
            <h1>Feedback</h1>
            <div className="cn3feedbackcon">
                <div className="cn3in">
                    <label htmlFor="">Email</label>
                        <input type="text" />
                </div>
                <div className="cn3in">
                    <label htmlFor="">Review</label>
                    <textarea name="" id=""></textarea>
                </div>
                <div className="cn3fbbtn">Send Message</div>
            </div>
        </div>
        <div className="cn3right">
            <h1>BROCHURES</h1>
            <p>Discover the power of our expertise and solutions by accessing our comprehensive brochures. Gain deeper insights into our services, approach, and success stories, empowering you to make informed decisions for your business. Simply click the links below to download our brochures and embark on a transformative journey with us.</p>
            <Link to="/brochureform" className="cn3rightbtn">
                DOWNLOAD
            </Link>
        </div>
      </div>
    </div>
  )
}

export default Contactus
