import Stripe from "stripe";

export const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY || "default_secret_key",
  {
    apiVersion: "2024-04-10",
  }
);
