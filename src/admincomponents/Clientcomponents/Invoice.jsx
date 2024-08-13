import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './invoice.css';
import download from './../../assets/images/download.png';
import logo from './../../assets/images/logo.png';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../Auth/AuthContext';

export const Invoice = () => {
  const [clientData, setClientData] = useState(null);
  const { token } = useAuth();
  console.log(token);
  
  const location = useLocation();
  const { client_id, discount } = location.state || {};
  console.log(client_id, discount);
  
  useEffect(() => {
    const fetchClientData = async () => {
      try {
        const response = await axios.get(
          `https://srikvstech.onrender.com/api/admin/getClient/${client_id}`,
          {
            headers: {
              authorization: `${token}`,
            },
          }
        );
        setClientData(response.data.clientDetails); // Assuming the data is nested under clientDetails
      } catch (error) {
        console.error('Error fetching client data:', error);
      }
    };

    fetchClientData();
  }, [client_id, token]);

  if (!clientData) {
    return <div>Loading...</div>;
  }

  const gstRate = 0.18;

  const totalPrice = clientData.client_Plan?.reduce((acc, service) => {
    return acc + parseFloat(service.price);
  }, 0) || 0;

  const gstAmount = totalPrice * gstRate;
  const totalPriceWithGst = totalPrice + gstAmount;
  const discountPercentage = parseFloat(discount) / 100 || 0;
  const discountAmount = totalPriceWithGst * discountPercentage;
  const finalAmount = totalPriceWithGst - discountAmount;

  const downloadPDF = () => {
    const downloadButton = document.querySelector('.downloadcon');
    if (downloadButton) downloadButton.style.display = 'none';

    const input = document.getElementById('invoice-content');
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position -= pageHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save('invoice.pdf');

      if (downloadButton) downloadButton.style.display = 'block';
    });
  };

  const today = new Date();
  const issueDate = today.toLocaleDateString();

  const dueDate = new Date(today);
  dueDate.setDate(today.getDate() + 15);
  const dueDateString = dueDate.toLocaleDateString();

  return (
    <div className="invoicemaincontainer">
      <div id="invoice-content" className="invoiceecontainer">
        <div className="head">
          <div className="titleleftcontainer">
            <div className="red"></div>
            <div className="headtitle">
              <img src={logo} alt="Logo" />
              <p>No.19, Kamaraj Nagar,<br />Main Road, Avadi,<br />Chennai-600071</p>
            </div>
          </div>
          <div className="titlerightcontainer">
            <h1>INVOICE FORM</h1>
          </div>
        </div>
        <div className="invoicedetails">
          <div className="leftdetails">
            <h2>BILL TO</h2>
            <h3>{clientData.client_name}</h3>
            <h3>{clientData.client_email}</h3>
            <h3>{clientData.client_Location}</h3>
            <h3>GST: {clientData.client_GST}</h3>
          </div>
          <div className="rightdetails">
            <div className="rigtdetailsrow"><span className="lb">Invoice No :</span> 98972</div>
            <div className="rigtdetailsrow"><span className="lb">Date of issue :</span> {issueDate}</div>
            <div className="rigtdetailsrow"><span className="lb">Due Date :</span> {dueDateString}</div>
          </div>
        </div>
        <div className="invoicetable">
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>List of Package</th>
                <th>Package</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {clientData.client_Plan?.map((service, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{service.name}</td>
                  <td>{service.package}</td>
                  <td>{parseFloat(service.price).toFixed(2)}</td>
                </tr>
              ))}
              <tr>
                <td colSpan={4} id="gstlabel">GST (18%)</td>
                <td>{gstAmount.toFixed(2)}</td>
              </tr>
              <tr>
                <td colSpan={4} id="discountlabel">Discount ({discount}%)</td>
                <td>{discountAmount.toFixed(2)}</td>
              </tr>
              <tr>
                <td colSpan={4} id="totallabel">Total</td>
                <td>{finalAmount.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="invoicefoot">
          <div className="note">
            <p>Disclaimer: No refunds are provided for packages that are purchased.</p>
            <p>Note: lorem liuwwoie wwoifuyhwoe weiuifyhwue.</p>
          </div>
          <div className="downloadcon">
            <button onClick={downloadPDF}>
              <img src={download} alt="Download" /><span>PRINT</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
