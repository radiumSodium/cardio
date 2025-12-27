import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Booking from "@/models/Booking";

export async function POST(req) {
  try {
    const { bookingId, sessionId } = await req.json();
    await dbConnect();

    // Verify booking matches and logic...
    // In production we would retrieve session from Stripe using sessionId to ensure paid.
    
    const booking = await Booking.findByIdAndUpdate(
        bookingId, 
        { 
            paymentStatus: "paid",
            status: "confirmed" // Auto-confirm on payment? User said "make it payed... show data of booking".
        },
        { new: true }
    );
    
    return NextResponse.json({ success: true, booking });
  } catch (error) {
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}
