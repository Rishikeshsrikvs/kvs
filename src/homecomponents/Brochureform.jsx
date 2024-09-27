import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import "./Brochureform.css";
import brfsub from "./../assets/images/Brochureform/brformbacksub.png";
import brfmain from "./../assets/images/Brochureform/brformbackmain.jpg";

const Brochureform = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.init({
      duration: 2000, // Animation duration in ms
      once: false,     // Whether animation should happen only once
    });
  }, []);

  const validateForm = () => {
    if (name === "" || phone === "") {
      setError("Both Name and Phone Number are required");
      return false;
    }
    if (!/^\d{10}$/.test(phone)) {
      setError("Phone number must be a valid 10-digit number");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await api.post(
        "/contact",
        {
          contactName: name,
          contact: phone,
          message: "Brochure request", // default message
        }
      );

      if (response.status === 201) {
        // On successful submission, navigate to the download page
        navigate("/brochuredownload");
      }
    } catch (error) {
      setError("Failed to submit the form. Please try again.");
    }
  };

  return (
    <div className="brochureformparent">
      {/* <div className="brochureformback">
                <img src={brfmain} alt="" />
            </div> */}

      <div className="brochureformmain">
        <div className="brochureformcontainer" data-aos="zoom-in">
          <div className="brformleft">
            <img src={brfsub} alt="" />
          </div>
          <form className="brformright" onSubmit={handleSubmit}>
            <h1 data-aos="zoom-in">FORM BROCHURE</h1>

            {error && <p className="error">{error}</p>}

            <div className="brformin"  data-aos="fade-left">
              <label htmlFor="Name">Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
               
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="brformin" data-aos="fade-left">
              <label htmlFor="Phone">Phone Number</label>
              <input
                type="text"
               
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="brformbtncn">
              <button type="submit" className="brformbtn" data-aos="zoom-in">
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Brochureform;
