import React, { useEffect, useState } from 'react';
import './Afinalbill.css';
import api from '../../api/api';
import { useAuth } from "../Auth/AuthContext";
import { useLocation } from 'react-router-dom';
import logo from './../../assets/images/logo.png';

const Afinalbill = () => {
  const [invoiceData, setInvoiceData] = useState(null);
  const { token } = useAuth();
  const location = useLocation();
  const invoiceNumber = location.state?.invoiceNumber;

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
  return (
    <div className="mainbill-container">
      <div className="bill-container">
      <h1 className="bill-header">BILL</h1>
      <div className='cmpdetails'>
        <div className="cmpdetailsleft">
        
              <img src={logo} alt="Logo" />
              <p>
                No.19, Kamaraj Nagar,
                
                Main Road, Avadi,
               
                Chennai-600071
                <br />
                GST - 33AJTPB6631J6ZY
              </p>
           
        </div>
        <div className="cmpdetailsright">
            <p>Invoice No :{invoiceNumber}</p>
            <p>Date of Issue: {invoiceData ? new Date(invoiceData.date_of_issue).toLocaleDateString() : ''}</p>
            <p>Due Date: {invoiceData ? new Date(invoiceData.due_date).toLocaleDateString() : ''}</p>
          </div>
      </div>
      <hr />
      {invoiceData && (
          <>
       <div className="clientdetails">
              <h1>BILLED TO</h1>
              <p><span className='cldetleft'>Name</span><span className='cldetright'>: {invoiceData.client_name}</span></p>
              <p><span className='cldetleft'>Location</span><span className='cldetright'>: {invoiceData.client_Location}</span></p>
              <p><span className='cldetleft'>GST</span><span className='cldetright'>: {invoiceData.client_GST}</span></p>
              <p><span className='cldetleft'>Email</span><span className='cldetright'>: {invoiceData.client_email}</span></p>
              <p><span className='cldetleft'>Mobile</span><span className='cldetright'>: {invoiceData.client_mobile}</span></p>
        </div>
    
      <div class="invoice-table">
  <table>
    <thead>
      <tr>
        <th>No</th>
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
                      <td>₹{plan.price}</td>
                    </tr>
                  ))}
     
    </tbody>
    <tfoot>
      <tr>
        <td colspan="2" rowspan="3" class="invoice-info">
         
          <p>GST NO.: 33AADCK3798D1ZJ</p>
         
        </td>
        <td>Sub Total</td>
        <td>{invoiceData.total_amount}</td>
      </tr>
      <tr>
        <td>GST : 18%</td>
        <td>45.00</td>
      </tr>

 
      <tr>
        <td><strong>Total:</strong></td>
        <td><strong>{invoiceData.total_amount}</strong></td>
      </tr>
      <tr>
        <td colspan="5" class="amount-in-words">Amount in words: <strong>FIVE HUNDRED AND NINETY RUPEES</strong></td>
      </tr>
    </tfoot>
  </table>
</div>
</>
        )}

    <div className="billfoot">
      <h3>Terms & Conditions :-</h3>
      <ul>
        <li>No refunds are offered arter services purchased</li>
      </ul>
      <h3>
        Declaration
      </h3>
      <p>We declare that this in this bill shows actual prices of the services described</p>

    </div>
    <div className="billsign">
      <div className="bollsnleft">
        <p>For Queries Related Services</p>
        <p>Phone : f4235638746/34526</p>
        Email : asfgyffguyqfg
      </div>
      <div className="bollsnright">
        <p>For SRI KVS TECH</p>
        <img src="" alt="" />
        <p>Authorized signature</p>
      </div>
    </div>
    <hr />
    <h3 className='bil'>This is a computer generated invoicve</h3>

      </div>
    </div>
  )
}

export default Afinalbill
