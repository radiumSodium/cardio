import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Service from "@/models/Service";
import { services as initialServices } from "@/lib/data";

export async function GET() {
  await dbConnect();

  try {
    // Clear existing services to avoid duplicates during dev
    await Service.deleteMany({});
    
    // Seed new data
    // Map to include a generic category if missing, or just use as is
    const seededServices = await Service.insertMany(
        initialServices.map(s => ({
            name: s.name,
            description: s.description,
            pricePerHour: s.pricePerHour,
            image: s.image,
            category: "Care Service" // Default category for all now
        }))
    );

    return NextResponse.json({ 
      message: "Database seeded successfully", 
      count: seededServices.length,
      services: seededServices 
    });
  } catch (error) {
    console.error("Seed failed:", error);
    return NextResponse.json({ error: "Seeding failed" }, { status: 500 });
  }
}
