import React, { useState } from "react";
import OrderForm from "./OrderForm";
import OrderSummary from "./OrderSummary";
import PaymentForm from "./PaymentForm";
import ConfirmationPage from "./ConfirmationPage";

const OrderProcess = () => {
  const [step, setStep] = useState("order"); // "order", "summary", "payment", "confirmation"
  const [orderDetails, setOrderDetails] = useState({});
  const [trackingId, setTrackingId] = useState("");

  const generateTrackingId = () => Math.random().toString(36).substring(2, 12).toUpperCase();

  const handleOrderCompletion = (details) => {
    setOrderDetails(details);
    setStep("summary");
  };

  const handlePaymentCompletion = () => {
    setTrackingId(generateTrackingId());
    setStep("confirmation");
  };

  const resetProcess = () => {
    setStep("order");
    setOrderDetails({});
    setTrackingId("");
  };

  return (
    <div>
      {step === "order" && <OrderForm onComplete={handleOrderCompletion} />}
      {step === "summary" && (
        <OrderSummary details={orderDetails} onConfirm={() => setStep("payment")} />
      )}
      {step === "payment" && (
        <PaymentForm
          cost={orderDetails.cost}
          onComplete={handlePaymentCompletion}
          onCancel={resetProcess}
        />
      )}
      {step === "confirmation" && (
        <ConfirmationPage trackingId={trackingId} onReset={resetProcess} />
      )}
    </div>
  );
};

export default OrderProcess;
