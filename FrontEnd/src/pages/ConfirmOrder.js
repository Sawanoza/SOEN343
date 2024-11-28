import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ConfirmOrder = () => {
  const { orderId } = useParams();
  const [inputId, setInputId] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleConfirm = async () => {
    const response = await fetch('http://localhost:3000/confirm-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderId, inputId }),
    });

    if (response.ok) {
      setMessage('Order dropped off!');
      setTimeout(() => navigate('/'), 5000); // Redirect after 5 seconds
    } else {
      setMessage('Invalid order ID. Please try again.');
    }
  };

  return (
    <div>
      <h1>Confirm Order</h1>
      <p>Enter the order ID to confirm reception:</p>
      <input
        type="text"
        value={inputId}
        onChange={(e) => setInputId(e.target.value)}
        placeholder="Order ID"
      />
      <button onClick={handleConfirm}>Confirm</button>
      <p>{message}</p>
    </div>
  );
};

export default ConfirmOrder;
