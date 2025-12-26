import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Service from "@/models/Service";

const initialServices = [
  {
    name: "Baby Sitting",
    description: "Reliable and caring babysitters for your little ones. We ensure safety, engagement, and fun interactions.",
    pricePerHour: 500,
    image: "https://images.unsplash.com/photo-1596956637373-196025bc4d5b?q=80&w=2670",
    category: "Child Care"
  },
  {
    name: "Elderly Care",
    description: "Compassionate support for seniors including mobility assistance, medication reminders, and companionship.",
    pricePerHour: 800,
    image: "https://images.unsplash.com/photo-1581579186913-45ac3e6e3dd2?q=80&w=2670",
    category: "Elderly Care"
  },
  {
    name: "Sick Care",
    description: "Specialized care for sick family members requiring constant attention and basic medical monitoring.",
    pricePerHour: 1000,
    image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?q=80&w=2668",
    category: "Medical Support"
  }
];

export async function GET() {
  await dbConnect();

  try {
    // Clear existing services to avoid duplicates during dev
    await Service.deleteMany({});
    
    // Seed new data
    const services = await Service.insertMany(initialServices);

    return NextResponse.json({ 
      message: "Database seeded successfully", 
      services 
    });
  } catch (error) {
    return NextResponse.json({ error: "Seeding failed" }, { status: 500 });
  }
}
