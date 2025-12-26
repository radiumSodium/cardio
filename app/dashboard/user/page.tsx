"use client";

import { useAuth } from "@/lib/authContext";

export default function UserDashboard() {
  const { dbUser } = useAuth();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">Welcome back, {dbUser?.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass p-6 rounded-xl border border-white/5">
           <h3 className="text-gray-400">Total Bookings</h3>
           <p className="text-3xl font-bold text-white mt-2">0</p>
        </div>
        <div className="glass p-6 rounded-xl border border-white/5">
           <h3 className="text-gray-400">Active Services</h3>
           <p className="text-3xl font-bold text-blue-400 mt-2">0</p>
        </div>
        <div className="glass p-6 rounded-xl border border-white/5">
           <h3 className="text-gray-400">Pending Payments</h3>
           <p className="text-3xl font-bold text-pink-400 mt-2">0</p>
        </div>
      </div>
    </div>
  );
}
