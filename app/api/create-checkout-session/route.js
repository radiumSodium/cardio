import { NextResponse } from "next/server";
import Stripe from "stripe";
import dbConnect from "@/lib/db";
import Booking from "@/models/Booking";
import Service from "@/models/Service";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-12-15.clover", 
});

export async function POST(req) {
  try {
    const body = await req.json();
    const { bookingId, userId, serviceId, duration, location, totalCost } = body;
    await dbConnect();
    
    let lineItems = [];
    let metadata = {};
    let successUrl = `${req.headers.get("origin")}/payment/success?session_id={CHECKOUT_SESSION_ID}`;

    if (bookingId) {
        const booking = await Booking.findById(bookingId).populate("serviceId");
        if (!booking) return NextResponse.json({ error: "Booking not found" }, { status: 404 });
        
        lineItems = [{
            price_data: {
              currency: "bdt",
              product_data: {
                name: booking.serviceId?.name || "Service Booking",
                description: `Booking ID: ${booking._id}`,
              },
              unit_amount: booking.totalCost * 100, 
            },
            quantity: 1,
        }];
        metadata = { bookingId: booking._id.toString(), userId: booking.userId };
        successUrl += `&booking_id=${booking._id}`;
    } else {
        // Direct booking from booking page
        const service = await Service.findById(serviceId);
        if (!service) return NextResponse.json({ error: "Service not found" }, { status: 404 });

        lineItems = [{
            price_data: {
              currency: "bdt",
              product_data: {
                name: service.name,
                description: `Service: ${service.name}`,
              },
              unit_amount: totalCost * 100,
            },
            quantity: 1,
        }];
        metadata = {
            userId,
            serviceId,
            duration,
            location: JSON.stringify(location),
            totalCost: totalCost.toString(),
            createBooking: "true"
        };
    }
    
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: successUrl,
      cancel_url: `${req.headers.get("origin")}/dashboard/user/bookings`,
      metadata,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe Error:", error);
    return NextResponse.json({ error: "Checkout failed" }, { status: 500 });
  }
}
