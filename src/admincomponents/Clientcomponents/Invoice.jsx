import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "./invoice.css";
import download from "./../../assets/images/download.png";
import logo from "./../../assets/images/logo.png";
import { useAuth } from "../Auth/AuthContext";
import api from "../../api/api";

export const Invoice = () => {
  const [clientData, setClientData] = useState(null);
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [monthOfInvoice, setMonthOfInvoice] = useState(""); // Initial value for month of invoice
  const [yearOfInvoice, setYearOfInvoice] = useState(new Date().getFullYear()); // Initial value for year
  const [discount, setDiscount] = useState(0);
  const [discountError, setDiscountError] = useState(""); // Initial value for discount
  const [issueDate, setIssueDate] = useState(""); // State for issue date
  const [dueAmount, setDueAmount] = useState(0);
  const [dueDate, setDueDate] = useState(""); // State for due date
  const [applyGST, setApplyGST] = useState(true); // Toggle state for GST
  const [invoiceGenerated, setInvoiceGenerated] = useState(false);

  const { token } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { client_id } = location.state || {};

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        const response = await api.get(`/api/admin/getClient/${client_id}`, {
          headers: {
            authorization: `${token}`,
          },
        });

        if (response.data && response.data.clientDetailes) {
          setClientData(response.data.clientDetailes);
        } else {
          console.error("Client details not found in response data");
        }
      } catch (error) {
        console.error("Error fetching client data:", error);
      }
    };

    fetchClientData();
  }, [client_id, token]);

  const handleDiscountChange = (e) => {
    const value = parseFloat(e.target.value);

    if (value < 0 || value > 100) {
      setDiscountError("Discount must be between 0 and 100"); // Set error message if invalid
    } else {
      setDiscountError(""); // Clear error if valid
    }

    setDiscount(value);
  };

  const formatDate = (dateString) => {
    const [datePart] = dateString.split("T");
    return datePart; // This will be in YYYY-MM-DD format
  };

  const formatMonthYear = (month, year) => {
    return `${month} ${year}`;
  };

  if (!clientData) {
    return <div>Loading...</div>;
  }

  const gstRate = 0.18;
  const totalPrice =
    clientData.client_Plan?.reduce(
      (acc, service) => acc + parseFloat(service.price),
      0
    ) || 0;
  const gstAmount = applyGST ? totalPrice * gstRate : 0; // Only apply GST if toggle is checked
  const totalPriceWithGst = totalPrice + gstAmount;
  const discountPercentage = parseFloat(discount) / 100 || 0;
  const discountAmount = totalPriceWithGst * discountPercentage;
  const finalAmount =
    totalPriceWithGst - discountAmount + parseFloat(dueAmount || 0);

  const generateInvoice = async () => {
    try {
      const formattedMonthYear = formatMonthYear(monthOfInvoice, yearOfInvoice);

      const data = {
        client_id,
        month_of_invoice: formattedMonthYear, // Value from state
        total_amount: finalAmount,
        discount: parseFloat(discount), // Value from state
        due_amount: parseFloat(dueAmount),
      };

      const response = await api.post("/api/admin/invoiceUpload", data, {
        headers: {
          authorization: `${token}`,
        },
      });

      if (response.data && response.data.invoice_no) {
        setInvoiceNumber(response.data.invoice_no);
        setIssueDate(formatDate(response.data.date_of_issue));
        setDueDate(formatDate(response.data.due_date));
        setInvoiceGenerated(true);
      } else {
        console.error("Invoice number not found in response data");
      }
    } catch (error) {
      console.error("Error generating invoice:", error);
    }
  };
  const setBackgroundNone = () => {
    const disbtn = document.querySelector(".invoicedescon");
    disbtn.style.display = "block";
    const gstbtn = document.querySelector("#gstbtn");
    gstbtn.style.display = "none";
    const selectmonth = document.querySelector("#dropdowncontainer");
    selectmonth.style.display = "none";
    const elements = document.querySelectorAll(".rb");
    elements.forEach((element) => {
      element.style.backgroundColor = "white";
      element.style.height = "30px"; // or '' to reset to default
    });
  };
  const downloadPDF = () => {
    setBackgroundNone();
    const downloadButton = document.querySelector(".downloadcon");
    if (downloadButton) downloadButton.style.display = "none";

    const input = document.getElementById("invoice-content");

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position -= pageHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      if (!invoiceNumber) {
        console.error("Invoice number is not set.");
        return; // Prevent download if invoice number is not ready
      }
    
      const formattedMonthYear = `${monthOfInvoice}/${yearOfInvoice}`;
      const clientName = clientData.client_name.replace(/\s+/g, '_'); // Replace spaces with underscores for filename
      const invoiceFilename = `Invoice-${invoiceNumber} - ${clientName} ${formattedMonthYear}.pdf`;
    
      console.log("Downloading PDF with filename:", invoiceFilename); // Debugging log
    
      pdf.save(invoiceFilename);

      if (downloadButton) downloadButton.style.display = "block";
    });
  };
  const handleBackClick = () => {
    navigate(`/admin/SHRA/dashboard/clients`); // Go back to the previous page
  };
  return (
    <div className="invoicemaincontainer">
      <div id="invoice-content" className="invoiceecontainer">
        <div className="head">
          <div className="titleleftcontainer">
            <div className="red"></div>
            <div className="headtitle">
              <img src={logo} alt="Logo" />
              <p>
                No.19, Kamaraj Nagar,
                <br />
                Main Road, Avadi,
                <br />
                Chennai-600071
                <br />
                GST - 33AJTPB6631J6ZY
              </p>
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
            {applyGST && <h3>GST No: {clientData.client_GST}</h3>}
          </div>
          <div className="rightdetails">
            <div className="rigtdetailsrow">
              <span className="lb">Invoice No :</span>
              <span className="rb"> {invoiceNumber}</span>
            </div>
            <div className="rigtdetailsrow">
              <span className="lb">Date of issue :</span>{" "}
              <span className="rb">{issueDate}</span>
            </div>
            <div className="rigtdetailsrow">
              <span className="lb">Due Date :</span>{" "}
              <span className="rb">{dueDate}</span>
            </div>
            <div className="rigtdetailsrow" id="dropdowncontainer">
              <span className="lb">Month of Invoice:</span>
              <div className="dropdown-container">
                <select
                  className="rb"
                  value={monthOfInvoice}
                  onChange={(e) => setMonthOfInvoice(e.target.value)}
                >
                  <option value=""></option>
                  {[
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec",
                  ].map((month, index) => (
                    <option key={index} value={month}>
                      {month}
                    </option>
                  ))}
                </select>

                <input
                  type="number"
                  className="rb"
                  placeholder="year"
                  value={yearOfInvoice}
                  onChange={(e) =>
                    setYearOfInvoice(parseInt(e.target.value, 10))
                  }
                  min={2000}
                  max={new Date().getFullYear() + 10}
                />
              </div>
            </div>
            <div className="rigtdetailsrow">
              <span className="lb">Discount (%):</span>
              <input
                type="number"
                className="rb"
                max={"100"}
                min={"0"}
                value={discount}
                onChange={handleDiscountChange}
              />
            </div>
            {discountError && <p style={{ color: "red" }}>{discountError}</p>}{" "}
            {/* Conditionally render error */}
            <div className="rigtdetailsrow">
              <span className="lb">Due Amount:</span>
              <input
                type="number"
                className="rb"
                value={dueAmount}
                onChange={(e) => setDueAmount(parseFloat(e.target.value))}
              />
            </div>
            <div className="rigtdetailsrow" id="gstbtn">
              <span className="lb">Apply GST:</span>
              <input
                type="checkbox"
                className="rb"
                checked={applyGST}
                onChange={() => setApplyGST(!applyGST)}
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
              {applyGST && (
                <tr>
                  <td colSpan={3} id="gstlabel">
                    GST (18%)
                  </td>
                  <td>{gstAmount.toFixed(2)}</td>
                </tr>
              )}
              <tr>
                <td colSpan={3} id="discountlabel">
                  Discount ({discount}%)
                </td>
                <td>{discountAmount.toFixed(2)}</td>
              </tr>
              <tr>
                <td colSpan={3} id="dueAmountLabel">
                  Due Amount{" "}
                </td>
                <td>{parseFloat(dueAmount || 0).toFixed(2)}</td>
              </tr>
              <tr>
                <td colSpan={3} id="totallabel">
                  Total Amount
                </td>
                <td id="totalvalue">{finalAmount.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="invoicedescon">
          DISCLAIMER: NO REFUND ARE OFFER FOR PRODUCTS/SERVICES PURCHASED. THANK
          YOU FOR YOUR UNDERSTANDING.
        </div>
      </div>
      <div className="downloadcon">
        <button onClick={handleBackClick}>
          <span>BACK</span>
        </button>
        <button onClick={generateInvoice}>
          <span>GENERATE</span>
        </button>
        {invoiceGenerated && ( // Show PRINT button only if the invoice has been generated
    <button onClick={downloadPDF}>
      <img src={download} alt="Download" />
      <span>PRINT</span>
    </button>
  )}
      </div>
    </div>
  );
};
