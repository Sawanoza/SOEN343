import React, { useState } from "react";
import './orderForm.css';

const PaymentForm = ({ cost, onComplete, onCancel }) => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [cardDetails, setCardDetails] = useState({ cardNumber: "", expiryDate: "", cvv: "" });
  const [wireDetails, setWireDetails] = useState({ accountNumber: "", bankName: "", swiftCode: "" });
  const [chequeDetails, setChequeDetails] = useState({ chequeNumber: "", bankName: "" });
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (paymentMethod === "credit-card" && (!cardDetails.cardNumber || !cardDetails.expiryDate || !cardDetails.cvv)) {
      alert("Please fill out all credit card details.");
      return;
    }
  
    if (paymentMethod === "wiretransfer" && (!wireDetails.accountNumber || !wireDetails.bankName || !wireDetails.swiftCode)) {
      alert("Please fill out all wire transfer details.");
      return;
    }
  
    if (paymentMethod === "cheque" && (!chequeDetails.chequeNumber || !chequeDetails.bankName)) {
      alert("Please fill out all cheque details.");
      return;
    }
  
    if (!paymentMethod) {
      alert("Please select a payment method.");
      return;
    }
  
    ///===============================================================================================
    // SEND EMAIL
    ///===============================================================================================
    const trackingID = localStorage.getItem('trackingID');
    const arrivalDate = localStorage.getItem('arrivalDate');
    const pin = localStorage.getItem('pin');
    
    try {
      const response = await fetch('http://localhost:3000/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recipient: email,
          subject: 'Payment Received',
          message: `Payment of $${cost} was made using ${paymentMethod}.\n\nYour tracking ID is: ${trackingID}.\nYour estimated arrival date is: ${arrivalDate}. \nYour PIN for this delivery is: ${pin}.`,
        }),
      });
  
      const data = await response.json();
  
      if (data.success) {
        console.log('Email sent:', data.message);
      } else {
        console.error('Error sending email:', data.message);
      }
  
      onComplete();
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  //===============================================================================================
  // INPUT FORMATTING
  //===============================================================================================
  //format card number input to add spaces after every 4 digits
  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 4) {
      value = value.replace(/(\d{4})(?=\d)/g, "$1 "); 
    }
    setCardDetails({ ...cardDetails, cardNumber: value });
  };

  //format expiry date input to add a slash after the month (MM/YY format)
  const handleExpiryDateChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); 
    if (value.length > 2) {
      value = value.replace(/^(\d{2})(\d{0,2})/, "$1/$2"); 
    }
    setCardDetails({ ...cardDetails, expiryDate: value });
  };

  //format CVV input to accept only 3 digits
  const handleCvvChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); 
    if (value.length > 3) {
      value = value.slice(0, 3); 
    }
    setCardDetails({ ...cardDetails, cvv: value });
  };
  //===============================================================================================

  return (
    <div className="Container">
      <div className="FormWrap">
        <div className="FormContent">
          <div className="Form">
            <h1 className="FormH1">Payment Form</h1>
            <p className="FormLabel"><strong>Total Cost:</strong> ${cost}</p>
            <form onSubmit={handleSubmit}>


              {/* Email Input */}
              <label className="FormLabel">
                Your Email:
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="FormInput"
                  required
                  placeholder="Enter your email"/>
              </label>


              <label className="FormLabel">
                Payment Method:
                <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} className="FormInput">
                  <option value="">Select</option>
                  <option value="credit-card">Credit Card</option>
                  <option value="wiretransfer">Wire Transfer</option>
                  <option value="cheque">Cheque</option>
                </select>
              </label>
              <br />

              {/* Credit Card Fields */}
              {paymentMethod === "credit-card" && (
                <div>
                  <h3 className="FormLabel">Credit Card Details</h3>
                  <label className="FormLabel">
                    Card Number:
                    <input
                      type="text"
                      value={cardDetails.cardNumber}
                      onChange={handleCardNumberChange}
                      className="FormInput"
                      maxLength="19" 
                      placeholder="XXXX XXXX XXXX XXXX" 
                    />
                  </label>
                  <br />
                  <label className="FormLabel">
                    Expiry Date:
                    <input
                      type="text"
                      value={cardDetails.expiryDate}
                      onChange={handleExpiryDateChange}
                      className="FormInput"
                      maxLength="5" 
                      placeholder="MM/YY" 
                    />
                  </label>
                  <br />
                  <label className="FormLabel">
                    CVV:
                    <input
                      type="text"
                      value={cardDetails.cvv}
                      onChange={handleCvvChange}
                      className="FormInput"
                      maxLength="3" 
                      placeholder="CVV"  
                    />
                  </label>
                  <br />
                </div>
              )}

              {/* Wire Transfer Fields */}
              {paymentMethod === "wiretransfer" && (
                <div>
                  <h3 className="FormLabel">Wire Transfer Details</h3>
                  <label className="FormLabel">
                    Account Number:
                    <input
                      type="text"
                      value={wireDetails.accountNumber}
                      onChange={(e) => setWireDetails({ ...wireDetails, accountNumber: e.target.value })}
                      className="FormInput"
                    />
                  </label>
                  <br />
                  <label className="FormLabel">
                    Bank Name:
                    <input
                      type="text"
                      value={wireDetails.bankName}
                      onChange={(e) => setWireDetails({ ...wireDetails, bankName: e.target.value })}
                      className="FormInput"
                    />
                  </label>
                  <br />
                  <label className="FormLabel">
                    SWIFT Code:
                    <input
                      type="text"
                      value={wireDetails.swiftCode}
                      onChange={(e) => setWireDetails({ ...wireDetails, swiftCode: e.target.value })}
                      className="FormInput"
                    />
                  </label>
                  <br />
                </div>
              )}

              {/* Cheque Fields */}
              {paymentMethod === "cheque" && (
                <div>
                  <h3 className="FormLabel">Cheque Details</h3>
                  <label className="FormLabel">
                    Cheque Number:
                    <input
                      type="text"
                      value={chequeDetails.chequeNumber}
                      onChange={(e) => setChequeDetails({ ...chequeDetails, chequeNumber: e.target.value })}
                      className="FormInput"
                    />
                  </label>
                  <br />
                  <label className="FormLabel">
                    Bank Name:
                    <input
                      type="text"
                      value={chequeDetails.bankName}
                      onChange={(e) => setChequeDetails({ ...chequeDetails, bankName: e.target.value })}
                      className="FormInput"
                    />
                  </label>
                  <br />
                </div>
              )}

              <button type="submit" className="FormButton">Pay</button>
              <button type="button" onClick={onCancel} className="FormButton CancelButton">Cancel</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
