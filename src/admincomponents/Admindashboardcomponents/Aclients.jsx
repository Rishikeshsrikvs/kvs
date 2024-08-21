import React, { useEffect, useState, useRef } from 'react';
import api from '../../api/api';
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import './../Admindashboardcomponents/Aclients.css';
import { useAuth } from '../Auth/AuthContext';
import Clientrow from '../Clientcomponents/Clientrow';

const Aclients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedClient, setSelectedClient] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef(null);

  const { token } = useAuth();

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await api.get('/api/admin/getClients', {
          headers: {
            authorization: `${token}`,
          },
        });
        setClients(response.data.message);
        setLoading(false);
      } catch (error) {
        setError('Error fetching client data.');
        setLoading(false);
        console.error('Error:', error);
      }
    };

    fetchClients();
  }, [token]);

  const handleClickOutside = (e) => {
    if (popupRef.current && !popupRef.current.contains(e.target)) {
      setShowPopup(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const openPopup = (client) => {
    setSelectedClient(client);
    setShowPopup(true);
  };

  const downloadPDF = () => {
    const doc = new jsPDF('p', 'mm', 'a4');
    doc.setFontSize(12);

    // Title
    doc.text('Client List', 14, 16);

    // Table Headers
    doc.text('Client Id', 14, 30);
    doc.text('Client Name', 40, 30);
    doc.text('Phone', 80, 30);
    doc.text('Email', 120, 30);
    doc.text('Location', 160, 30);

    let yPosition = 40;
    clients.forEach(client => {
      doc.text(client.client_id, 14, yPosition);
      doc.text(client.client_name, 40, yPosition);
      doc.text(client.client_mobile, 80, yPosition);
      doc.text(client.client_email, 120, yPosition);
      doc.text(client.client_Location, 160, yPosition);
      yPosition += 10;

      // Add a new page if the content is getting close to the bottom
      if (yPosition > 270) {
        doc.addPage();
        yPosition = 20; // Reset Y position for the new page
        doc.text('Client Id', 14, 30);
        doc.text('Client Name', 40, 30);
        doc.text('Phone', 80, 30);
        doc.text('Email', 120, 30);
        doc.text('Location', 160, 30);
      }
    });

    // Save the PDF
    doc.save('clients.pdf');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className='maincontainer'>
      <div className="actitle">
        <span>Our Clients</span>
      </div>
      <div className="container">
        <table>
          <thead>
            <tr>
              <th>Client Id</th>
              <th>Client Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Location</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <Clientrow key={client.client_id} client={client} openPopup={() => openPopup(client)} />
            ))}
          </tbody>
        </table>
      </div>
      <div className="clientbutton">
        <Link to="/admin/SHRA/add">
          <button>Add Clients</button>
        </Link>
        <button onClick={downloadPDF}>Download</button>
      </div>

      {showPopup && selectedClient && (
        <div className="popup-overlay">
          <div className="popup" ref={popupRef}>
            <h3>Client Details for {selectedClient.client_name}</h3>
            <p><strong>Client ID:</strong> {selectedClient.client_id}</p>
            <p><strong>Name:</strong> {selectedClient.client_name}</p>
            <p><strong>Phone:</strong> {selectedClient.client_mobile}</p>
            <p><strong>Email:</strong> {selectedClient.client_email}</p>
            <p><strong>Location:</strong> {selectedClient.client_Location}</p>
            {/* Add more client details as necessary */}
            <button onClick={() => setShowPopup(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Aclients;
