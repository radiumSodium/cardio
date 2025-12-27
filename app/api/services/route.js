import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Service from "@/models/Service";

export async function GET() {
  await dbConnect();
  try {
    const services = await Service.find({}).sort({ createdAt: -1 });
    return NextResponse.json(services);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 });
  }
}

export async function POST(req) {
  await dbConnect();

  try {
    const body = await req.json();
    // Basic validation
    if (!body.name || !body.pricePerHour) {
        return NextResponse.json({ error: "Name and Price are required" }, { status: 400 });
    }

    const service = await Service.create(body);
    return NextResponse.json({ success: true, service });
  } catch (error) {
    console.error("Create Service Error:", error);
    return NextResponse.json({ error: "Failed to create service" }, { status: 500 });
  }
}

export async function DELETE(req) {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Service ID required" }, { status: 400 });
  }

  try {
    const deletedService = await Service.findByIdAndDelete(id);
    if (!deletedService) {
        return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete Service Error:", error);
    return NextResponse.json({ error: "Failed to delete service" }, { status: 500 });
  }
}
