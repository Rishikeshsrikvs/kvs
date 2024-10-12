import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './Afinalbill.css';
import logo from './../../assets/images/logo.png';
import { toWords } from 'number-to-words';
import html2pdf from 'html2pdf.js';

const Afinalman = () => {
  const location = useLocation();
  const { paymentMode, accountType, accountNumber, rollNumber, clientName, clientLocation, clientGST, clientMobile, serviceDetails } = location.state || {};
  
  const [discount, setDiscount] = useState(0);
  const [downloaded, setDownloaded] = useState(false);
  const billRef = useRef();

  const calculateInvoiceTotals = () => {
    const subtotal = serviceDetails?.reduce((acc, service) => acc + parseFloat(service.price || 0), 0);
    const gst = (subtotal * 0.18).toFixed(2);
    const total = (subtotal + parseFloat(gst) - discount).toFixed(2);

    return { subtotal, gst, total };
  };

  const { subtotal, gst, total } = calculateInvoiceTotals();

  const handleDownload = () => {
    if (!downloaded && billRef.current) {
      const pdfName = `${clientName.replace(/\s+/g, '_')}.pdf`;

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
        .then(() => setDownloaded(true));
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
              No.19, Kamaraj Nagar, Main Road, Avadi, Chennai-600071<br />
              <span> GST</span> - 33AJTPB6631J6ZY
            </p>
          </div>
          <div className="cmpdetailsright">
            <p><b>Client Name</b>: {clientName}</p>
            <p><b>Billing Date:</b> {new Date().toLocaleDateString()}</p>
          </div>
        </div>
        <hr />

        <div className="clientdetails">
          <h1>BILLED TO</h1>
          <p><span className='cldetleft'>Client</span><span className='cldetright'>: {clientName}</span></p>
          <p><span className='cldetleft'>Location</span><span className='cldetright'>: {clientLocation}</span></p>
          <p><span className='cldetleft'>GST</span><span className='cldetright'>: {clientGST}</span></p>
          <p><span className='cldetleft'>Mobile</span><span className='cldetright'>: {clientMobile}</span></p>
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
              {serviceDetails?.map((service, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{service.name}</td>
                  <td>{service.package}</td>
                  <td>₹ {service.price}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="2" rowSpan="4" className="invoice-info">
                  <p>GST NO: {clientGST}</p>
                  {paymentMode === 'online' && (
                    <p>Account Number: {(accountType === 'kvs' ? ' KVS' : accountNumber)}</p>
                  )}
                </td>
                <td>Sub Total</td>
                <td>₹ {subtotal.toFixed(2)}</td>
              </tr>
              <tr>
                <td>GST: 18%</td>
                <td>₹ {gst}</td>
              </tr>
              <tr>
                <td>Discount:</td>
                <td>₹ {discount}</td>
              </tr>
              <tr>
                <td><strong>Total:</strong></td>
                <td><strong>₹ {total}</strong></td>
              </tr>
              <tr>
                <td colSpan="4" className="amount-in-words">
                  Amount in words: <strong>{toWords(Number(total.split('.')[0]))} RUPEES ONLY</strong>
                </td>
              </tr>
            </tfoot>
          </table>
          
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
      
      </div>
      <button onClick={handleDownload} className="billdownload-button">Download Bill</button>
    </div>
  );
};

export default Afinalman;
