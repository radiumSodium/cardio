import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Booking from "@/models/Booking";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-12-15.clover" as any,
});

export async function POST(req: NextRequest) {
  try {
    const { sessionId, bookingId } = await req.json();
    await dbConnect();
    
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    
    if (session.payment_status === "paid") {
        if (bookingId) {
            await Booking.findByIdAndUpdate(bookingId, { 
                paymentStatus: "paid",
                status: "confirmed" 
            });
            return NextResponse.json({ success: true });
        } else if (session.metadata?.createBooking === "true") {
            // Create the booking now
            const meta = session.metadata as any;
            const newBooking = await Booking.create({
                userId: meta.userId,
                serviceId: meta.serviceId as any,
                duration: meta.duration,
                location: JSON.parse(meta.location),
                totalCost: parseFloat(meta.totalCost),
                paymentStatus: "paid",
                status: "confirmed"
            });
            return NextResponse.json({ success: true, bookingId: newBooking._id });
        }
        return NextResponse.json({ error: "No booking logic found" }, { status: 400 });
    } else {
        return NextResponse.json({ error: "Payment not completed" }, { status: 400 });
    }
  } catch (error) {
    console.error("Verification failed", error);
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}
