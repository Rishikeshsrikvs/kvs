import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './invoice.css';
import download from './../../assets/images/download.png';
import logo from './../../assets/images/logo.png';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

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
    const input = document.getElementById('invoice-content');
    
    html2canvas(input, { scale: 2 }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'a4'
      });

      const pdfWidth = 210; // A4 width in mm
      const pdfHeight = 297; // A4 height in mm

      const imgWidth = canvas.width * 210 / canvas.height; // Calculate width in mm
      const imgHeight = canvas.height * 210 / canvas.width; // Calculate height in mm

      if (imgHeight > pdfHeight) {
        const scale = pdfHeight / imgHeight;
        pdfWidth = pdfWidth * scale;
        imgHeight = pdfHeight;
        imgWidth = imgWidth * scale;
      }

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`invoice_${id}.pdf`);
    });
  };

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
            <h3>BILL TO</h3>
            <h3>{clientData.clientName}</h3>
            <h3>{clientData.email}</h3>
            <h3>{clientData.location}</h3>
            <h3>{clientData.phone}</h3>
          </div>
          <div className="rightdetails">
            <div className="rigtdetailsrow"><span className='lb'>Invoice No :</span> 98972</div>
            <div className="rigtdetailsrow"><span className='lb'>Date of issue :</span> {new Date().toLocaleDateString()}</div>
            <div className="rigtdetailsrow"><span className='lb'>Due Date :</span> {new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toLocaleDateString()}</div>
          </div>
        </div>
        <div className="invoicetable">
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>List of Package</th>
                <th>Quality</th>
                <th>Discount</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {clientData.services.map((service, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{service}</td>
                  <td>{clientData.quality}</td>
                  <td>{clientData.discount}</td>
                  <td>{servicePrice}</td>
                </tr>
              ))}
              <tr>
                <td colSpan={4} id='gstlable'>GST (18%)</td>
                <td>{gstAmount}</td>
              </tr>
              <tr>
                <td colSpan={4} id='totallable'>Total</td>
                <td>{finalAmount}</td>
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
              <img src={download} alt="Download" /><span>DOWNLOAD</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
