import React from "react";
import './orderForm.css';

const OrderSummary = ({ details, onConfirm }) => {
  const { sourceAddress, destinationAddress } = details;

  return (
    <div className="Container">
      <div className="FormWrap">
        <div className="FormContent">
          <div className="Form">
            <h1 className="FormH1">Order Summary</h1>
            <p className="FormLabel"><strong>Delivery Type:</strong> {details.deliveryType}</p>
            <p className="FormLabel"><strong>Weight:</strong> {details.weight} kg</p>

            <h3 className="FormLabel">Source Address:</h3>
            <p className="FormLabel"><strong>Address:</strong> {sourceAddress.address}</p>
            <p className="FormLabel"><strong>Postal Code:</strong> {sourceAddress.postalCode}</p>
            <p className="FormLabel"><strong>City:</strong> {sourceAddress.city}</p>
            <p className="FormLabel"><strong>Country:</strong> {sourceAddress.country}</p>
            
            <h3 className="FormLabel">Destination Address:</h3>
            <p className="FormLabel"><strong>Address:</strong> {destinationAddress.address}</p>
            <p className="FormLabel"><strong>Postal Code:</strong> {destinationAddress.postalCode}</p>
            <p className="FormLabel"><strong>City:</strong> {destinationAddress.city}</p>
            <p className="FormLabel"><strong>Country:</strong> {destinationAddress.country}</p>

            <p className="FormLabel"><strong>Total Cost:</strong> ${details.cost}</p>

            <button onClick={onConfirm} className="FormButton">Confirm Order</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
