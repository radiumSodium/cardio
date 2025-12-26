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

// Define Service Schema inline to avoid import issues with Next.js specific code
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
    await mongoose.connect(MONGODB_URI as string);
    console.log("Connected.");

    // Read data
    const dataPath = path.join(process.cwd(), "data", "services.json");
    const jsonData = fs.readFileSync(dataPath, "utf-8");
    const services = JSON.parse(jsonData);

    console.log("Clearing existing services...");
    await Service.deleteMany({});

    console.log("Seeding new services...");
    await Service.insertMany(services);

    console.log("Database seeded successfully with:");
    services.forEach((s: any) => console.log(`- ${s.name}`));

    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
}

seed();
