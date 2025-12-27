import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  userId: { type: String, required: true }, 
  caretakerId: { type: String }, // Firebase UID of the caretaker
  serviceId: { type: mongoose.Schema.Types.ObjectId, ref: "Service", required: true },
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

const Booking = mongoose.models.Booking || mongoose.model("Booking", BookingSchema);

export default Booking;
