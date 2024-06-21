"use client";
import React, { useState, useEffect } from "react";
import { useGetStripeQuery } from "@/provider/redux/query";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import StripeForm from "@/components/stripeForm";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { RootState } from "@/provider/redux/store";
import CartItem from "@/components/cartItem";
import { string } from "zod";

export default function StripeContainer() {
  const { id } = useParams();
  const price = useSelector((state: RootState) => state.cart.totalPrice);
  const cart = useSelector((state: RootState) => state.cart);
  const { data: stripeData, isError, isLoading } = useGetStripeQuery(id);
  const [stripePromise, setStripePromise] = useState<Stripe | null>(null);
  const [isStripeReady, setIsStripeReady] = useState(false);

  useEffect(() => {
    loadStripe(
      "pk_test_51OURs9HQYjcX108KGMDmo6Dbb214m2Ab5kOoFoT6em1ZE8eZcjV60f9VRR5M12ilNnbCUdZp9Cg8KRnUKK4xwLg800ukim89C7"
    )
      .then((stripe) => {
        setStripePromise(stripe);
        console.log("Stripe loaded:", stripe);
      })
      .catch((error) => {
        console.error("Failed to load Stripe:", error);
      });
  }, []);

  useEffect(() => {
    console.log("Stripe Data", stripeData, isError, isLoading);
  }, [stripeData, isError, isLoading]);

  useEffect(() => {
    console.log("Stripe Promise", stripePromise);
    console.log("Stripe Promise truethy", !!stripePromise);
  }, [stripePromise]);

  useEffect(() => {
    console.log(
      "Values stripe ",
      stripeData?.clientSecret,
      isLoading,
      stripePromise
    );
    if (!isLoading && stripeData?.clientSecret && stripePromise) {
      setIsStripeReady(true);
    } else {
      setIsStripeReady(false);
    }
    console.log("isStripeReady:", isStripeReady);
  }, [stripeData, isLoading, stripePromise]);

  return (
    <div className="flex gap-5 p-16 justify-center items-center">
      <div className="flex justify-center items-center">
        {isError && <p>Error loading Stripe data</p>}
        {isLoading && <p>Loading...</p>}
      </div>
      <div className="w-1/2">
        {isStripeReady ? (
          <Elements
            stripe={stripePromise}
            options={{ clientSecret: stripeData?.clientSecret }}
          >
            <StripeForm />
          </Elements>
        ) : (
          <div>Stripe not loaded</div>
        )}
      </div>
      <div className="w-1/2">
        {cart.products.map((item) => (
          <CartItem
            key={item.productId}
            productId={item.productId}
            quantity={item.quantity}
            disableQuantityChange={true}
          />
        ))}
      </div>
    </div>
  );
}
