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

  const handleSubmit = async (e) => {
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

      //=================================================================================================
      // GENERATE TRACKING ID
      //=================================================================================================
      const generateTrackingID = () => {
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const numbers = "0123456789";
      
        // Generate 3 random letters
        let randomLetters = "";
        for (let i = 0; i < 3; i++) {
          randomLetters += letters.charAt(Math.floor(Math.random() * letters.length));
        }
      
        // Generate 6 random numbers
        let randomNumbers = "";
        for (let i = 0; i < 6; i++) {
          randomNumbers += numbers.charAt(Math.floor(Math.random() * numbers.length));
        }
      
        return randomLetters + randomNumbers;
      };

      const trackingID = generateTrackingID();

      localStorage.setItem('trackingID', trackingID);
      //=================================================================================================

      //=================================================================================================
      // GENERATE ARRIVAL DATE
      //=================================================================================================
      // Calculate the arrival date based on the delivery type
      const currentDate = new Date();
      let arrivalDate = new Date(currentDate);

      // Add days based on the delivery type
      if (deliveryType === "standard") {
        arrivalDate.setDate(currentDate.getDate() + 14); // Add 14 days
      } else if (deliveryType === "express") {
        arrivalDate.setDate(currentDate.getDate() + 7); // Add 7 days
      } else if (deliveryType === "international") {
        arrivalDate.setDate(currentDate.getDate() + 21); // Add 21 days
      }

      localStorage.setItem('arrivalDate', arrivalDate);
      //=================================================================================================
  
      //=================================================================================================
      // GENERATE ORDER STATUS
      //=================================================================================================
      const orderStatus = "shipped";
      //=================================================================================================
  
      //=================================================================================================
      // GENERATE PIN
      //=================================================================================================
      const generatePin = () => {
        const newPin = Math.floor(100000 + Math.random() * 900000);
        localStorage.setItem('pin', newPin); 
        console.log("Generated PIN saved to localStorage:", newPin);
        return newPin;
      };

      generatePin();
      const pin = localStorage.getItem('pin');
      //=================================================================================================


      // POST request to create the order
      try {
        const response = await fetch('http://localhost:3000/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            trackingID,
            arrivalDate,
            orderStatus,
            pin
          }),
        });
  
        if (!response.ok) {
          throw new Error('Failed to create order');
        }
  
        const data = await response.json();
        console.log('Order created successfully:', data);
        onComplete({ deliveryType, weight, sourceAddress, destinationAddress, cost });
      } catch (error) {
        console.error('Error creating order:', error);
        alert('Error creating order');
      }
    } else {
      alert("Please fill out all fields with valid values.");
    }
  };


  // Handle updates for Source and Destination addresses
  const handleSourceChange = (e) => {
    const { name, value } = e.target;
    setSourceAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDestinationChange = (e) => {
    const { name, value } = e.target;
    setDestinationAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
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
                <div className="AddressColumn">
                  <h3>Source Address</h3>
                  <label className="FormLabel">Address:</label>
                  <input
                    type="text"
                    name="address"
                    value={sourceAddress.address}
                    onChange={handleSourceChange}
                    className="FormInput"
                  />
                  <br />
                  <label className="FormLabel">Postal Code:</label>
                  <input
                    type="text"
                    name="postalCode"
                    value={sourceAddress.postalCode}
                    onChange={handleSourceChange}
                    className="FormInput"
                  />
                  <br />
                  <label className="FormLabel">City:</label>
                  <input
                    type="text"
                    name="city"
                    value={sourceAddress.city}
                    onChange={handleSourceChange}
                    className="FormInput"
                  />
                  <br />
                  <label className="FormLabel">Country:</label>
                  <input
                    type="text"
                    name="country"
                    value={sourceAddress.country}
                    onChange={handleSourceChange}
                    className="FormInput"
                  />
                </div>

                <div className="AddressColumn">
                  <h3>Destination Address</h3>
                  <label className="FormLabel">Address:</label>
                  <input
                    type="text"
                    name="address"
                    value={destinationAddress.address}
                    onChange={handleDestinationChange}
                    className="FormInput"
                  />
                  <br />
                  <label className="FormLabel">Postal Code:</label>
                  <input
                    type="text"
                    name="postalCode"
                    value={destinationAddress.postalCode}
                    onChange={handleDestinationChange}
                    className="FormInput"
                  />
                  <br />
                  <label className="FormLabel">City:</label>
                  <input
                    type="text"
                    name="city"
                    value={destinationAddress.city}
                    onChange={handleDestinationChange}
                    className="FormInput"
                  />
                  <br />
                  <label className="FormLabel">Country:</label>
                  <input
                    type="text"
                    name="country"
                    value={destinationAddress.country}
                    onChange={handleDestinationChange}
                    className="FormInput"
                  />
                </div>
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
