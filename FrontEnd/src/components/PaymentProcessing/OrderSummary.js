import React from "react";

const OrderSummary = ({ details, onConfirm }) => {
  // Destructure source and destination addresses
  const { sourceAddress, destinationAddress } = details;

  return (
    <div>
      <h1>Order Summary</h1>
      <p>Delivery Type: {details.deliveryType}</p>
      <p>Weight: {details.weight} kg</p>
      <h3>Source Address:</h3>
      <p>{sourceAddress.address}</p>
      <p>{sourceAddress.postalCode}</p>
      <p>{sourceAddress.city}</p>
      <p>{sourceAddress.country}</p>
      
      <h3>Destination Address:</h3>
      <p>{destinationAddress.address}</p>
      <p>{destinationAddress.postalCode}</p>
      <p>{destinationAddress.city}</p>
      <p>{destinationAddress.country}</p>
      
      <p>Total Cost: ${details.cost}</p>
      <button onClick={onConfirm}>Confirm Order</button>
    </div>
  );
};

export default OrderSummary;
