import mongoose, { Schema, Document, Model } from "mongoose";

export interface IService extends Document {
  name: string;
  description: string;
  pricePerHour: number;
  image: string;
  category: string;
}

const ServiceSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  pricePerHour: { type: Number, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
}, { timestamps: true });

// Prevent overwrite on HMR
const Service: Model<IService> = mongoose.models.Service || mongoose.model<IService>("Service", ServiceSchema);

export default Service;
