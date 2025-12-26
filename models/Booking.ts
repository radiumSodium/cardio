import mongoose, { Schema, Document, Model } from "mongoose";

export interface IBooking extends Document {
  userId: string; // Linking to our User model via firebaseUid or ObjectId
  serviceId: mongoose.Schema.Types.ObjectId;
  duration: string;
  totalCost: number;
  location: {
    division: string;
    district: string;
    address: string;
  };
  status: "pending" | "confirmed" | "cancelled" | "completed";
  paymentStatus: "unpaid" | "paid";
  createdAt: Date;
}

const BookingSchema: Schema = new Schema({
  userId: { type: String, required: true }, // Using Firebase UID for easy query
  serviceId: { type: Schema.Types.ObjectId, ref: "Service", required: true },
  duration: { type: String, required: true },
  totalCost: { type: Number, required: true },
  location: {
    division: { type: String, required: true },
    district: { type: String, required: true },
    address: { type: String, required: true },
  },
  status: { type: String, enum: ["pending", "confirmed", "cancelled", "completed"], default: "pending" },
  paymentStatus: { type: String, enum: ["unpaid", "paid"], default: "unpaid" },
}, { timestamps: true });

const Booking: Model<IBooking> = mongoose.models.Booking || mongoose.model<IBooking>("Booking", BookingSchema);

export default Booking;
