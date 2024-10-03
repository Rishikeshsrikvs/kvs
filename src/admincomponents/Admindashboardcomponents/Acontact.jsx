import React, { useEffect, useState } from "react";
import './Acontact.css';
import api from '../../api/api';

const Acontact = () => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const response = await api.get("/api/admin/getContact");
                setContacts(response.data);
                setLoading(false); // Stop loading after data is fetched
            } catch (error) {
                setError("Error fetching client data.");
                setLoading(false); // Stop loading if there's an error
                console.error("Error:", error);
            }
        };

        fetchContacts(); // Call the function to fetch data
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className='acontactcon'>
            <h1>CONTACTS</h1>
            <table className='acontable'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Contact</th>
                        <th>Message</th>
                    </tr>
                </thead>
                <tbody>
                    {contacts.map((contact, index) => (
                        <tr key={index}>
                            <td>{contact.contactName}</td>
                            <td>{contact.contact}</td>
                            <td>{contact.message}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Acontact;
