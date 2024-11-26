import React, { useState } from "react";

const PaymentForm = ({ cost, onComplete, onCancel }) => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [cardDetails, setCardDetails] = useState({ cardNumber: "", expiryDate: "", cvv: "" });
  const [wireDetails, setWireDetails] = useState({ accountNumber: "", bankName: "", swiftCode: "" });
  const [chequeDetails, setChequeDetails] = useState({ chequeNumber: "", bankName: "" });

  const handleSubmit = (e) => {
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

    onComplete();
  };

  return (
    <div>
      <h1>Payment Form</h1>
      <p>Total Cost: ${cost}</p>
      <form onSubmit={handleSubmit}>
        <label>
          Payment Method:
          <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
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
            <h3>Credit Card Details</h3>
            <label>
              Card Number:
              <input
                type="text"
                value={cardDetails.cardNumber}
                onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: e.target.value })}
              />
            </label>
            <br />
            <label>
              Expiry Date:
              <input
                type="text"
                placeholder="MM/YY"
                value={cardDetails.expiryDate}
                onChange={(e) => setCardDetails({ ...cardDetails, expiryDate: e.target.value })}
              />
            </label>
            <br />
            <label>
              CVV:
              <input
                type="text"
                value={cardDetails.cvv}
                onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
              />
            </label>
            <br />
          </div>
        )}

        {/* Wire Transfer Fields */}
        {paymentMethod === "wiretransfer" && (
          <div>
            <h3>Wire Transfer Details</h3>
            <label>
              Account Number:
              <input
                type="text"
                value={wireDetails.accountNumber}
                onChange={(e) => setWireDetails({ ...wireDetails, accountNumber: e.target.value })}
              />
            </label>
            <br />
            <label>
              Bank Name:
              <input
                type="text"
                value={wireDetails.bankName}
                onChange={(e) => setWireDetails({ ...wireDetails, bankName: e.target.value })}
              />
            </label>
            <br />
            <label>
              SWIFT Code:
              <input
                type="text"
                value={wireDetails.swiftCode}
                onChange={(e) => setWireDetails({ ...wireDetails, swiftCode: e.target.value })}
              />
            </label>
            <br />
          </div>
        )}

        {/* Cheque Fields */}
        {paymentMethod === "cheque" && (
          <div>
            <h3>Cheque Details</h3>
            <label>
              Cheque Number:
              <input
                type="text"
                value={chequeDetails.chequeNumber}
                onChange={(e) => setChequeDetails({ ...chequeDetails, chequeNumber: e.target.value })}
              />
            </label>
            <br />
            <label>
              Bank Name:
              <input
                type="text"
                value={chequeDetails.bankName}
                onChange={(e) => setChequeDetails({ ...chequeDetails, bankName: e.target.value })}
              />
            </label>
            <br />
          </div>
        )}

        <button type="submit">Pay</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
