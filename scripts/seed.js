import mongoose from "mongoose";
import * as fs from "fs";
import * as path from "path";
import * as dotenv from "dotenv";

// Load environment variables from .env.local
dotenv.config({ path: ".env.local" });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("Error: MONGODB_URI is not defined in .env.local");
  process.exit(1);
}

// Define Service Schema inline to avoid import issues
const ServiceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  pricePerHour: { type: Number, required: true },
  image: { type: String, required: true },
  category: { type: String },
}, { timestamps: true });

const Service = mongoose.models.Service || mongoose.model("Service", ServiceSchema);

async function seed() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI);
    console.log("Connected.");

    // Read data - checking if directory exists
    const dataPath = path.join(process.cwd(), "lib", "data.js");
    // Since we want to use the lib/data.js array, we can import it if node supports it, 
    // or just use a json if we have one. 
    // Let's assume we want to seed from the expanded lib/data.js
    
    const { services } = await import("../lib/data.js");

    console.log("Clearing existing services...");
    await Service.deleteMany({});

    console.log("Seeding new services...");
    await Service.insertMany(services.map(s => ({
        name: s.name,
        description: s.description,
        pricePerHour: s.pricePerHour,
        image: s.image,
        category: "Care Service"
    })));

    console.log("Database seeded successfully with:");
    services.forEach((s) => console.log(`- ${s.name}`));

    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
}

seed();
