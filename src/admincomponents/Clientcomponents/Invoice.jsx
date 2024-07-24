import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './invoice.css';
import download from './../../assets/images/download.png';
import logo from './../../assets/images/logo.png';

export const Invoice = () => {
  const { id } = useParams();
  const [clientData, setClientData] = useState(null);

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        const response = await axios.get(`http://localhost:3500/clients/${id}`);
        setClientData(response.data);
      } catch (error) {
        console.error("Error fetching client data:", error);
      }
    };

    fetchClientData();
  }, [id]);

  if (!clientData) {
    return <div>Loading...</div>;
  }

  const servicePrice = 1000;
  const gstRate = 0.18;
  const totalPrice = servicePrice * clientData.services.length;
  const gstAmount = totalPrice * gstRate;
  const finalAmount = totalPrice + gstAmount;

const downloadPDF = () => {
  // Hide the download button
  const downloadButton = document.querySelector('.downloadcon');
  if (downloadButton) downloadButton.style.display = 'none';

  const input = document.getElementById('invoice-content');
  html2canvas(input).then((canvas) => {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 295; // A4 height in mm
    const imgHeight = canvas.height * imgWidth / canvas.width;
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

    // Show the download button again
    if (downloadButton) downloadButton.style.display = 'block';
  });
};


  const today = new Date();
  const issueDate = today.toLocaleDateString();

  // Calculate due date (15 days from today)
  const dueDate = new Date(today);
  dueDate.setDate(today.getDate() + 15);
  const dueDateString = dueDate.toLocaleDateString();

  return (
    <div className="invoicemaincontainer">
      <div id="invoice-content" className='invoiceecontainer'>
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
            <h3>{clientData.clientName}</h3>
            <h3>{clientData.email}</h3>
            <h3>{clientData.location}</h3>
            <h3>{clientData.phone}</h3>
          </div>
          <div className="rightdetails">
            <div className="rigtdetailsrow"><span className='lb'>Invoice No :</span> 98972</div>
            <div className="rigtdetailsrow"><span className='lb'>Date of issue :</span> {issueDate}</div>
            <div className="rigtdetailsrow"><span className='lb'>Due Date :</span> {dueDateString}</div>
          </div>
        </div>
        <div className="invoicetable">
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>List of Package</th>
                <th>Quantity</th>
                <th>Package</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {clientData.services.map((service, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{service.name}</td>
                  <td>{service.quantity}</td>
                  <td>{service.package}</td>
                  <td>{clientData.discount}</td>
                  <td>{servicePrice}</td>
                </tr>
              ))}
              <tr>
                <td colSpan={5} id='discountlable'>GST (18%)</td>
                <td>{gstAmount.toFixed(2)}</td>
              </tr>
              <tr>
                <td colSpan={5} id='gstlable'>GST (18%)</td>
                <td>{gstAmount.toFixed(2)}</td>
              </tr>
              <tr>
                <td colSpan={5} id='totallable'>Total</td>
                <td>{finalAmount.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="paymentdetails">
          <h4>Payment Mode: {clientData.paymentMode}</h4>
          <h4>Payment Ref No: {clientData.paymentRefNo}</h4>
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
