import React, { useEffect, useState } from "react";
import './orderForm.css';

const ConfirmationPage = () => {
  const [trackingID, setTrackingID] = useState("");
  const [arrivalDate, setArrivalDate] = useState("");
  const [pin, setPin] = useState("");

  useEffect(() => {
    // Retrieve data from localStorage
    const storedTrackingID = localStorage.getItem("trackingID");
    const storedArrivalDate = localStorage.getItem("arrivalDate");
    const storedPin = localStorage.getItem("pin");

    setTrackingID(storedTrackingID || "N/A");
    setArrivalDate(storedArrivalDate || "N/A");
    setPin(storedPin || "N/A");
  }, []);

  const handleReset = () => {
    window.location.href = "../../../HTML/userPage.html";
  };

  return (
    <div className="Container">
      <div className="FormWrap">
        <div className="FormContent">
          <div className="Form">
            <h1 className="FormH1">Order Confirmation</h1>
            <p className="FormLabel">Thank you for your order!</p>
            <p className="FormLabel">Your tracking ID is: {trackingID}</p>
            <p className="FormLabel">Estimated Delivery Date: {arrivalDate}</p>
            <p className="FormLabel">Your PIN is: {pin}</p>
            <button onClick={handleReset} className="FormButton">Confirm</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;