import mongoose, { Schema, Document, Model } from "mongoose";

export type UserRole = "admin" | "caretaker" | "user";

export interface IUser extends Document {
  firebaseUid: string;
  email: string;
  name: string;
  contact: string;
  nid: string;
  role: UserRole;
  createdAt: Date;
}

const UserSchema: Schema = new Schema({
  firebaseUid: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  contact: { type: String, required: true },
  nid: { type: String, required: true },
  role: { type: String, enum: ["admin", "caretaker", "user"], default: "user" },
}, { timestamps: true });

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
