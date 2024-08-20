import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/api';
import './Contactus.css';

const Contactus = () => {
  const [activeTab, setActiveTab] = useState('friends');
  
  const [feedbackData, setFeedbackData] = useState({
    name: '',
    profileImage: null,  // Changed to null for better handling
    profileImageName: '', // New state for storing the file name
    contact: '',
    review: '',
    clientId: '',
  });

  const [formSubmitted, setFormSubmitted] = useState(false); // State to manage success alert

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFeedbackData({
      ...feedbackData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFeedbackData({
      ...feedbackData,
      profileImage: file,
      profileImageName: file ? file.name : '' // Set file name when a file is selected
    });
  };

  const handleSubmit = async () => {
    const formData = new FormData(); // Use FormData for file uploads
    formData.append('clients', activeTab === 'clients');
    formData.append('description', feedbackData.review);

    if (activeTab === 'clients') {
        // Only include `clientId` for the 'clients' tab
        formData.append('clientId', feedbackData.clientId);
    } else if (activeTab === 'friends') {
        // Include `name`, `contact`, and optionally `feedbackProfile` for the 'friends' tab
        formData.append('name', feedbackData.name);
        formData.append('contact', feedbackData.contact);
        if (feedbackData.profileImage) {
            formData.append('feedbackProfile', feedbackData.profileImage); // Include the image file if selected
        }
    }

    try {
        const response = await api.post('/testimonial', formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Ensure the correct content type for file uploads
            },
        });

        console.log(response.data);

        // Show success alert and reset form fields
        setFormSubmitted(true);
        setFeedbackData({
            name: '',
            profileImage: null, // Ensure the file input is cleared
            profileImageName: '', // Reset file name
            contact: '',
            review: '',
            clientId: '',
        });
        setActiveTab('friends'); // or reset to 'clients' if needed

        // Hide the success alert after a few seconds
        setTimeout(() => {
            setFormSubmitted(false);
        }, 3000);

    } catch (error) {
        console.error('Error:', error);
    }
};


  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setFeedbackData({
      ...feedbackData,
      clientId: '',
    });
  };

  return (
    <div className='contactusparent'>
      {/* Other parts of the component */}
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
          <div className="feedback-tabs">
            <button
              className={`tab-button ${activeTab === 'friends' ? 'active' : ''}`}
              onClick={() => handleTabClick('friends')}
            >
              Friends
            </button>
            <button
              className={`tab-button ${activeTab === 'clients' ? 'active' : ''}`}
              onClick={() => handleTabClick('clients')}
            >
              Clients
            </button>
          </div>
          <div className="feedback-content">
            <div className="cn3feedbackcon">
              {activeTab === 'friends' && (
                <>
                  <div className="cn3in">
                    <label htmlFor="">Name</label>
                    <input type="text" name="name" value={feedbackData.name} onChange={handleInputChange} />
                  </div>
                  <div className="cn3in">
                    <label htmlFor="proname">Profile image</label>

                    <div className="prodiv">
                      <label htmlFor="proname">Choose an image</label>
                      <span>{feedbackData.profileImageName || 'No file chosen'}</span> {/* Display the selected file name */}
                      <input type="file" name="profileImage" id='proname'  onChange={handleFileChange} />
                    </div>
                  </div>
                  
                  <div className="cn3in">
                    <label htmlFor="">Contact / Email</label>
                    <input type="text" name="contact" value={feedbackData.contact} onChange={handleInputChange} />
                  </div>
                  <div className="cn3in">
                    <label htmlFor="">Review</label>
                    <textarea name="review" value={feedbackData.review} onChange={handleInputChange}></textarea>
                  </div>
                </>
              )}
              {activeTab === 'clients' && (
                <>
                  <div className="cn3in">
                    <label htmlFor="">Client Id</label>
                    <input type="text" name="clientId" value={feedbackData.clientId} onChange={handleInputChange} />
                  </div>
                  <div className="cn3in">
                    <label htmlFor="">Review</label>
                    <textarea name="review" value={feedbackData.review} onChange={handleInputChange}></textarea>
                  </div>
                </>
              )}
              <div className="cn3fbbtn" onClick={handleSubmit}>Send Message</div>
              {formSubmitted && (
                <div className="success-alert">
                  Feedback submitted successfully!
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="cn3right">
          <h1>BROCHURES</h1>
          <p>
            Discover the power of our expertise and solutions by accessing our comprehensive brochures. Gain deeper insights into our services, approach, and success stories, empowering you to make informed decisions for your business. Simply click the links below to download our brochures and embark on a transformative journey with us.
          </p>
          <Link to="/home/brochureform" className="brochure-button">Request Brochure</Link>
        </div>
      </div>
    </div>
  );
};

export default Contactus;
