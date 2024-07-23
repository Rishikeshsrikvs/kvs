import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "./Aclients.css";

const Clientrow = ({ client }) => (
  <tr key={client.id}>
    <td>{client.clientName}</td>
    <td>{client.phoneNumber}</td>
    <td>{client.email}</td>
    <td>{client.location}</td>
    <td>{client.valid ? 'Yes' : 'No'}</td>
    <td>
      <Link to={`/admin/response&package/${client.id}`}>View Invoice</Link>
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
        <button>Download</button>
      </div>
    </div>
  );
};
