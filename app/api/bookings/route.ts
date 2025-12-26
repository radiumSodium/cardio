import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Booking from "@/models/Booking";
import Service from "@/models/Service";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  
  await dbConnect();

  try {
    let query = {};
    if (userId) {
        query = { userId };
    }
    
    // We need to populate serviceName if it's not stored in booking.
    // My Booking model schema has serviceId ref: "Service".
    // I should populate 'serviceId' and get the name.
    
    const bookings = await Booking.find(query).populate("serviceId", "name").sort({ createdAt: -1 });
    
    // Map to flatten structure for frontend if needed, or frontend handles it
    const formatted = bookings.map(b => ({
        ...b.toObject(),
        serviceName: (b.serviceId as any)?.name || "Unknown Service",
        _id: b._id.toString()
    }));
    
    return NextResponse.json(formatted);
  } catch (error) {
    console.error("Fetch Bookings Error:", error);
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
    // Already defined in previous file app/api/bookings/route.ts
    // Wait, did I overwrite it? Yes I am overwriting it here to combine?
    // No, I created POST in step 263. Now I am adding GET.
    // I should rewrite the whole file to include both GET and POST.
    
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
