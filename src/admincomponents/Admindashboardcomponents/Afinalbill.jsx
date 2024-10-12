import React, { useEffect, useState, useRef } from 'react';
import './Afinalbill.css';
import api from '../../api/api';
import { useAuth } from "../Auth/AuthContext";
import { useLocation } from 'react-router-dom';
import logo from './../../assets/images/logo.png';
import { toWords } from 'number-to-words';
import html2pdf from 'html2pdf.js';

const Afinalbill = () => {
  const [invoiceData, setInvoiceData] = useState(null);
  const [downloaded, setDownloaded] = useState(false);  // State to track if the PDF has been downloaded
  const { token } = useAuth();
  const location = useLocation();
  const invoiceNumber = location.state?.invoiceNumber;
  const paymentMode = location.state?.paymentMode;
  const accountType = location.state?.accountType;
  const accountNumber = location.state?.accountNumber;
  
  // Ref to the bill container
  const billRef = useRef();
  console.log(paymentMode);
  

  useEffect(() => {
    const fetchInvoiceData = async () => {
      try {
        const response = await api.get(`/api/admin/invoice/${invoiceNumber}`, {
          headers: {
            authorization: `${token}`,
          },
        });
        setInvoiceData(response.data.invoiceDetailes);
        console.log(response.data.invoiceDetailes);
        
      } catch (error) {
        console.error("Error fetching invoice data:", error);
      }
    };

    if (invoiceNumber) {
      fetchInvoiceData();
    }
  }, [invoiceNumber, token]);

  // Calculate subtotal, GST, and total
  const calculateInvoiceTotals = () => {
    if (!invoiceData) return { subtotal: 0, gst: 0, total: 0 };

    const subtotal = invoiceData.client_Plan.reduce((acc, plan) => acc + plan.price, 0);
    const gst = (subtotal * 0.18).toFixed(2);
    const total = (subtotal + parseFloat(gst)).toFixed(2);

    return { subtotal, gst, total };
  };

  const { subtotal, gst, total } = calculateInvoiceTotals();

  // Function to handle PDF download
  const handleDownload = () => {
    if (!downloaded && billRef.current) {
      const clientName = invoiceData.client_name.replace(/\s+/g, '_');
      const clientId = invoiceData.client_id;
      const issueDate = new Date(invoiceData.date_of_issue).toLocaleDateString().replace(/\//g, '-');
      
      const pdfName = `${clientName}_${clientId}_${issueDate}.pdf`;
      
      // Generate PDF
      const options = {
        margin: 0.2,
        filename: pdfName,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
      };

      html2pdf()
        .from(billRef.current)
        .set(options)
        .save()
        .then(() => setDownloaded(true)); // Set downloaded to true after saving
    }
  };

  return (
    <div className="mainbill-container">
      <div className="bill-container" ref={billRef}>
        <h1 className="bill-header">BILL</h1>
        <div className='cmpdetails'>
          <div className="cmpdetailsleft">
            <img src={logo} alt="Logo" />
            <p><span>Address : </span>
              No.19, Kamaraj Nagar,
              Main Road, Avadi,
              Chennai-600071<br />
             <span> GST</span> - 33AJTPB6631J6ZY
            </p>
          </div>
          <div className="cmpdetailsright">
            <p><b>Invoice No</b> : {invoiceNumber}</p>
            <p><b>Billing Date:</b> {invoiceData ? new Date(invoiceData.date_of_issue).toLocaleDateString() : ''}</p>
          </div>
        </div>
        <hr />
        {invoiceData && (
          <>
            <div className="clientdetails">
              <h1>BILLED TO</h1>
              <p><span className='cldetleft'>Client</span><span className='cldetright'>: {invoiceData.client_name}</span></p>
              <p><span className='cldetleft'>Location</span><span className='cldetright'>: {invoiceData.client_Location}</span></p>
              <p><span className='cldetleft'>GST</span><span className='cldetright'>: {invoiceData.client_GST}</span></p>
              <p><span className='cldetleft'>Mobile</span><span className='cldetright'>: {invoiceData.client_mobile}</span></p>
            </div>

            <div className="invoice-table">
              <table>
                <thead>
                  <tr>
                    <th>Sl.no</th>
                    <th>Package List</th>
                    <th>Package Details</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {invoiceData.client_Plan.map((plan, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{plan.name}</td>
                      <td>{plan.package}</td>
                      <td>₹ {plan.price}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="2" rowSpan="5"className="invoice-info">
                      <p>GST NO : {invoiceData.client_GST}</p>
                      {paymentMode === 'online' && (
                        <p> AccountNumber : 
                        {
                         (accountType === 'kvs' ? ' KVS' : accountNumber)
                          }
                      </p>
                      )}
                    </td>
                    <td>Sub Total</td>
                    <td>₹ {subtotal.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td>GST : 18%</td>
                    <td>₹ {gst}</td>
                  </tr>
                  <tr>
                    <td>Discount :</td>
                    <td>₹ {invoiceData.discount}</td>
                  </tr>
                  <tr>
                    <td>Due Amount :</td>
                    <td>₹ {invoiceData.due_amount}</td>
                  </tr>
                  <tr>
                    <td><strong>Total:</strong></td>
                    <td><strong>₹ {total}</strong></td>
                  </tr>
                  <tr>
                    <td colSpan="4" className="amount-in-words">
                      Amount in words : <strong>{toWords(Number(total.split('.')[0]))} RUPEES ONLY</strong>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </>
        )}

        <div className="billfoot">
          <h3>Mode of Payment : {paymentMode}</h3>
          <h3>Terms & Conditions :-</h3>
          <ul>
            <li>No refunds are offered after services purchased.</li>
          </ul>
          <br />
          <h3>Declaration</h3>
          <p>We hereby declare that the amounts mentioned in this bill accurately reflect the prices of the services rendered. All charges are legitimate and no additional costs have been incurred beyond what is specified herein.</p>
        </div>
        <br />
        <div className="billsign">
          <div className="bollsnleft">
            <p className='bollsnlefttitle'>For Queries Related Services</p>
            <p className='bollsnleftcontact'>Phone : +91 73581 213 85 / +91 73581 213 84</p>
            <p className='bollsnleftcontact'> Email : info@srikvstech.com</p>
          </div>
        </div>
        <hr />
        <h3 className='billfooter'>This is a computer generated bill</h3>
      </div>

      {/* Button to download the PDF */}
      {invoiceData && !downloaded && (
        <button onClick={handleDownload} className="billdownload-button">Download Bill</button>
      )}
    </div>
  );
}

export default Afinalbill;
