import React, { useState } from "react";

const OrderForm = ({ onComplete }) => {
  const [deliveryType, setDeliveryType] = useState("standard");
  const [weight, setWeight] = useState(0);
  const [sourceAddress, setSourceAddress] = useState({
    address: "",
    postalCode: "",
    city: "",
    country: "",
  });
  const [destinationAddress, setDestinationAddress] = useState({
    address: "",
    postalCode: "",
    city: "",
    country: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (weight > 0 && sourceAddress.address && sourceAddress.postalCode && sourceAddress.city && sourceAddress.country && destinationAddress.address && destinationAddress.postalCode && destinationAddress.city && destinationAddress.country) {
      const randomDistance = Math.floor(Math.random() * 500) + 1;
      let multiplier = 1;

      if (deliveryType === "express") multiplier = 2;
      if (deliveryType === "international") multiplier = 3;

      const cost = (weight * randomDistance * multiplier).toFixed(2);
      onComplete({ deliveryType, weight, sourceAddress, destinationAddress, cost });
    } else {
      alert("Please fill out all fields with valid values.");
    }
  };

  return (
    <div>
      <h1>Order Form</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Delivery Type:
          <select value={deliveryType} onChange={(e) => setDeliveryType(e.target.value)}>
            <option value="standard">Standard</option>
            <option value="express">Express</option>
            <option value="international">International</option>
          </select>
        </label>
        <br />
        <label>
          Weight (kg):
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(parseFloat(e.target.value))}
          />
        </label>
        <br />
        <h3>Source Address</h3>
        <label>
          Address:
          <input
            type="text"
            value={sourceAddress.address}
            onChange={(e) => setSourceAddress({ ...sourceAddress, address: e.target.value })}
          />
        </label>
        <br />
        <label>
          Postal Code:
          <input
            type="text"
            value={sourceAddress.postalCode}
            onChange={(e) => setSourceAddress({ ...sourceAddress, postalCode: e.target.value })}
          />
        </label>
        <br />
        <label>
          City:
          <input
            type="text"
            value={sourceAddress.city}
            onChange={(e) => setSourceAddress({ ...sourceAddress, city: e.target.value })}
          />
        </label>
        <br />
        <label>
          Country:
          <input
            type="text"
            value={sourceAddress.country}
            onChange={(e) => setSourceAddress({ ...sourceAddress, country: e.target.value })}
          />
        </label>
        <br />
        <h3>Destination Address</h3>
        <label>
          Address:
          <input
            type="text"
            value={destinationAddress.address}
            onChange={(e) => setDestinationAddress({ ...destinationAddress, address: e.target.value })}
          />
        </label>
        <br />
        <label>
          Postal Code:
          <input
            type="text"
            value={destinationAddress.postalCode}
            onChange={(e) => setDestinationAddress({ ...destinationAddress, postalCode: e.target.value })}
          />
        </label>
        <br />
        <label>
          City:
          <input
            type="text"
            value={destinationAddress.city}
            onChange={(e) => setDestinationAddress({ ...destinationAddress, city: e.target.value })}
          />
        </label>
        <br />
        <label>
          Country:
          <input
            type="text"
            value={destinationAddress.country}
            onChange={(e) => setDestinationAddress({ ...destinationAddress, country: e.target.value })}
          />
        </label>
        <br />
        <button type="submit">Next</button>
      </form>
    </div>
  );
};

export default OrderForm;
