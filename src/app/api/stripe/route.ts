import { NextResponse } from "next/server";
import { stripe } from "../util";

export const GET = async (request: any) => {
  try {
    const { searchParams } = new URL(request.url);
    const price = searchParams.get("price");

    if (!price) {
      return NextResponse.json(
        { message: "Price parameter is required" },
        { status: 400 }
      );
    }

    const amount = parseInt(price, 10) * 100;

    console.log(
      "Stripe API called ",
      stripe,
      process.env.STRIPE_PUBLISHABLE_KEY
    );

    const paymentIntent = await stripe.paymentIntents.create({
      currency: "usd",
      amount: amount,
    });

    console.log("Payment Intent", paymentIntent);

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.log("Error", err);
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
};
