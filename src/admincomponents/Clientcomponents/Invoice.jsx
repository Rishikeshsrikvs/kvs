import React, { useEffect, useState } from 'react';

import { useLocation } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './invoice.css';
import download from './../../assets/images/download.png';
import logo from './../../assets/images/logo.png';
import { useAuth } from '../Auth/AuthContext';
import api from '../../api/api';

export const Invoice = () => {
  const [clientData, setClientData] = useState(null);
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [monthOfInvoice, setMonthOfInvoice] = useState(''); // Initial value for month of invoice
  const [discount, setDiscount] = useState(0); // Initial value for discount in percentage
  const [issueDate, setIssueDate] = useState(''); // State for issue date
  const [dueAmount, setDueAmount] = useState(0);
  const [dueDate, setDueDate] = useState(''); // State for due date

  const { token } = useAuth();
  const location = useLocation();
  const { client_id } = location.state || {};

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        const response = await api.get(
          `/api/admin/getClient/${client_id}`,
          {
            headers: {
              authorization: `${token}`,
            },
          }
        );

        if (response.data && response.data.clientDetailes) {
          setClientData(response.data.clientDetailes);
         
          
        } else {
          console.error("Client details not found in response data");
        }
      } catch (error) {
        console.error('Error fetching client data:', error);
      }
    };

    fetchClientData();
  }, [client_id, token]);

  const formatDate = (dateString) => {
    const [datePart] = dateString.split('T');
    return datePart; // This will be in YYYY-MM-DD format
  };
  

  if (!clientData) {
    return <div>Loading...</div>;
  }

  const gstRate = 0.18;
  const totalPrice = clientData.client_Plan?.reduce((acc, service) => acc + parseFloat(service.price), 0) || 0;
  const gstAmount = totalPrice * gstRate;
  const totalPriceWithGst = totalPrice + gstAmount;
  const discountPercentage = parseFloat(discount) / 100 || 0;
  const discountAmount = totalPriceWithGst * discountPercentage;
  const finalAmount = totalPriceWithGst - discountAmount+ parseFloat(dueAmount || 0);
 

  const generateInvoice = async () => {
    try {
      const data = {
        client_id,
        month_of_invoice: monthOfInvoice, // Value from state
        total_amount: finalAmount,
        discount: parseFloat(discount), // Value from state
        due_amount: parseFloat(dueAmount),
      };

      const response = await api.post(
        '/api/admin/invoiceUpload',
        data,
        {
          headers: {
            authorization: `${token}`,
          },
        }
      );

      console.log('Invoice generated successfully:', response.data);

      if (response.data && response.data.invoice_no) {
        setInvoiceNumber(response.data.invoice_no);
        
        setIssueDate(formatDate(response.data.date_of_issue));
        setDueDate(formatDate(response.data.due_date));

        console.log(issueDate,dueDate);
      } else {
        console.error("Invoice number not found in response data");
      }
    } catch (error) {
      console.error('Error generating invoice:', error);
    }
  };

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
            <h3>{clientData.client_id}</h3>
            <h3>{clientData.client_email}</h3>
            <h3>{clientData.client_Location}</h3>
            <h3>GST: {clientData.client_GST}</h3>
          </div>
          <div className="rightdetails">
            <div className="rigtdetailsrow"><span className="lb">Invoice No :</span><span className="rb"> {invoiceNumber}</span></div>
            <div className="rigtdetailsrow"><span className="lb">Date of issue :</span> <span className="rb">{issueDate}</span></div>
            <div className="rigtdetailsrow"><span className="lb">Due Date :</span> <span className="rb">{dueDate}</span></div>
            <div className="rigtdetailsrow">
              <span className="lb">Month of Invoice:</span>
              <input
                type="text"
                className='rb'
                value={monthOfInvoice}
                placeholder='Aug 2024'
                onChange={(e) => setMonthOfInvoice(e.target.value)}
              />
            </div>
            <div className="rigtdetailsrow">
              <span className="lb">Discount (%):</span>
              <input
                type="number"
                className='rb'
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
              />
            </div>
            <div className="rigtdetailsrow">
              <span className="lb">Due Amount:</span>
              <input
                type="number"
                className='rb'
                value={dueAmount}
                onChange={(e) => setDueAmount(e.target.value)}
              />
            </div>
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
                <td colSpan={3} id="gstlabel">GST (18%)</td>
                <td>{gstAmount.toFixed(2)}</td>
              </tr>
              <tr>
                <td colSpan={3} id="discountlabel">Discount ({discount}%)</td>
                <td>{discountAmount.toFixed(2)}</td>
              </tr>
              <tr>
                <td colSpan={3} id="discountlabel">Due Amount </td>
                <td>{parseFloat(dueAmount || 0).toFixed(2)}</td>
              </tr>
              <tr>
                <td colSpan={3} id="totallabel">Total</td>
                <td>{finalAmount.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="invoicefoot">
          <div className="note">
            <p>Disclaimer : No refunds will be issued for purchased packages.</p>
            {/* <p>Note: lorem liuwwoie wwoifuyhwoe weiuifyhwue.</p> */}
          </div>
          <div className="downloadcon">
            <button onClick={generateInvoice}>
              <span>GENERATE</span> 
            </button>
            <button onClick={downloadPDF}>
              <img src={download} alt="Download" /><span>PRINT</span> 
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
