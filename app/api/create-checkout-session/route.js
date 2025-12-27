import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const { bookingId, serviceName, amount } = await req.json();

    if (!bookingId || !serviceName || !amount) {
        return NextResponse.json({ error: "Missing required params" }, { status: 400 });
    }

    // Amount in cents (assuming amount is passed in dollars/units)
    // Or if amount is already verified? 
    // Usually we should fetch from DB to be safe, but for this demo using passed value.
    
    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: serviceName,
              description: `Payment for booking #${bookingId}`,
            },
            unit_amount: Math.round(amount * 100), // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/payment/success?session_id={CHECKOUT_SESSION_ID}&booking_id=${bookingId}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/dashboard/user`,
      metadata: {
          bookingId: bookingId
      }
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe Session Error:", error);
    return NextResponse.json({ error: "Failed to create session" }, { status: 500 });
  }
}
