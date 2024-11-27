import React, { useState } from "react";
import './orderForm.css'; // Import CSS for the form

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
    if (
      weight > 0 &&
      sourceAddress.address &&
      sourceAddress.postalCode &&
      sourceAddress.city &&
      sourceAddress.country &&
      destinationAddress.address &&
      destinationAddress.postalCode &&
      destinationAddress.city &&
      destinationAddress.country
    ) {
      const randomDistance = Math.floor(Math.random() * 20) + 1;
      let multiplier = 0.5;

      if (deliveryType === "express") multiplier = 1;
      if (deliveryType === "international") multiplier = 1.5;

      const cost = (weight * randomDistance * multiplier).toFixed(2);
      onComplete({ deliveryType, weight, sourceAddress, destinationAddress, cost });
    } else {
      alert("Please fill out all fields with valid values.");
    }
  };

  return (
    <div className="Container">
      <div className="FormWrap">
        <div className="FormContent">
          <div className="Form">
            <h1 className="FormH1">Order Form</h1>
            <form onSubmit={handleSubmit}>
              <label className="FormLabel">
                Delivery Type:
                <select
                  value={deliveryType}
                  onChange={(e) => setDeliveryType(e.target.value)}
                  className="FormInput"
                >
                  <option value="standard">Standard</option>
                  <option value="express">Express</option>
                  <option value="international">International</option>
                </select>
              </label>
              <br />
              <label className="FormLabel">
                Weight (kg):
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(parseFloat(e.target.value))}
                  className="FormInput"
                />
              </label>
              <br />
              <div className="AddressSection">
                <h3>Source Address</h3>
                <label className="FormLabel">Address:</label>
                <input
                  type="text"
                  value={sourceAddress.address}
                  onChange={(e) => setSourceAddress({ ...sourceAddress, address: e.target.value })}
                  className="FormInput"
                />
                <br />
                <label className="FormLabel">Postal Code:</label>
                <input
                  type="text"
                  value={sourceAddress.postalCode}
                  onChange={(e) => setSourceAddress({ ...sourceAddress, postalCode: e.target.value })}
                  className="FormInput"
                />
                <br />
                <label className="FormLabel">City:</label>
                <input
                  type="text"
                  value={sourceAddress.city}
                  onChange={(e) => setSourceAddress({ ...sourceAddress, city: e.target.value })}
                  className="FormInput"
                />
                <br />
                <label className="FormLabel">Country:</label>
                <input
                  type="text"
                  value={sourceAddress.country}
                  onChange={(e) => setSourceAddress({ ...sourceAddress, country: e.target.value })}
                  className="FormInput"
                />
              </div>
              <div className="AddressSection">
                <h3>Destination Address</h3>
                <label className="FormLabel">Address:</label>
                <input
                  type="text"
                  value={destinationAddress.address}
                  onChange={(e) => setDestinationAddress({ ...destinationAddress, address: e.target.value })}
                  className="FormInput"
                />
                <br />
                <label className="FormLabel">Postal Code:</label>
                <input
                  type="text"
                  value={destinationAddress.postalCode}
                  onChange={(e) => setDestinationAddress({ ...destinationAddress, postalCode: e.target.value })}
                  className="FormInput"
                />
                <br />
                <label className="FormLabel">City:</label>
                <input
                  type="text"
                  value={destinationAddress.city}
                  onChange={(e) => setDestinationAddress({ ...destinationAddress, city: e.target.value })}
                  className="FormInput"
                />
                <br />
                <label className="FormLabel">Country:</label>
                <input
                  type="text"
                  value={destinationAddress.country}
                  onChange={(e) => setDestinationAddress({ ...destinationAddress, country: e.target.value })}
                  className="FormInput"
                />
              </div>
              <button type="submit" className="FormButton">Next</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderForm;
