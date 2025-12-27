"use client";

import BookingStats from "@/components/dashboard/BookingStats";
import BookingList from "@/components/dashboard/BookingList";
import ServiceManager from "@/components/dashboard/ServiceManager";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h2>
        <p className="text-gray-400">Welcome back, Admin. Here's what's happening today.</p>
      </div>

      <BookingStats role="admin" />

      <Tabs defaultValue="bookings" className="w-full">
        <TabsList className="bg-slate-900 border border-white/10">
            <TabsTrigger value="bookings">All Bookings</TabsTrigger>
            <TabsTrigger value="services">Manage Services</TabsTrigger>
        </TabsList>
        <TabsContent value="bookings" className="mt-6">
            <BookingList role="admin" />
        </TabsContent>
        <TabsContent value="services" className="mt-6">
             <ServiceManager allowDelete={true} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
