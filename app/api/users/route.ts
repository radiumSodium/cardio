import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/models/User";

export async function GET(req: NextRequest) {
    await dbConnect();
    // In real app, check for admin role here from session/token
    try {
        const users = await User.find({}).sort({ createdAt: -1 });
        return NextResponse.json(users);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    await dbConnect();
    
    // Check if user exists
    const existingUser = await User.findOne({ firebaseUid: body.firebaseUid });
    if (existingUser) {
        return NextResponse.json({ message: "User already exists", user: existingUser });
    }

    const newUser = await User.create({
        firebaseUid: body.firebaseUid,
        email: body.email,
        name: body.name,
        contact: body.contact,
        nid: body.nid,
        role: "user" // Default role
    });

    return NextResponse.json({ success: true, user: newUser });
  } catch (error) {
    console.error("Create User Error:", error);
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
}
