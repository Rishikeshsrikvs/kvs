import React from 'react'
import "./invoice.css"
import download from './../../assets/images/download.png';
import logo from './../../assets/images/logo.png';
import name from './../../assets/images/logo.png';
export const Invoice = () => {
  return (
    <div className="invoicemaincontainer">
      <div className='invoiceecontainer'>
          <div className="head">
            <div className="titleleftcontainer">
              <div className="red"></div>
              <div className="headtitle">
                <img src={logo} alt="" />
                <p>No.19,Kamaraj Nagar,<br/>Main Road, Avadi,<br/>Chennai-600071</p>
              </div>
            </div>
            <div className="titlerightcontainer">
              <h1>INVOICE FORM</h1>
            </div>
          </div>
          <div className="invoicedetails">
            <div className="leftdetails">
              <h3>BILL To</h3>
              <h3>Stark</h3>
              <h3>Stark@Gmail.com</h3>
              <h3>Address</h3>
              <h3>9498979695</h3>
            </div>
            <div className="rightdetails">
             <div className="rigtdetailsrow"> <span  className='lb'>Invoice No :</span>98972<span></span></div>
             <div className="rigtdetailsrow"> <span className='lb'>Date of issue :</span>17 jul 2024<span></span></div>
             <div className="rigtdetailsrow"> <span className='lb'>Due Date :</span>17 jul 2025<span></span></div>
            </div>
          </div>
          <div className="invoicetable">
            <table>
              <tr>
                <th>No</th>
                <th>List of Package</th>
                <th>Quality</th>
                <th>Discount</th>
                <th>Price</th>
              </tr>
              <tr>
                <td>1</td>
                <td>website</td>
                <td>quality</td>
                <td>2%</td>
                <td>3453</td>
              </tr>
              <tr>
                <td>1</td>
                <td>website</td>
                <td>quality</td>
                <td>2%</td>
                <td>3453</td>
              </tr>
              <tr>
                <td>1</td>
                <td>website</td>
                <td>quality</td>
                <td>2%</td>
                <td>3453</td>
              </tr>
              <tr>
                <td>1</td>
                <td>website</td>
                <td>quality</td>
                <td>2%</td>
                <td>3453</td>
              </tr>
              <tr>
                <td colSpan={4} id='gstlable'>Gst(18%)</td>
                <td>2356</td>
              </tr>
              <tr>
                <td colSpan={4} id='totallable'>total</td>
                <td>8735</td>
              </tr>
            </table>
          </div>
          <div className="paymentdetails">
            <h4>Payment Mode :</h4>
            <h4>Payment Ref No :</h4>
          </div>
          <div className="invoicefoot">
            <div className="note">
              <p>Disclaimer: no refunds are provided for packages that are purchased</p>
              <p>Note:lorem liuwwoie wwoifuyhwoe weiuifyhwue </p>
            </div>
            <div className="downloadcon">
              <button><img src={download} alt="" /><span>DOWNLOAD</span></button>
            </div>
          </div>

      </div>
    </div>
  )
}
