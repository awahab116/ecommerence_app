import React, { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { PaymentElement } from "@stripe/react-stripe-js";
import { Button } from "../ui/button";

const StripeForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  console.log("Stripe hello", stripe, elements);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${window.location.origin}/checkout/success`,
      },
    });

    if (error) {
      if (error.type === "card_error" || error.type === "validation_error") {
        setMessage(error.message || "An error occurred with your card.");
      } else {
        setMessage("An unexpected error occurred.");
      }
    } else {
      setMessage(null);
    }

    setIsProcessing(false);
  };

  return (
    // <form onSubmit={handleSubmit}>
    //   <button type="submit" disabled={isProcessing}>
    //     {isProcessing ? "Processing..." : "Pay"}
    //   </button>
    //   {message && <div>{message}</div>}
    // </form>
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <Button
        className="w-full mt-2"
        disabled={isProcessing || !stripe || !elements}
      >
        <span>{isProcessing ? "Processing ... " : "Pay now"}</span>
      </Button>
      {/* Show any error or success messages */}
      {message && <div>{message}</div>}
    </form>
  );
};

export default StripeForm;
