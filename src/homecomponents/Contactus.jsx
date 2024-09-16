import React, { useEffect, useState } from 'react';
import api from '../api/api';
import { Link } from 'react-router-dom';
import './Contactus.css';
import upload from './../assets/images/upload.png';

const Contactus = () => {
  const [friendFeedback, setFriendFeedback] = useState({
    name: '',
    profileImage: null,
    profileImageName: '',
    contact: '',
    review: '',
  });

  const [contactFormData, setContactFormData] = useState({
    contactName: '',
    contact: '',
    message: ''
  });

  const [formErrors, setFormErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [contactFormSubmitted, setContactFormSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Validation for friend feedback form
  const validateFriendForm = () => {
    let errors = {};

    if (!friendFeedback.name.trim()) errors.name = 'Name is required';
    if (!friendFeedback.contact.trim()) errors.contact = 'Contact is required';
    else if (friendFeedback.contact.length !== 10) errors.contact = 'Contact should be 10 digits';
    if (!friendFeedback.review.trim()) errors.review = 'Review is required';

    return errors;
  };

  // Validation for contact form
  const validateContactForm = () => {
    let errors = {};

    if (!contactFormData.contactName.trim()) errors.contactName = 'Name is required';
    if (!contactFormData.contact.trim()) errors.contact = 'Phone number is required';
    else if (contactFormData.contact.length !== 10) errors.contact = 'Phone number should be 10 digits';
    if (!contactFormData.message.trim()) errors.message = 'Message is required';

    return errors;
  };

  const handleFriendInputChange = (e) => {
    const { name, value } = e.target;
    setFriendFeedback({
      ...friendFeedback,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFriendFeedback({
      ...friendFeedback,
      profileImage: file,
      profileImageName: file ? file.name : ''
    });
  };

  const handleFriendSubmit = async () => {
    const errors = validateFriendForm();
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      const formData = new FormData();
      formData.append('name', friendFeedback.name);
      formData.append('contact', friendFeedback.contact);
      formData.append('description', friendFeedback.review);
      if (friendFeedback.profileImage) {
        formData.append('feedbackProfile', friendFeedback.profileImage);
      }

      try {
        const response = await api.post('/testimonial', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        console.log(response.data);
        setFormSubmitted(true);
        setFriendFeedback({
          name: '',
          profileImage: null,
          profileImageName: '',
          contact: '',
          review: '',
        });

        setTimeout(() => {
          setFormSubmitted(false);
          window.location.reload();
        }, 3000);
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const handleContactInputChange = (e) => {
    const { name, value } = e.target;
    setContactFormData({
      ...contactFormData,
      [name]: value,
    });
  };

  const handleContactFormSubmit = async (e) => {
    e.preventDefault();

    const errors = validateContactForm();
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        const response = await api.post('/contact', contactFormData);

        setContactFormSubmitted(true);
        setContactFormData({
          contactName: '',
          contact: '',
          message: ''
        });

        setTimeout(() => {
          setContactFormSubmitted(false);
          window.location.reload();
        }, 3000);
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  return (
    <div className='contactusparent'>
      <div className="contact1main">
        <div className="contact1sub">
          <h1 className="cn1big">Let’s collaborate on what matters to you</h1>
          <h1 className="cn1small">Contact us to discuss business opportunities, or just to say hello. Use the form below or send us an email at <span>info@srikvstech.com</span></h1>
        </div>
      </div>

      <div className="contact2main">
        <div className="cn2left">
          <form onSubmit={handleContactFormSubmit}>
            <div className='cn2lefttitle'>
              <h1>Contact Us</h1>
              <p>Get in touch with us for any inquiries.</p>
            </div>
            <div className="cn2incon">
              <div className="cn2in">
                <label htmlFor="contactName">Name</label>
                <input 
                  type="text" 
                  name="contactName" 
                  value={contactFormData.contactName} 
                  onChange={handleContactInputChange} 
                />
                {formErrors.contactName && <span className="error">{formErrors.contactName}</span>}
              </div>
              <div className="cn2in">
                <label htmlFor="contact">Phone</label>
                <input 
                  type="phone" 
                  name="contact" 
                  value={contactFormData.contact} 
                  onChange={handleContactInputChange} 
                />
                {formErrors.contact && <span className="error">{formErrors.contact}</span>}
              </div>
              <div className="cn2in">
                <label htmlFor="message">Message</label>
                <input 
                  type="text" 
                  name="message" 
                  value={contactFormData.message} 
                  onChange={handleContactInputChange} 
                />
                {formErrors.message && <span className="error">{formErrors.message}</span>}
              </div>
            </div>
            <div className="cn2submit">
              <button type="submit">Send Message</button>
            </div>
            {contactFormSubmitted && (
              <div className="success-alert">
                Your message has been sent successfully!
              </div>
            )}
          </form>
        </div>

        <div className="cn2right">
          <div className="cn2text">
            <h2>We are Here</h2>
            <p>mon - sat  [9AM - 6PM]</p>
          </div>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3885.747619069917!2d80.09382927505325!3d13.115168411714471!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2f8e1bf45980d30f%3A0xdf6d20a33d911ed7!2sSri%20KVS%20Tech%20-%20Digital%20Marketing%20Agency%20-%20Avadi!5e0!3m2!1sen!2sin!4v1722930908375!5m2!1sen!2sin" className='cn2iframe' loading="lazy"></iframe>
        </div>
      </div>

      <div className="cn3main">
        <div className="cn3left">
          <h1>Feedback</h1>
          <div className="cn3feedbackcon">
            <div className="cn3in">
              <label htmlFor="name">Name</label>
              <input type="text" name="name" value={friendFeedback.name} onChange={handleFriendInputChange} />
              {formErrors.name && <span className="error">{formErrors.name}</span>}
            </div>
            <div className="cn3in">
              <label htmlFor="proname">Profile image</label>
              <div className="prodiv">
                <label htmlFor="proname">
                  <img src={upload} alt="" />
                  <span>Choose an image</span>
                </label>
                <span>{friendFeedback.profileImageName || 'No file chosen'}</span>
                <input type="file" name="profileImage" id="proname" onChange={handleFileChange} />
              </div>
            </div>
            <div className="cn3in">
              <label htmlFor="contact">Contact</label>
              <input type="number" name="contact" value={friendFeedback.contact} onChange={handleFriendInputChange} />
              {formErrors.contact && <span className="error">{formErrors.contact}</span>}
            </div>
            <div className="cn3in">
              <label htmlFor="review">Review</label>
              <input type="text" name="review" value={friendFeedback.review} onChange={handleFriendInputChange} />
              {formErrors.review && <span className="error">{formErrors.review}</span>}
            </div>
            <div className="cn3submit">
              <button className='cn3fbbtn' onClick={handleFriendSubmit}>Submit</button>
            </div>
            {formSubmitted && (
              <div className="success-alert">
                Feedback submitted successfully!
              </div>
            )}
          </div>
        </div>

        <div className="cn3right">
        <h1>BROCHURES</h1>
          <p>
            Discover the power of our expertise and solutions by accessing our comprehensive brochures. Gain deeper insights into our services, approach, and success stories, empowering you to make informed decisions for your business. Simply click the links below to download our brochures and embark on a transformative journey with us.
          </p>
          <Link to="/brochureform" className="cn3rightbtn">Request Brochure</Link>
        </div>
      </div>
    </div>
  );
};

export default Contactus;
