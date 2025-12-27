import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Booking from "@/models/Booking";

export async function PATCH(req, { params }) {
  const { id } = params;
  await dbConnect();

  try {
    const body = await req.json();
    const updatedBooking = await Booking.findByIdAndUpdate(id, body, { new: true });
    
    if (!updatedBooking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, booking: updatedBooking });
  } catch (error) {
    console.error("Update Booking Error:", error);
    return NextResponse.json({ error: "Failed to update booking" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
    const { id } = params;
    await dbConnect();
  
    try {
      const deletedBooking = await Booking.findByIdAndDelete(id);
      
      if (!deletedBooking) {
        return NextResponse.json({ error: "Booking not found" }, { status: 404 });
      }
  
      return NextResponse.json({ success: true });
    } catch (error) {
      console.error("Delete Booking Error:", error);
      return NextResponse.json({ error: "Failed to delete booking" }, { status: 500 });
    }
  }
