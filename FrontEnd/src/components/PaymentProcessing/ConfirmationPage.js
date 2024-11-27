import React, { useEffect } from "react";
import './orderForm.css';

const ConfirmationPage = ({ trackingId }) => {

  useEffect(() => {
    const postOrder = async () => {
      const currentDate = new Date();
      const arrivalDate = new Date(currentDate.setDate(currentDate.getDate() + 4)); // 4 days from current date

      const orderData = {
        trackingID: trackingId,
        arrivalDate: arrivalDate.toISOString(),
        orderStatus: "en route",
      };

      try {
        const response = await fetch("http://localhost:3001/order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        });

        if (!response.ok) {
          throw new Error("Failed to post order data");
        }
        const result = await response.json();
        console.log("Order posted successfully:", result);
      } catch (error) {
        console.error("Error posting order:", error);
      }
    };

    postOrder();
  }, [trackingId]);

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
            <p className="FormLabel">Your tracking ID is: TRK123456</p>
            <p className="FormLabel">Estimated Delivery: 4 days</p>
            <button onClick={handleReset} className="FormButton">Confirm</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;
