import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import './Aclients.css';

const Clientrow = ({ client }) => (
  <tr key={client.id} className='clientrow'>
    <td>{client.clientName}</td>
    <td>{client.phone}</td>
    <td>{client.email}</td>
    <td>{client.location}</td>
    <td>{client.valid ? 'Yes' : 'No'}</td>
    <td>
      <Link to={`/admin/response&package/${client.id}`}>
        <button className='renewbt'>Renew</button>
      </Link>
    </td>
  </tr>
);

export const Aclients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get('http://localhost:3500/clients');
        setClients(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching client data.');
        setLoading(false);
        console.error('Error:', error);
      }
    };

    fetchClients();
  }, []);

  const downloadPDF = () => {
    const doc = new jsPDF('p', 'mm', 'a4');
    doc.setFontSize(12);

    // Title
    doc.text('Client List', 14, 16);

    // Table Headers
    doc.text('Client Name', 14, 30);
    doc.text('Phone', 60, 30);
    doc.text('Email', 100, 30);
    doc.text('Location', 140, 30);
    doc.text('Valid', 180, 30);

    let yPosition = 40;
    clients.forEach(client => {
      doc.text(client.clientName, 14, yPosition);
      doc.text(client.phone, 60, yPosition);
      doc.text(client.email, 100, yPosition);
      doc.text(client.location, 140, yPosition);
      doc.text(client.valid ? 'Yes' : 'No', 180, yPosition);
      yPosition += 10;

      // Add a new page if the content is getting close to the bottom
      if (yPosition > 270) {
        doc.addPage();
        yPosition = 20; // Reset Y position for the new page
        doc.text('Client Name', 14, 30);
        doc.text('Phone', 60, 30);
        doc.text('Email', 100, 30);
        doc.text('Location', 140, 30);
        doc.text('Valid', 180, 30);
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
              <th>Client Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Location</th>
              <th>Valid</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <Clientrow key={client.id} client={client} />
            ))}
          </tbody>
        </table>
      </div>
      <div className="clientbutton">
        <Link to="/admin/add">
          <button>Add Clients</button>
        </Link>
        <button onClick={downloadPDF}>Download</button>
      </div>
    </div>
  );
};
