import React from 'react';
import { Link } from 'react-router-dom';
import './../Admindashboardcomponents/Aclients.css';

const Clientrow = ({ client }) => {
  return (
    <tr key={client.client_id} className='clientrow'>
      <td>{client.client_id}</td>
      <td>{client.client_name}</td>
      <td>{client.client_mobile}</td>
      <td>{client.client_email}</td>
      <td>{client.client_Location}</td>
      <td>
        <Link to={`/admin/response&package/${client.client_id}`}>
          <button className='renewbt'>Renew</button>
        </Link>
      </td>
    </tr>
  );
}

export default Clientrow;
