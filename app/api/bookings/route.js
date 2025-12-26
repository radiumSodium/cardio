import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Booking from "@/models/Booking";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  
  await dbConnect();

  try {
    let query = {};
    if (userId) {
        query = { userId };
    }
    
    const bookings = await Booking.find(query).populate("serviceId", "name").sort({ createdAt: -1 });
    
    const formatted = bookings.map(b => ({
        ...b.toObject(),
        serviceName: b.serviceId?.name || "Unknown Service",
        _id: b._id.toString()
    }));
    
    return NextResponse.json(formatted);
  } catch (error) {
    console.error("Fetch Bookings Error:", error);
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 });
  }
}

export async function POST(req) {
    try {
        const body = await req.json();
        // Create new booking
        const booking = await Booking.create(body);
        return NextResponse.json({ success: true, booking });
    } catch (error) {
        console.error("Booking Create Error:", error);
        return NextResponse.json({ error: "Failed to create booking" }, { status: 500 });
    }
}
